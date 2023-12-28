<script setup>
import Metrics from './Metrics.vue'
import { defineProps } from 'vue'
const props = defineProps({
  wind: String,
  humidity: String,
  visibility: String,
  color : String
});
</script>

<template>
    <div class="moreInfo">
        <Metrics :wind="wind" :humidity="humidity" :visibility="visibility" :color="color"/>
    </div>
</template>