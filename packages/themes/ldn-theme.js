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
      }
    }
  },

  plugins: [
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
          width: '1.25rem',
          height: '1.25rem',
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
          'font-weight': 600
        },
        '.form-select': {
          'background-image': `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${ldnColors['color-input-icon']}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
          )}")`
        }
      });
    })
  ]
};

module.exports = config;
