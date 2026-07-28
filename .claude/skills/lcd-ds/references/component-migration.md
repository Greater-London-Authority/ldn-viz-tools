# Component migration protocol (Tailwind utilities → roles + flow)

The function-first protocol for migrating a component's raw Tailwind
(`text-*`, `space-*`, `p-*`, `rounded-*`) onto semantic type roles, the flow
ramp, and the spacing scale. Distinct from `migration.md`, which is the
*app/package sweep off already-retired classes/tokens* — this file is the
*per-component conversion method*.

> **Provenance & caution.** Distilled from two now-deleted drafts
> (`llm-docs/migration-type-mapping.md`, `migration-spacing-mapping.md`) that
> carried **stale pre-rename names and sizes** (`card-panel-*`, `dashboard-head`,
> old title-ladder sizes, "tight-label has no variable"). The tables below have
> been re-verified against current source. Roles/sizes still change over time —
> before treating any size as authoritative, spot-check against
> `packages/themes/tailwind-custom/typography/roles.cjs`, `contexts.cjs`, and the
> spec's role tables. Bind the **role name**; treat sizes as a cross-check.

## How to use

1. **Function first, size second.** The same Tailwind size maps to different
   roles by what the element *does*: `text-sm` → `label` on a button but
   `body-sm` on helper text. Use Part A; Part B is only a cross-check.
2. **Context prefix governs family** (no cross-mixing): product UI → `product/*`,
   reading content → `prose/*`, chart chrome → `chart/*`. The component needs the
   context class ancestor (`.product`/`.prose`/`.chart`) for roles to resolve —
   see `typography.md`.
3. **Bind semantic roles only** — never a primitive, raw hex, or a surviving
   `text-*`/`font-*`/`leading-*` utility.
4. **Migrate off-system sizes to the nearest correct role even when it visibly
   resizes** — intended (e.g. input label 16→14). Flag the before/after px; don't
   preserve the old size.
5. **Where no row fits, STOP and flag** — don't guess a role.

## Part A — function guide (authoritative)

### Product context (xl-default sizes; scaling roles scale)

| element's job | role | size/wt | typically replaces | status |
|---|---|---|---|---|
| body copy / panel description | `body` | 16 / 400 | `text-base` | ✓ |
| input value / placeholder | `body` | 16 / 400 | `text-base` / `text-sm`* | ⚑ *legacy 14 → up to 16 |
| helper / hint / secondary / error | `body-sm` | 14 / 400 | `text-sm` | ✓ |
| control label — button / tab / chip | `label` + `label-tight` | 14 / 500, lh 1 | `text-sm font-medium` | ✓ |
| nav / menu item / tab label | `label` + `label-tight` | 14 / 500, lh 1 | `text-sm` / `text-base`* | ✓ single-line; *legacy 16→14 |
| sidebar / nav **section** title | `label` (NOT a title) | 14 / 500 | `text-xs`/`text-sm uppercase` | ⚑ casing on hold |
| small functional — timestamp/badge/meta | `caption` | 12 / 400 | `text-xs` | ✓ |
| column header (dense) | `label-sm` | 12 / 500 | `text-xs` | ✓ |
| object title — card/panel/modal/callout/drawer | `title` | 20 / 600 | `text-lg`/`text-xl font-semibold` | ✓ |
| object eyebrow (kicker) / demoted title | `eyebrow` | 14 / 500 | `text-sm font-medium` | ✓ |
| object subtitle (deck) | `subtitle` | 16 / 400 | `text-base` | ✓ |
| section heading (groups cards) | `section-head` | 28 / 600 | `text-2xl/3xl font-semibold` | ✓ |
| page / view title | `page-head` | 36 / 700 | `text-3xl/4xl font-bold` | ✓ |
| KPI / big number | `metric` | 36 / 700, lh ~1 | `text-4xl font-bold tabular` | ✓ |
| KPI, smaller | `metric-sm` | 20 / 700, lh ~1 | `text-xl font-bold` | ✓ |
| table cells/headers | — | — | — | ⚑ **defer to Table Kit** (`packages/tables` is code-authoritative; header font inherited from `Table.svelte`) |

