import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sveltekitConfig } from '@ldn-viz/vitest-config';

export default defineConfig({
	plugins: [sveltekit()],
	...sveltekitConfig
	// test: {
	// 	projects: [
	// 		{
	// 			test: {
	// 				name: 'client',
	// 				environment: 'browser',
	// 				browser: {
	// 					enabled: true,
	// 					provider: 'playwright',
	// 					instances: [{ browser: 'chromium' }]
	// 				},
	// 				include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
	// 				exclude: [
	// 					'src/lib/server/**',
	// 					'**/*.mdx',
	// 					'../../packages/**/*.mdx',
	// 					'../../apps/**/*.mdx'
	// 				],
	// 				setupFiles: ['./vitest-setup-client.ts']
	// 			}
	// 		},
	// 		{
	// 			test: {
	// 				name: 'server',
	// 				environment: 'node',
	// 				include: ['src/**/*.{test,spec}.{js,ts}'],
	// 				exclude: [
	// 					'src/**/*.svelte.{test,spec}.{js,ts}',
	// 					'**/*.mdx',
	// 					'../../packages/**/*.mdx',
	// 					'../../apps/**/*.mdx'
	// 				]
	// 			}
	// 		}
	// 	]
	// }
});
