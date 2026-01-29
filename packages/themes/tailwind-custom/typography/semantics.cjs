module.exports = {
	'.prose': {
		'max-width': 'var(--prose-max-width)',
		':where(:first-child)': {
			marginTop: 0
		},
		':where(:last-child)': {
			marginBottom: 0
		},
		':where(h1):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--headline-font-weight)',
			letterSpacing: 'var(--headline-letter-spacing)',
			fontSize: 'var(--headline-font-size)',
			lineHeight: 'var(--headline-line-height)',
			marginTop: '0',
			marginBottom: 'calc(var(--spacing-sm) /16 * 1em)'
		},
		':where(h2):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-lg-font-weight)',
			letterSpacing: 'var(--title-lg-letter-spacing)',
			fontSize: 'var(--title-lg-font-size)',
			lineHeight: 'var(--title-lg-line-height)',
			marginTop: 'calc(var(--spacing-3xl) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-md) /16 * 1em)'
		},
		':where(h3):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-md-font-weight)',
			letterSpacing: 'var(--title-md-letter-spacing)',
			fontSize: 'var(--title-md-font-size)',
			lineHeight: 'var(--title-md-line-height)',
			marginTop: 'calc(var(--spacing-xl) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-xs) /16 * 1em)'
		},
		':where(h4):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-sm-font-weight)',
			letterSpacing: 'var(--title-sm-letter-spacing)',
			fontSize: 'var(--title-sm-font-size)',
			lineHeight: 'var(--title-sm-line-height)',
			marginTop: 'var(--spacing-xs-em)',
			marginBottom: '0'
		},
		':where(h5):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-xs-font-weight)',
			letterSpacing: 'var(--title-xs-letter-spacing)',
			fontSize: 'var(--title-xs-font-size)',
			lineHeight: 'var(--title-xs-line-height)',
			marginTop: 'var(--spacing-xs-em)',
			marginBottom: '0'
		},
		':where(p.lead):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--body-lg-font-weight)',
			letterSpacing: 'var(--body-lg-letter-spacing)',
			fontSize: 'var(--body-lg-font-size)',
			lineHeight: 'var(--body-lg-line-height)',
			marginTop: 'calc(var(--spacing-md) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-md) /16 * 1em)'
		},
		':where(p):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--body-md-font-weight)',
			letterSpacing: 'var(--body-md-letter-spacing)',
			fontSize: 'var(--body-md-font-size)',
			lineHeight: 'var(--body-md-line-height)',
			marginTop: 'var(--spacing-md-em)',
			marginBottom: 'var(--spacing-md-em)'
		},
		':where(h4 + p):not(:where(.not-prose *))': {
			marginTop: 0
		},
		':where(h5 + p):not(:where(.not-prose *))': {
			marginTop: 0
		},
		':where(.caption, figcaption):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--caption-font-weight)',
			letterSpacing: 'var(--caption-letter-spacing)',
			fontSize: 'var(--caption-font-size)',
			lineHeight: 'var(--caption-line-height)',
			marginTop: '0',
			marginBottom: 'calc(var(--spacing-sm) /16 * 1em)'
		},
		':where(a):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--mode-interactive-primary)',
			textDecoration: 'underline',
			textUnderlineOffset: '2px',
			textDecorationColor: 'var(--mode-interactive-primary)',
			textDecorationThickness: '1px'
		},
		':where(a:hover):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--mode-interactive-primary-hover)',
			textDecoration: 'none',
			textUnderlineOffset: '2px',
			textDecorationColor: 'var(--mode-interactive-primary)',
			textDecorationThickness: '1px'
		},
		':where(hr):not(:where(.not-prose, .not-prose *))': {
			borderColor: 'var(--mode-border-muted)',
			borderTopWidth: '1px',
			marginTop: 'calc(var(--spacing-5xl) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-5xl) /16 * 1em)'
		},
		// Images & media
		':where(img, picture, video):not(:where(.not-prose, .not-prose *))': {
			display: 'block',
			marginTop: 'calc(var(--spacing-3xl) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-3xl) /16 * 1em)'
		},
		':where(figure):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'calc(var(--spacing-3xl) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-3xl) /16 * 1em)'
		},
		':where(figure > *):not(:where(.not-prose, .not-prose *))': {
			marginTop: 0,
			marginBottom: 0
		},
		':where(figcaption):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--mode-text-muted)',
			marginTop: 'calc(var(--spacing-sm) /16 * 1em)'
		},
		// Lists
		':where(ul, ol):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'calc(var(--spacing-lg) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-lg) /16 * 1em)',
			paddingInlineStart: 'calc(var(--spacing-lg) /16 * 1em)'
		},
		':where(li):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'calc(var(--spacing-sm) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-sm) /16 * 1em)',
			paddingLeft: 'calc(var(--spacing-xs) /16 * 1em)'
		},
		':where(ul li::marker, ol li::marker):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--mode-text-muted)'
		},
		':where(ul ul, ul ol, ol ul, ol ol):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'calc(var(--spacing-sm) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-sm) /16 * 1em)'
		},
		// Blockquotes
		':where(blockquote):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--mode-text-muted)',
			borderInlineStartWidth: 'var(--spacing-xxs)',
			borderInlineStartColor: 'var(--global-color-static-brand)',
			marginTop: 'calc(var(--spacing-lg) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-lg) /16 * 1em)',
			paddingInlineStart: 'calc(var(--spacing-md) /16 * 1em)'
		},
		':where(blockquote p):not(:where(.not-prose, .not-prose *))': {
			fontSize: 'var(--body-lg-font-size)',
			lineHeight: 'var(--body-lg-line-height)'
		},
		':where(blockquote:has(+ cite)):not(:where(.not-prose, .not-prose *))': {
			marginBottom: 'calc(var(--spacing-xs) /16 * 1em)'
		},
		'blockquote :where(p:last-of-type):not(:where(.not-prose, .not-prose *))': {
			marginBottom: 0
		},
		'blockquote :where(p:first-of-type):before': { content: 'open-quote' },
		'blockquote :where(p:last-of-type):after': { content: 'close-quote' },
		// Tables
		':where(table):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'calc(var(--spacing-3xl) /16 * 1em)',
			marginBottom: 'calc(var(--spacing-3xl) /16 * 1em)',
			fontSize: 'var(--body-sm-font-size)',
			lineHeight: 'var(--body-md-line-height)',
			width: '100%',
			tableLayout: 'auto'
		},
		':where(thead):not(:where(.not-prose, .not-prose *))': {
			borderBottomWidth: '1px',
			borderBottomColor: 'var(--mode-border)'
		},
		':where(thead th):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--mode-text)',
			fontWeight: 600,
			verticalAlign: 'bottom',
			padding: 'calc(var(--spacing-xs) /16 * 1em)'
		},
		':where(tbody tr):not(:where(.not-prose, .not-prose *))': {
			borderBottomWidth: '1px',
			borderBottomColor: 'var(--mode-border-muted)'
		},
		':where(tbody tr:last-child):not(:where(.not-prose, .not-prose *))': { borderBottomWidth: 0 },
		':where(tbody td, tfoot td):not(:where(.not-prose, .not-prose *))': {
			verticalAlign: 'baseline',
			padding: 'calc(var(--spacing-xs) /16 * 1em)'
		},
		':where(tfoot):not(:where(.not-prose, .not-prose *))': {
			borderTopWidth: '1px',
			borderTopColor: 'var(--mode-border)'
		},
		// Code
		':where(code):not(:where(.not-prose, .not-prose *, [data-rehype-pretty-code-figure] *))': {
			fontFamily: 'monospace',
			padding: 'var(--spacing-xxs-em) calc(var(--spacing-xs) /16 * 1em)',
			fontSize: 'var(--body-xs-font-size)',
			backgroundColor: 'rgba(229, 229, 229, 0.35)',
			marginBottom: 'calc(var(--spacing-md) /16 * 1em)'
		}
		// ':where(code:before):not(:where(.not-prose, .not-prose *))': { content: '```' },
		// ':where(code:after):not(:where(.not-prose, .not-prose *))': { content: '```' }
	}
};
