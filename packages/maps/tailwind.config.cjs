/** @type {import('tailwindcss').Config}*/
const _defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	presets: [require('@ldn-viz/themes/ldn-theme')],
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@ldn-viz/**/*.{html,js,svelte,ts}'],

	theme: {}
};

module.exports = config;
