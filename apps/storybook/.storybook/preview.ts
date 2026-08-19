import type { Preview } from '@storybook/sveltekit';
import '../src/app.postcss';
import ThemeContext from '../src/lib/decorators/ThemeContext.svelte';
import { docs } from './ciuStorybookTheme';
import { withThemeByClassName } from './withThemeByClassName';

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: [
					'Foundations',
					'Ui',
					[
						'Introduction',
						'Icons',
						'Theme',
						'User Preference',
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
					],
					'Charts',
					['Introduction', 'Components', ['ChartContainer']]
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
