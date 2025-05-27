import { config } from '@ldn-viz/eslint-config/index.js';

export default [
	...config,
	{
		ignores: ['.storybook/**', '.svelte-kit/**', 'build/**']
	}
];
