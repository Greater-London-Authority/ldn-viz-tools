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
			marginBottom: 'var(--typography-spacing-sm)'
		},
		':where(h2):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-lg-font-weight)',
			letterSpacing: 'var(--title-lg-letter-spacing)',
			fontSize: 'var(--title-lg-font-size)',
			lineHeight: 'var(--title-lg-line-height)',
			marginTop: 'var(--typography-spacing-3xl)',
			marginBottom: 'var(--typography-spacing-md)'
		},
		':where(h3):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-md-font-weight)',
			letterSpacing: 'var(--title-md-letter-spacing)',
			fontSize: 'var(--title-md-font-size)',
			lineHeight: 'var(--title-md-line-height)',
			marginTop: 'var(--typography-spacing-xl)',
			marginBottom: 'var(--typography-spacing-xs)'
		},
		':where(h4):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-sm-font-weight)',
			letterSpacing: 'var(--title-sm-letter-spacing)',
			fontSize: 'var(--title-sm-font-size)',
			lineHeight: 'var(--title-sm-line-height)',
			marginTop: 'var(--typography-spacing-xs)',
			marginBottom: '0'
		},
		':where(h5):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-xs-font-weight)',
			letterSpacing: 'var(--title-xs-letter-spacing)',
			fontSize: 'var(--title-xs-font-size)',
			lineHeight: 'var(--title-xs-line-height)',
			marginTop: 'var(--typography-spacing-xs)',
			marginBottom: '0'
		},
		':where(p.lead):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--body-lg-font-weight)',
			letterSpacing: 'var(--body-lg-letter-spacing)',
			fontSize: 'var(--body-lg-font-size)',
			lineHeight: 'var(--body-lg-line-height)',
			marginTop: 'var(--typography-spacing-md)',
			marginBottom: 'var(--typography-spacing-md)'
		},
		':where(p):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--body-md-font-weight)',
			letterSpacing: 'var(--body-md-letter-spacing)',
			fontSize: 'var(--body-md-font-size)',
			lineHeight: 'var(--body-md-line-height)',
			marginTop: 'var(--typography-spacing-md)',
			marginBottom: 'var(--typography-spacing-md)'
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
			marginBottom: 'var(--typography-spacing-sm)'
		},
		':where(a):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-interactive-primary)',
			textDecoration: 'underline',
			textUnderlineOffset: '2px',
			textDecorationColor: 'var(--color-interactive-primary)',
			textDecorationThickness: '1px'
		},
		':where(a:hover):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-interactive-primary-hover)',
			textDecoration: 'none',
			textUnderlineOffset: '2px',
			textDecorationColor: 'var(--color-interactive-primary)',
			textDecorationThickness: '1px'
		},
		':where(hr):not(:where(.not-prose, .not-prose *))': {
			borderColor: 'var(--color-border-muted)',
			borderTopWidth: '1px',
			marginTop: 'var(--typography-spacing-5xl)',
			marginBottom: 'var(--typography-spacing-5xl)'
		},
		// Images & media
		':where(img, picture, video):not(:where(.not-prose, .not-prose *))': {
			display: 'block',
			marginTop: 'var(--typography-spacing-3xl)',
			marginBottom: 'var(--typography-spacing-3xl)'
		},
		':where(figure):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'var(--typography-spacing-3xl)',
			marginBottom: 'var(--typography-spacing-3xl)'
		},
		':where(figure > *):not(:where(.not-prose, .not-prose *))': {
			marginTop: 0,
			marginBottom: 0
		},
		':where(figcaption):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)',
			marginTop: 'var(--typography-spacing-sm)'
		},
		// Lists
		':where(ul, ol):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'var(--typography-spacing-lg)',
			marginBottom: 'var(--typography-spacing-lg)',
			paddingInlineStart: 'var(--typography-spacing-lg)'
		},
		':where(li):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'var(--typography-spacing-sm)',
			marginBottom: 'var(--typography-spacing-sm)',
			paddingLeft: 'var(--typography-spacing-xs)'
		},
		':where(ul li::marker, ol li::marker):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)'
		},
		':where(ul ul, ul ol, ol ul, ol ol):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'var(--typography-spacing-sm)',
			marginBottom: 'var(--typography-spacing-sm)'
		},
		// Blockquotes
		':where(blockquote):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)',
			borderInlineStartWidth: 'var(--spacing-xxs)',
			borderInlineStartColor: 'var(--color-static-brand)',
			marginTop: 'var(--typography-spacing-lg)',
			marginBottom: 'var(--typography-spacing-lg)',
			paddingInlineStart: 'var(--typography-spacing-md)'
		},
		':where(blockquote p):not(:where(.not-prose, .not-prose *))': {
			fontSize: 'var(--body-lg-font-size)',
			lineHeight: 'var(--body-lg-line-height)'
		},
		':where(blockquote:has(+ cite)):not(:where(.not-prose, .not-prose *))': {
			marginBottom: 'var(--typography-spacing-xs)'
		},
		'blockquote :where(p:last-of-type):not(:where(.not-prose, .not-prose *))': {
			marginBottom: 0
		},
		'blockquote :where(p:first-of-type):before': { content: 'open-quote' },
		'blockquote :where(p:last-of-type):after': { content: 'close-quote' },
		// Tables
		':where(table):not(:where(.not-prose, .not-prose *))': {
			marginTop: 'var(--typography-spacing-3xl)',
			marginBottom: 'var(--typography-spacing-3xl)',
			fontSize: 'var(--body-sm-font-size)',
			lineHeight: 'var(--body-md-line-height)',
			width: '100%',
			tableLayout: 'auto'
		},
		':where(thead):not(:where(.not-prose, .not-prose *))': {
			borderBottomWidth: '1px',
			borderBottomColor: 'var(--color-border)'
		},
		':where(thead th):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text)',
			fontWeight: 600,
			verticalAlign: 'bottom',
			padding: 'var(--typography-spacing-xs)'
		},
		':where(tbody tr):not(:where(.not-prose, .not-prose *))': {
			borderBottomWidth: '1px',
			borderBottomColor: 'var(--color-border-muted)'
		},
		':where(tbody tr:last-child):not(:where(.not-prose, .not-prose *))': { borderBottomWidth: 0 },
		':where(tbody td, tfoot td):not(:where(.not-prose, .not-prose *))': {
			verticalAlign: 'baseline',
			padding: 'var(--typography-spacing-xs)'
		},
		':where(tfoot):not(:where(.not-prose, .not-prose *))': {
			borderTopWidth: '1px',
			borderTopColor: 'var(--color-border)'
		},
		// Code
		':where(code):not(:where(.not-prose, .not-prose *, [data-rehype-pretty-code-figure] *))': {
			fontFamily: 'monospace',
			padding: 'var(--typography-spacing-xxs) var(--typography-spacing-xs)',
			fontSize: 'var(--body-xs-font-size)',
			backgroundColor: 'rgba(229, 229, 229, 0.35)',
			marginBottom: 'var(--typography-spacing-md)'
		}
		// ':where(code:before):not(:where(.not-prose, .not-prose *))': { content: '```' },
		// ':where(code:after):not(:where(.not-prose, .not-prose *))': { content: '```' }
	}
};
