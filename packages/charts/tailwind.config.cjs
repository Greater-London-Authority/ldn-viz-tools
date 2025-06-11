/** @type {import('tailwindcss').Config}*/
const _defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	presets: [require('@ldn-viz/themes/ldn-theme')],
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@ldn-viz/**/*.{html,js,svelte,ts}'],

	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		}
	}
};

module.exports = config;
