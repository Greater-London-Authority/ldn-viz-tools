// import { withThemeByClassName } from '@storybook/addon-themes';
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
						'Typography',
						'Form Element Styling',
						'Auth',
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
						'Components - Layout And Themes',
						'*',
						'Examples'
					]
				]
			}
			// storySort: {
			// 	order: [
			// 		'Ui',
			// 		[
			// 			'Introduction',
			// 			'Buttons',
			// 			'Input',
			// 			'Select',
			// 			'RadioButtons',
			// 			'Checkboxes',
			// 			'Overlays',
			// 			'*',
			// 			'Datepicker',
			// 			'Icons'
			// 		],
			// 		'Ui - App Layout',
			// 		[
			// 			'Themes',
			// 			'AppShell',
			// 			'Sidebar',
			// 			'Header',
			// 			'*',
			// 			'Meta, Analytics And Cookies',
			// 			'Media Query Stores'
			// 		],
			// 		'Ui - App Layout Examples',
			// 		'Charts',
			// 		['Introduction', 'ChartContainer', '*'],
			// 		'Charts - Examples'
			// 	]
			// }
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
