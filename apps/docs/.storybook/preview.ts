import type { Preview } from '@storybook/svelte';
import '../src/app.postcss';

const preview: Preview = {
	parameters: {
		layout: 'centered',
		docs: { toc: true },
		backgrounds: { disable: true },
		actions: { argTypesRegex: '^on[A-Z].*' },
		options: {
			showPanel: false
		},
		controls: {
			expanded: true,
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
