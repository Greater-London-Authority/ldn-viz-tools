//cSpell:disable
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import contentIndex from './.velite/docs.json' with { type: 'json' }; //TODO - other content beyond docs
import { mdsxConfig } from './mdsx.config.ts';
const config = {
	preprocess: [vitePreprocess(), mdsx(mdsxConfig)],
	kit: {
		alias: {
			'$content/*': '.velite/*'
		},
		adapter: adapter(),
		prerender: { entries: ['*', ...contentIndex.map((d) => d.slugFull)] }
	},
	onwarn: (warning, handler) => {
		if (warning.code === 'css_unused_selector') return;
		if (warning.code === 'a11y_no_noninteractive_tabindex') return;
		if (warning.code === 'vite-plugin-svelte-preprocess-many-dependencies') return;
		if (warning.code === 'script_context_deprecated') return;
		if (warning.code === 'hydration_mismatch') return;
		handler(warning);
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
