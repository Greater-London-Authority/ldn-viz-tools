import type { Preview } from '@storybook/svelte';
import '../src/app.postcss';

const preview: Preview = {
	parameters: {
		backgrounds: { disable: true },
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		darkMode: {
			classTarget: 'html',
			stylePreview: true,
			appContentBg: 'black'
		}
	}
};

export default preview;
