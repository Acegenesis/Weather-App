export default defineNuxtConfig({
  compatibilityDate: '2025-09-27',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  css: ['~/assets/css/main.css'],
  modules: [
    // '@nuxtjs/google-fonts' // Désactivé temporairement - utilisation des fonts locales
  ],
  runtimeConfig: {
    // Clés privées (disponibles uniquement côté serveur)
    apiSecret: '',
    // Clés publiques (exposées côté client)
    public: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY || ''
    }
  },
  app: {
    head: {
      title: 'Weather App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Application météo moderne avec Vue.js et Nuxt 3' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})