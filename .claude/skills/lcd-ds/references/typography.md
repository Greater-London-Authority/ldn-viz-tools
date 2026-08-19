# Typography

Distilled from the spec's _Semantic Layer: Prose / Product / Chart_, _Structural
hierarchy_, _Composition & Hierarchy Resolution_ and _Font Weight_ sections.
Verified against branch `flow`.

**Code anchors:**

- `packages/themes/tailwind-custom/typography/contexts.cjs` — the three context classes (which vars a family defines)
- `packages/themes/tailwind-custom/typography/roles.cjs` — the role utility classes (which vars a role reads)
- `packages/themes/tailwind-custom/typography/semantics.cjs` — element styling inside `.prose` only
- `packages/themes/tailwind-custom/typography/responsive.cjs` — per-breakpoint font-size and line-height
- `packages/themes/styles/typography.css` — emitted `--typography-{mode}-{family}-{role}-{prop}`
- Developer guide: `packages/ui/src/lib/Typography.mdx`

## The one rule

**Bind to a role, never a size.** Pick the role for the job; size, line-height,
weight, letter-spacing and (for companions) colour arrive with it. Never Tailwind
`text-*` sizes, never `--primitive-*`.

## Three families, set by surface — no cross-mixing

| Family    | For                                                       | Typography context | Usual flow partner |
| --------- | --------------------------------------------------------- | ------------------ | ------------------ |
| `prose`   | reading content — markdown, help, rich text               | `.prose`           | `.flow-prose`      |
| `product` | app/dashboard UI — pages, cards, panels, controls, tables | `.product`         | `.flow-product`    |
| `chart`   | chart chrome and chart-internal text                      | `.chart`           | (host's context)   |

**A role only resolves inside its context.** Role utilities set
`font-size: var(--title-3-font-size)` etc., and those locals are defined **only**
inside `.prose` / `.product` / `.chart`. A role class with no context ancestor does
not size — it silently inherits.

> Note the asymmetry with flow, which now defines the product ramp on `:root`.
> Typography has **no `:root` default**. A context class is mandatory.

`flow-*` sets rhythm vars only — it does **not** set type vars. `product` and
`flow-product` are two systems sharing a word.

### How a role resolves (worth knowing when debugging)

1. `.product` (or `.prose`/`.chart`) defines `--title-font-size` etc. from
   `--typography-md-product-title-font-size`.
2. `responsive.cjs` re-declares font-size and line-height on `.{context} .{role}`
   at `default` **and** all four breakpoints, which outspecifies (1).
3. `roles.cjs` `.title` reads the locals.

So the md-pinning visible in `contexts.cjs` only ever governs family, weight and
letter-spacing — none of which scale. **The responsive scale is not inert.** (This
was an open worry; it is closed.)

Chart is exempt from the responsive loop by design: chart values are identical at
every breakpoint.

## Prose roles (xl defaults; scaling noted)

| Role       | px  | Weight | Job                                                       |
| ---------- | --- | ------ | --------------------------------------------------------- |
| `display`  | 76  | 700    | Homepage hero. Hero chrome, outside content flow. Scales. |
| `headline` | 56  | 700    | Subpage hero. Takes a `subhead`. Scales.                  |
| `subhead`  | 28  | 400    | Companion under a `headline` (muted).                     |
| `title-1`  | 36  | 600    | Content h1. Scales.                                       |
| `title-2`  | 30  | 600    | Content h2. Scales.                                       |
| `title-3`  | 24  | 600    | Content h3. Scales.                                       |
| `title-4`  | 20  | 600    | Content h4 — floor of the ladder.                         |
| `subtitle` | 18  | 400    | Companion under a content title (muted).                  |
| `lead`     | 22  | 400    | Standfirst/intro paragraph (muted).                       |
| `body`     | 16  | 400    | Default reading text. Reading leading 1.625.              |
| `body-sm`  | 14  | 400    | Secondary/dense reading. Reading leading 1.571.           |
| `caption`  | 12  | 400    | Metadata, smallest text.                                  |
| `eyebrow`  | 14  | 500    | Overline above a display/headline/title (muted).          |

- **`.prose` styles bare elements.** `h1`–`h4` → `title-1`–`title-4`, `p` → `body`,
  `p.lead` → `lead`, `figcaption`/`.caption` → `caption`, plus links, `hr`, lists,
  blockquotes, tables and inline `code`. All via
  `:where(el):not(:where(.not-prose, .not-prose *))` — zero added specificity, so an
  explicit role class overrides. `h5` has no case; it falls to `body`.
- **`.prose` also caps its own width**: `max-width: var(--prose-max-width)`, set from
  `--typography-{mode}-prose-readable-width` at every breakpoint. There is **no
  `.prose-column` class and no `--readable-width` variable** — older docs claim both.
- **`.not-prose`** is the escape hatch, at block or element level.
- **Hero slot is Display OR Headline+Subhead — not both.** Content headings restart
  at `title-1` regardless of the hero above; they are separate structural tiers.

## Product roles (xl defaults)

| Role           | px  | Weight | Job                                                               |
| -------------- | --- | ------ | ----------------------------------------------------------------- |
| `page-head`    | 36  | 700    | Top page title. Scales. Optional `subtitle`.                      |
| `section-head` | 28  | 600    | Groups cards; repeats down a page. Scales. Optional `subtitle`.   |
| `title`        | 20  | 600    | Object title — card/panel/modal/callout/drawer.                   |
| `subtitle`     | 16  | 400    | Supporting line under any heading/title (muted).                  |
| `eyebrow`      | 14  | 500    | Overline above a title; also the demoted-title treatment (muted). |
| `metric`       | 36  | 700    | Hero stat numerals. Scales with page-head.                        |
| `metric-sm`    | 20  | 700    | Secondary/in-card KPI.                                            |
| `body`         | 16  | 400    | Default UI text, field values, menu items.                        |
| `body-sm`      | 14  | 400    | Helper/hint/secondary, table cells.                               |
| `label`        | 14  | 500    | Control/nav labels — buttons, inputs, tabs.                       |
| `label-sm`     | 12  | 500    | Dense labels, column headers.                                     |
| `caption`      | 12  | 400    | Metadata, badges.                                                 |

**`.product` applies no element styles** — it defines vars only. Dashboard markup
carries no reliable typographic meaning, so nothing is assumed. Apply the role class.

Tight single-line variants are real utilities: `label-tight` / `label-sm-tight` —
same size/weight, `line-height: 1`, for buttons/tabs/chips that must never wrap.
Live in `Button`, `TabLabel`, `NavigationMenuItem`, `ThemeSwitcher`,
`MultipleActionButton`, `GeocoderSuggestion(List)`. They reuse `label`/`label-sm`'s
vars — **no dedicated `semantic-typography` entry**, so they cannot be retuned
independently. OPEN.

**Resolve by element, not by eye** (settled conventions):
control/nav labels → `label` (even where legacy used 16px); input values/placeholder/body
→ `body`; helper/hint/secondary → `body-sm`; small functional/metadata → `caption`;
genuine component titles → `title`; sidebar/nav _section_ headings → `label`, not a title.

## Chart roles

| Class        | px  | Weight | Line height | Job                                              |
| ------------ | --- | ------ | ----------- | ------------------------------------------------ |
| `title`      | 20  | 600    | inherited   | Chart title when it owns the primary slot        |
| `subtitle`   | 16  | 400    | inherited   | Supporting line under a chart title              |
| `eyebrow`    | 14  | 500    | inherited   | A chart title that has yielded the slot          |
| `axis-title` | 14  | 500    | 20          | Axis names, series/legend **titles**             |
| `label`      | 14  | 400    | 20          | Data/value labels, annotations, legend _entries_ |
| `tick`       | 14  | 400    | 1.0         | Axis tick / scale labels, default density        |
| `tick-sm`    | 12  | 400    | 1.0         | Smaller tick tier, at the 12px floor             |

`title` / `subtitle` / `eyebrow` are **semantic→semantic aliases** of their product
sources — every property referenced, so they cannot drift and they inherit product's
responsive behaviour. This is the only place in typography where a semantic role
references another semantic role. `axis-title` and `label` are metric twins of
product `label` / `body-sm` but hold their own values.

Inside `.chart`, the shared class names (`title`, `subtitle`, `eyebrow`, `label`)
resolve to chart values; `axis-title`, `tick` and `tick-sm` are chart-only classes.

- **There is no `legend` role** — a legend entry is a data label → `label`. A legend
  _title_ → `axis-title`.
- **`chart/note` is a token, not a class.** It emits at all five modes in
  `typography.css` but has no entry in `contexts.cjs` or `roles.cjs`, so there is no
  `.note` utility. Chart is eight roles in tokens, seven usable in code. Don't
  document `.note` as available until it is wired.
- **Compressed tick density (12 / 11) is spec-only.** Emitted default is 14 / 12.
- `0.86` in an export is a rem bug ≈ 14px. Always correct it to the intended role.

## The primary-slot rule (recursive) — how `title` gets its treatment

Every titling container has one primary slot. Whatever owns it takes the **dominant**
`title` (20/600/primary); a title that yields drops to **`eyebrow`** (14/500/secondary)
or is omitted; a dominant title's supporting line is **`subtitle`** (16/400/muted).
Because all three are real roles, a demotion is a token swap, not a note. E.g. a card
whose chart has its own title: the chart title is dominant, the card title becomes an
`eyebrow` above it.

Ladder: `page-head → section-head → title { dominant | eyebrow | absent }`.
`page-head`/`section-head` are page furniture (fixed positions, positional names);
`title` is the recursive general case, hence the bare name.

## Companion coupling (eyebrow / subtitle / subhead)

A companion hugs its heading with `--flow-tight`; the section break sits **above an
eyebrow** that introduces a heading. Enforced by owl rules in
`packages/themes/tailwind-custom/flow/flow.cjs` (block "4b") for flat sibling markup:

```html
<p class="eyebrow">GLA City Intelligence</p>
<!-- section break above -->
<h1 class="headline">State of London</h1>
<!-- hugs eyebrow (flow-tight) -->
<p class="subhead">…</p>
<!-- hugs headline (flow-tight) -->
```

**Using the right role class is what earns the rhythm.** `body-sm
text-color-text-muted` looks like a subtitle and gets none of the coupling. Details
and selector ordering: `references/flow.md`.

## Weight & emphasis

Each role bundles its **identity weight** — don't set a weight alongside a role.
For genuine emphasis riding on top of a role, use Tailwind's weight utilities
(`font-semibold`, `font-normal`).

> **`.text-strong` / `.text-soft` do not exist.** The spec's _Emphasis modifier_
> section specifies them and older skill copy cites them, but there is no match
> anywhere in `packages/themes`. Either build them or drop them from the spec.
> Same for the per-context weight identity example (`--headline-weight` on a flow
> context) — specified, not implemented.

Four weights ship: 400 / 500 / 600 / 700. The emitted primitive spelling is
`--primitive-typography-font-weight-semi-bold` — **hyphenated**, no `semibold`.

## Responsive

Automatic and on by default at five breakpoints (`base`, `sm` 640, `md` 768,
`lg` 1024, `xl` 1280). Scaling roles: prose `display`, `headline`, `title-1`,
`title-2`, `title-3`; product `page-head`, `section-head`, `metric`. Everything else
fixed; chart never scales.

Every breakpoint column is pre-verified so a role never overtakes the one above it —
which is why the Title ladder and the two Metric roles scale as groups.

## Line height, two policies

- **Grid leading** — 4px-aligned, for structural roles that stack against
  grid-aligned neighbours. A reference for authoring, not a cascade `var()`:
  emitted line-height is always a computed unitless ratio.
- **Reading leading** — `prose/body` 1.625 and `prose/body-sm` 1.571, **these two
  only**. Product body/body-sm keep grid leading (24/20) for denser UI.

One exception to the literals rule: the three aliased chart roles reference their
product source for line-height and letter-spacing too. State it as an exception,
never as an absolute.

## Colour on text

Bind to a semantic token, descending in emphasis: `text-color-text` → `-text-muted`
→ `-text-wash`; labels `…-label` → `-label-muted`. Text/icon on a filled control →
`inverse/text`. Some roles already carry colour: `subhead`, `subtitle`, `lead`,
`eyebrow`, `axis-title`, `tick`, `tick-sm` are muted in `roles.cjs`. See
`references/colour.md`.

## Gotchas

- **`.responsive` is retired** — scaling is automatic. No `md:section-head`, no
  per-breakpoint type variants.
- **`.format` is retired** — vertical rhythm consolidated on `flow`; `format.cjs`
  no longer exists.
- **`.prose` is ours, not Tailwind's.** `@tailwindcss/typography` is a dependency of
  `@ldn-viz/themes` but is **never registered** — not in `ldn-theme.cjs`, not in any
  downstream config (all are `presets: [ldn-theme]`, `plugins: []`). No `--tw-prose-*`
  variable exists in source or emitted CSS. The only `.prose` comes from
  `contexts.cjs` + `semantics.cjs`, so the plugin's modifier API is inert here:
  `prose-lg`, `prose-invert`, `prose-headings:…`, `max-w-prose` are all no-ops.
  Older docs claim the plugin is "still exposed for HTML you don't control" — it
  isn't. The dependency itself looks vestigial and is a candidate for removal
  (also present, unused, in `packages/tables/package.json`).
- **Don't mix families in one region.** Embedded reading content on a product
  surface gets its own `.prose` container.
- Retired role classes (`title-{xs,sm,md,lg}`, `body-{xs,md,lg}`, `label-{xs,md,lg}`)
  → mapping in `references/migration.md`.

## Not implemented (spec-only — don't build against)

- Fluid `clamp()` display tokens (`display`, `headline`, `page-head`, `metric`).
- `.text-strong` / `.text-soft`, and per-context weight identity variables.
- `.prose-column` / `--readable-width` (the working mechanism is `--prose-max-width`
  on `.prose` itself).
- A dedicated backing token for `label-tight` / `label-sm-tight`.
- `.note` for `chart/note`.
