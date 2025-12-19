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
			// fontSize: {
			// 	// Display
			// 	'sm-display': 'var(--typography-sm-prose-display-fontsize)',
			// 	'md-display': 'var(--typography-md-prose-display-fontsize)',
			// 	'lg-display': 'var(--typography-lg-prose-display-fontsize)',
			// 	'xl-display': 'var(--typography-xl-prose-display-fontsize)',
			// 	// Headline
			// 	'sm-headline': 'var(--typography-sm-prose-headline-fontsize)',
			// 	'md-headline': 'var(--typography-md-prose-headline-fontsize)',
			// 	'lg-headline': 'var(--typography-lg-prose-headline-fontsize)',
			// 	'xl-headline': 'var(--typography-xl-prose-headline-fontsize)',
			// 	// Subhead
			// 	'sm-subhead': 'var(--typography-sm-prose-subhead-fontsize)',
			// 	'md-subhead': 'var(--typography-md-prose-subhead-fontsize)',
			// 	'lg-subhead': 'var(--typography-lg-prose-subhead-fontsize)',
			// 	'xl-subhead': 'var(--typography-xl-prose-subhead-fontsize)',
			// 	// Title Large
			// 	'sm-title-lg': 'var(--typography-sm-prose-title-lg-fontsize)',
			// 	'md-title-lg': 'var(--typography-md-prose-title-lg-fontsize)',
			// 	'lg-title-lg': 'var(--typography-lg-prose-title-lg-fontsize)',
			// 	'xl-title-lg': 'var(--typography-xl-prose-title-lg-fontsize)',
			// 	// Title Medium
			// 	'sm-title-md': 'var(--typography-sm-prose-title-md-fontsize)',
			// 	'md-title-md': 'var(--typography-md-prose-title-md-fontsize)',
			// 	'lg-title-md': 'var(--typography-lg-prose-title-md-fontsize)',
			// 	'xl-title-md': 'var(--typography-xl-prose-title-md-fontsize)',
			// 	// Title Small
			// 	'sm-title-sm': 'var(--typography-sm-prose-title-sm-fontsize)',
			// 	'md-title-sm': 'var(--typography-md-prose-title-sm-fontsize)',
			// 	'lg-title-sm': 'var(--typography-lg-prose-title-sm-fontsize)',
			// 	'xl-title-sm': 'var(--typography-xl-prose-title-sm-fontsize)',
			// 	// Subtitle
			// 	'sm-subtitle': 'var(--typography-sm-prose-subtitle-fontsize)',
			// 	'md-subtitle': 'var(--typography-md-prose-subtitle-fontsize)',
			// 	'lg-subtitle': 'var(--typography-lg-prose-subtitle-fontsize)',
			// 	'xl-subtitle': 'var(--typography-xl-prose-subtitle-fontsize)',
			// 	// Body Large
			// 	'sm-body-lg': 'var(--typography-sm-prose-body-lg-fontsize)',
			// 	'md-body-lg': 'var(--typography-md-prose-body-lg-fontsize)',
			// 	'lg-body-lg': 'var(--typography-lg-prose-body-lg-fontsize)',
			// 	'xl-body-lg': 'var(--typography-xl-prose-body-lg-fontsize)',
			// 	// Body Medium
			// 	'sm-body-md': 'var(--typography-sm-prose-body-md-fontsize)',
			// 	'md-body-md': 'var(--typography-md-prose-body-md-fontsize)',
			// 	'lg-body-md': 'var(--typography-lg-prose-body-md-fontsize)',
			// 	'xl-body-md': 'var(--typography-xl-prose-body-md-fontsize)',
			// 	// Body Small
			// 	'sm-body-sm': 'var(--typography-sm-prose-body-sm-fontsize)',
			// 	'md-body-sm': 'var(--typography-md-prose-body-sm-fontsize)',
			// 	'lg-body-sm': 'var(--typography-lg-prose-body-sm-fontsize)',
			// 	'xl-body-sm': 'var(--typography-xl-prose-body-sm-fontsize)',
			// 	// Caption
			// 	'sm-caption': 'var(--typography-sm-prose-caption-fontsize)',
			// 	'md-caption': 'var(--typography-md-prose-caption-fontsize)',
			// 	'lg-caption': 'var(--typography-lg-prose-caption-fontsize)',
			// 	'xl-caption': 'var(--typography-xl-prose-caption-fontsize)'
			// }
		}
	},
	// safelist: ['title-md'],
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				body: {
					color: 'var(--theme-text-primary)'
				},
				// sets a default focus style
				':where(*)': {
					'--outline-size': 'max(2px, 0.08em)',
					'--outline-style': 'solid',
					'--outline-color': 'var(--theme-action-primary-focussed)'
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
