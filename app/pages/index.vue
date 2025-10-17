<script setup>
import useActiveColor from '@/composables/useActiveColor'
import useGlassmorphism from '@/composables/useGlassmorphism'

const { t, locale } = useI18n()

definePageMeta({
  title: 'Weather - Home'
})

const config = useRuntimeConfig()
const { currentColor, setActiveSlide, setWeatherData } = useActiveColor()
const { applyPaginationStyles } = useGlassmorphism()

const isLoading = ref(true)
const error = ref(null)
const containerRef = ref(null)
const swiper = useSwiper(containerRef)

watch(() => useActiveColor().weatherData.value, async (newVal) => {
  if (newVal.length > 0 && containerRef.value) {
    await nextTick()
  }
}, { immediate: true })

watch(currentColor, (newColor) => {
  applyPaginationStyles(newColor)
}, { immediate: true })

const getWeatherCondition = (condition) => {
  const conditionKey = condition.toLowerCase().replace(/\s+/g, '_')
  const translationKey = `weather.conditions.${conditionKey}`
  const translation = t(translationKey)
  return translation !== translationKey ? translation : condition
}

const onSlideChange = (event) => {
  if (event.detail && typeof event.detail[0]?.realIndex === 'number') {
    setActiveSlide(event.detail[0].realIndex)
  }
}

const fetchWeatherData = async () => {
  try {
    isLoading.value = true
    error.value = null
    const cities = ['Paris', 'New York', 'Sydney']
    const colors = ['#FFE142', '#42C6FF', '#FF64D4']
    const apiKey = config.public.apiKey
    const citiesData = []
    
    for (const [index, city] of cities.entries()) {
      try {
        const data = await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        const { dt, weather, main, wind, visibility, timezone } = data
        
        const date = new Date((dt + timezone) * 1000)
        const weatherDescriptionEn = weather[0].description
        const translatedWeather = getWeatherCondition(weatherDescriptionEn)
        const temperature = Math.round(main.temp - 273.15).toString()
        const windSpeed = `${Math.round(wind.speed * 3.6)}km/h`
        const visibilityFormatted = visibility >= 1000 ? `${Math.round(visibility / 1000)}km` : `${Math.round(visibility)}m`
        
        const options = { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long'
        }
        const localDate = date.toLocaleDateString('en-US', options)
        const humidity = `${main.humidity}%`
        
        const cityInfo = {
          ville: t(`cities.${city.toLowerCase().replace(' ', '_')}`),
          jour: localDate,
          temps: translatedWeather,
          temperature: temperature,
          vent: windSpeed,
          humidite: humidity,
          visibilite: visibilityFormatted,
          color: colors[index],
        }
        citiesData.push(cityInfo)
      } catch (err) {
        console.error(`Error fetching data for ${city}:`, err)
      }
    }
    setWeatherData(citiesData)
  } catch (err) {
    error.value = 'Error loading weather data'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchWeatherData()
  
  applyPaginationStyles(currentColor.value)
  
  await nextTick()
  if (containerRef.value && typeof window !== 'undefined') {
    const swiperEl = containerRef.value
    
    setTimeout(() => {
      if (swiperEl.swiper) {
        swiperEl.swiper.on('slideChange', () => {
          const realIndex = swiperEl.swiper.realIndex
          setActiveSlide(realIndex)
        })
      }
    }, 100)
  }
})

const { weatherData, activeSlideIndex } = useActiveColor()
</script>

<template>
<div class="weather-app-fullscreen">
  <div class="language-selector-container">
    <LanguageSelector :currentColor="currentColor" />
  </div>
  
  <div v-if="isLoading" class="loading">
    <h2>{{ $t('app.loading') || 'Loading weather data...' }}</h2>
  </div>
  <div v-else-if="error" class="error">
    <h2>{{ $t('app.error') || 'Error' }}</h2>
    <p>{{ error }}</p>
    <button @click="fetchWeatherData">{{ $t('app.retry') || 'Retry' }}</button>
  </div>
  <div v-else-if="weatherData.length > 0" class="weather-swiper-container">
    <ClientOnly>
      <swiper-container 
        ref="containerRef"
        slides-per-view="1"
        space-between="0"
        grab-cursor="true"
        loop="true"
        pagination-clickable="true"
        @swiperslidechange="onSlideChange"
        @slidechange="onSlideChange"
      >
        <swiper-slide 
          v-for="(ville, index) in weatherData" 
          :key="index"
          class="weather-slide-fullscreen"
        >
          <WeatherCard :ville="ville" />
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </div>
  <div v-else class="no-data">
    <h2>{{ $t('app.no_data') || 'No data available' }}</h2>
    <button @click="fetchWeatherData">{{ $t('app.load_data') || 'Load data' }}</button>
  </div>
</div>
</template>

<style scoped>
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

/* Language selector */
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

/* Custom navigation */
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
  background: var(--pagination-bg, rgba(255, 255, 255, 0.15)) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid var(--pagination-border, rgba(255, 255, 255, 0.25)) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.3) !important;
}

swiper-container::part(bullet) {
  background: var(--bullet-bg, rgba(0, 0, 0, 0.6)) !important;
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  margin: 0 4px !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  position: relative !important;
  overflow: hidden !important;
}

swiper-container::part(bullet-active) {
  background: var(--bullet-active-bg, rgba(0, 0, 0, 0.9)) !important;
  transform: scale(1.2) !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4) !important;
}

swiper-container::part(bullet):hover {
  background: var(--bullet-hover-bg, rgba(0, 0, 0, 0.75)) !important;
  transform: scale(1.05) !important;
}

swiper-container::part(container) {
  overflow: hidden;
  position: relative;
}

swiper-container::part(wrapper) {
  box-sizing: content-box;
  display: flex;
}

.loading, .error, .no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
  position: relative;
}

.loading::before, .error::before, .no-data::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: -1;
}

.loading h2, .error h2, .no-data h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  font-weight: 600;
}

.error button, .no-data button {
  background: rgba(255, 225, 66, 0.9);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(0, 0, 0, 0.9);
  padding: 15px 35px;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'SF Compact Display Medium', sans-serif;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}

.error button:hover, .no-data button:hover {
  background: rgba(66, 198, 255, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}
</style>