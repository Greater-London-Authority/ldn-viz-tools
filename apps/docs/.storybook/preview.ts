// import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/svelte';
import { docs } from './ciuStorybookTheme';

import '../src/app.postcss';
import { withThemeByClassNameStore } from './withThemeByClassNameStore';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		docs: {
			theme: docs
		}
	},
	decorators: [
		withThemeByClassNameStore({
			themes: {
				light: '',
				dark: 'dark'
			},
			defaultTheme: 'light'
		})
	]
};

export default preview;
