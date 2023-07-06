<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    temperature: String
})
</script>

<template>
  <div class="temperature">
    <p>{{ temperature }}</p>
    <p>°</p>
  </div>
</template>