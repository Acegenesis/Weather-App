<script setup>
const { t } = useI18n()

const props = defineProps({
  temperature: String
})

// Générer des prévisions basées sur la température actuelle
const generateForecast = () => {
  const baseTemp = parseInt(props.temperature)
  return Array.from({ length: 4 }, (_, index) => ({
    temp: Math.round(baseTemp + Math.random() * 6 - 3),
    date: `${20 + index + 1} Jan`
  }))
}

const forecast = computed(() => generateForecast())
</script>

<template>
  <div class="weekly-forecast-component">
    <div class="forecast-title">{{ $t('weather.weekly_forecast') }}</div>
    <div class="forecast-row">
      <div 
        v-for="(day, index) in forecast" 
        :key="index"
        class="forecast-day-component"
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
  background: rgba(0,0,0,0.05);
  border-radius: 20px;
  padding: 12px 10px;
}

.forecast-day-component {
  background: rgba(0,0,0,0.08);
  border-radius: 14px;
  padding: 12px 8px;
  flex: 1;
  max-width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.1);
}

.forecast-day-component:hover {
  background: rgba(0,0,0,0.12);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.forecast-temp-component {
  font-family: 'Ledger Regular', serif;
  font-size: 1.3rem;
  color: #000;
  font-weight: 700;
  margin-bottom: 4px;
}

.forecast-dot {
  font-size: 1rem;
  color: #000;
  opacity: 0.6;
  margin-bottom: 4px;
}

.forecast-date-component {
  font-family: 'SF Compact Display Thin', sans-serif;
  font-size: 0.85rem;
  color: #000;
  opacity: 0.8;
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