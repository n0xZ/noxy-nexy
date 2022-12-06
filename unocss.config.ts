import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'

export default defineConfig({
	presets: [
		presetIcons(),
		presetUno(),
		presetWebFonts({
			provider: 'google',
			fonts: {
				inter: 'Inter',
				roboto: 'Roboto',
			},
		}),
	],
})
