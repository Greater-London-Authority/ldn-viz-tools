// import { addons } from '@storybook/manager-api';
// import { create } from '@storybook/theming';

// import logo from '@ldn-viz/docs/logo-lockup.svg';
// import pkg from '@ldn-viz/docs/package.json';

// addons.setConfig({
// 	theme: create({
// 		brandTitle: '@ldn-viz/docs',
// 		brandImage: logo,
// 		brandUrl: pkg.homepage
// 	}),
// 	showRoots: true
// });

import { addons } from '@storybook/manager-api';
// import { themes } from '@storybook/theming';

// addons.setConfig({
// 	theme: themes.dark
// });

import ciuTheme from './ciuTheme';

addons.setConfig({
	theme: ciuTheme
});
