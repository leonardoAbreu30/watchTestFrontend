// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  routeRules: {
    '/': { prerender: true },
    '/todos': { swr: true },
    '/login': { prerender: true },
    '/register': { prerender: true },
  },

  app: {
    head: {
      title: 'Todo App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000',
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-05-15',
  css: ['~/assets/css/tailwind.css'],
})
