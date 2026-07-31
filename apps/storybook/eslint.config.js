// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { config } from '@ldn-viz/config-eslint/index.js';

export default [
	...config,
	{
		ignores: ['.storybook/**', '.svelte-kit/**', 'build/**', 'storybook-static/**']
	},
	...storybook.configs['flat/recommended']
];
