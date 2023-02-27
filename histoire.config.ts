import { HstSvelte } from '@histoire/plugin-svelte';
import { defineConfig } from 'histoire';

export default defineConfig({
	plugins: [HstSvelte()],
	setupFile: '/src/histoire.setup.ts',
	theme: {
		colors: {
			primary: {
				50: '#EEF5FB',
				100: '#E2EEF8',
				200: '#C5DCF2',
				300: '#A8CBEB',
				400: '#8BB9E5',
				500: '#6DA7DE',
				600: '#3787D2',
				700: '#2566A2',
				800: '#18446C',
				900: '#0C2236'
			}
		},
		logo: {
			// square: './static/square.png',
			light: './static/ciu-logo-light.svg',
			dark: './static/ciu-logo-light.svg'
		}
	}
});
