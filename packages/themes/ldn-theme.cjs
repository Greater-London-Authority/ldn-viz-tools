/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const ldnColors = require('./styles/tw-extend/color');
const ldnSpacing = require('./styles/tw-extend/spacing');
const plugin = require('tailwindcss/plugin');

const customTypography = require('./tailwind-custom/typography/typography');
const customForms = require('./tailwind-custom/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		extend: {
			colors: { ...ldnColors },
			spacing: {
				...ldnSpacing
			},
			fontFamily: {
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				body: {
					color: 'var(--mode-text)'
				},
				// sets a default focus style
				':where(*)': {
					'--outline-size': 'max(2px, 0.08em)',
					'--outline-style': 'solid',
					'--outline-color': 'var(--mode-interactive-primary-focussed)'
				},
				':where(*:focus)': {
					outline: 'var(--outline-size) var(--outline-style) var(--outline-color)',
					'outline-offset': 'var(--outline-offset, var(--outline-size))'
				},
				':where(*:focus-visible)': {
					outline: 'var(--outline-size) var(--outline-style) var(--outline-color)',
					'outline-offset': 'var(--outline-offset, var(--outline-size))'
				},
				':where(*:focus:not(:focus-visible))': {
					outline: 'none'
				}
			});
		}),
		// LDN default form themeing check ui/src/lib/Typography.mdx for more
		customTypography,
		// provides form-element reset
		require('@tailwindcss/forms')({ strategy: 'class' }),
		// LDN default form themeing check ui/src/lib/FormElementStyling.mdx for more
		customForms
	]
};

module.exports = config;
