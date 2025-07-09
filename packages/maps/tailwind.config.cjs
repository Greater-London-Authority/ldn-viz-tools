const config = {
	presets: [require('@ldn-viz/themes/ldn-theme')],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@ldn-viz/**/*.{html,js,svelte,ts}',
		'!./node_modules/@ldn-viz/*-config/**/*.{html,js,svelte,ts}'
	],

	theme: {}
};

module.exports = config;
