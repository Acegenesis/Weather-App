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
/* Les styles globaux sont importés via nuxt.config.ts */
</style>
