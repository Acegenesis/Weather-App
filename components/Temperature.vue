<script setup>
const props = defineProps({
  temperature: String
})
</script>

<template>
  <div class="weather-main-component">
    <div class="main-temperature-component">
      {{ temperature }}<span class="degree-component">°</span>
    </div>
  </div>
</template>

<style scoped>
.weather-main-component {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.main-temperature-component {
  font-family: 'Ledger Regular', serif;
  font-size: 9rem;
  font-weight: 700;
  color: #000;
  line-height: 0.8;
  text-shadow: 4px 4px 8px rgba(0,0,0,0.15);
  text-align: center;
}

.degree-component {
  font-size: 4rem;
  vertical-align: super;
  font-family: 'SF Compact Display Medium', sans-serif;
}

@media (max-width: 1200px) {
  .main-temperature-component {
    font-size: 7rem;
  }
  
  .degree-component {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .main-temperature-component {
    font-size: 5.5rem;
  }
  
  .degree-component {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .main-temperature-component {
    font-size: 4.5rem;
  }
  
  .degree-component {
    font-size: 2rem;
  }
}
</style>
