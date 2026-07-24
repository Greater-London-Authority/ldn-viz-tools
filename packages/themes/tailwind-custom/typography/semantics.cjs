module.exports = {
	'.prose': {
		'max-width': 'var(--prose-max-width)',
		// Heading ladder: h1-h4 -> Title 1-4. Headline is hero chrome only,
		// never reachable from a content heading. h5 has no special case -
		// it falls to Body (Title 4 is the ladder floor, at h4).
		':where(h1):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-1-font-weight)',
			letterSpacing: 'var(--title-1-letter-spacing)',
			fontSize: 'var(--title-1-font-size)',
			lineHeight: 'var(--title-1-line-height)'
		},
		':where(h2):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-2-font-weight)',
			letterSpacing: 'var(--title-2-letter-spacing)',
			fontSize: 'var(--title-2-font-size)',
			lineHeight: 'var(--title-2-line-height)'
		},
		':where(h3):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-3-font-weight)',
			letterSpacing: 'var(--title-3-letter-spacing)',
			fontSize: 'var(--title-3-font-size)',
			lineHeight: 'var(--title-3-line-height)'
		},
		':where(h4):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--title-4-font-weight)',
			letterSpacing: 'var(--title-4-letter-spacing)',
			fontSize: 'var(--title-4-font-size)',
			lineHeight: 'var(--title-4-line-height)'
		},
		':where(p.lead):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--lead-font-weight)',
			letterSpacing: 'var(--lead-letter-spacing)',
			fontSize: 'var(--lead-font-size)',
			lineHeight: 'var(--lead-line-height)'
		},
		':where(p):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--body-font-weight)',
			letterSpacing: 'var(--body-letter-spacing)',
			fontSize: 'var(--body-font-size)',
			lineHeight: 'var(--body-line-height)'
		},
		':where(.caption, figcaption):not(:where(.not-prose, .not-prose *))': {
			fontWeight: 'var(--caption-font-weight)',
			letterSpacing: 'var(--caption-letter-spacing)',
			fontSize: 'var(--caption-font-size)',
			lineHeight: 'var(--caption-line-height)'
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
			borderTopWidth: '1px'
		},
		// Images & media
		':where(img, picture, video):not(:where(.not-prose, .not-prose *))': {
			display: 'block'
		},
		':where(figcaption):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)'
		},
		// Lists
		':where(ul):not(:where(.not-prose, .not-prose *))': {
			listStyleType: 'disc'
		},
		':where(ol):not(:where(.not-prose, .not-prose *))': {
			listStyleType: 'decimal'
		},
		':where(ul, ol):not(:where(.not-prose, .not-prose *))': {
			paddingInlineStart: 'var(--spacing-5)'
		},
		':where(li):not(:where(.not-prose, .not-prose *))': {
			paddingLeft: 'var(--spacing-2)'
		},
		':where(ul li::marker, ol li::marker):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)'
		},
		// Blockquotes
		':where(blockquote):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)',
			borderInlineStartWidth: 'var(--spacing-1)',
			borderInlineStartColor: 'var(--color-static-brand)',
			paddingInlineStart: 'var(--spacing-4)'
		},
		':where(blockquote p):not(:where(.not-prose, .not-prose *))': {
			fontSize: 'var(--lead-font-size)',
			lineHeight: 'var(--lead-line-height)'
		},
		'blockquote :where(p:last-of-type):not(:where(.not-prose, .not-prose *))': {
			marginBottom: 0
		},
		'blockquote :where(p:first-of-type):before': { content: 'open-quote' },
		'blockquote :where(p:last-of-type):after': { content: 'close-quote' },
		// Tables
		':where(table):not(:where(.not-prose, .not-prose *))': {
			fontSize: 'var(--body-sm-font-size)',
			lineHeight: 'var(--body-line-height)',
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
			padding: 'var(--spacing-2)'
		},
		':where(tbody tr):not(:where(.not-prose, .not-prose *))': {
			borderBottomWidth: '1px',
			borderBottomColor: 'var(--color-border-muted)'
		},
		':where(tbody tr:last-child):not(:where(.not-prose, .not-prose *))': { borderBottomWidth: 0 },
		':where(tbody td, tfoot td):not(:where(.not-prose, .not-prose *))': {
			verticalAlign: 'baseline',
			padding: 'var(--spacing-2)'
		},
		':where(tfoot):not(:where(.not-prose, .not-prose *))': {
			borderTopWidth: '1px',
			borderTopColor: 'var(--color-border)'
		},
		// Code
		':where(code):not(:where(.not-prose, .not-prose *, [data-rehype-pretty-code-figure] *))': {
			fontFamily: 'monospace',
			padding: 'var(--spacing-1) var(--spacing-2)',
			fontSize: 'var(--caption-font-size)',
			backgroundColor: 'rgba(229, 229, 229, 0.35)'
		}
		// ':where(code:before):not(:where(.not-prose, .not-prose *))': { content: '```' },
		// ':where(code:after):not(:where(.not-prose, .not-prose *))': { content: '```' }
	}
};
