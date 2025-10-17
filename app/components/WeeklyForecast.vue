<script setup>
import useGlassmorphism from '@/composables/useGlassmorphism'

const { t } = useI18n()
const { getGlassStyle } = useGlassmorphism()

const props = defineProps({
  temperature: String,
  color: String
})

const generateForecast = () => {
  const baseTemp = parseInt(props.temperature)
  return Array.from({ length: 4 }, (_, index) => ({
    temp: Math.round(baseTemp + Math.random() * 6 - 3),
    date: `${20 + index + 1} Jan`
  }))
}

const forecast = computed(() => generateForecast())

const containerGlassStyles = computed(() => getGlassStyle(props.color, 'container'))
const cardGlassStyles = computed(() => getGlassStyle(props.color, 'card'))
</script>

<template>
  <div class="weekly-forecast-component">
    <div class="forecast-title">{{ $t('weather.weekly_forecast') }}</div>
    <div class="forecast-row" :style="containerGlassStyles">
      <div 
        v-for="(day, index) in forecast" 
        :key="index"
        class="forecast-day-component"
        :style="cardGlassStyles"
      >
        <div class="forecast-temp-component">{{ day.temp }}°</div>
        <div class="forecast-dot">●</div>
        <div class="forecast-date-component">{{ day.date }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weekly-forecast-component {
  width: 100%;
  max-width: 400px;
  text-align: left;
  margin: 15px auto 0 auto;
}

.forecast-title {
  font-family: 'SF Compact Display Medium', sans-serif;
  font-size: 1.3rem;
  color: #000;
  margin-bottom: 15px;
  font-weight: 600;
  padding-left: 20px;
}

.forecast-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  justify-content: center;
  border-radius: 20px;
  padding: 12px 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.forecast-row:hover {
  transform: translateY(-1px);
}

.forecast-day-component {
  border-radius: 14px;
  padding: 12px 8px;
  flex: 1;
  max-width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.forecast-day-component:hover {
  transform: translateY(-2px);
}

.forecast-temp-component {
  font-family: 'Ledger Regular', serif;
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.95);
  font-weight: 700;
  margin-bottom: 4px;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.forecast-dot {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.75);
  opacity: 0.7;
  margin-bottom: 4px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}

.forecast-date-component {
  font-family: 'SF Compact Display Thin', sans-serif;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.8);
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .forecast-row {
    gap: 8px;
    padding: 16px 12px;
  }
  
  .forecast-day-component {
    padding: 14px 8px;
    max-width: 80px;
  }
  
  .forecast-temp-component {
    font-size: 1.3rem;
  }
  
  .forecast-date-component {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .weekly-forecast-component {
    max-width: 95%;
  }
  
  .forecast-row {
    gap: 6px;
    padding: 12px 8px;
  }
  
  .forecast-day-component {
    padding: 12px 6px;
    max-width: 70px;
  }
  
  .forecast-temp-component {
    font-size: 1.2rem;
  }
  
  .forecast-date-component {
    font-size: 0.8rem;
  }
}
</style>