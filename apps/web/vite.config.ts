/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { resolve } from 'node:path';
import { baseConfig, sveltekitConfig } from '@ldn-viz/config-vitest';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [resolve(__dirname, './.velite')]
		}
	},
	test: {
		...baseConfig.test,
		...sveltekitConfig.test
	}
});
