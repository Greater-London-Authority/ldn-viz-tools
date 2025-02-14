/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme'); // eslint-disable-line
const oldLdnColors = require('./colors.json'); // eslint-disable-line
const ldnColors = require('./styles/tw-extend/color'); // eslint-disable-line
const ldnSpacing = require('./styles/tw-extend/spacing'); // eslint-disable-line
const svgToDataUri = require('mini-svg-data-uri'); // eslint-disable-line
const plugin = require('tailwindcss/plugin'); // eslint-disable-line

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { ...oldLdnColors, ...ldnColors },
      spacing: { ...ldnSpacing },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--theme-text-primary)',
            '--tw-prose-headings': 'var(--theme-text-primary)',
            '--tw-prose-lead': 'var(--theme-text-secondary)',
            '--tw-prose-links': 'var(--theme-action-primary)',
            '--tw-prose-bold': 'var(--theme-text-primary)',
            '--tw-prose-counters': 'var(--theme-text-secondary)',
            '--tw-prose-bullets': 'var(--theme-text-secondary)',
            '--tw-prose-hr': 'var(--theme-ui-border-secondary)',
            '--tw-prose-quotes': 'var(--theme-text-secondary)',
            '--tw-prose-quote-borders': 'var(--theme-ui-primary)',
            '--tw-prose-captions': 'var(--theme-text-secondary)',
            '--tw-prose-code': 'var(--theme-text-secondary)',
            '--tw-prose-pre-code': 'var(--global-color-static-white)',
            '--tw-prose-pre-bg': 'var(--global-color-static-black)',
            '--tw-prose-th-borders': 'var(--theme-ui-border-primary)',
            '--tw-prose-td-borders': 'var(--theme-ui-border-secondary)',
            '--tw-prose-invert-body': 'var(--theme-text-inverse-primary)',
            '--tw-prose-invert-headings': 'var(--theme-text-inverse-primary)',
            '--tw-prose-invert-lead': 'var(--theme-text-inverse-secondary)',
            '--tw-prose-invert-links': 'var(--theme-action-primary)',
            '--tw-prose-invert-bold': 'var(--theme-text-inverse-primary)',
            '--tw-prose-invert-counters': 'var(--theme-text-inverse-secondary)',
            '--tw-prose-invert-bullets': 'var(--theme-text-inverse-secondary)',
            '--tw-prose-invert-hr': 'var(--theme-ui-border-secondary)',
            '--tw-prose-invert-quotes': 'var(--theme-text-inverse-secondary)',
            '--tw-prose-invert-quote-borders': 'var(--theme-ui-primary)',
            '--tw-prose-invert-captions': 'var(--theme-text-inverse-secondary)',
            '--tw-prose-invert-code': 'var(--theme-text-inverse-secondary)',
            '--tw-prose-invert-pre-code': 'var(--global-color-static-white)',
            '--tw-prose-invert-pre-bg': 'var(--global-color-static-black)',
            '--tw-prose-invert-th-borders': 'var(--theme-ui-border-primary)',
            '--tw-prose-invert-td-borders': 'var(--theme-ui-border-secondary)'
          }
        }
      })
    }
  },

  plugins: [
    plugin(function ({ addBase, theme }) {
      const screens = theme('screens');
      addBase({
        '.display': {
          fontFamily: 'var(--typography-sm-display-fontfamily)',
          fontWeight: 'var(--typography-sm-display-fontweight)',
          fontSize: 'var(--typography-sm-display-fontsize)',
          lineHeight: 'var(--typography-sm-display-lineheight)',
          letterSpacing: 'var(--typography-sm-display-letterspacing)'
        },

        '.headline': {
          fontFamily: 'var(--typography-sm-headline-fontfamily)',
          fontWeight: 'var(--typography-sm-headline-fontweight)',
          fontSize: 'var(--typography-sm-headline-fontsize)',
          lineHeight: 'var(--typography-sm-headline-lineheight)',
          letterSpacing: 'var(--typography-sm-headline-letterspacing)'
        },

        '.title-lg': {
          fontFamily: 'var(--typography-sm-title-lg-fontfamily)',
          fontWeight: 'var(--typography-sm-title-lg-fontweight)',
          fontSize: 'var(--typography-sm-title-lg-fontsize)',
          lineHeight: 'var(--typography-sm-title-lg-lineheight)',
          letterSpacing: 'var(--typography-sm-title-lg-letterspacing)'
        },

        '.title-md': {
          fontFamily: 'var(--typography-sm-title-md-fontfamily)',
          fontWeight: 'var(--typography-sm-title-md-fontweight)',
          fontSize: 'var(--typography-sm-title-md-fontsize)',
          lineHeight: 'var(--typography-sm-title-md-lineheight)',
          letterSpacing: 'var(--typography-sm-title-md-letterspacing)'
        },

        '.title-sm': {
          fontFamily: 'var(--typography-sm-title-sm-fontfamily)',
          fontWeight: 'var(--typography-sm-title-sm-fontweight)',
          fontSize: 'var(--typography-sm-title-sm-fontsize)',
          lineHeight: 'var(--typography-sm-title-sm-lineheight)',
          letterSpacing: 'var(--typography-sm-title-sm-letterspacing)'
        },

        '.subtitle': {
          fontFamily: 'var(--typography-sm-subtitle-fontfamily)',
          fontWeight: 'var(--typography-sm-subtitle-fontweight)',
          fontSize: 'var(--typography-sm-subtitle-fontsize)',
          lineHeight: 'var(--typography-sm-subtitle-lineheight)',
          letterSpacing: 'var(--typography-sm-subtitle-letterspacing)'
        },

        '.body-lg': {
          fontFamily: 'var(--typography-sm-body-lg-fontfamily)',
          fontWeight: 'var(--typography-sm-body-lg-fontweight)',
          fontSize: 'var(--typography-sm-body-lg-fontsize)',
          lineHeight: 'var(--typography-sm-body-lg-lineheight)',
          letterSpacing: 'var(--typography-sm-body-lg-letterspacing)'
        },

        '.body-md': {
          fontFamily: 'var(--typography-sm-body-md-fontfamily)',
          fontWeight: 'var(--typography-sm-body-md-fontweight)',
          fontSize: 'var(--typography-sm-body-md-fontsize)',
          lineHeight: 'var(--typography-sm-body-md-lineheight)',
          letterSpacing: 'var(--typography-sm-body-md-letterspacing)'
        },

        '.body-sm': {
          fontFamily: 'var(--typography-sm-body-sm-fontfamily)',
          fontWeight: 'var(--typography-sm-body-sm-fontweight)',
          fontSize: 'var(--typography-sm-body-sm-fontsize)',
          lineHeight: 'var(--typography-sm-body-sm-lineheight)',
          letterSpacing: 'var(--typography-sm-body-sm-letterspacing)'
        },
        [`@media (min-width: ${screens.md})`]: {
          '.display': {
            fontFamily: 'var(--typography-md-display-fontfamily)',
            fontWeight: 'var(--typography-md-display-fontweight)',
            fontSize: 'var(--typography-md-display-fontsize)',
            lineHeight: 'var(--typography-md-display-lineheight)',
            letterSpacing: 'var(--typography-md-display-letterspacing)'
          },

          '.headline': {
            fontFamily: 'var(--typography-md-headline-fontfamily)',
            fontWeight: 'var(--typography-md-headline-fontweight)',
            fontSize: 'var(--typography-md-headline-fontsize)',
            lineHeight: 'var(--typography-md-headline-lineheight)',
            letterSpacing: 'var(--typography-md-headline-letterspacing)'
          },

          '.title-lg': {
            fontFamily: 'var(--typography-md-title-lg-fontfamily)',
            fontWeight: 'var(--typography-md-title-lg-fontweight)',
            fontSize: 'var(--typography-md-title-lg-fontsize)',
            lineHeight: 'var(--typography-md-title-lg-lineheight)',
            letterSpacing: 'var(--typography-md-title-lg-letterspacing)'
          },

          '.title-md': {
            fontFamily: 'var(--typography-md-title-md-fontfamily)',
            fontWeight: 'var(--typography-md-title-md-fontweight)',
            fontSize: 'var(--typography-md-title-md-fontsize)',
            lineHeight: 'var(--typography-md-title-md-lineheight)',
            letterSpacing: 'var(--typography-md-title-md-letterspacing)'
          },

          '.title-sm': {
            fontFamily: 'var(--typography-md-title-sm-fontfamily)',
            fontWeight: 'var(--typography-md-title-sm-fontweight)',
            fontSize: 'var(--typography-md-title-sm-fontsize)',
            lineHeight: 'var(--typography-md-title-sm-lineheight)',
            letterSpacing: 'var(--typography-md-title-sm-letterspacing)'
          },

          '.subtitle': {
            fontFamily: 'var(--typography-md-subtitle-fontfamily)',
            fontWeight: 'var(--typography-md-subtitle-fontweight)',
            fontSize: 'var(--typography-md-subtitle-fontsize)',
            lineHeight: 'var(--typography-md-subtitle-lineheight)',
            letterSpacing: 'var(--typography-md-subtitle-letterspacing)'
          },

          '.body-lg': {
            fontFamily: 'var(--typography-md-body-lg-fontfamily)',
            fontWeight: 'var(--typography-md-body-lg-fontweight)',
            fontSize: 'var(--typography-md-body-lg-fontsize)',
            lineHeight: 'var(--typography-md-body-lg-lineheight)',
            letterSpacing: 'var(--typography-md-body-lg-letterspacing)'
          },

          '.body-md': {
            fontFamily: 'var(--typography-md-body-md-fontfamily)',
            fontWeight: 'var(--typography-md-body-md-fontweight)',
            fontSize: 'var(--typography-md-body-md-fontsize)',
            lineHeight: 'var(--typography-md-body-md-lineheight)',
            letterSpacing: 'var(--typography-md-body-md-letterspacing)'
          },

          '.body-sm': {
            fontFamily: 'var(--typography-md-body-sm-fontfamily)',
            fontWeight: 'var(--typography-md-body-sm-fontweight)',
            fontSize: 'var(--typography-md-body-sm-fontsize)',
            lineHeight: 'var(--typography-md-body-sm-lineheight)',
            letterSpacing: 'var(--typography-md-body-sm-letterspacing)'
          }
        }
      });
    }),
    require('@tailwindcss/typography'), // eslint-disable-line
    // provides form-element reset
    require('@tailwindcss/forms')({ strategy: 'class' }), // eslint-disable-line
    // LDN default form themeing check ui/lib/introduction.mdx for more
    plugin(function ({ addComponents }) {
      addComponents({
        '.form-input, .form-textarea, .form-select, .form-multiselect, .form-checkbox, .form-radio':
          {
            color: ldnColors['color-input-valuetext'],
            'border-color': ldnColors['color-input-border'],
            'background-color': ldnColors['color-input-background'],

            '&:disabled': {
              'background-color': ldnColors['color-input-background-disabled']
            }
          },
        '.form-input, .form-textarea, .form-select, .form-multiselect': {
          '&:focus': {
            '--tw-ring-color': ldnColors['color-input-border-focussed'],
            'border-color': ldnColors['color-input-border-focussed']
          }
        },
        '.form-input::placeholder, .form-textarea::placeholder': {
          color: ldnColors['color-input-placeholder']
        },
        '.form-checkbox, .form-radio': {
          'border-width': '2px',
          width: '1.25em',
          height: '1.25em',
          color: ldnColors['color-input-background-active'],
          '&:hover': {
            'border-color': ldnColors['color-input-border-hover']
          },
          '&:focus': {
            '--tw-ring-color': ldnColors['color-input-border-focussed'],
            '--tw-ring-offset-color': ldnColors['color-input-background']
          },
          '&:disabled': {
            'border-color': ldnColors['color-input-border-disabled'],
            'background-color': ldnColors['color-input-background-disabled']
          }
        },
        '.form-radio': {
          display: 'grid',
          'place-content': 'center',
          '&:checked': {
            'background-image': 'none',
            color: ldnColors['color-input-background'],
            'background-color': ldnColors['color-input-background'],
            'border-color': ldnColors['color-input-border-selected']
          },
          '&:checked:hover': {
            'background-color': ldnColors['color-input-background-hover'],
            'border-color': ldnColors['color-input-border-selected']
          },
          '&:checked:focus': {
            'background-color': ldnColors['color-input-background'],
            'border-color': ldnColors['color-input-border']
          }
        },
        '.form-label': {
          color: ldnColors['color-input-label'],
          'font-weight': 500
        },
        '.form-select': {
          'background-image': `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${ldnColors['color-input-icon']}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
          )}")`
        },
        '.form-range': {
          'accent-color': ldnColors['color-input-background-active']
        }
      });
    })
  ]
};

module.exports = config;
