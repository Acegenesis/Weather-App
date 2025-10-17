export default defineNuxtConfig({
  compatibilityDate: '2025-09-27',
  devtools: { enabled: false },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  modules: ['@nuxtjs/i18n', 'nuxt-swiper'],
  i18n: {
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    }
  },
  runtimeConfig: {
    apiSecret: '',
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
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})