> Renamed since the drafts: `card-panel-title`→`title`, `card-panel-subtitle`→`subtitle`,
> `card-panel-eyebrow`→`eyebrow`, `dashboard-head`→`page-head`. `section-head` is 28 (not 24);
> `metric`/`page-head` are 36 (not 28).

### Prose context

| element's job | role | size/wt | typically replaces | status |
|---|---|---|---|---|
| body paragraph | `body` | 16 / 400, reading-lh 1.625 | `text-base` | ✓ |
| small body / footnote | `body-sm` | 14 / 400, reading-lh 1.571 | `text-sm` | ✓ |
| intro / standfirst | `lead` | 22 / 400 | `text-xl`/`text-2xl` | ⚑ |
| h1–h4 (markdown ladder) | `title-1 … title-4` | 36/30/24/20 / 600 | auto inside `.prose` | ✓ |
| deck under a content title | `subtitle` | 18 / 400 | `text-lg` | ✓ |
| hero / page title | `headline` (56) or `display` (76) | 700 | `text-4xl`+ | ⚑ hero chrome only |
| deck under display/headline | `subhead` | 28 / 400 | `text-3xl font-normal` | ✓ |
| eyebrow / overline / kicker | `eyebrow` | 14 / 500 | `text-sm font-medium` | ✓ casing on hold |
| caption / credit | `caption` | 12 / 400 | `text-xs` | ✓ |

### Chart context

| element's job | role | size/wt |
|---|---|---|
| chart title / subtitle / eyebrow (object tier) | `title` / `subtitle` / `eyebrow` (alias product) | 20·600 / 16·400 / 14·500 |
| axis title, series/legend title | `axis-title` | 14 / 500 |
| series / data / legend label | `label` | 14 / 400 |
| axis tick (default density) | `tick` | 14 / 400, lh 1 |
| axis tick (compressed) / small tier | `tick-sm` | 12 / 400, lh 1 |
| footer source / citation | `note` | 12 / 400 |

## Part B — size/weight anchor (cross-check only)

On-system font sizes (17-step scale): 12,14,16,18,20,22,24,26,28,30,32,36,40,48,56,64,76.

| Tailwind | px | role(s) — disambiguate by function |
|---|---|---|
| `text-xs` | 12 | caption · label-sm · tick-sm |
| `text-sm` | 14 | body-sm · label · eyebrow · chart tick/label/axis-title |
| `text-base` | 16 | body · product subtitle |
| `text-lg` | 18 | prose subtitle |
| `text-xl` | 20 | title-4 · product title · metric-sm |
| `text-2xl` | 24 | prose title-3 |
| `text-3xl` | 30 | prose title-2 |
| `text-4xl` | 36 | prose title-1 · page-head · metric |
| `text-5xl` | 48 | no fixed role sits at 48 (display/headline pass through between breakpoints) — pick by role or flag |

Weights: `font-normal` 400 · `font-medium` 500 · `font-semibold` 600 · `font-bold` 700.

**Tight-label:** button/tab/chip/single-line control labels use the real
`label-tight` / `label-sm-tight` utilities (same size/weight as `label`/`label-sm`,
`line-height: 1`) — these **do** exist in `roles.cjs`. (The old draft said to hand-set
an lh override because no variable existed; that is out of date.) They currently
reuse `label`/`label-sm`'s backing vars — no dedicated token yet — but the utilities
are correct to apply.

## Spacing — run the gate FIRST

The hard part is **classification**, not lookup: the same `space-y-4` is flow in
one place, a token in another.

**Rhythm** — vertical gap between stacked repeated peers (field after field, card
after card) or coupled content blocks (heading↔body, figure↔caption); open-ended
→ **flow** (context class; let the coupling rules place the gap).
**Construction** — fixed internal geometry of one component (padding, control/icon
gaps, offsets between named parts); closed set → **spacing token** (`--spacing-{n}` /
on-scale numeric Tailwind).

