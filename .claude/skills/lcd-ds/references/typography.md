# Typography

Distilled from the spec's *Semantic Layer: Prose / Product / Chart*, *Structural
hierarchy*, *Composition & Hierarchy Resolution*, and *Font Weight* sections.
Full rationale: `design-system-specification/design-system-specification.md`.
Developer guide: `packages/ui/src/lib/Typography.mdx`.

## The one rule

**Bind to a role, never a size.** Pick the role for the job; size, line-height,
weight and (for companions) colour arrive with it. Never Tailwind `text-*` sizes,
never `--primitive-*`.

## Three families, set by surface — no cross-mixing

| Family | For | Context class |
|---|---|---|
| `prose` | reading content — markdown, help, rich text | `.prose` (+ `.flow-prose`) |
| `product` | app/dashboard UI — pages, cards, panels, controls, tables | `.product` (+ `.flow-product`) |
| `chart` | chart chrome and chart-internal text | `.chart` |

**A role only resolves inside its context.** The role utilities (`.title-3`, `.body`,
`.lead`…) set `font-size: var(--title-3-font-size)` etc., but those vars are defined
only inside `.prose`/`.product`/`.chart` — see
`packages/themes/tailwind-custom/typography/contexts.cjs` and the selector
`.{context} .{role}` in `typography.cjs`. A role class with **no context ancestor
does not size**. `flow-prose`/`flow-product` set rhythm only — NOT the type vars.

## Prose roles (xl defaults; scaling noted)

| Role | px | Weight | Job |
|---|---|---|---|
| `display` | 76 | 700 | Homepage hero. Hero chrome, outside content flow. Scales. |
| `headline` | 56 | 700 | Subpage hero. Takes a `subhead`. Scales. |
| `subhead` | 28 | 400 | Companion under a `headline` (muted). |
| `title-1` | 36 | 600 | Content h1. Scales. |
| `title-2` | 30 | 600 | Content h2. Scales. |
| `title-3` | 24 | 600 | Content h3. Scales. |
| `title-4` | 20 | 600 | Content h4 — floor of the ladder. |
| `subtitle` | 18 | 400 | Companion under a content title (muted). |
| `lead` | 22 | 400 | Standfirst/intro paragraph (muted). |
| `body` | 16 | 400 | Default reading text. Reading leading 1.625. |
| `body-sm` | 14 | 400 | Secondary/dense reading. Reading leading 1.571. |
| `caption` | 12 | 400 | Metadata, smallest text. |
| `eyebrow` | 14 | 500 | Overline above a display/headline/title (muted). |

- **Markdown h1–h4 → `title-1`–`title-4`** automatically inside `.prose` (bare
  `h1..h4` are styled via `:where()` element selectors in `semantics.cjs`; zero
  specificity, so an explicit role class overrides). `headline`/`display` are
  hero chrome and never render a content h1.
- **Hero slot is Display OR Headline+Subhead — not both.** Subhead is Headline's
  companion; Display is standalone (an eyebrow may sit over either).

## Product roles (xl defaults)

| Role | px | Weight | Job |
|---|---|---|---|
| `page-head` | 36 | 700 | Top page title. Scales. Optional `subtitle`. |
| `section-head` | 28 | 600 | Groups cards; repeats down a page. Scales. Optional `subtitle`. |
| `title` | 20 | 600 | Object title — card/panel/modal/callout/drawer. |
| `subtitle` | 16 | 400 | Supporting line under any heading/title (muted). |
| `eyebrow` | 14 | 500 | Overline above a title; also the demoted-title treatment (muted). |
| `metric` | 36 | 700 | Hero stat numerals. Scales with page-head. |
| `metric-sm` | 20 | 700 | Secondary/in-card KPI. |
| `body` | 16 | 400 | Default UI text, field values, menu items. |
| `body-sm` | 14 | 400 | Helper/hint/secondary, table cells. |
| `label` | 14 | 500 | Control/nav labels — buttons, inputs, tabs. |
| `label-sm` | 12 | 500 | Dense labels, column headers. |
| `caption` | 12 | 400 | Metadata, badges. |

Tight single-line variants exist as real utilities: `label-tight` / `label-sm-tight`
(same size/weight, `line-height: 1`) for buttons/tabs/chips that must never wrap.

**Resolve by element, not by eye** (settled conventions):
control/nav labels → `label` (even where legacy used 16px); input values/body → `body`;
helper/hint → `body-sm`; genuine component titles → `title`; sidebar/nav *section*
headings → `label`, not a title.

## The primary-slot rule (recursive) — how `title` gets its treatment

Every titling container has one primary slot. Whatever owns it takes the **dominant**
`title` (20/600/primary); a title that yields drops to **`eyebrow`** (14/500/secondary)
or is omitted; a dominant title's supporting line is **`subtitle`** (16/400/muted).
Because all three are real roles, a demotion is a token swap, not a note. E.g. a
card whose chart has its own title: the chart title is dominant, the card title
becomes an `eyebrow` above it.

## Companion coupling (eyebrow / subtitle / subhead)

A companion hugs its heading with `--flow-tight`; the section break sits **above an
eyebrow** that introduces a heading. This is enforced by owl rules in
`packages/themes/tailwind-custom/typography/flow.cjs` (rule block "4b") for flat
sibling markup:

```html
<p class="eyebrow">GLA City Intelligence</p>   <!-- section break above -->
<h1 class="headline">State of London</h1>       <!-- hugs eyebrow (flow-tight) -->
<p class="subhead">…</p>                         <!-- hugs headline (flow-tight) -->
```

Details and the selector specificity ordering: `references/flow.md`.

## Weight & emphasis

Each role bundles its **identity weight** — don't set weight alongside a role.
For genuine emphasis riding on top: `.text-strong` (600) / `.text-soft` (400),
both role-agnostic. Per-context weight identity (e.g. Headline Bold in prose,
Semibold in product) rides the context theme — not a new mechanism.

## Colour on text

Bind text colour to a semantic token, descending in emphasis:
`text-color-text` → `-text-muted` → `-text-wash`; labels `…-label` → `-label-muted`.
Text/icon on a filled control → `inverse/text`. See `references/colour.md`.

## Gotchas

- **`.responsive` is retired** — scaling is automatic; no `md:section-head`, no
  per-breakpoint type variants. Don't add a `responsive` class.
- **The Tailwind `.prose` (typography plugin)** still exists for HTML you don't
  control (markdown/CMS). For markup you own, apply roles + `flow` directly.
- Retired role classes (`title-{xs,sm,md,lg}`, `body-{xs,md,lg}`, `label-{xs,md,lg}`)
  → see `references/migration.md` for the mapping.
