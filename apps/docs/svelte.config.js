import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() },
	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === 'css_unused_selector') return;
		handler(warning);
	}
};

export default config;
