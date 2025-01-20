// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Rouge Script', // the 'canonical' name of the font used to look it up in a provider database
        provider: 'local', // you can override the provider on a per-family basis
        // provider specific options can be provided
        src: '~assets/fonts/Rouge_Script/RougeScript-Regular.ttf', // you can specify a source within your project
        // specific configuration will be used to generate `@font-face` definitions
        subsets: ['latin', 'greek'],
        display: 'swap', // or 'block'
        // and produce CSS overrides to reduce layout shift (using fontaine)
        fallbacks: ['Arial'],
      }
    ]
  }
})