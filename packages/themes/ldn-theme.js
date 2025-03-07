/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme'); // eslint-disable-line
const oldLdnColors = require('./colors.json'); // eslint-disable-line
const ldnColors = require('./styles/tw-extend/color'); // eslint-disable-line
const ldnSpacing = require('./styles/tw-extend/spacing'); // eslint-disable-line

const customTypography = require('./tailwind-custom/typography'); // eslint-disable-line
const customForms = require('./tailwind-custom/forms'); // eslint-disable-line

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { ...oldLdnColors, ...ldnColors },
      spacing: {
        ...ldnSpacing
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        // Display
        'sm-display': 'var(--typography-sm-display-fontsize)',
        'md-display': 'var(--typography-md-display-fontsize)',
        'lg-display': 'var(--typography-lg-display-fontsize)',
        'xl-display': 'var(--typography-xl-display-fontsize)',
        // Headline
        'sm-headline': 'var(--typography-sm-headline-fontsize)',
        'md-headline': 'var(--typography-md-headline-fontsize)',
        'lg-headline': 'var(--typography-lg-headline-fontsize)',
        'xl-headline': 'var(--typography-xl-headline-fontsize)',
        // Subhead
        'sm-subhead': 'var(--typography-sm-subhead-fontsize)',
        'md-subhead': 'var(--typography-md-subhead-fontsize)',
        'lg-subhead': 'var(--typography-lg-subhead-fontsize)',
        'xl-subhead': 'var(--typography-xl-subhead-fontsize)',
        // Title Large
        'sm-title-lg': 'var(--typography-sm-title-lg-fontsize)',
        'md-title-lg': 'var(--typography-md-title-lg-fontsize)',
        'lg-title-lg': 'var(--typography-lg-title-lg-fontsize)',
        'xl-title-lg': 'var(--typography-xl-title-lg-fontsize)',
        // Title Medium
        'sm-title-md': 'var(--typography-sm-title-md-fontsize)',
        'md-title-md': 'var(--typography-md-title-md-fontsize)',
        'lg-title-md': 'var(--typography-lg-title-md-fontsize)',
        'xl-title-md': 'var(--typography-xl-title-md-fontsize)',
        // Title Small
        'sm-title-sm': 'var(--typography-sm-title-sm-fontsize)',
        'md-title-sm': 'var(--typography-md-title-sm-fontsize)',
        'lg-title-sm': 'var(--typography-lg-title-sm-fontsize)',
        'xl-title-sm': 'var(--typography-xl-title-sm-fontsize)',
        // Subtitle
        'sm-subtitle': 'var(--typography-sm-subtitle-fontsize)',
        'md-subtitle': 'var(--typography-md-subtitle-fontsize)',
        'lg-subtitle': 'var(--typography-lg-subtitle-fontsize)',
        'xl-subtitle': 'var(--typography-xl-subtitle-fontsize)',
        // Body Large
        'sm-body-lg': 'var(--typography-sm-body-lg-fontsize)',
        'md-body-lg': 'var(--typography-md-body-lg-fontsize)',
        'lg-body-lg': 'var(--typography-lg-body-lg-fontsize)',
        'xl-body-lg': 'var(--typography-xl-body-lg-fontsize)',
        // Body Medium
        'sm-body-md': 'var(--typography-sm-body-md-fontsize)',
        'md-body-md': 'var(--typography-md-body-md-fontsize)',
        'lg-body-md': 'var(--typography-lg-body-md-fontsize)',
        'xl-body-md': 'var(--typography-xl-body-md-fontsize)',
        // Body Small
        'sm-body-sm': 'var(--typography-sm-body-sm-fontsize)',
        'md-body-sm': 'var(--typography-md-body-sm-fontsize)',
        'lg-body-sm': 'var(--typography-lg-body-sm-fontsize)',
        'xl-body-sm': 'var(--typography-xl-body-sm-fontsize)',
        // Caption
        'sm-caption': 'var(--typography-sm-caption-fontsize)',
        'md-caption': 'var(--typography-md-caption-fontsize)',
        'lg-caption': 'var(--typography-lg-caption-fontsize)',
        'xl-caption': 'var(--typography-xl-caption-fontsize)'
      }
    }
  },

  plugins: [
    plugin(function ({ addBase }) {
      addBase({
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
    require('@tailwindcss/typography'), // eslint-disable-line
    // LDN default form themeing check ui/src/lib/Typography.mdx for more
    customTypography,
    // provides form-element reset
    require('@tailwindcss/forms')({ strategy: 'class' }), // eslint-disable-line
    // LDN default form themeing check ui/src/lib/FormElementStyling.mdx for more
    customForms
  ]
};

module.exports = config;
