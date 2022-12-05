// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@unocss/nuxt', '@nuxtjs/supabase'],
	unocss: {
		webFonts: {
			provider: 'google',
			fonts: {
				inter: 'Inter',
				roboto: 'Roboto',
			},
		},
	},
	css: ['@unocss/reset/antfu.css'],
})
