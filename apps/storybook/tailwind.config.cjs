const config = {
	presets: [require('@ldn-viz/themes/ldn-theme')],
	content: [
		'./src/**/*.{html,js,svelte,ts,mdx}',
		'../../packages/ui/src/**/*.{html,js,svelte,ts,mdx}',
		'../../packages/charts/src/**/*.{html,js,svelte,ts,mdx}',
		'../../packages/maps/src/**/*.{html,js,svelte,ts,mdx}'
	],

	theme: {
		extend: {}
	},

	plugins: []
};

module.exports = config;
