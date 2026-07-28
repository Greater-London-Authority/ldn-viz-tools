# Flow & vertical rhythm

Distilled from the spec's *Content Flow* section. Implementation:
`packages/themes/tailwind-custom/typography/flow.cjs` (Tailwind plugin) →
emitted context vars in `packages/themes/styles/flow.css`.

## Principle

Vertical rhythm is a property of the **context**, not of the type inside it.
Never bundle margin onto a role. An author picks a context and wraps companions
with their primary; everything else follows. No margin is computed by hand.

## The four-step ramp, remapped per context

| Ramp role | `flow-prose` | `flow-product` | `flow-compact` |
|---|---|---|---|
| `--flow-tight` | 4 | 4 | 4 |
| `--flow-default` | 16 | 8 | 4 |
| `--flow-loose` | 24 | 16 | 8 |
| `--flow-section` | 40 | 24 | 8 |

`flow-compact` (tooltips/alerts/dialogs) also tightens body-tier leading to ~1.3
(`--flow-leading: 1.3`). A new density is one new theme remapping four variables —
don't hand-set margins to get there.

**The context class is both the variable scope AND the flow root** — e.g.
`flow-prose` alone; there is no separate bare `.flow` root. (Note: `flow-*` sets
*rhythm* vars only; typography role vars come from the separate `.prose`/`.product`
context class — see `references/typography.md`.)

## The owl rules (what's actually implemented)

Consecutive visible children of a flow context auto-space; structural exceptions
get more/less. From `flow.cjs`, in order (later rules win at equal specificity):

1. base — every visible sibling → `--flow-default`.
2. block objects (`figure, img, table, pre, blockquote, .chart`) → `--flow-loose` above and below.
3. before headings — `h1,h2,.title-1,.title-2` → `--flow-section`; `h3,h4,.title-3,.title-4` → `--flow-loose`.
4. stacked headings (heading + heading) → `--flow-tight`.
5. `figure > figcaption` → `--flow-tight` (coupling by nesting).
6. lists: `li + li`, `li > ul/ol` → `--flow-tight`; `dl > dd` tight, `dl > dt` default.
7. **companion coupling (block "4b"):**
   - `heading + :is(.subtitle, .subhead)` → `--flow-tight`
   - `.eyebrow + heading` → `--flow-tight`
   - `prev + .eyebrow:has(+ heading)` → `--flow-section` (break moves above the eyebrow)

Headings covered by "4b" include `h1..h4`, `[class*="title-"]`, `.display`,
`.headline`, `.page-head`, `.section-head`. The `:not(.sr-only,[hidden],template)`
guard keeps collapsed/non-rendered siblings off the owl axis.

The guard uses `:is()` (not `:where()`) so the context class carries (0,1,0)
specificity and beats element resets like `p { margin: 0 }`. **Ordering is
load-bearing** — companion/eyebrow rules sit after the base+heading rules so they
override at equal specificity.

## Coupling: two mechanisms

- **By nesting** (spec's canonical mechanism): a companion lives inside a
  compound-unit wrapper with its primary (`figure`/`figcaption`), invisible to the
  owl (child of `figure`, not of `.flow`). The wrapper participates in flow as one block.
- **By sibling rule** (what we chose for titling clusters): flat markup where a
  `.subtitle`/`.subhead` after a heading and an `.eyebrow` before one snap to
  `--flow-tight` via the owl rules above. This keeps authors writing flat markup
  and matches how stacked headings already work.

> Spec note: the prose still says "wrap companions with their primary". The
> titling-cluster coupling is implemented as **sibling rules**, not wrappers;
> `figure/figcaption` remains the only wrapper case. If reconciling, update the
> Content Flow section to describe companion coupling as automatic sibling behaviour.

## Hero spacing (proportional)

Hero-tier margins scale with the type via `em` (hero line-heights are unitless):
`.display { margin-block-start: 0.75em }`. The gap *below* a hero to its subhead
stays coupling (`flow-tight`); only the space above is proportional. Figma stores
precomputed per-breakpoint `hero/space-before` values.

## Readable width (prose)

`.flow-prose { --readable-width: clamp(45ch, 90vw, 70ch); }` and
`.prose-column { max-width: var(--readable-width); }`. Body text is width-capped
for legibility; **figures, tables, code, pull quotes break out wider** rather than
widening the measure. That is the intended way to use wide viewports.
