import { config } from '@ldn-viz/eslint-config/index.js';

export default [
	...config,
	{
		ignores: ['.svelte-kit/**', 'dist/**']
	}
];
