// context-scoped vertical rhythm (prose / product / compact)
// One class per context (e.g. `flow-prose`); no separate `.flow` root.
// :is() (not :where()) so the root class contributes (0,1,0) specificity and
// beats element resets like `p { margin: 0 }`. Later keys win at equal specificity.

module.exports = {
	// 1 · base — every sibling gets the default gap
	':is(.flow-prose, .flow-product, .flow-compact) > * + *': {
		marginTop: 'var(--flow-default)'
	},

	// 2 · block objects set off — loose above and below
	':is(.flow-prose, .flow-product, .flow-compact) > * + :is(figure, img, table, pre, blockquote, .chart)':
		{
			marginTop: 'var(--flow-loose)'
		},
	':is(.flow-prose, .flow-product, .flow-compact) > :is(figure, img, table, pre, blockquote, .chart) + *':
		{
			marginTop: 'var(--flow-loose)'
		},

	// 3 · space BEFORE headings — major vs minor (main rhythm lever)
	':is(.flow-prose, .flow-product, .flow-compact) > * + :is(h1, h2, .title-1, .title-2)': {
		marginTop: 'var(--flow-section)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) > * + :is(h3, h4, .title-3, .title-4)': {
		marginTop: 'var(--flow-loose)'
	},

	// 3b · deck binds up to the title/display it sits under (wins over rule 3)
	':is(.flow-prose, .flow-product, .flow-compact) > :is(.display, .headline) + .subhead': {
		marginTop: 'var(--flow-tight)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) > :is(.title-1, .title-2, .title-3, .title-4, h1, h2, h3, h4) + :is(.subtitle, .subhead)':
		{
			marginTop: 'var(--flow-tight)'
		},

	// 4 · stacked headings group tightly (wins over rule 3 for consecutive headings)
	':is(.flow-prose, .flow-product, .flow-compact) > :is(h1, h2, h3, h4, [class*="title-"]) + :is(h1, h2, h3, h4, [class*="title-"])':
		{
			marginTop: 'var(--flow-tight)'
		},

	// 5 · caption binds to its figure
	':is(.flow-prose, .flow-product, .flow-compact) figure > figcaption': {
		marginTop: 'var(--flow-tight)'
	},

	// 6 · list internal rhythm — li is not a flow-root child, so the owl never reached it
	':is(.flow-prose, .flow-product, .flow-compact) :is(ul, ol) > li + li': {
		marginTop: 'var(--flow-tight)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) li > :is(ul, ol)': {
		marginTop: 'var(--flow-tight)'
	},

	// 6b · description lists — term binds to its definition; pairs separate
	':is(.flow-prose, .flow-product, .flow-compact) dl > dd': {
		marginTop: 'var(--flow-tight)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) dl > dt': {
		fontWeight: 500,
		marginTop: 'var(--flow-default)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) dl > dt:first-child': {
		marginTop: '0'
	},

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
			paddingInlineStart: 'var(--typography-spacing-lg)'
		},
		':where(li):not(:where(.not-prose, .not-prose *))': {
			paddingLeft: 'var(--typography-spacing-xs)'
		},
		':where(ul li::marker, ol li::marker):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)'
		},
		// Blockquotes
		':where(blockquote):not(:where(.not-prose, .not-prose *))': {
			color: 'var(--color-text-muted)',
			borderInlineStartWidth: 'var(--spacing-xxs)',
			borderInlineStartColor: 'var(--color-static-brand)',
			paddingInlineStart: 'var(--typography-spacing-md)'
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
			fontSize: 'var(--caption-font-size)',
			backgroundColor: 'rgba(229, 229, 229, 0.35)'
		}
		// ':where(code:before):not(:where(.not-prose, .not-prose *))': { content: '```' },
		// ':where(code:after):not(:where(.not-prose, .not-prose *))': { content: '```' }
	}
};
