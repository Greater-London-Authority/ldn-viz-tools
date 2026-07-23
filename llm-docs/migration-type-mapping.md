# Type migration map — Tailwind → semantic role

_Draft skeleton. Seed rows are marked **✓ confirmed** (mechanical, apply directly) or **⚑ judgment** (function-dependent — decide per component, don't blind-swap). Where no row fits, **STOP and flag** rather than guess._

## How to use

1. **Function first, size second.** The same Tailwind size maps to different roles depending on what the element *does* (`text-sm` → `product/label` on a button but `product/body-sm` on helper text). Use Part A (function guide). Part B (size anchor) is only a cross-check.
2. **Context prefix governs family** (the governing rule): a component in a Product context takes `product/*`; prose-bearing content takes `prose/*`; chart chrome takes `chart/*`. Never cross-mix.
3. **Components bind to semantic roles only** — never a primitive, never raw hex, never a Tailwind size class left in place.
4. **Migrate off-system sizes to the nearest correct role even when it visibly resizes.** This is intended (e.g. accordion body 20→16, input label 16→14). Flag the resize in the report; don't preserve the old size.

## Part A — function guide (authoritative for conversions)

### Product context

| element's job in the UI | target role | size/wt | typical Tailwind it replaces | status |
|---|---|---|---|---|
| body copy / panel description | `product/body` | 16 / 400 | `text-base` | ✓ |
| input value / placeholder | `product/body` | 16 / 400 | `text-base` / `text-sm`* | ⚑ (*legacy 14 → migrate up to 16) |
| helper / hint / secondary / error text | `product/body-sm` | 14 / 400 | `text-sm` | ✓ |
| control label — button / tab / chip | `product/label` + tight-label lh | 14 / 500, lh 1.0 | `text-sm font-medium` | ✓ |
| nav item / menu item / tab label | `product/label` + tight-label lh | 14 / 500, lh 1.0 | `text-sm` / `text-base`* | ✓ (single-line only; *level-1 legacy 16 → 14) |
| sidebar / nav **section** title | `product/label` (NOT a title role) | 14 / 500 | `text-xs`/`text-sm uppercase` | ⚑ (casing on hold) |
| small functional — timestamp, badge, meta | `product/caption` | 12 / 400 | `text-xs` | ✓ |
| card / panel title | `product/card-panel-title` | 20 / 600 | `text-lg`/`text-xl font-semibold` | ✓ |
| card / panel eyebrow (kicker) | `product/card-panel-eyebrow` | 14 / 500 | `text-sm font-medium` | ✓ |
| card / panel subtitle (deck) | `product/card-panel-subtitle` | 16 / 400 | `text-base` | ✓ |
| section heading (product page) | `product/section-head` | 24 / 600 | `text-2xl font-semibold` | ✓ |
| dashboard / view title | `product/dashboard-head` | 28 / 700 | `text-3xl font-bold` | ⚑ (30→28) |
| KPI / big number | `product/metric` | 28 / 700, lh 1.0 | `text-3xl font-bold tabular` | ✓ |
| KPI, smaller | `product/metric-sm` | 20 / 700, lh 1.0 | `text-xl font-bold` | ✓ |
| table header cell | — | — | `text-xs`/`text-sm` | ⚑ **defer to Table Kit** (code-authoritative) |

### Prose context

| element's job | target role | size/wt | typical Tailwind | status |
|---|---|---|---|---|
| body paragraph | `prose/body` | 16 / 400, lh 26† | `text-base` | ✓ (†leading nudge pending) |
| small body / footnote | `prose/body-sm` | 14 / 400, lh 22† | `text-sm` | ✓ |
| intro / standfirst | `prose/lead` | 22 / 400, lh 32† | `text-xl`/`text-2xl` | ⚑ |
| h1–h4 (markdown ladder) | `prose/title-1 … title-4` | 28/24/22/20 / 600 | `text-2xl … text-lg` | ✓ (ladder decision) |
| hero / page title | `prose/headline` or `prose/display` | 32 / 40, 700 | `text-4xl`+ | ⚑ (hero chrome only) |
| deck under a title | `prose/subtitle` | 18 / 400 | `text-lg` | ✓ |
| deck under display/headline | `prose/subhead` | 28 / 400 | `text-3xl font-normal` | ✓ |
| eyebrow / overline / kicker | `prose/eyebrow` | 14 / 500 | `text-sm font-medium` | ✓ (tracking/casing on hold) |
| caption / credit | `prose/caption` | 12 / 400 | `text-xs` | ✓ |

### Chart context

| element's job | target role | size/wt | status |
|---|---|---|---|
| axis title | `chart/axis-title` | 14 / 500 | ✓ |
| series / data label | `chart/label` | 14 / 400 | ✓ |
| axis tick (default density) | `chart/tick` | 14 / 400 | ✓ (14 is default; 12 is compressed) |
| axis tick (compressed density) | `chart/tick-sm` | 12 / 400 | ✓ |

## Part B — size / weight anchor (mechanical cross-check only)

| Tailwind | px | on-system? | nearest role(s) — disambiguate by function |
|---|---|---|---|
| `text-xs` | 12 | ✓ | caption · label-sm · tick-sm |
| `text-sm` | 14 | ✓ | body-sm · label · eyebrow · chart tick/label/axis-title |
| `text-base` | 16 | ✓ | body · card-panel-subtitle |
| `text-lg` | 18 | ✓ | prose/subtitle |
| `text-xl` | 20 | ✓ | title-4 · card-panel-title · metric-sm |
| `text-2xl` | 24 | ✓ | title-2 · section-head |
| `text-[22px]` | 22 | ✓ (arbitrary) | title-3 · lead |
| `text-3xl` | 30 | ✗ off | → 28 (title-1 / dashboard-head / metric) — ⚑ pick by role |
| `text-4xl` | 36 | ✗ off | → 32 headline or 40 display — ⚑ pick by role |
| `text-5xl` | 48 | ✗ off | → 40 display (or flag if genuinely larger) |

| weight | value |
|---|---|
| `font-normal` | 400 |
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |

## Tight-label treatment

Button / tab / chip / single-line control labels use `product/label` (or `label-sm`) at **line-height 1.0**. Per the standing decision this is a line-height treatment, not a separate size token, and it is currently **not** present as a variable — so it must be applied at the component level (an lh override on the control's label), and every migrated control must set it. Flag any control label left at the role's default multi-line leading.

## Report requirement (per component)

For each component, Claude Code returns: every `old class → new role` line; anything mapped from an off-system size (with the before/after px); any element it could not map (STOP-and-flag); and anything deliberately left as-is. No raw `text-*` / `leading-*` / `font-*` utilities should survive except where explicitly justified.
