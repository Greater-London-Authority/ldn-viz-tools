const plugin = require('tailwindcss/plugin'); // eslint-disable-line
const svgToDataUri = require('mini-svg-data-uri'); // eslint-disable-line

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.form-input, .form-textarea, .form-select, .form-multiselect, .form-checkbox, .form-radio': {
      color: 'var(--theme-input-valuetext)',
      'border-color': 'var(--theme-input-border)',
      'background-color': 'var(--theme-input-background)',

      '&:disabled': {
        'background-color': 'var(--theme-input-background-disabled)'
      }
    },
    '.form-input, .form-textarea, .form-select, .form-multiselect': {
      '&:focus': {
        '--tw-ring-color': 'var(--theme-input-border-focussed)',
        'border-color': 'var(--theme-input-border-focussed)'
      }
    },
    '.form-input::placeholder, .form-textarea::placeholder': {
      color: 'var(--theme-input-placeholder)'
    },
    '.form-checkbox, .form-radio': {
      'border-width': '2px',
      width: '1.25em',
      height: '1.25em',
      color: 'var(--theme-input-background-active)',
      '&:hover': {
        'border-color': 'var(--theme-input-border-hover)'
      },
      '&:focus': {
        '--tw-ring-color': 'var(--theme-input-border-focussed)',
        '--tw-ring-offset-color': 'var(--theme-input-background)'
      },
      '&:disabled': {
        'border-color': 'var(--theme-input-border-disabled)',
        'background-color': 'var(--theme-input-background-disabled)'
      }
    },
    '.form-radio': {
      display: 'grid',
      'place-content': 'center',
      '&:checked': {
        'background-image': 'none',
        color: 'var(--theme-input-background)',
        'background-color': 'var(--theme-input-background)',
        'border-color': 'var(--theme-input-border-selected)'
      },
      '&:checked:hover': {
        'background-color': 'var(--theme-input-background-hover)',
        'border-color': 'var(--theme-input-border-selected)'
      },
      '&:checked:focus': {
        'background-color': 'var(--theme-input-background)',
        'border-color': 'var(--theme-input-border)'
      }
    },
    '.form-label': {
      color: 'var(--theme-input-label)',
      'font-weight': 500
    },
    '.form-select': {
      'background-image': `url("${svgToDataUri(
        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${'var(--theme-input-icon)'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
      )}")`
    },
    '.form-range': {
      'accent-color': 'var(--theme-input-background-active)'
    }
  });
});
