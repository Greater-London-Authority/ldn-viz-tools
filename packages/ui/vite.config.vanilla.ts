import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	build: {
		outDir: './vanilla',
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, 'src/lib/index.ts'),
			name: 'ldn-viz-tools',
			// the proper extensions will be added
			fileName: 'ldn-viz-tools'
		}
	},
	plugins: [svelte()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
