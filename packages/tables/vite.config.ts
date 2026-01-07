/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sveltekitConfig, baseConfig } from '@ldn-viz/config-vitest';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		...baseConfig.test,
		...sveltekitConfig.test
	}
});
