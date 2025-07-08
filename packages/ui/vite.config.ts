import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sveltekitConfig } from '@ldn-viz/vitest-config';

export default defineConfig({
	plugins: [sveltekit()],
	...sveltekitConfig
});
