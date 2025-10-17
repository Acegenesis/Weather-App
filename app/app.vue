<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Configuration globale de l'application
useHead({
  title: 'Weather App',
  meta: [
    { name: 'description', content: 'Application météo moderne avec Nuxt 3' }
  ]
})
</script>

<style>
@import '@/assets/css/main';
</style>