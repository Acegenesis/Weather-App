<script setup>
import useGlassmorphism from '@/composables/useGlassmorphism'

const { t } = useI18n()
const { getGlassStyle } = useGlassmorphism()

const props = defineProps({
  location: String,
  day: String,
  state: String,
  color: String
})

const glassStyles = computed(() => getGlassStyle(props.color, 'button'))
</script>

<template>
  <div class="weather-header-component">
    <div class="city-name-component">{{ location }}</div>
    <div class="date-badge-component" :style="glassStyles">{{ day }}</div>
    <div class="weather-condition-component">{{ state }}</div>
  </div>
</template>

<style scoped>
.weather-header-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.city-name-component {
  font-family: 'Ledger Regular', serif;
  font-size: 4rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-badge-component {
  font-family: 'SF Compact Display Medium', sans-serif;
  font-size: 1.1rem;
  border-radius: 25px;
  padding: 10px 26px;
  margin-bottom: 12px;
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
}

.date-badge-component:hover {
  transform: translateY(-2px);
}

.weather-condition-component {
  font-family: 'SF Compact Display Medium', sans-serif;
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  opacity: 0.9;
  text-shadow: none;
}

@media (max-width: 1200px) {
  .city-name-component {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .city-name-component {
    font-size: 3rem;
  }
  
  .date-badge-component {
    font-size: 1rem;
    padding: 6px 20px;
  }
  
  .weather-condition-component {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .city-name-component {
    font-size: 2.5rem;
  }
  
  .date-badge-component {
    font-size: 0.9rem;
    padding: 5px 16px;
  }
  
  .weather-condition-component {
    font-size: 1.1rem;
  }
}
</style>
