const config = {
	presets: [require('@ldn-viz/themes/tailwind')],
	content: [
		'./src/**/*.{html,js,svelte,ts,mdx,md}',
		'../../packages/ui/src/**/*.{html,js,svelte,ts,mdx,md}',
		'../../packages/charts/src/**/*.{html,js,svelte,ts,mdx,md}',
		'../../packages/maps/src/**/*.{html,js,svelte,ts,mdx,md}'
	],

	theme: {
		extend: {}
	},

	plugins: []
};

module.exports = config;
