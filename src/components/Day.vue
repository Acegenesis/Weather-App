<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    location: String,
    day: String,
    state: String,
    color: String
})
</script>

<template>
  <div class="day">
    <h1>{{ location }}</h1>
    <h2 :style="{color : color}">{{ day }}</h2>
    <h3>{{ state }}</h3>
  </div>
</template>
