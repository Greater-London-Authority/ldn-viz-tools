import type { Preview } from '@storybook/svelte';
import { docs } from './ciuStorybookTheme';

import { prefersDarkMode } from '@ldn-viz/ui';
import { get } from 'svelte/store';
import '../src/app.postcss';
import { withThemeByClassNameStore } from './withThemeByClassNameStore';

const isBroswer = () => {
	if (typeof window === 'object') {
		return true;
	}
};
const getLocalStorage = () => {
	if (isBroswer()) {
		return globalThis.localStorage?.getItem('theme') || 'light';
	}
	return 'light';
};

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: [
					'Ui',
					[
						'Introduction',
						'Components',
						[
							'Buttons',
							'Input',
							'Select',
							'RadioButtons',
							'Checkboxes',
							'Overlays',
							'*',
							'Datepicker',
							'Icons'
						],
						'*',
						'Examples'
					]
				]
			}
		},
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
				dark: 'dark',
				system: get(prefersDarkMode) ? 'dark' : 'light'
			},
			defaultTheme: getLocalStorage()
		})
	]
};

export default preview;
