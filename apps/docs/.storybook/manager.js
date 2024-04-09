// import { addons } from '@storybook/manager-api';
// import { create } from '@storybook/theming';
import { addons } from '@storybook/manager-api';

import ciuTheme from './ciuStorybookTheme';

addons.setConfig({
	theme: ciuTheme
});
