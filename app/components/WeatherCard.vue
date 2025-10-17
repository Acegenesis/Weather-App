<script setup>
const props = defineProps({
  ville: Object,
});
</script>

<template>
  <div
    class="weather-card-fullscreen"
    :style="{ backgroundColor: ville.color }"
  >
    <div class="weather-card-content-fullscreen">
      <div class="weather-grid">
        <div class="left-column">
          <div class="header-section">
            <Day
              :location="ville.ville"
              :day="ville.jour"
              :state="ville.temps"
              :color="ville.color"
            />
          </div>

          <div class="temperature-section">
            <Temperature :temperature="ville.temperature" />
          </div>
        </div>
        <div class="right-column">
          <div class="summary-section">
            <DailySummary
              :summary="ville.summary"
              :wind="ville.vent"
              :humidity="ville.humidite"
              :visibility="ville.visibilite"
              :color="ville.color"
            />
          </div>

          <div class="forecast-section">
            <WeeklyForecast
              :temperature="ville.temperature"
              :color="ville.color"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card-fullscreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 80px;
  position: relative;
  overflow: hidden;
}

.weather-card-content-fullscreen {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  width: 100%;
  height: 100%;
  align-items: center;
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 40px;
  text-align: center;
}

.header-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.temperature-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.right-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 40px;
  padding: 20px 0;
}

.summary-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.forecast-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media (max-width: 1200px) {
  .weather-card-fullscreen {
    padding: 30px 60px;
  }

  .weather-grid {
    gap: 40px;
  }

  .left-column {
    gap: 30px;
  }

  .right-column {
    gap: 35px;
  }
}

@media (max-width: 900px) {
  .weather-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .weather-card-fullscreen {
    padding: 25px 40px;
  }

  .left-column,
  .right-column {
    gap: 30px;
  }
}

@media (max-width: 600px) {
  .weather-card-fullscreen {
    padding: 20px 30px;
  }

  .left-column,
  .right-column {
    gap: 15px;
  }
}
</style>
