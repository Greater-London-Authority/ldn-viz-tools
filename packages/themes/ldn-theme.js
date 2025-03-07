/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme'); // eslint-disable-line
const oldLdnColors = require('./colors.json'); // eslint-disable-line
const ldnColors = require('./styles/tw-extend/color'); // eslint-disable-line
const svgToDataUri = require('mini-svg-data-uri'); // eslint-disable-line
const plugin = require('tailwindcss/plugin'); // eslint-disable-line

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { ...oldLdnColors, ...ldnColors },
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
