import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
 modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
 tailwindcss: {
  cssPath: '~/assets/css/tailwind.css',
  configPath: 'tailwind.config.js',
  exposeConfig: false,
  config: {},
  injectPosition: 0,
  viewer: true,
},
colorMode: {
 classSuffix: ''
},
  runtimeConfig: {
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY
    },
    public: {
      appDomain: process.env.APP_DOMAIN,
    }
  }
})
