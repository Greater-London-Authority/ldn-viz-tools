const plugin = require('tailwindcss/plugin');
const svgToDataUri = require('mini-svg-data-uri');

module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.form-input, .form-textarea, .form-select, .form-multiselect, .form-checkbox, .form-radio': {
			color: 'var(--mode-input-valuetext)',
			'border-color': 'var(--mode-input-border)',
			'background-color': 'var(--mode-input-background)',

			'&:disabled': {
				'background-color': 'var(--mode-input-background-disabled)'
			}
		},
		'.form-input, .form-textarea, .form-select, .form-multiselect': {
			'&:focus': {
				'--tw-ring-color': 'var(--mode-interactive-focus)',
				'border-color': 'var(--mode-interactive-focus)'
			}
		},
		'.form-input::placeholder, .form-textarea::placeholder': {
			color: 'var(--mode-input-placeholder)'
		},
		'.form-checkbox, .form-radio': {
			'border-width': '2px',
			width: '1.25em',
			height: '1.25em',
			color: 'var(--mode-input-background-active)',
			'&:hover': {
				'border-color': 'var(--mode-interactive-hover)'
			},
			'&:focus': {
				'--tw-ring-color': 'var(--mode-interactive-focus)',
				'--tw-ring-offset-color': 'var(--mode-input-background)'
			},
			'&:disabled': {
				'border-color': 'var(--mode-input-border-disabled)',
				'background-color': 'var(--mode-input-background-disabled)'
			},
			'&:disabled:hover': {
				'border-color': 'var(--mode-input-border-disabled)',
				'background-color': 'var(--mode-input-background-disabled)'
			}
		},
		'.form-radio': {
			display: 'grid',
			'place-content': 'center',
			'&:checked': {
				'background-image': 'none',
				color: 'var(--mode-input-background)',
				'background-color': 'var(--mode-input-background)',
				'border-color': 'var(--mode-input-border-selected)'
			},
			'&:checked:hover': {
				'background-color': 'var(--mode-input-background-hover)',
				'border-color': 'var(--mode-input-border-selected)'
			},
			'&:checked:focus': {
				'background-color': 'var(--mode-input-background)',
				'border-color': 'var(--mode-input-border)'
			}
		},
		'.form-label': {
			color: 'var(--mode-input-label)',
			'font-weight': 500
		},
		'.form-select': {
			'background-image': `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${'var(--mode-input-icon)'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
			)}")`
		},
		'.form-range': {
			'accent-color': 'var(--mode-input-background-active)'
		}
	});
});
