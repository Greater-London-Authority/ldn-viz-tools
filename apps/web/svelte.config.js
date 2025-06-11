import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';



const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: { 		alias: {
			"$content/*": ".velite/*",
		},adapter: adapter() },
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
