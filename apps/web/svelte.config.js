import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import contentIndex from './.velite/docs.json' with { type: 'json' };
import mdsvexConfig from './mdsvex.config.js';
const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: {
		alias: {
			'$content/*': '.velite/*'
		},
		adapter: adapter(),
		prerender: { entries: ['*', ...contentIndex.map((d) => d.slugFull)] }
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
