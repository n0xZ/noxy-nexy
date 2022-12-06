// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@unocss/nuxt', '@nuxtjs/supabase'],
	ssr: false,

	css: ['@unocss/reset/antfu.css'],
})
