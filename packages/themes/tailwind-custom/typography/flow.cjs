// flow.cjs — context-scoped vertical rhythm (prose / product / compact)
//
// One class per context (e.g. `flow-prose`); no separate `.flow` root needed.
// :is() (not :where()) so the context class contributes (0,1,0) specificity and
// beats element resets like `p { margin: 0 }`.
//
// The `:not(.sr-only, [hidden], template)` guard excludes visually-collapsed or
// non-rendered siblings from the owl axis, so a conditionally-rendered or sr-only
// first child (e.g. an sr-only <h3> in a no-title state) does not inject a phantom
// gap or double up with a component's explicit margins. Applied to BOTH ends of the
// owl pair: a collapsed element never receives a margin and is never the thing a
// real element couples to.
//
// Selector keys are written out in full (no computed keys) so the file is safe
// whether the build executes or statically parses it. Later keys win at equal
// specificity — ordering is load-bearing.

module.exports = {
	// Context class = variable scope AND flow root
	'.flow-prose':   { '--flow-tight': '0.25rem', '--flow-default': '1rem',    '--flow-loose': '1.5rem', '--flow-section': '2.5rem' },
	'.flow-product': { '--flow-tight': '0.25rem', '--flow-default': '0.5rem',  '--flow-loose': '1rem',   '--flow-section': '1.5rem' },
	'.flow-compact': { '--flow-tight': '0.25rem', '--flow-default': '0.25rem', '--flow-loose': '0.5rem', '--flow-section': '0.5rem' },

	// 1 · base — every VISIBLE sibling gets the default gap
	':is(.flow-prose, .flow-product, .flow-compact) > :not(.sr-only, [hidden], template) + :not(.sr-only, [hidden], template)': {
		marginTop: 'var(--flow-default)'
	},

	// 2 · block objects set off — loose above and below
	':is(.flow-prose, .flow-product, .flow-compact) > :not(.sr-only, [hidden], template) + :is(figure, img, table, pre, blockquote, .chart)': {
		marginTop: 'var(--flow-loose)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) > :is(figure, img, table, pre, blockquote, .chart) + :not(.sr-only, [hidden], template)': {
		marginTop: 'var(--flow-loose)'
	},

	// 3 · space BEFORE headings — major vs minor (main rhythm lever)
	':is(.flow-prose, .flow-product, .flow-compact) > :not(.sr-only, [hidden], template) + :is(h1, h2, .title-1, .title-2)': {
		marginTop: 'var(--flow-section)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) > :not(.sr-only, [hidden], template) + :is(h3, h4, .title-3, .title-4)': {
		marginTop: 'var(--flow-loose)'
	},

	// 4 · stacked headings group tightly (wins over rule 3 for consecutive headings)
	':is(.flow-prose, .flow-product, .flow-compact) > :is(h1, h2, h3, h4, [class*="title-"]) + :is(h1, h2, h3, h4, [class*="title-"])': {
		marginTop: 'var(--flow-tight)'
	},

	// 4b · companion roles couple tight to their titling primary.
	// A subhead/subtitle is a supporting line bound *beneath* its heading; an
	// eyebrow is an overline bound *above* the heading it introduces. These are
	// coupling (flow-tight), not block-to-block rhythm. Placed after rules 1 & 3
	// so they win at equal specificity for the pairings they target.

	// supporting line directly under a heading hugs it
	':is(.flow-prose, .flow-product, .flow-compact) > :is(h1, h2, h3, h4, [class*="title-"], .display, .headline, .page-head, .section-head) + :is(.subtitle, .subhead)': {
		marginTop: 'var(--flow-tight)'
	},

	// eyebrow overline hugs the heading directly below it (overrides rule 3's section gap)
	':is(.flow-prose, .flow-product, .flow-compact) > .eyebrow + :is(h1, h2, h3, h4, [class*="title-"], .display, .headline, .page-head, .section-head)': {
		marginTop: 'var(--flow-tight)'
	},

	// the major break sits ABOVE an eyebrow that introduces a heading — the eyebrow
	// is the top of the titling cluster, so the section gap belongs before it
	':is(.flow-prose, .flow-product, .flow-compact) > :not(.sr-only, [hidden], template) + .eyebrow:has(+ :is(h1, h2, .title-1, .title-2, .display, .headline, .page-head, .section-head))': {
		marginTop: 'var(--flow-section)'
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

	// 6b · description lists — definition binds to its term; pairs separate
	':is(.flow-prose, .flow-product, .flow-compact) dl > dd': {
		marginTop: 'var(--flow-tight)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) dl > dt': {
		marginTop: 'var(--flow-default)'
	},
	':is(.flow-prose, .flow-product, .flow-compact) dl > dt:first-child': {
		marginTop: '0'
	}

	// Optional — bind heading→body harder if minor headings read unbound:
	// ':is(.flow-prose, .flow-product, .flow-compact) > :is(h1, h2, h3, h4, [class*="title-"]) + :not(.sr-only, [hidden], template)': {
	// 	marginTop: 'var(--flow-tight)'
	// }
};
