const plugin = require('tailwindcss/plugin');
const svgToDataUri = require('mini-svg-data-uri');

module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.form-input, .form-textarea, .form-select, .form-multiselect, .form-checkbox, .form-radio': {
			color: 'var(--mode-text)',
			'border-color': 'var(--mode-border-muted)',
			'background-color': 'var(--mode-surface)',

			'&:disabled': {
				'background-color': 'var(--mode-interactive-disabled-muted)'
			}
		},
		'.form-input, .form-textarea, .form-select, .form-multiselect': {
			'&:focus': {
				'--tw-ring-color': 'var(--mode-interactive-focus)',
				'border-color': 'var(--mode-interactive-focus)'
			}
		},
		'.form-input::placeholder, .form-textarea::placeholder': {
			color: 'var(--mode-text-wash)'
		},
		'.form-checkbox, .form-radio': {
			'border-width': '2px',
			width: '1.25em',
			height: '1.25em',
			color: 'var(--mode-interactive-primary)',
			'&:hover': {
				'border-color': 'var(--mode-interactive-primary-hover)'
			},
			'&:focus': {
				'--tw-ring-color': 'var(--mode-interactive-focus)',
				'--tw-ring-offset-color': 'var(--mode-surface)'
			},
			'&:disabled': {
				'border-color': 'var(--mode-interactive-disabled)',
				'background-color': 'var(--mode-interactive-disabled-muted)'
			},
			'&:disabled:hover': {
				'border-color': 'var(--mode-interactive-disabled)',
				'background-color': 'var(--mode-interactive-disabled-muted)'
			}
		},
		'.form-radio': {
			display: 'grid',
			'place-content': 'center',
			'&:checked': {
				'background-image': 'none',
				color: 'var(--mode-surface)',
				'background-color': 'var(--mode-surface)',
				'border-color': 'var(--mode-interactive-selected)'
			},
			'&:checked:hover': {
				'background-color': 'var(--mode-interactive-primary-muted-hover)',
				'border-color': 'var(--mode-interactive-selected)'
			},
			'&:checked:focus': {
				'background-color': 'var(--mode-surface)',
				'border-color': 'var(--mode-interactive-focus)'
			}
		},
		'.form-label': {
			color: 'var(--mode-label)',
			'font-weight': 500
		},
		'.form-select': {
			'background-image': `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${'var(--mode-text-muted)'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
			)}")`
		},
		'.form-range': {
			'accent-color': 'var(--mode-interactive-primary)'
		}
	});
});
