<script setup>
const props = defineProps({
  location: String,
  day: String,
  state: String,
  color: String
})
</script>

<template>
  <div class="weather-header-component">
    <div class="city-name-component">{{ location }}</div>
    <div class="date-badge-component">{{ day }}</div>
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
  color: #000;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.date-badge-component {
  font-family: 'SF Compact Display Medium', sans-serif;
  font-size: 1.1rem;
  background: #000;
  color: #fff;
  border-radius: 25px;
  padding: 8px 24px;
  margin-bottom: 12px;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.weather-condition-component {
  font-family: 'SF Compact Display Medium', sans-serif;
  font-size: 1.3rem;
  color: #000;
  margin-bottom: 8px;
  opacity: 0.9;
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
