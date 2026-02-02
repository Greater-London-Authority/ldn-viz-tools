const plugin = require('tailwindcss/plugin');
const svgToDataUri = require('mini-svg-data-uri');

module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.form-input, .form-textarea, .form-select, .form-multiselect, .form-checkbox, .form-radio': {
			color: 'var(--color-text)',
			'border-color': 'var(--color-border-muted)',
			'background-color': 'var(--color-surface)',

			'&:disabled': {
				'background-color': 'var(--color-interactive-disabled-muted)'
			}
		},
		'.form-input, .form-textarea, .form-select, .form-multiselect': {
			'&:focus': {
				'--tw-ring-color': 'var(--color-interactive-focus)',
				'border-color': 'var(--color-interactive-focus)'
			}
		},
		'.form-input::placeholder, .form-textarea::placeholder': {
			color: 'var(--color-text-wash)'
		},
		'.form-checkbox, .form-radio': {
			'border-width': '2px',
			width: '1.25em',
			height: '1.25em',
			color: 'var(--color-interactive-primary)',
			'&:hover': {
				'border-color': 'var(--color-interactive-primary-hover)'
			},
			'&:focus': {
				'--tw-ring-color': 'var(--color-interactive-focus)',
				'--tw-ring-offset-color': 'var(--color-surface)'
			},
			'&:disabled': {
				'border-color': 'var(--color-interactive-disabled)',
				'background-color': 'var(--color-interactive-disabled-muted)'
			},
			'&:disabled:hover': {
				'border-color': 'var(--color-interactive-disabled)',
				'background-color': 'var(--color-interactive-disabled-muted)'
			}
		},
		'.form-radio': {
			display: 'grid',
			'place-content': 'center',
			'&:checked': {
				'background-image': 'none',
				color: 'var(--color-surface)',
				'background-color': 'var(--color-surface)',
				'border-color': 'var(--color-interactive-selected)'
			},
			'&:checked:hover': {
				'background-color': 'var(--color-interactive-primary-muted-hover)',
				'border-color': 'var(--color-interactive-selected)'
			},
			'&:checked:focus': {
				'background-color': 'var(--color-surface)',
				'border-color': 'var(--color-interactive-focus)'
			}
		},
		'.form-label': {
			color: 'var(--color-label)',
			'font-weight': 500
		},
		'.form-select': {
			'background-image': `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${'var(--color-text-muted)'}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
			)}")`
		},
		'.form-range': {
			'accent-color': 'var(--color-interactive-primary)'
		}
	});
});
