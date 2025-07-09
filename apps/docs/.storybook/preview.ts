import { withThemeByClassName } from './withThemeByClassName';
import type { Preview } from '@storybook/svelte';
import '../src/app.postcss';
import { docs } from './ciuStorybookTheme';
import ThemeContext from '../src/lib/decorators/ThemeContext.svelte';

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
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo'
		},
		backgrounds: {
			options: {}
		},
		docs: {
			theme: docs
		}
	},
	decorators: [
		() => ThemeContext as any,
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark',
				system: 'system'
			},
			defaultTheme: 'light'
		})
	]
};

export default preview;
