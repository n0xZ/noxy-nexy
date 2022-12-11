import {
	defineConfig,
	presetUno,
	presetIcons,
	presetWebFonts,
	presetTypography,
} from 'unocss'

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
		presetTypography(),
	],
})
