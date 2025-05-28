import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/svelte';
import '../src/app.postcss';
import { docs } from './ciuStorybookTheme';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		backgrounds: {
			options: {}
		},
		docs: {
			theme: docs
		}
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark',
				system: 'dark'
			},
			defaultTheme: 'light'
		})
	]
};

export default preview;
