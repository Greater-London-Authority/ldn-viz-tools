const config = {
	presets: [require('@ldn-viz/themes/ldn-theme')],
	content: [
		'./src/content/*.md',
		'./src/**/*.{html,js,svelte,ts,mdx,md}',
		'./node_modules/@ldn-viz/**/*.{html,js,svelte,ts}'
	]
};
module.exports = config;