- **Axis rule (decides most edge cases):** flow is **vertical only** (`margin-top`
  down a stack). Any **horizontal** gap (`space-x-*`, horizontal flex/grid `gap`,
  `ml/mr/mx-*`) is **always construction**, even between repeated peers.
- **Structural reach:** the owl only sees direct-child adjacencies of the flow root
  (`> * + *`). Rhythm expressed by a margin nested several levels inside a child is
  real rhythm the owl can't reach — keep it, flag it, don't blanket the outer
  container with `flow-*`.
- **Heuristics (bias, not rule):** `space-y-*` → lean flow; `space-x-*` → token;
  `gap-*` → construction (only a *vertical* gap on a content stack is a flow
  candidate); `p-*`/`px/py-*` → always token; `mt/mb/my-*` → run the gate.
- **Composite exception:** mini-document components (Card title/body/actions,
  ChromeHeader title/eyebrow/subtitle, TitleGroup) are genuine titling **rhythm** →
  flow + coupling.
- **Known review item:** `flow` used for a single component's internal geometry
  (e.g. an input's label/input/helper stack) is construction under the gate → flag,
  likely re-map to tokens; don't auto-strip.

**Path A — rhythm → flow.** Don't map to a px margin; put the flow context on the
container and let coupling place the gap. Pick by content: editorial/markdown →
`flow-prose`; product block stacks → `flow-product`; dense/data-heavy → `flow-compact`.
Ramp values (tight/default/loose/section): prose 4/16/24/40 · product 4/8/16/24 ·
compact 4/4/8/8. If an existing `space-y-N` doesn't match the context default, it's
either coupling (tight/loose — handled by rules) or construction — re-run the gate.

**Path B — construction → spacing token.** Numeric Tailwind (`p-4`, `gap-2`) already
compiles to the public `--spacing-{n}` alias (`tw-extend/spacing.cjs`), never the
primitive — so on-scale numeric utilities **may remain** as-is; that's not a primitive
binding. Never bind `--primitive-spacing-*` directly. Off-scale arbitraries
(`p-[15px]`) → snap to nearest token + flag. Explicitly converting bare Tailwind to
`--spacing-*` bindings is a separate later pass. Table: `0.5`→2, `1`→4, `1.5`→6,
`2`→8, `2.5`→10, `3`→12, `3.5`→14, `4`→16, `5`→20, `6`→24, `7`→28, `8`→32, `10`→40,
`12`→48, `16`→64 (px). See `spacing.md` for the full scale and the retired t-shirt map.

## Corners (system-wide)

`rounded-*` → **remove** (radius is 0 everywhere) **unless** genuinely round — a
circular avatar, a dot, a pill toggle knob. Never leave radius on bars, cards, cells,
buttons, inputs, containers. Flag any radius kept with the reason it's round.

## flow guard note

`flow.cjs` guards both ends of every owl pair with
`:not(.sr-only, [hidden], template)`, so a component with an `sr-only`/conditional
first child (e.g. a no-title state) can use real `flow-*` without a phantom gap.
If a codebase uses a different collapse convention (`visually-hidden`,
`[aria-hidden]` spacers), add it to the guard list in `flow.cjs`.

## Report requirement (per component)

Return: every `old class → new role` line; every off-system resize (before/after
px); every spacing utility with its **classification** (rhythm/construction) and
target; every `flow`-as-construction instance flagged; every off-scale value
snapped + flagged; every `rounded-*` removed or justified; anything you couldn't
map (STOP-and-flag); anything deliberately left as-is. Grep the migrated file for
surviving `text-*`/`leading-*`/`font-*`/`space-*`/`gap-*`/`p-*`/`m-*`/`rounded-*`
and list any that remain. Colour is always **out of scope** for a type/spacing/radius run.

## Where to log

- Log each applied batch in `llm-docs/component-migration-log.md` (the audit trail).
- Components whose size/level/variant prop collapses type differentiation onto one
  fixed role → record a row in `llm-docs/size-prop-collapse-register.md` (a separate
  later sweep resolves them; don't resolve inline).
