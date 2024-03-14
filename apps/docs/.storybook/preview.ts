import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/svelte';
import { themes } from '@storybook/theming';
import ciuTheme, { docs } from './ciuStorybookTheme';

import '../src/app.postcss';

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
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'dark'
			},
			defaultTheme: 'light'
		})
	]
};

export default preview;

// const preview: Preview = {
// 	parameters: {
// 		layout: 'centered',
// 		docs: {
// 			toc: true,
// 			page: () => (
// 				<>
// 					<Title />
// 					<Subtitle />
// 					<Description />
// 					<Primary />
// 					<Controls />
// 					<Stories includePrimary={false} />
// 				</>
// 			)
// 		},
// 		backgrounds: { disable: true },
// 		actions: { argTypesRegex: '^on[A-Z].*' },
// 		options: {
// 			showPanel: false
// 		},
// 		controls: {
// 			expanded: true,
// 			matchers: {
// 				color: /(background|color)$/i,
// 				date: /Date$/i
// 			}
// 		},
// 		darkMode: {
// 			classTarget: 'html',
// 			stylePreview: true,
// 			appContentBg: 'black'
// 		}
// 	}
// };

// export default preview;
