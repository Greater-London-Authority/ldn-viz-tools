/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const ldnColors = require('./styles/tw-extend/color');
const ldnSpacing = require('./styles/tw-extend/spacing');
const ldnFlow = require('./styles/tw-extend/flow');
const ldnGridSpacing = require('./styles/tw-extend/gridspacing');
const plugin = require('tailwindcss/plugin');

const customFlow = require('./tailwind-custom/flow');
const customTypography = require('./tailwind-custom/typography/typography');
const customForms = require('./tailwind-custom/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		container: {
			padding: {
				DEFAULT: ldnGridSpacing['grid-spacing-base-contained-container-padding'],
				sm: ldnGridSpacing['grid-spacing-sm-contained-container-padding'],
				md: ldnGridSpacing['grid-spacing-md-contained-container-padding'],
				lg: ldnGridSpacing['grid-spacing-lg-contained-container-padding'],
				xl: ldnGridSpacing['grid-spacing-xl-contained-container-padding'],
				'2xl': ldnGridSpacing['grid-spacing-2xl-contained-container-padding']
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
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		// `.container` uses the "contained" grid-spacing padding (see theme.container above).
		// `.container-fluid` is the same component, driven by the "fluid" grid-spacing padding instead.
		// `.grid-gutter` / `.grid-gutter-fluid` expose the matching gutter tokens as a responsive `gap`.
		plugin(function ({ addComponents, theme }) {
			const screens = theme('screens');

			// Builds the `@media (min-width: ...)` overrides for a grid-spacing token across breakpoints.
			const buildResponsiveStyles = (cssProperty, gridSpacingKey) => {
				return Object.keys(screens).reduce((styles, breakpoint) => {
					const token = ldnGridSpacing[`grid-spacing-${breakpoint}-${gridSpacingKey}`];
					if (!token) return styles;

					styles[`@media (min-width: ${screens[breakpoint]})`] = {
						[cssProperty]: token
					};
					return styles;
				}, {});
			};

			addComponents({
				'.container-fluid': {
					width: '100%',
					marginInline: 'auto',
					paddingInline: ldnGridSpacing['grid-spacing-base-fluid-container-padding'],
					...buildResponsiveStyles('paddingInline', 'fluid-container-padding')
				},
				'.grid-gutter': {
					gap: ldnGridSpacing['grid-spacing-base-contained-gutter'],
					...buildResponsiveStyles('gap', 'contained-gutter')
				},
				'.grid-gutter-fluid': {
					gap: ldnGridSpacing['grid-spacing-base-fluid-gutter'],
					...buildResponsiveStyles('gap', 'fluid-gutter')
				}
			});
		}),
		plugin(function ({ addBase }) {
			addBase({
				body: {
					color: 'var(--color-text)'
				},
				// sets a default focus style
				':where(*)': {
					'--outline-size': 'max(2px, 0.08em)',
					'--outline-style': 'solid',
					'--outline-color': 'var(--color-interactive-focus)'
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
		// Registered immediately before customTypography: flow rules and typography
		// role rules can target the same element, so this preserves the cascade
		// order that held when flow shipped inside the typography plugin.
		customFlow,
		customTypography,
		// provides form-element reset
		require('@tailwindcss/forms')({ strategy: 'class' }),
		// LDN default form themeing check ui/src/lib/FormElementStyling.mdx for more
		customForms
	]
};

module.exports = config;
