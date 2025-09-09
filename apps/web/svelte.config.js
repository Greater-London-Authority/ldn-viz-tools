import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import contentIndex from './.velite/docs.json' with { type: 'json' }; //TODO - other content beyond docs
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
	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === 'css_unused_selector') return;
		handler(warning);
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
