/// <reference types="vitest/config" />
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { baseConfig, sveltekitConfig } from '@ldn-viz/config-vitest';
import { resolve } from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
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
