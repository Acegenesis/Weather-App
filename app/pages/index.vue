<script setup>
// i18n
const { t, locale } = useI18n()

// Configuration de la page
definePageMeta({
  title: 'Météo - Accueil'
})

// Utilisation des composables Nuxt
const config = useRuntimeConfig()

// État réactif
const infosVilles = ref([])
const isLoading = ref(true)
const error = ref(null)

// Nuxt Swiper composable
const containerRef = ref(null)
const swiper = useSwiper(containerRef)

// Initialisation après chargement des données
watch(infosVilles, async (newVal) => {
  if (newVal.length > 0 && containerRef.value) {
    await nextTick()
    console.log('Swiper instance after data load:', swiper.instance)
  }
}, { immediate: true })

// Fonction helper pour traduire les conditions météo
const getWeatherCondition = (condition) => {
  const conditionKey = condition.toLowerCase().replace(/\s+/g, '_')
  const translationKey = `weather.conditions.${conditionKey}`
  const translation = t(translationKey)
  // Si la traduction n'existe pas, on retourne la condition originale
  return translation !== translationKey ? translation : condition
}

// Fonction pour obtenir les informations météo

const obtenirInfosMeteo = async () => {
  try {
    isLoading.value = true
    error.value = null
    // Seulement les 3 villes du mockup
    const villes = ['Paris', 'New York', 'Sydney']
    const colors = ['#FFE142', '#42C6FF', '#FF64D4']
    const apiKey = config.public.apiKey
    const infosVillesTemp = []
    for (const [index, ville] of villes.entries()) {
      try {
        const data = await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}`)
        const { dt, weather, main, wind, visibility } = data
        const date = new Date(dt * 1000)
        const tempsEnAnglais = weather[0].description // Utilisons la description détaillée
        const temps = getWeatherCondition(tempsEnAnglais)
        const temperature = Math.round(main.temp - 273.15).toString()
        const vent = `${Math.round(wind.speed * 3.6)}km/h`
        const visibilite = visibility >= 1000 ? `${Math.round(visibility / 1000)}km` : `${Math.round(visibility)}m`
        const options = { weekday: 'long', day: 'numeric', month: 'long' }
        const dateLocale = date.toLocaleDateString('en-US', options)
        const humidite = `${main.humidity}%`
        const infoVille = {
          ville: t(`cities.${ville.toLowerCase().replace(' ', '_')}`),
          jour: dateLocale,
          temps,
          temperature: temperature,
          vent: vent,
          humidite: humidite,
          visibilite,
          color: colors[index],
        }
        infosVillesTemp.push(infoVille)
      } catch (err) {
        console.error(`Erreur pour ${ville}:`, err)
      }
    }
    infosVilles.value = infosVillesTemp
  } catch (err) {
    error.value = 'Erreur lors du chargement des données météo'
  } finally {
    isLoading.value = false
  }
}

// Chargement des données au montage du composant
onMounted(async () => {
  console.log('Component mounted, loading data...')
  await obtenirInfosMeteo()
  console.log('Data loaded:', infosVilles.value)
})

// Watch pour debug
watch(infosVilles, (newVal) => {
  console.log('infosVilles changed:', newVal)
}, { deep: true })

watch(isLoading, (newVal) => {
  console.log('isLoading changed:', newVal)
})
</script>

<template>
<div class="weather-app-fullscreen">
  <!-- Sélecteur de langue -->
  <div class="language-selector-container">
    <LanguageSelector :backgroundColor="'rgba(255, 255, 255, 0.1)'" />
  </div>
  
  <div v-if="isLoading" class="loading">
    <h2>{{ $t('app.loading') || 'Chargement des données météo...' }}</h2>
  </div>
  <div v-else-if="error" class="error">
    <h2>{{ $t('app.error') || 'Erreur' }}</h2>
    <p>{{ error }}</p>
    <button @click="obtenirInfosMeteo">{{ $t('app.retry') || 'Réessayer' }}</button>
  </div>
  <div v-else-if="infosVilles.length > 0" class="weather-swiper-container">
    <!-- Nuxt Swiper avec web components -->
    <ClientOnly>
      <swiper-container 
        ref="containerRef"
        slides-per-view="1"
        space-between="0"
        grab-cursor="true"
        loop="true"
        pagination-clickable="true"
      >
        <swiper-slide 
          v-for="(ville, index) in infosVilles" 
          :key="index"
          class="weather-slide-fullscreen"
        >
          <WeatherCard :ville="ville" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
  <div v-else class="no-data">
    <h2>{{ $t('app.no_data') || 'Aucune donnée disponible' }}</h2>
    <button @click="obtenirInfosMeteo">{{ $t('app.load_data') || 'Charger les données' }}</button>
  </div>
</div>
</template>

<style scoped>
/* --- Fullscreen Weather App avec Swiper et Composants --- */
.weather-app-fullscreen {
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'SF Compact Display Medium', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #000;
  overflow: hidden;
  position: relative;
}

/* Sélecteur de langue */
.language-selector-container {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1000;
}

.weather-swiper-container {
  width: 100%;
  height: 100%;
  position: relative;
}

swiper-container {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

swiper-slide {
  width: 100vw !important;
  height: 100vh !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.weather-slide-fullscreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Navigation personnalisée */
.swiper-navigation {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 1000;
}

.swiper-btn {
  background: rgba(255, 255, 255, 0.9);
  color: rgba(0, 0, 0, 0.8);
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'SF Compact Display Medium', sans-serif;
  backdrop-filter: blur(10px);
}

.swiper-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.swiper-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Styles Swiper pagination adaptés à la DA */
swiper-container::part(pagination) {
  position: absolute;
  width: auto !important;
  bottom: 30px !important;
  left: 50% !important;
  transform: translateX(-50%);
  border-radius: 24px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 15px 25px;
  background: rgb(0, 0, 0) !important; /* Bande sombre marron comme dans l'image */
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: none;
}

swiper-container::part(bullet) {
  background: rgb(255, 255, 255) !important;
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  margin: 0 4px !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  border: none !important;
  position: relative !important;
  overflow: hidden !important;
}

swiper-container::part(bullet-active) {
  background: rgba(255, 255, 255, 0.9) !important;
  transform: scale(1.2) !important;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7) !important;
}

swiper-container::part(bullet):hover {
  background: rgba(255, 255, 255, 0.6) !important;
  transform: scale(1.05) !important;
}

/* Styles généraux du swiper */
swiper-container::part(container) {
  overflow: hidden;
  position: relative;
}

swiper-container::part(wrapper) {
  box-sizing: content-box;
  display: flex;
}

/* Loading, error, no-data */
.loading, .error, .no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
  color: #fff;
}

.loading h2, .error h2, .no-data h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.error button, .no-data button {
  background: #FFE142;
  color: #000;
  border: none;
  padding: 15px 35px;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s;
  font-family: 'SF Compact Display Medium', sans-serif;
}

.error button:hover, .no-data button:hover {
  background: #42C6FF;
  transform: translateY(-2px);
}


</style>
