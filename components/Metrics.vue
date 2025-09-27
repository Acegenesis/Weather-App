<script setup>
const props = defineProps({
  wind: String,
  humidity: String,
  visibility: String,
  color: String
})
</script>

<template>
  <div class="metrics-row-component">
    <div class="metric-block">
      <div class="metric-icon">
        <svg width="36" height="36" viewBox="4.5 2 15 18" fill="none">
          <path
            d="M21 18C21 18 19.8096 17.5305 19 17.3021C13.8797 15.8574 10.1203 20.1426 5 18.6979C4.19041 18.4695 3 18 3 18M21 12C21 12 19.8096 11.5305 19 11.3021C13.8797 9.85739 10.1203 14.1426 5 12.6979C4.19041 12.4695 3 12 3 12M21 6C21 6 19.8096 5.53048 19 5.30206C13.8797 3.85739 10.1203 8.14261 5 6.69794C4.19041 6.46952 3 6 3 6"
            :style="{stroke:color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          </path>
        </svg>
      </div>
      <div class="metric-value-component" :style="{ color: color }">{{ wind }}</div>
      <div class="metric-label-component" :style="{ color: color }">Wind</div>
    </div>
    
    <div class="metric-block">
      <div class="metric-icon">
        <svg width="36" height="36" viewBox="0 0 384 512" :style="{fill:color}">
          <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
        </svg>
      </div>
      <div class="metric-value-component" :style="{ color: color }">{{ humidity }}</div>
      <div class="metric-label-component" :style="{ color: color }">Humidity</div>
    </div>
    
    <div class="metric-block">
      <div class="metric-icon">
        <svg width="36" height="36" viewBox="0 0 576 512" :style="{fill:color}">
          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
        </svg>
      </div>
      <div class="metric-value-component" :style="{ color: color }">{{ visibility }}</div>
      <div class="metric-label-component" :style="{ color: color }">Visibility</div>
    </div>
  </div>
</template>

<style scoped>
.metrics-row-component {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000;
  border-radius: 24px;
  padding: 25px 20px;
  margin: 15px auto;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.metric-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.metric-icon {
  margin-bottom: 4px;
  opacity: 0.9;
}

.metric-value-component {
  font-family: 'SF Compact Display Medium', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.metric-label-component {
  font-family: 'SF Compact Display Thin', sans-serif;
  font-size: 0.95rem;
  color: #FFE142;
  opacity: 0.85;
}

@media (max-width: 768px) {
  .metrics-row-component {
    max-width: 90%;
    padding: 25px 15px;
  }
  
  .metric-value-component {
    font-size: 1.4rem;
  }
  
  .metric-label-component {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .metrics-row-component {
    padding: 20px 10px;
  }
  
  .metric-value-component {
    font-size: 1.2rem;
  }
  
  .metric-label-component {
    font-size: 0.8rem;
  }
  
  .metric-icon svg {
    width: 28px;
    height: 28px;
  }
}
</style>
