/// <reference types="vitest/config" />
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

import { baseConfig, sveltekitConfig } from '@ldn-viz/config-vitest';
import { resolve } from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;

// Watches content in dev, so front matter edits reach .velite. `npm run build` runs Velite first
const velite = (): Plugin => {
	let started = false;
	return {
		name: 'velite',
		apply: 'serve',
		async buildStart() {
			if (started) return;
			started = true;
			const { build } = await import('velite');
			await build({ watch: true });
		}
	};
};

export default defineConfig({
	plugins: [velite(), enhancedImages(), sveltekit()],
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
