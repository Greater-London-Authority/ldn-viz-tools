import { config } from '@ldn-viz/config-eslint/index.js';

export default [
	...config,
	{
		ignores: ['.storybook/**', '.svelte-kit/**', 'build/**']
	}
];
