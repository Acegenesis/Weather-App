<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Modules Swiper
const modules = [Navigation, Pagination, Autoplay]

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

// Mapping des descriptions météo
const mappingTemps = {
  'clear sky': 'Ensoleillé',
  'few clouds': 'Quelques nuages',
  'scattered clouds': 'Nuages épars',
  'overcast clouds': 'Couvert',
  'broken clouds': 'Nuageux',
  'shower rain': 'Averses',
  'rain': 'Pluvieux',
  'thunderstorm': 'Orageux',
  'snow': 'Neigeux',
  'mist': 'Brumeux',
  'light rain': 'Pluie légère',
  'cloudy': 'Nuageux'
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
    if (!apiKey) {
      // Données de test si pas de clé API
      const donneesTest = villes.map((ville, index) => ({
        ville,
        jour: 'Friday, 20 January',
        temps: ['Sunny', 'Cloudy', 'Rain'][index],
        temperature: ['31', '28', '17'][index],
        vent: ['4km/h', '2km/h', '1km/h'][index],
        humidite: ['48%', '62%', '78%'][index],
        visibilite: ['1.6km', '1km', '0.8km'][index],
        color: colors[index],
        summary: [
          "Now it feels like 35°, actually 31°. It feels hot because of the direct sun. Today, the temperature is felt in the range from 31° to 27°.",
          "Now it seems that 25°, in fact 28°. It's humid now because of the heavy rain. Today, the temperature is felt in the range from 22° to 28°.",
          "Now it seems that 25°, in fact 28°. It's humid now because of the heavy rain. Today, the temperature is felt in the range from 22° to 28°."
        ][index]
      }))
      infosVilles.value = donneesTest
      isLoading.value = false
      return
    }
    // Si API, on garde la logique existante mais seulement pour 3 villes
    const infosVillesTemp = []
    for (const [index, ville] of villes.entries()) {
      try {
        const data = await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}`)
        const { dt, weather, main, wind, visibility } = data
        const date = new Date(dt * 1000)
        const tempsEnAnglais = weather[0].main
        const temps = mappingTemps[tempsEnAnglais.toLowerCase()] || tempsEnAnglais
        const temperature = Math.round(main.temp - 273.15).toString()
        const vent = `${Math.round(wind.speed * 3.6)}km/h`
        const visibilite = visibility >= 1000 ? `${Math.round(visibility / 1000)}km` : `${Math.round(visibility)}m`
        const options = { weekday: 'long', day: 'numeric', month: 'long' }
        const dateLocale = date.toLocaleDateString('en-US', options)
        const humidite = `${main.humidity}%`
        const infoVille = {
          ville,
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
  await obtenirInfosMeteo()
})
</script>

<template>
<div class="weather-app-fullscreen">
  <div v-if="isLoading" class="loading">
    <h2>Chargement des données météo...</h2>
  </div>
  <div v-else-if="error" class="error">
    <h2>Erreur</h2>
    <p>{{ error }}</p>
    <button @click="obtenirInfosMeteo">Réessayer</button>
  </div>
  <div v-else-if="infosVilles.length > 0" class="weather-swiper-container">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :grab-cursor="true"
      :pagination="{
        clickable: true,
      }"
      class="weather-swiper-fullscreen"
    >
      <swiper-slide 
        v-for="(ville, index) in infosVilles" 
        :key="index"
        class="weather-slide-fullscreen"
      >
        <WeatherCard :ville="ville" />
      </swiper-slide>
    </swiper>
  </div>
  <div v-else class="no-data">
    <h2>Aucune donnée disponible</h2>
    <button @click="obtenirInfosMeteo">Charger les données</button>
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
}

.weather-swiper-container {
  width: 100%;
  height: 100%;
}

.weather-swiper-fullscreen {
  width: 100%;
  height: 100%;
}

.weather-slide-fullscreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Styles Swiper */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: rgba(0,0,0,0.7);
  background: rgba(255,255,255,0.8);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: -30px;
  transition: all 0.3s;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(255,255,255,1);
  transform: scale(1.1);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 24px;
}

:deep(.swiper-pagination) {
  bottom: 40px;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(0,0,0,0.4);
  opacity: 1;
  width: 12px;
  height: 12px;
}

:deep(.swiper-pagination-bullet-active) {
  background: rgba(0,0,0,0.8);
  transform: scale(1.2);
}
</style>
