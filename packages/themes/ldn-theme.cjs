/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const ldnColors = require('./styles/tw-extend/color');
const ldnSpacing = require('./styles/tw-extend/spacing');
const ldnFlow = require('./styles/tw-extend/flow');
const ldnGridSpacing = require('./styles/tw-extend/gridspacing');

const customForms = require('./tailwind-custom/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		container: {
			padding: {
				DEFAULT: ldnGridSpacing['grid-base-contained-container-padding'],
				sm: ldnGridSpacing['grid-sm-contained-container-padding'],
				md: ldnGridSpacing['grid-md-contained-container-padding'],
				lg: ldnGridSpacing['grid-lg-contained-container-padding'],
				xl: ldnGridSpacing['grid-xl-contained-container-padding'],
				'2xl': ldnGridSpacing['grid-2xl-contained-container-padding']
			}
		},
		extend: {
			colors: { ...ldnColors },
			spacing: {
				...ldnSpacing
			},
			margin: { ...ldnFlow },
			gap: { ...ldnFlow },
			fontFamily: {
				sans: [
					'"Inter"',
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji'
				]
			}
		}
	},
	// Typography, flow, layout and base classes live in system.css (RFC 0003,
	// workstream 3), so a Tailwind app also imports index.css or system.css.
	plugins: [
		// provides form-element reset
		require('@tailwindcss/forms')({ strategy: 'class' }),
		// LDN default form themeing check ui/src/lib/FormElementStyling.mdx for more
		customForms
	]
};

module.exports = config;
