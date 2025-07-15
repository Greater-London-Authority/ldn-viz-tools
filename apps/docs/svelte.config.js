import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess({ script: true}),
	kit: { adapter: adapter() }
};

export default config;
