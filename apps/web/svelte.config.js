import adapter from '@sveltejs/adapter-static';
import { mdsx } from "mdsx";
import mdsxConfig from "./mdsx.config.js";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [mdsx(mdsxConfig), vitePreprocess()],
	kit: {
		alias: {
			"$content/*": ".velite/*",
		},
		adapter: adapter(),
	},
	extensions: [".svelte", ".md"],
};

export default config;