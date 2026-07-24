# Design System Specification

## Overview

The specification for the design system's foundations: **typography, spacing, content flow, layout grid, and colour**. It defines the semantic token layers each is built on and the logic for applying them, so components and compositions draw from one documented source rather than re-deciding per screen. It is built for web products and dashboards rather than editorial or marketing use.

Typography is described first and in most depth, as it carries the most internal structure. It is a 17-step type scale (12–76px) with dense resolution through the UI and body range and smooth interpolation across breakpoints.

The type values are rounded and hand-placed rather than derived from a single fixed ratio. They carry more internal structure than that suggests, described under Generative Logic below.

Because the ratio between steps is not constant, the scale is authored as an explicit list of literal values rather than a `calc()` multiplier or a `base × ratio^n` formula.

---

## Primitive Scale

17 steps, anchored at `0` = 16px (standard base body size). Negative = smaller/finer, positive = larger/more expressive.

| Step | Size (px) | Size (rem) |
|------|-----------|------------|
| 14   | 76        | 4.75rem    |
| 13   | 64        | 4rem       |
| 12   | 56        | 3.5rem     |
| 11   | 48        | 3rem       |
| 10   | 40        | 2.5rem     |
| 9    | 36        | 2.25rem    |
| 8    | 32        | 2rem       |
| 7    | 30        | 1.875rem   |
| 6    | 28        | 1.75rem    |
| 5    | 26        | 1.625rem   |
| 4    | 24        | 1.5rem     |
| 3    | 22        | 1.375rem   |
| 2    | 20        | 1.25rem    |
| 1    | 18        | 1.125rem   |
| 0    | 16        | 1rem       | ← base
| -1   | 14        | 0.875rem   |
| -2   | 12        | 0.75rem    |

*rem values assume a 16px root font size.*

---

## Generative Logic

The scale has a two-region structure: a doubling-chain upper half and a near-constant-ratio dense half. 13 of the 17 values (76%) belong to a doubling chain, which is what allows the scale to be documented as a system rather than a list.

**Doubling chains:**

- 12 → 24 → 48 (→ 96 if extended)
- 14 → 28 → 56 (→ 112 if extended)
- 16 → 32 → 64 (→ 128 if extended)
- 18 → 36
- 20 → 40

**Exceptions (no chain membership):** 22, 26, 30, 76 are the scale's four hand-placed values. (26 was previously paired as 13 → 26; with 13 retired it stands alone, still needed as Title 2's `sm` step.) They are named here so they read as deliberate rather than as oversights.

**Dense-region ratio:** below 32px, adjacent steps hold a near-constant ratio of ~1.07–1.17 (12→14→16→18→20→22→24→26→28→30→32). This close spacing gives fine-grained control in the UI-critical range, where a small perceptual step matters more than it does at display sizes.

**Extending the scale:**
- Above step 14 (76px): 76 has no chain of its own, so extend the nearest active chain rather than inventing a neighbouring value — 64 → 128, or 56 → 112.
- Below step -2 (12px): continue the dense-region ratio, giving the next step ≈ 11px.

---

## Line Height Scale

Line-height follows **two policies, assigned by role** (the reading-leading policy is stated after the table). Most roles take **grid leading** — a line-height rounded to the 4px grid, tight at the top (~1.05–1.15) and generous at the bottom (~1.3–1.6). The grid below is that reference; it increments roughly every two font-size steps rather than every step, which keeps the number of distinct values manageable — 13 values covering 17 font sizes — without losing accuracy. It is a **reference for authoring, not a CSS-cascade participant**: emitted line-height is a computed unitless ratio, never a `var()` to a px value.

| Step | Font size | Line height | Ratio |
|------|-----------|-------------|-------|
| 14   | 76px      | 80px        | 1.05  |
| 13   | 64px      | 72px        | 1.125 |
| 12   | 56px      | 64px        | 1.14  |
| 11   | 48px      | 56px        | 1.17  |
| 10   | 40px      | 48px        | 1.20  |
| 9    | 36px      | 44px        | 1.22  |
| 8    | 32px      | 40px        | 1.25  |
| 7    | 30px      | 36px        | 1.20  |
| 6    | 28px      | 36px        | 1.29  |
| 5    | 26px      | 32px        | 1.23  |
| 4    | 24px      | 32px        | 1.33  |
| 3    | 22px      | 28px        | 1.27  |
| 2    | 20px      | 28px        | 1.40  |
| 1    | 18px      | 24px        | 1.33  |
| 0    | 16px      | 24px        | 1.50  |
| -1   | 14px      | 20px        | 1.43  |
| -2   | 12px      | 16px        | 1.33  |

Most values reappear as spacing-scale rungs below (80, 64, 56, 48, 44, 40, 36, 32, 28, 24, 20, and 16 are all `--primitive-spacing-{n}` tokens), so a line of text composes predictably against spacing-scale margins and gaps. Only 72 stands alone with no spacing-rung twin; 36 also coincides with a font-size value.

### Reading leading (prose body only)

Two prose roles take a **reading-leading** line-height instead of a grid value — a small font-relative ratio for text that flows in a column and wants comfort the 4px grid cannot express.

| Role | fs | lh | ratio |
|------|----|----|-------|
| Prose Body | 16 | 26 | **1.625** |
| Prose Body Sm | 14 | 22 | **1.571** |

These two only, prose context only. `Prose Lead` (22 → 32) reads as reading-tier by intent but its line-height lands on the grid at 32, so it needs no off-grid value. **Product** `body` / `body-sm` deliberately keep grid leading (24 / 20) for denser UI, which is why the nudge is prose-only. A 4px-quantised grid cannot express ~1.6 leading on a 16px body — 16→24 is 1.50 (too tight for a reading column) and 16→28 is 1.75 (too airy), with no 26 step between — so reading leading is named as its own policy rather than framed as an off-grid outlier. Emitted line-height stays unitless for every role, so this needs no new machinery.

---

## Semantic Layer: Prose

Naming states the *job* rather than the size or a component. `Title 1–4` map to markdown heading depth (h1–h4), a structural requirement for docs, help articles, and rich content. Display, Headline, and Title 1–3 scale across breakpoints; Title 4 and everything below it are fixed. The values shown are the `xl` (≥1280px) defaults for the scaling roles. The full per-breakpoint matrix, which is the authoritative source for hierarchy at each size, is in Responsive Behavior.

| Role     | Step | Size    | Job |
|----------|------|---------|-----|
| Eyebrow  | -1   | 14px    | Overline / kicker above a Display, Headline, or prose Section-break Title. A small labelling line that introduces the heading it sits over. Weight 500, tracking 0; casing on hold (resist uppercase for now). Recessive. Fixed. |
| Display  | 14   | 76px    | Homepage hero statement. Lives outside the content flow, as page chrome. Scales. |
| Headline | 12   | 56px    | Subpage hero heading. The Display alternative at the hero slot. Scales. |
| Subhead  | 6    | 28px    | Headline's dedicated companion at the hero slot (supporting line under a Headline). Fixed. |
| Title 1  | 9    | 36px    | Content h1 — top heading *inside* prose. Independent count from the hero. Scales. |
| Title 2  | 7    | 30px    | Content h2. Scales. |
| Title 3  | 4    | 24px    | Content h3. Scales. |
| Title 4  | 2    | 20px    | Content h4 — floor of the heading ladder. Fixed. |
| Subtitle | 1    | 18px    | The Title ladder's companion (supporting line under a content Title). Fixed. |
| Lead     | 3    | 22px    | Intro/standfirst paragraph — body-tier emphasis, not part of the heading ladder. Fixed. |
| Body     | 0    | 16px    | Default reading text. Fixed. |
| Body Sm  | -1   | 14px    | Secondary/dense reading text. Fixed. |
| Caption  | -2   | 12px    | Metadata, smallest text. Fixed. |

**Hero and content are separate tiers.** The hero slot (Display, or Headline with Subhead — not both) sits above the content region as page chrome. The content region runs its own independent heading count starting at Title 1, regardless of what the hero above it was. The two do not collide because they belong to different structural tiers, which is the same reason a CMS often demotes a body's own `h1` when the page already has its hero heading.

**The Eyebrow is a composition role, not a demotion.** The prose Eyebrow is an overline used *within* the prose composition components (Page Title, Section Break) as a deliberate kicker above the heading — it is chosen, not the result of a title stepping aside. This distinguishes it from the product-context eyebrow *treatment* (see Product / UI), where "eyebrow" is what a Card / Panel title becomes when it yields the primary slot. Same 14px recessive treatment (weight 500, tracking 0; casing on hold), different intent: prose eyebrow = a labelling overline you add; product eyebrow = a title demoted by the primary-slot rule. The shared treatment is deliberate so the two read consistently, but they are separate roles in separate contexts. The Eyebrow appears only in the composition components; ordinary in-flow prose (e.g. from markdown) never uses it.

## Semantic Layer: Product / UI

Product carries fewer roles than Prose, since dashboard chrome has shallower structure than rich content. Deep markdown or help content on a product surface uses the Prose set instead. Size roles are kept minimal; the depth of choice for the rich UI kit comes from the usage-mapping table below (documentation, not tokens), with differences beyond size carried by weight and colour. Size, weight, and colour are three orthogonal axes, kept separate.

**Consolidated token table.** Every role below carries its own font-size — one row per Figma variable. Values for scaling roles are the `xl` (≥1280px) defaults; per-breakpoint values are in Responsive Behavior. This is the flat view for variable creation; the subsections after it add the treatment, mapping, and routing detail.

| Role | Step | Size | Job |
|------|------|------|-----|
| Dashboard head | 9 | 36px | Top page/dashboard title, Bold. Takes an optional subtitle. Scales. |
| Section head | 6 | 28px | Groups cards within a page; may appear several times. Takes an optional subtitle. Scales. |
| Card / Panel title | 2 | 20px | Title at card *or* panel level. Dominant treatment; also has eyebrow (14px) and subtitle (16px) treatments — see below. Fixed. |
| Metric | 9 | 36px | Hero/stat numerals, Bold. Scales in step with Dashboard head. |
| Metric Sm | 2 | 20px | Secondary stat, in-card KPI, Bold. Fixed at the 20px panel-title size; small metrics rarely sit beside a title, so the shared size is fine in context. |
| Body | 0 | 16px | Default UI text, field values, menu items. Fixed. |
| Body Sm | -1 | 14px | Secondary/dense text, hints, table cells. Fixed. |
| Label | -1 | 14px | Control identifiers (buttons, inputs, tabs). Weight 500. Fixed. |
| Label Sm | -2 | 12px | Label in dense contexts; also chart group labels / column headers. Weight 500. Fixed. |
| Caption | -2 | 12px | Metadata, legends, badges, data-point values. Fixed. |

Ten roles, ten font-size variables. The eyebrow (14px) and subtitle (16px) treatments, and the data-labelling roles (Group label → Label Sm, Data point → Caption), reuse the steps above rather than adding variables, so they need no new tokens — only the correct alias plus weight and colour. The subsections below describe how.

### Structural hierarchy (recursive)

Container-level headings. The upper rungs (Dashboard, Section) are distinct sizes. At the card and panel level the size stops descending: Card and Panel share one title role, and the difference between them in a given layout is carried by treatment (dominant, eyebrow, or absent), assigned by the primary-slot rule rather than by a distinct size per level. This is what makes the ladder recursive without multiplying tokens.

| Role          | Step | Size    | Job |
|---------------|------|---------|-----|
| Dashboard head| 9    | 36px    | Top page/dashboard title, Bold. Scales. |
| Section head  | 6    | 28px    | Groups cards within a page. Scales. |
| Card / Panel title | 2 | 20px | Title at card *or* panel level. One role, three treatments (below). Fixed. |

Both Dashboard head and Section head may carry a **subtitle**: the same subtitle treatment used under a Card / Panel title (16px, Regular, recessive grey), coupled tightly beneath the heading. It is one shared treatment, not a per-head token. Under a Section head, ordinary body text may also follow, which is simply Body. Section heads often appear several times down a page to mark card groups, so they are kept calm (28px, one step above the following content) rather than made large.

**Card / Panel title — the three treatments.** Which one applies is a composition decision (see Composition & Hierarchy Resolution) rather than a separate size token:

| Treatment | Step | Size | Weight | Colour | When |
|-----------|------|------|--------|--------|------|
| Dominant  | 2  | 20px | Semibold (600) | primary | The element owns its container's primary slot |
| Eyebrow (demoted) | -1 | 14px | 500, tracking 0 (casing on hold) | secondary | A title that steps aside — an umbrella over sibling panels, or a card title yielding to a chart's own title. Same treatment as a chip-card metric label. |
| Subtitle  | 0  | 16px | 400 | recessive grey | Supporting line beneath a *dominant* title |

The eyebrow at 14px coincides with `Label` (step −1): a demoted title is a label, so it reuses that step and its styling (weight 500, tracking 0; casing on hold) rather than introducing a new one. The subtitle at 16px coincides with `Body` (step 0), separated from it by colour rather than size. The subtitle is a shared treatment: the same 16px recessive-grey line sits beneath a Dashboard head, a Section head, or a Card / Panel title.

### Metric

| Role      | Step | Size    | Job |
|-----------|------|---------|-----|
| Metric    | 9    | 36px    | Hero/stat numerals, Bold. Scales in step with Dashboard head. |
| Metric Sm | 2    | 20px    | Secondary stat, in-card KPI, Bold. Fixed at the panel-title size (20px). Small metrics rarely sit beside a title, so sharing that size reads fine in context; weight (Bold) distinguishes it from a Semibold panel title. |

**Line-height and alignment.** A metric standing alone, or set in flowing text, uses its standard line-height. But a metric sitting beside labels is not flowing text — it is a single value to be aligned with its companions, and a reading line-height pushes it off that alignment: the tall line-box centres the numeral and adds leading that a small label does not have, so the two no longer share a baseline. In any label or comparison cluster a metric therefore uses a **tight, near-1 line-height** (off the 4px grid by design, like the fluid and compact line-heights), and the cluster is aligned as a unit. Three cases:

- **Inline baseline** ("1,234 users"): number and word on one line. Align to baseline; the near-1 line-height keeps the numeral's baseline from drifting inside an oversized box.
- **Stacked KPI** (number over label): metric above, label below. Tight line-height on the metric so the gap to the label is the gap actually set, not gap-plus-leading; the gap itself comes from the flow scale.
- **Change / comparison cluster** (e.g. a large `50%` with a small `40` / `vs` / `20` stack beside it): the large metric and the small stack are **centred against each other**, not baseline-aligned — baseline-aligning a large numeral to a small multi-line block makes it appear to sag. Both the metric and the small stack take tight line-heights so the centring stays predictable. The comparison values and the "vs" are data labels, not metrics: they map to existing small roles (Caption or Body Sm, secondary colour; the connector quieter still), so the cluster is one Metric plus a small stack of existing roles, with no new token.

The rule in short: a metric in a label or comparison cluster takes a near-1 line-height, and the cluster aligns as a unit — baseline for a single-line inline pairing, centred for a stacked or comparison cluster. Standard line-height applies only to a metric in isolation or in flowing text.

### Data labelling (inside charts/tables)

Travels with the data object, independent of the structural ladder.

| Role | Maps to | Size | Job |
|------|---------|------|-----|
| Data title   | *routed* | — | Chart/table title. Routed by the primary-slot rule → takes the dominant Card/Panel title treatment when it owns the primary slot, else drops to eyebrow. |
| Group label  | Label Sm | 12px | Axis title, column header. |
| Data point   | Caption  | 12px | Cell value, legend entry, data label. |

### Body & label roles

| Role     | Step | Size | Default weight | Job |
|----------|------|------|----------------|-----|
| Body     | 0    | 16px | 400 | Default UI/reading text, field values, menu items. |
| Body Sm  | -1   | 14px | 400 | Secondary/dense text, hints, table cells, tooltips-body. |
| Label    | -1   | 14px | 500 | Functional identifiers on controls. Bundles the medium weight so it is a zero-decision choice. Same size as Body Sm; a separate role because it carries a weight expectation. |
| Label Sm | -2   | 12px | 500 | Same job, dense contexts (compact buttons, column headers). |
| Caption  | -2   | 12px | 400 | Metadata, smallest functional text, legends, badges. |

**Tight variant for single-line controls.** `Label` and `Label Sm` each have a **tight** treatment — identical family, size, and weight, but line-height `1.0` (leading-none) instead of the role's default reading line-height. It exists for **single-line interactive labels** — buttons, tabs, chips, and similar controls — where the text is one line, vertically centred, and the component's own padding governs its height. A reading line-height there adds a leading gap that fights the control's vertical centring and padding; leading-none keeps the text box tight so the control sizes predictably. This is the same reasoning as the Metric near-1 line-height in clusters: the role is right, but the component context wants a tighter line-box than flowing text. **Tight labels must not contain line breaks** — they are single-line only; multi-line label text uses the standard `Label` / `Label Sm`. The tight variant reuses the same size step and weight, so it adds no new size token — only a line-height treatment.

**Applying roles in UI components (standing convention).** These rules, derived from the canonical input component and validated across the UI set, govern which role a UI element takes — so new components resolve by element role, not by picking a size:

- **Control and nav labels → `Label`** (14 Medium; tight for single-line controls). This holds even where legacy sizing was 16px — form/control labels are the Label role, not a larger size. Small labels → `Label Sm`.
- **Input value, placeholder, and body copy → `Body`** (16).
- **Helper, hint, descriptive, and secondary text → `Body Sm`** (14).
- **Small functional text (metadata, counts) → `Caption`.**
- **Genuine component titles** (modal, callout, sidebar, panel headers) **→ `Card / Panel title`** (20). Sidebar/nav *section* titles are labels, not titles — they take `Label`, not a title role, so nav group headings stay small.

The through-line: emphasis and size in UI come from the role's place in the hierarchy and from padding, not from inflating text. When a legacy element used an off-scale size, it moves to the correct role even if that resizes it.

### UI element → role mapping

Every element below resolves to one of the roles above, differentiated by weight or colour — depth of choice without new tokens. To style a popover, look up "Popover body" and use `Body Sm`. The decision is made once, here, rather than re-litigated per component.

| UI element | Role | Differentiator |
|---|---|---|
| Input label | Label | — |
| Input hint / helper text | Body Sm | secondary color |
| Placeholder | Body | secondary color |
| Field value | Body | — |
| Button label | Label (tight) | single-line; leading-none |
| Button label (compact) | Label Sm (tight) | single-line; leading-none |
| Tab / nav item | Label (tight) | single-line; leading-none |
| Popover body | Body Sm | — |
| Tooltip | Caption | secondary color |
| Chart legend | Caption | — |
| Chart axis label | Caption | secondary color |
| Table column header | Label | Same size as cells, differentiated by weight (Medium 500) and secondary colour. A header labels the data, so it reads equal-or-stronger, not lighter |
| Table column header (dense grid) | Label Sm | Smaller only with compensating treatment: uppercase, tracked, secondary colour. 12px plain would read weaker than the cells |
| Table cell | Body Sm | — |
| Badge / tag | Caption | color from role ramp |
| Breadcrumb | Body Sm | secondary color |
| Toast / notification body | Body Sm | — |

---

## Semantic Layer: Chart typography

Charts are a distinct context, like prose and product — heavily used, and (as with the data-colour tokens) they warrant their own small typography subset. Chart text reuses the product scale's family and metrics where it can, and adds only what the product scale cannot express: a legible sub-floor tick size. This subset is deliberately minimal — four roles, not a parallel scale — and lives beside the product roles as `Chart/*`.

The role a chart element takes is fixed by what the element *is*, matching how Observable Plot structures a chart (titles, labels, ticks). Chart text is data, not UI chrome, so it is Regular weight except axis titles.

| Role | Step / size | Weight | Line height | Use |
|------|-------------|--------|-------------|-----|
| `Chart Axis Title` | 14px | 500 | 20 (normal) | Axis names, series/legend titles. Same metrics as product `Label`; chart-named for independent tuning. |
| `Chart Label` | 14px | 400 | 20 (normal) | Data and value labels (e.g. `£43.47k`), annotations. Same metrics as `Body Sm`. |
| `Chart Tick` | 14px | 400 | **1.0 (tight)** | Axis tick / scale labels (years, £ gridline values) at default density. Single-line, so leading-none keeps ticks tight against the axis. |
| `Chart Tick Sm` | 12px | 400 | **1.0 (tight)** | The smaller tick tier; sits at the caption floor (12px). Single-line, tight. A **compressed** density drops the pair to 12 / 11 (see notes). |

Notes:
- **Why a subset at all.** An audit of real chart exports found text at 16 / 14 / 12 / 10–11px. 14 and 12 map onto `Label` / `Body Sm` and the caption floor, but genuinely dense charts want an 11px tick that falls below the product floor. Rather than lower the product floor (which would ripple through UI), charts get their own tick roles. Same reasoning as the data-colour subset: charts have needs the general scale should not carry.
- **Tick density.** Default ticks are **14** (`Chart Tick`) with **12** (`Chart Tick Sm`) for the smaller tier — the two emitted tokens. A **compressed** density (dense grids, small multiples) drops these to **12 / 11**; 11 is the sub-floor. Wild exports occasionally show ~10px (and a known rem-export bug writes `0.86` ≈ 14px — always correct that to the intended role); 10px is nudged up to 11 for legibility. Do not go below 11.
- **Tight line-height on ticks** mirrors the tight Label / Metric treatment: single-line labels want a line-box equal to the font size so they sit precisely against axes and gridlines.
- Charts in Figma are **representative**, not data-accurate (Observable Plot is authoritative). These roles exist so chart specimens and the chart chrome slot read on-system, and so chart SVG imports can be repointed off raw fonts onto real roles.

---

## Font Weight

The typeface is **Inter**, with all weights available, so weights are used freely without risk of browser-synthesised faux weights. The system uses four:

| Token | Inter weight | Numeral |
|-------|--------------|---------|
| `--primitive-typography-font-weight-regular`   | Regular  | 400 |
| `--primitive-typography-font-weight-medium`    | Medium   | 500 |
| `--primitive-typography-font-weight-semi-bold` | Semibold | 600 |
| `--primitive-typography-font-weight-bold`      | Bold     | 700 |

Named semantically rather than by numeral, so the underlying value can be retuned globally — Semibold 600 changed once — without touching a single role. (Note the emitted spelling: `semi-bold` is hyphenated; there is no `font-weight-semibold`.) Weight is the third orthogonal axis alongside size and colour.

### Identity weight vs. emphasis weight

Weight splits into two kinds, handled differently:

- **Identity weight** is part of what a role is: a Label is Medium, a heading is Semibold. It is bundled into the role's default, the same way size and colour are. Asking an author to remember "Label, and also set 500" reintroduces the decision the role exists to remove, and authors forget it inconsistently, so labels drift. Identity weight is not separately chosen.
- **Emphasis weight** rides on top of a role: a bold run inside body text, or a deliberately de-emphasised caption. It stays a separate modifier, because bundling it would force role variants (`body`, `body-bold`) — the same size-sprawl pattern, on another axis.

So weight is neither fully free (which produces inconsistent headings) nor fully welded (which produces variant sprawl): a default per role, overridden only when the job is genuinely emphasis.

### Per-role identity weights

**Prose.** The hero tier (Display, Headline) is Bold and content headings are Semibold; the weight step reinforces the separation between hero and content tiers. Reading-level text is Regular.

| Role | Weight |
|------|--------|
| Eyebrow | Medium (500) |
| Display | Bold (700) |
| Headline | Bold (700) |
| Subhead | Regular (400) |
| Title 1–4 | Semibold (600) |
| Subtitle | Regular (400) |
| Lead | Regular (400) |
| Body | Regular (400) |
| Body Sm | Regular (400) |
| Caption | Regular (400) |

**Product.** More restrained than prose: the two top roles carry weight, everything below stays Semibold or lighter. Dashboard head and Metric are **Bold** — the page title and the hero stat are the elements a dashboard most wants to anchor on. Section head stays Semibold, which preserves a visible weight step between the page title and the section headings that repeat down the page (they are close in size, so the weight contrast does the separating). No product text below the top tier uses Bold.

| Role | Weight |
|------|--------|
| Dashboard head | Bold (700) |
| Metric | Bold (700) |
| Section head | Semibold (600) |
| Metric Sm | Bold (700) |
| Card / Panel title — dominant | Semibold (600) |
| Card / Panel title — eyebrow | Medium (500) |
| Card / Panel title — subtitle | Regular (400) |
| Body | Regular (400) |
| Body Sm | Regular (400) |
| Label | Medium (500) |
| Label Sm | Medium (500) |
| Caption | Regular (400) |

### Emphasis modifier

A small, role-agnostic layer that applies regardless of which role it lands on:

```css
.text-strong { font-weight: var(--primitive-typography-font-weight-semi-bold); }  /* bump for emphasis */
.text-soft   { font-weight: var(--primitive-typography-font-weight-regular); }    /* de-emphasize */
```

### Per-context weight identity

"Headline is Bold in prose but Semibold in product" is an identity difference rather than emphasis, so it rides the same context-theme switch as the flow ramp and leading, with no new mechanism. A role's default weight can be a themed variable:

```css
.flow-prose   { --headline-weight: var(--primitive-typography-font-weight-bold); }
.flow-product { --headline-weight: var(--primitive-typography-font-weight-semi-bold); }
```

The author picks a context; weight identity follows.

---

## Composition & Hierarchy Resolution

Dominance is a property of position in a container rather than of a token. Two ladders — structural (where a container sits) and data-labelling (hierarchy inside a data object) — meet inside a card, and are resolved by one rule rather than by adding size tokens.

**The primary-slot rule (recursive).** Every titling container has one primary slot. Whatever occupies it takes the dominant title treatment (20px); a title that yields the slot drops to the eyebrow treatment (14px) or is omitted. "Container" resolves to the nearest titling level:

- **One titled data element in a card:** the card is the container. If the chart or table has its own title, that title is dominant (20px) and the card's own title drops to an eyebrow above it, or is absent. If the data element is untitled, the card title is dominant.
- **Two or more co-equal titled elements in a card:** each element gets its own Panel, and the panel is the container. Each panel title is dominant (20px) within its panel — co-equal because they are primary in sibling panels rather than competing for one slot. The card title then either sits above as an eyebrow (14px) labelling the collection, or is absent, leaving the dominant panel titles as the top of that card's hierarchy.
- **Chip cards** (small grouped cards, one metric each): the label sits in the eyebrow treatment (14px) above the Metric numeral — the same treatment a demoted title takes, which is why they read consistently when a chip group sits near a titled card.

**The demotion convention.** Demotion is a treatment change, not a subtle nudge: a title yielding its slot drops from dominant (20px, primary) to eyebrow (14px, weight 500, tracking 0, casing on hold, secondary). A dominant title's supporting line uses the subtitle treatment (16px, recessive grey). These three treatments — dominant, eyebrow, subtitle — cover every card and panel titling combination without a dedicated "recessive title" token.

Full structural ladder, recursive (card and panel share the title role; treatment distinguishes them):

`Dashboard head → Section head → Card / Panel title {dominant | eyebrow | absent} → [Data title → Group label → Data point]`

---

## Responsive Behavior: Breakpoints

The responsive behaviour is designed mobile-first: values are set at `base` so the hierarchy is correct on the smallest screen, then grow upward. The governing rule is that a role never overtakes the role above it and never drops below the role beneath it, at any breakpoint. A role scales only if the roles it must stay ordered against scale with it. This is why the content Title ladder and the two Metric roles scale as groups rather than individually — scaling one alone is what produced the earlier inversions (Title 1 below Title 2, Metric below Metric Sm).

Scaling roles: **Prose** Display, Headline, Title 1, Title 2, Title 3 (Title 4 is the fixed ladder floor); **Product** Dashboard head, Metric, Section head. Everything else is fixed at every breakpoint.

The matrices below list every role at every breakpoint; read a column top-to-bottom to confirm the hierarchy holds at that width. Breakpoints: `base` <640, `sm` ≥640, `md` ≥768, `lg` ≥1024, `xl` ≥1280.

### Prose — full matrix (px)

<!-- GEN:prose-matrix START -->
| Role (high → low) | base | sm | md | lg | xl | |
|---|---|---|---|---|---|---|
| Eyebrow | 14 | 14 | 14 | 14 | 14 | fixed |
| Display | 40 | 48 | 56 | 64 | 76 | scales |
| Headline | 32 | 36 | 40 | 48 | 56 | scales |
| Subhead | 28 | 28 | 28 | 28 | 28 | fixed |
| Title 1 | 28 | 30 | 32 | 32 | 36 | scales |
| Title 2 | 24 | 26 | 28 | 30 | 30 | scales |
| Title 3 | 22 | 22 | 22 | 24 | 24 | scales |
| Title 4 | 20 | 20 | 20 | 20 | 20 | fixed |
| Subtitle | 18 | 18 | 18 | 18 | 18 | fixed |
| Lead | 22 | 22 | 22 | 22 | 22 | fixed |
| Body | 16 | 16 | 16 | 16 | 16 | fixed |
| Body Sm | 14 | 14 | 14 | 14 | 14 | fixed |
| Caption | 12 | 12 | 12 | 12 | 12 | fixed |
<!-- GEN:prose-matrix END -->

Two intentional coincidences, neither an inversion. Subhead (28) equals Title 1 at `base` only; they sit in different regions (hero companion versus first content heading) and differentiate by weight and colour. Lead (22) sits above Title 4 (20) at all breakpoints; Lead is body-tier emphasis, not ranked within the heading ladder, so a lead paragraph reading slightly larger than a fourth-level sub-heading is expected.

### Product — full matrix (px)

<!-- GEN:product-matrix START -->
| Role (high → low) | base | sm | md | lg | xl | |
|---|---|---|---|---|---|---|
| Dashboard head | 28 | 30 | 32 | 32 | 36 | scales |
| Metric | 28 | 30 | 32 | 32 | 36 | scales |
| Section head | 24 | 24 | 26 | 26 | 28 | scales |
| Card / Panel title | 20 | 20 | 20 | 20 | 20 | fixed |
| Metric Sm | 20 | 20 | 20 | 20 | 20 | fixed |
| Body / Field value | 16 | 16 | 16 | 16 | 16 | fixed |
| Body Sm / Label | 14 | 14 | 14 | 14 | 14 | fixed |
| Caption | 12 | 12 | 12 | 12 | 12 | fixed |
| Label Sm | 12 | 12 | 12 | 12 | 12 | fixed |
<!-- GEN:product-matrix END -->

One intentional tie, not an inversion: Dashboard head equals Metric at every breakpoint — a heading and a numeral that rarely sit adjacent, scaled together so the pairing stays consistent. Metric Sm is fixed at 20px, level with Card / Panel title; the two rarely appear together, and weight (Bold Metric Sm versus Semibold panel title) separates them where they do. If a hero metric needs to out-rank a page title on a given surface, promote the Metric one tier locally (Metric → Dashboard-head+1) rather than changing the global tokens.

**Figma note.** Each breakpoint maps onto a variable mode: one mode per breakpoint, with every role taking its value from the matrix column. Fixed roles carry the same value in all modes; scaling roles differ per mode. Since every column is pre-verified for order, no mode can produce an inverted hierarchy.

---

## Fluid Tokens (optional)

**Status: spec-only — not yet emitted.** These four tokens exist in neither the cjs layer nor the generated CSS (`clamp()` appears in neither). Their intended home is the cjs post-SD layer, where `clamp()` and unitless line-heights belong alongside the tight-label and compact-leading treatments; until built there this section is the specification, not shipped output.

The stepped tokens above are the canonical set. Fluid is an opt-in parallel variant, offered only on the four display-tier roles where per-breakpoint jumps are most visible: Prose Display, Prose Headline, Product Dashboard head, and Product Metric. The rest stay stepped — body, label, and caption need consistency and 4px-grid line-heights, and the mid-tier scalers (the Title ladder, Section head, Metric Sm) have too small a per-step range for stepping to read as a jump.

**How to use.** Each fluid role is a separate token suffixed `-fluid`. A surface chooses per use: `--display` for the stepped literal (the cjs resolved local), `--display-fluid` for smooth interpolation. Both are maintained; neither replaces the other.

**Not a ratio in disguise.** The `min` and `max` of every `clamp()` are literal scale steps (the base and `xl` values from the responsive tables). Only the delivery between them is interpolated; the scale itself stays discrete and authored.

**Anchors.** Flat at the base value ≤640px, fluid from 640→1280px, capped at the `xl` value ≥1280px — matching the stepped tokens at both ends and differing only in between.

| Fluid token | Range | clamp() |
|---|---|---|
| `--display-fluid`        | 40 → 76px | `clamp(2.5rem, 0.25rem + 5.625vw, 4.75rem)` |
| `--headline-fluid`       | 32 → 56px | `clamp(2rem, 0.5rem + 3.75vw, 3.5rem)` |
| `--dashboard-head-fluid` | 28 → 36px | `clamp(1.75rem, 1.25rem + 1.25vw, 2.25rem)` |
| `--metric-fluid`         | 28 → 36px | `clamp(1.75rem, 1.25rem + 1.25vw, 2.25rem)` |

**Line-height for fluid tokens is unitless.** A fixed px line-height cannot track a fluid size, so fluid roles use a unitless multiplier instead of a 4px-grid value. This works because display-tier text sits in its own generous whitespace rather than stacking densely against grid-aligned elements, so the grid-alignment rule that governs body and label line-heights does not apply here. Recommended multipliers, each a single value spanning the token's range and landing between its base and xl stepped ratios: Display 1.1, Headline 1.15, Dashboard head and Metric 1.2.

## Spacing Scale

The spacing system is independent of the type scale and stands on its own. Every line-height in the type scale lands on a standard rung of this scale, so no custom rungs are required; the progression below is clean and standard.

### Grid: 4px base, 8px where possible

Layout rhythm defaults to 8px; the 4px sub-grid is for the places where type (font-size or line-height) needs to compose against spacing.

### Primitive spacing tokens

Numbered so the index directly encodes the multiplier of the 4px unit (`--primitive-spacing-4` = 4 × 4px = 16px). This is the canonical spacing scale; it supersedes the deprecated t-shirt scale (below).

<!-- GEN:spacing-table START -->
| Token | Value (px) | Value (rem) |
|-------|-----------|-------------|
| `--primitive-spacing-0` | 0px | 0rem |
| `--primitive-spacing-1` | 4px | 0.25rem |
| `--primitive-spacing-2` | 8px | 0.5rem |
| `--primitive-spacing-3` | 12px | 0.75rem |
| `--primitive-spacing-4` | 16px | 1rem |
| `--primitive-spacing-5` | 20px | 1.25rem |
| `--primitive-spacing-6` | 24px | 1.5rem |
| `--primitive-spacing-7` | 28px | 1.75rem |
| `--primitive-spacing-8` | 32px | 2rem |
| `--primitive-spacing-9` | 36px | 2.25rem |
| `--primitive-spacing-10` | 40px | 2.5rem |
| `--primitive-spacing-11` | 44px | 2.75rem |
| `--primitive-spacing-12` | 48px | 3rem |
| `--primitive-spacing-14` | 56px | 3.5rem |
| `--primitive-spacing-16` | 64px | 4rem |
| `--primitive-spacing-20` | 80px | 5rem |
| `--primitive-spacing-24` | 96px | 6rem |
| `--primitive-spacing-28` | 112px | 7rem |
| `--primitive-spacing-32` | 128px | 8rem |
| `--primitive-spacing-36` | 144px | 9rem |
| `--primitive-spacing-40` | 160px | 10rem |
| `--primitive-spacing-44` | 176px | 11rem |
| `--primitive-spacing-48` | 192px | 12rem |
| `--primitive-spacing-52` | 208px | 13rem |
| `--primitive-spacing-56` | 224px | 14rem |
| `--primitive-spacing-60` | 240px | 15rem |
| `--primitive-spacing-64` | 256px | 16rem |
| `--primitive-spacing-72` | 288px | 18rem |
| `--primitive-spacing-80` | 320px | 20rem |
| `--primitive-spacing-96` | 384px | 24rem |
| `--primitive-spacing-px` | 1px | 0.0625rem |
| `--primitive-spacing-0-5` | 2px | 0.125rem |
| `--primitive-spacing-1-5` | 6px | 0.375rem |
| `--primitive-spacing-2-5` | 10px | 0.625rem |
| `--primitive-spacing-3-5` | 14px | 0.875rem |
<!-- GEN:spacing-table END -->

Sub-steps cover the finer gaps (dots are invalid in CSS idents, so they are spelled out): `--primitive-spacing-px` 1px, `--primitive-spacing-0-5` 2px, `--primitive-spacing-1-5` 6px, `--primitive-spacing-2-5` 10px, `--primitive-spacing-3-5` 14px. The low end aligns with Tailwind's default spacing scale (`p-4` → 16px), so no custom rungs are required.

### Retiring the t-shirt scale

A parallel t-shirt scale (`--spacing-{xxs…9xl}` plus an em set `--typography-spacing-*`, 14 rungs each) still emits today and is **deprecated-but-live**. The numbered `--primitive-spacing-{n}` scale is canonical; the t-shirt scale is being retired in phases: (1) the numbered scale emits — done; (2) migrate component bindings from `--spacing-{tshirt}` onto `--primitive-spacing-{n}` (or a thin semantic alias that references the primitive via `var()`, never restating values); (3) drop the t-shirt emit once nothing references it, verified with a full scan. Steps 2–3 are repo work; author against the numbered scale now.

### Spacing around type comes from the spacing scale

Whitespace around text — margins, gaps, card padding — comes from `--primitive-spacing-{n}` rather than from the font-size or line-height primitives. Line-height governs space within a text block; spacing tokens govern space between elements.

---

## Content Flow

Vertical rhythm — the space between stacked blocks — is a property of the context rather than of the type roles inside it. A Title 2 in a prose article wants generous air above it; the same Title 2 in a dense dashboard card wants very little. Margin is therefore not bundled onto a type rung, which would force context-specific rung variants and break the separation of the three axes. Spacing is instead owned by a small set of context-themed flow classes.

### The semantic flow ramp

Authors think in relationships rather than pixel counts. The whole vocabulary is a four-step density ramp:

| Role | Meaning |
|------|---------|
| `--flow-tight`   | Minimal gap between closely related blocks |
| `--flow-default` | Standard block-to-block gap (paragraph to paragraph) |
| `--flow-loose`   | Deliberate breathing room |
| `--flow-section` | Major break — e.g. above a content Title |

These names do not resolve to raw `--primitive-spacing-{n}` values at the point of use. A context theme maps them to rungs, so density is a single switch rather than an edit to every rule.

### Context themes

Three contexts, each remapping the ramp to spacing rungs. A context is a block that redefines the four variables; nothing else changes.

```css
.flow-prose {
  --flow-tight:   var(--primitive-spacing-1);   /*  4 */
  --flow-default: var(--primitive-spacing-4);   /* 16 — paragraph to paragraph */
  --flow-loose:   var(--primitive-spacing-6);   /* 24 */
  --flow-section: var(--primitive-spacing-10);  /* 40 — above a Title */
}
.flow-product {
  --flow-tight:   var(--primitive-spacing-1);   /*  4 */
  --flow-default: var(--primitive-spacing-2);   /*  8 */
  --flow-loose:   var(--primitive-spacing-4);   /* 16 */
  --flow-section: var(--primitive-spacing-6);   /* 24 */
}
.flow-compact {                  /* tooltips, alerts, dialogs */
  --flow-tight:   var(--primitive-spacing-1);   /*  4 */
  --flow-default: var(--primitive-spacing-1);   /*  4 */
  --flow-loose:   var(--primitive-spacing-2);   /*  8 */
  --flow-section: var(--primitive-spacing-2);   /*  8 */
}
```

### The flow rule ("owl")

Consecutive children of a flow container get default spacing automatically; a few structural exceptions get more. Authors mostly write nothing — spacing follows from living inside a flow context.

```css
.flow > * + *                                      { margin-top: var(--flow-default); }
.flow > :is(h1, h2, h3, .title-1, .title-2, .title-3) { margin-top: var(--flow-section); }
```

### Compound units and coupling

A caption is not the next block after an image; it is bound to it. The gap binding a companion to its primary (caption to image, citation to quote) is coupling, a different job from flow rhythm. Coupling is resolved structurally, by nesting:

```css
figure > figcaption { margin-top: var(--flow-tight); }
```

**The load-bearing convention:** a companion lives inside a compound-unit wrapper with its primary (`<figure>`, a quote-and-cite wrapper) rather than as a loose sibling in the flow. The owl selector targets direct children of `.flow`; because a `figcaption` is a child of `figure` rather than of `.flow`, it is invisible to the flow rhythm and never receives the block-to-block gap. The `<figure>` participates in the flow as one block, and its insides are its own concern — the same internal-versus-external split as a card and its layout.

The convention carries real weight: a caption that leaks into the flow as a bare sibling picks up paragraph spacing and looks wrong. The wrapper is the mechanism.

Coupling reuses `--flow-tight` rather than introducing a dedicated token. A separate `--flow-couple` role is worth adding only if a case appears where a companion gap must be tighter than the tightest flow step. From the three contexts above, that could arise only in prose, and until it does the extra name is cognitive load without payoff.

### Line-height density

Denser leading in compact contexts (tooltips, alerts, dialogs) is the same context switch applied to line-height rather than a new mechanism. One boundary stays firm: the 4px-grid px line-heights and a compact unitless multiplier are two regimes, not blended per-element. Default document flow keeps the grid-aligned px line-heights, which compose against the spacing grid; compact contexts let body-tier text switch to a tighter unitless multiplier (~1.3), since tooltips and dialogs are small and self-contained and do not stack against the page grid.

```css
.flow-compact { --flow-leading: 1.3; }   /* body-tier text in compact contexts */
```

### Hero spacing (proportional)

Flow spacing is fixed and rung-based for everything in the reading flow, since body rhythm should not change with viewport. But hero-tier elements (Display, Headline) scale, and fixed space around a scaling element feels cramped once the element is large: a 76px Display with the same gap above it as a 40px Display looks tight. The resolution is not breakpoint-aware flow, which would destabilise body rhythm, but spacing that scales on the same axis as the type — proportional to the element's own size.

**CSS — self-scaling, one value.** Because hero line-heights are unitless, hero margins can be `em`-based and grow with the type, with no breakpoint logic:

```css
.display  { margin-block-start: 0.75em; }   /* 0.75 × the element's own size */
.headline { margin-block-start: 0.75em; }
```

**Figma — precomputed per breakpoint.** Figma has no `em` or size-relative spacing, so compute `0.75em` of each element's per-breakpoint size and store the result as a per-mode `hero/space-before` variable, using the same mode structure as the type sizes. Same visual result, entered rather than derived:

| Role | base | sm | md | lg | xl (+1536) |
|------|------|----|----|----|-----------|
| Display  (size) | 40 | 48 | 56 | 64 | 76 |
| Display  space-before | 30 | 36 | 42 | 48 | 56 |
| Headline (size) | 32 | 36 | 40 | 48 | 56 |
| Headline space-before | 24 | 28 | 30 | 36 | 42 |

The ratio (0.75em) is tunable. It is set so hero space stays modest on small screens (30px above a 40px base Display) and grows past the fixed `flow-section` (40px) on wide screens (56px above a 76px xl Display), which produces the wanted "breathe more on wide screens" behaviour. Like fluid line-height, these values sit off the 4px grid by design — hero elements occupy their own generous whitespace and do not stack densely against the grid. The companion gap below a hero (to its Subhead) stays coupling (`flow-tight`); only the breathing space above is proportional.

### Readable width (prose max-width)

Prose columns are width-constrained for readability. The comfortable line length is ~45–75 characters; past ~75ch the return sweep gets harder and comprehension drops, so the ceiling is capped rather than maximised. The column width is governed by body readability: headings sit larger and wrap earlier within the same column, and the column is not widened to suit a heading.

Expressed as a fluid clamp between a lower bound (narrow screens) and a capped ceiling (wide screens):

```css
.flow-prose { --readable-width: clamp(45ch, 90vw, 70ch); }
.flow-prose .prose-column { max-width: var(--readable-width); }
```

The ceiling sits at 70ch rather than 65: on very wide screens (1440–1536) a 65ch column can feel stranded in empty canvas, and 70ch recovers some width without crossing the readability limit. Beyond ~72ch the line is too long; the resolution for "too narrow on wide screens" is breakout, described below, rather than a longer line.

**Pixel equivalents (Inter, 16px body — `1ch ≈ 8.8px`):** 65ch ≈ 572px, 70ch ≈ 616px, 72ch ≈ 634px. `ch` depends on the body font and size, so measure the sixty-"0" string to confirm and re-measure if the body size changes. In Figma (no `ch` unit) store the chosen ceiling — 616px for 70ch — as a `readable-width` variable and bind the prose section's max-width to it.

**Breakout.** A column feeling narrow is usually not about the measure but about the column standing alone in the width. Rather than lengthening the line, let specific elements exceed the readable column while body text stays at 70ch: images, figures, tables, code blocks, and pull quotes can break out wider, or full-bleed. The page then reads as using the full width while the running text stays readable. This is the intended way to use wide viewports; widening body text is not.

### What an author holds in their head

Pick a context (`prose`, `product`, or `compact`); wrap companions with their primary; everything else follows automatically. No margin is computed and no rung looked up. A new surface with its own density is one new theme remapping four variables — the bounded flexibility that keeps the system from sprawling.

---

## Layout Grid

This system sits one level above type and is independent of it.

**The core rule:** a column grid is a placement tool rather than a spacing tool. It answers where a block sits and how wide it is, not how much padding is inside a button. Grid styles apply to top-level container and page frames rather than to component frames. Components use Auto Layout with padding and gap bound to spacing tokens, which stay constant regardless of the grid context they are dropped into.

Grid gutter and container padding come from **dedicated grid tokens** (`--grid-spacing-{mode}-{contained|fluid}-{gutter|container-padding}`) that resolve from the numbered primitive spacing scale (`--primitive-spacing-{n}`). They are a separate semantic layer from the flow ramp: flow governs vertical rhythm between stacked blocks, grid tokens govern horizontal structure. Both resolve to `--primitive-spacing-{n}` underneath, but they retune independently. The edge space is always the container's padding, and the grid's own margin is 0 — the grid describes columns and gutters inside the padded width.

There are two grid archetypes, chosen by surface. They are distinct grids with their own token values, not one grid stretched to fit both.

### Contained grid

Centred, max-width, with edge space that grows as the viewport widens. For document-like surfaces — prose, marketing, settings, forms — where content should not sprawl.

The edge space is the **container's padding**, not a grid margin. The container (frame) carries horizontal padding; the column grid sits inside that padded area with its **own margin set to 0**. This matches how Tailwind's `container` works — padding owns the edge, the 12-column grid lives within it — and avoids double-counting the edge space, which happens if both the frame padding and the grid margin try to inset from the same edge.

| Breakpoint | Columns | Container padding | Gutter |
|---|---|---|---|
| base (<640) | 4 | 16px (`--primitive-spacing-4`) | 16px (`--primitive-spacing-4`) |
| sm (≥640) | 6 | 32px (`--primitive-spacing-8`) | 20px (`--primitive-spacing-5`) |
| md (≥768) | 8 | 32px (`--primitive-spacing-8`) | 24px (`--primitive-spacing-6`) |
| lg (≥1024) | 12 | 64px (`--primitive-spacing-16`) | 24px (`--primitive-spacing-6`) |
| xl (≥1280) | 12 | 80px (`--primitive-spacing-20`) | 32px (`--primitive-spacing-8`) |
| 2xl (≥1536) | 12 | 96px (`--primitive-spacing-24`) | 32px (`--primitive-spacing-8`) |

Container padding is applied to the frame; grid margin is 0; gutter is the grid's column gap. In Figma, set the frame's horizontal padding to the value above and the Layout Grid's margin to 0, so the grid aligns to the padded content width rather than overflowing it.

### Fluid grid

Full-bleed, columns that stretch to fill, with **constant** edge space that does not grow with the viewport. For dashboards and application shells, where the canvas should consume the available width.

As with the contained grid, the edge space is the canvas frame's **padding**, and the grid's own margin is 0. The difference is only that the padding stays constant across breakpoints rather than growing.

| Breakpoint | Columns | Container padding | Gutter |
|---|---|---|---|
| base (<640) | 4 | 16px (`--primitive-spacing-4`) | 16px (`--primitive-spacing-4`) |
| sm (≥640) | 6 | 16px (`--primitive-spacing-4`) | 16px (`--primitive-spacing-4`) |
| md (≥768) | 8 | 24px (`--primitive-spacing-6`) | 16px (`--primitive-spacing-4`) |
| lg (≥1024) | 12 | 24px (`--primitive-spacing-6`) | 16px (`--primitive-spacing-4`) |
| xl (≥1280) | 12 | 24px (`--primitive-spacing-6`) | 16px (`--primitive-spacing-4`) |
| 2xl (≥1536) | 12 | 24px (`--primitive-spacing-6`) | 16px (`--primitive-spacing-4`) |

The 16px gutter is a deliberate, uniform card-tiling gap. It runs looser than the 8px product vertical flow, so cards sit a little more generously apart horizontally than content stacks within them — a conventional dashboard look. One relationship keeps the field reading as tiled rather than loose: the gutter should not exceed the card's own interior padding. The edge padding stays at or above the gutter so it frames the card field against the viewport.

The fluid grid keeps padding constant and modest so the canvas stays full-width rather than centring, and holds the gutter uniform at 16px so cards tile at a consistent density across breakpoints. Card gutter (space between cards, owned by the grid) and card padding (space inside a card, owned by the card) are separate values; horizontal density is tuned via the gutter, not the padding.

**The side panel sits outside the canvas grid.** A dashboard's control panel is app chrome, not a grid column. The fluid grid applies to the canvas region only, and the canvas fills the width remaining beside the panel. When the panel is dismissed — fully, via a burger, or to a thin tab rail — the canvas reflows into the reclaimed width automatically, because the grid fills its container rather than assuming a fixed panel width.

**Cards bind to columns.** Dashboard cards span whole grid columns as the default. A card that genuinely needs a width the columns do not offer may span an explicit width off the grid, the same way a figure breaks out of the prose column — a deliberate, occasional exception. If such exceptions exceed roughly one in ten cards, revisit the column count rather than accumulating one-off widths.

### Figma

One Layout Grid style per breakpoint tier per archetype (`Contained/base`…`Contained/2xl`, `Fluid/base`…`Fluid/2xl`), applied to container and page frames. The contained styles carry a max-width; the fluid styles stretch. Sections reference the grid for span and position; content inside them uses Auto Layout and spacing tokens.

---

## Semantic Layer: Colour

Colour follows the same two-tier discipline as the rest of the system: a **primitive palette** (referenced by token, never directly) feeds a **semantic layer** of role-named tokens. Components bind to semantic tokens only. The system is themed as one theme with two **modes** (light / dark); every semantic token carries a value per mode, so a component bound to a semantic token themes automatically.

### Primitive palette

Ten hues — grey, blue, green, yellow, orange, red, pink, darkpink (plus purple and turquoise in the data set) — each in eleven steps (100–1100), seeded from the GLA brand and tuned per mode. Primitives are the raw material; product and component work never references them directly. They exist to feed the semantic tokens below.

### Semantic groups

The semantic layer is organised by **role-group**. Each group names a job, and a component chooses a token by what the element *is*, not by colour.

| Group | Tokens (shape) | Job |
|-------|----------------|-----|
| **Text** | `text`, `text-muted`, `text-wash`, `label`, `label-muted` | Foreground text and labels, in descending emphasis. `label` is the control-label colour. |
| **Surface** | `surface`, `surface-muted`, and status/accent surfaces: `surface-accent`, `surface-{negative\|positive\|caution\|neutral\|empty}` (each with a `-muted`), `surface-alpha\|beta` | Fills and backgrounds, including tinted status surfaces. |
| **Container** | `container`, `container-level-1\|2\|3` | Layered container backgrounds — the `level-N` express elevation/nesting depth. |
| **Canvas** | `canvas`, `canvas-muted` | The base page background beneath everything. |
| **Border** | `border`, `border-muted` | Strokes and dividers. |
| **Interactive** | `interactive/{intent}[-muted][-state]` — see below | All control colours (buttons, inputs, links, toggles). The systematic core. |
| **Inverse** | `inverse/text`, `inverse/text-muted`, `inverse/text-wash`, `inverse/surface`, `inverse/surface-muted`, `inverse/container[-level-N]` | Colours for content sitting on an inverse (dark-on-light-theme) surface. A label on a filled dark button uses `inverse/text`. |
| **Static** | `static/brand`, `static/white`, `static/black` | Mode-independent fixed colours. Use only where a value must not change between modes (e.g. a fixed-contrast mark); prefer a themed token otherwise. |
| **Data** | `data/categorical/{hue}`, `data/{primary\|secondary\|tertiary}`, `data/{positive\|negative\|neutral/0\|neutral/1\|empty\|context}`, `data/{male\|female}` | Chart/series colours — categorical hues and semantic data roles. |
| **Chart chrome** | `chart/{axis\|grid\|background\|label\|label-muted}` (+ `chart/inverse/*`) | Non-data chart furniture. |
| **Geo** | `geo/{feature\|label\|annotation}` (+ `-muted`), `geo/interactive[-state]` | Map colours. |

### The interactive token logic

Control colours are the largest and most systematic group, structured as **`interactive/{intent}[-muted][-state]`**:

- **intent** — `primary`, `secondary`, `positive`, `negative`, `caution` (plus the standalone states `selected`, `on`, `off`, `dragged`, `focus`, `error`, `disabled`).
- **variant** — base, or `-muted` (a lower-emphasis fill of the same intent).
- **state** — base (rest), `-hover`, or `-active`.

So a primary button's fill steps through `interactive/primary` → `interactive/primary-hover` → `interactive/primary-active`; its muted counterpart through `interactive/primary-muted` → `-muted-hover` → `-muted-active`. Every intent follows the same pattern, which is what lets a control resolve its colour for any emphasis × state combination without bespoke tokens.

**One `interactive/{intent}` token serves both fill and text.** The colour is the same whether the intent is applied as a button's fill or as a text/icon colour on a text-style button; context (which property it's bound to) determines the application, not a separate token. `disabled` is the one split worth noting: the disabled *fill* is `interactive/disabled-muted` (a light neutral), while disabled *text/icon* is `interactive/disabled` (a mid neutral that still reads as text).

### Applying colour in components

- Bind fills, strokes, and text colours to semantic tokens — never to primitives or raw hex.
- Choose by role: a label uses `label`/`text`; a control fill uses `interactive/{intent}`; a card background uses `container`/`surface`; a status tint uses `surface-{status}`.
- Text or an icon on a filled control uses the inverse text token (`inverse/text`) so it themes correctly against the fill.
- Prefer themed tokens over `static/*`; reserve `static/*` for the rare fixed-contrast case.



1. **One primitive scale, many semantic layers.** Prose and Product both read from the same 17 steps and assign different roles to different stops.
2. **The top of the scale is reached only at large breakpoints.** Steps 13–14 (64/76) are used by Display and Headline only at lg and xl; on smaller screens the top of the scale is unused and available for occasional expressive moments.
3. **Steps can be shared across roles.** This is expected: Product's Label and Body Sm both sit at 14px, with Label adding font-weight 500.
4. **Unused steps in a semantic table are not wasted.** They are the intermediate stops that keep breakpoint interpolation smooth for the roles that scale.
5. **Extending the scale.** Above 76px, extend the nearest active chain (64→128, 56→112) rather than inventing a neighbour. Below 12px, continue the dense-region ratio (~1.08), giving ~11px.
6. **Author as literal values.** No `calc()` or ratio multiplier; each step is hardcoded.

---

## Extending the System

When a token seems missing for a context, work this path in order before adding anything. The constrained part of the system is small and finite (17 primitive steps, 4 weights, one spacing scale); the semantic layer above it is open-ended and meant to grow. No value is ever out of reach — every value already exists. Extending is a matter of naming jobs, which is cheap and reversible.

1. **Assume it is a naming problem, not a missing token.** Almost every "there's no token for this" is an existing role under an unfamiliar name. Ask what the element does — identify a control, annotate, read as body — rather than what it is called. Check the UI element → role mapping first; tooltip, breadcrumb, and chart legend all sounded like new tokens and all resolved to existing roles.

2. **Decide whether it is a size gap or an axis gap.** This is the highest-leverage check. Most apparent gaps are not a missing size but an existing role at an unfamiliar weight or colour. A "subtle heading" is a heading in secondary colour; an "emphasised caption" is Caption with `.text-strong`. The system expresses weight and colour off the size scale, so confirm the missing thing is genuinely size before touching the scale.

3. **If it is genuinely a new size, the scale already contains it.** The 17 steps are the whole vocabulary, not a menu with forbidden gaps. If a role needs 26px and nothing semantic sits there yet, step 5 exists — assign a role to it. Freedom lives in the semantic layer; the primitive scale is the closed, finite part.

4. **Make a new role earn its place with a one-sentence job.** If the specific situation it exists for can be named in a sentence ("the label above a form control", "the h3 depth in prose"), it is real — add it. If the sentence is "like Body but a bit bigger", it is not a role; it is emphasis or a context difference, and belongs on the weight, colour, or flow axes. This test separates a healthy addition from sprawl.

5. **Add at the semantic layer, once, centrally.** If the same role recurs across surfaces, that is a signal the system should grow — added in one place so everyone gets the same answer, rather than each team inventing a local value. A new primitive step or weight is not the way to solve a single-surface need.

The rules intervene to prevent one move: encoding a weight, colour, or spacing difference as a new size, since that is what multiplies tokens until they stop meaning anything. Everywhere else the system is a set of overridable defaults, and a default that can be overridden on purpose is freeing rather than constraining.

---

## Reference: CSS Custom Properties

<!-- GEN:css-appendix START -->
```css
/* ---------------------------------------------------------------
   GENERATED FROM TOKENS - DO NOT HAND-EDIT (regen_spec.py gen).
   Emitted by Style Dictionary from the Figma export. Representative
   excerpt; full per-mode set is the shipped output under styles/.
   Grammar: primitives named by px; semantics
   --typography-{mode}-{family}-{role}-{prop}; spacing --primitive-spacing-{n}.
   There is no --fs-*, --lh-*, --sp-*, --prose-*, or --ui-*.
   --------------------------------------------------------------- */

/* -- Primitives -------------------------------------------------- */
:root {
  /* Font family + weights (note semi-bold is hyphenated). */
  --primitive-typography-font-family: Inter;
  --primitive-typography-font-weight-light: 300;
  --primitive-typography-font-weight-regular: 400;
  --primitive-typography-font-weight-medium: 500;
  --primitive-typography-font-weight-semi-bold: 600;
  --primitive-typography-font-weight-bold: 700;

  /* Font-size scale - named by px, emitted in rem. 13px not emitted. */
  --primitive-typography-font-size-12: 0.75rem;
  --primitive-typography-font-size-14: 0.875rem;
  --primitive-typography-font-size-16: 1rem;
  --primitive-typography-font-size-18: 1.125rem;
  --primitive-typography-font-size-20: 1.25rem;
  --primitive-typography-font-size-22: 1.375rem;
  --primitive-typography-font-size-24: 1.5rem;
  --primitive-typography-font-size-26: 1.625rem;
  --primitive-typography-font-size-28: 1.75rem;
  --primitive-typography-font-size-30: 1.875rem;
  --primitive-typography-font-size-32: 2rem;
  --primitive-typography-font-size-36: 2.25rem;
  --primitive-typography-font-size-40: 2.5rem;
  --primitive-typography-font-size-48: 3rem;
  --primitive-typography-font-size-56: 3.5rem;
  --primitive-typography-font-size-64: 4rem;
  --primitive-typography-font-size-76: 4.75rem;

  /* Numbered spacing - index x 4px (--primitive-spacing-4 = 16px). */
  --primitive-spacing-0: 0rem;
  --primitive-spacing-1: 0.25rem;
  --primitive-spacing-2: 0.5rem;
  --primitive-spacing-3: 0.75rem;
  --primitive-spacing-4: 1rem;
  --primitive-spacing-5: 1.25rem;
  --primitive-spacing-6: 1.5rem;
  --primitive-spacing-7: 1.75rem;
  --primitive-spacing-8: 2rem;
  --primitive-spacing-9: 2.25rem;
  --primitive-spacing-10: 2.5rem;
  --primitive-spacing-11: 2.75rem;
  --primitive-spacing-12: 3rem;
  --primitive-spacing-14: 3.5rem;
  --primitive-spacing-16: 4rem;
  --primitive-spacing-20: 5rem;
  --primitive-spacing-24: 6rem;
  --primitive-spacing-28: 7rem;
  --primitive-spacing-32: 8rem;
  --primitive-spacing-36: 9rem;
  --primitive-spacing-40: 10rem;
  --primitive-spacing-44: 11rem;
  --primitive-spacing-48: 12rem;
  --primitive-spacing-52: 13rem;
  --primitive-spacing-56: 14rem;
  --primitive-spacing-60: 15rem;
  --primitive-spacing-64: 16rem;
  --primitive-spacing-72: 18rem;
  --primitive-spacing-80: 20rem;
  --primitive-spacing-96: 24rem;
  --primitive-spacing-px: 0.0625rem;
  --primitive-spacing-0-5: 0.125rem;
  --primitive-spacing-1-5: 0.375rem;
  --primitive-spacing-2-5: 0.625rem;
  --primitive-spacing-3-5: 0.875rem;
}

/* -- Semantic typography (base slice; sm/md/lg/xl follow) -------- */
:root {
  /* prose */
  --typography-base-prose-display-font-size: var(--primitive-typography-font-size-40, 2.5rem);
  --typography-base-prose-display-line-height: 1.2000;
  --typography-base-prose-display-font-weight: var(--primitive-typography-font-weight-bold, 700);
  --typography-base-prose-body-font-size: var(--primitive-typography-font-size-16, 1rem);
  --typography-base-prose-body-line-height: 1.6250;
  --typography-base-prose-body-font-weight: var(--primitive-typography-font-weight-regular, 400);
  --typography-base-prose-body-sm-font-size: var(--primitive-typography-font-size-14, 0.875rem);
  --typography-base-prose-body-sm-line-height: 1.5714;
  --typography-base-prose-body-sm-font-weight: var(--primitive-typography-font-weight-regular, 400);
  --typography-base-prose-caption-font-size: var(--primitive-typography-font-size-12, 0.75rem);
  --typography-base-prose-caption-line-height: 1.3333;
  --typography-base-prose-caption-font-weight: var(--primitive-typography-font-weight-regular, 400);
  /* product */
  --typography-base-product-card-panel-title-font-size: var(--primitive-typography-font-size-20, 1.25rem);
  --typography-base-product-card-panel-title-line-height: 1.4000;
  --typography-base-product-card-panel-title-font-weight: var(--primitive-typography-font-weight-semi-bold, 600);
  --typography-base-product-label-font-size: var(--primitive-typography-font-size-14, 0.875rem);
  --typography-base-product-label-line-height: 1.4286;
  --typography-base-product-label-font-weight: var(--primitive-typography-font-weight-medium, 500);
  --typography-base-product-label-sm-font-size: var(--primitive-typography-font-size-12, 0.75rem);
  --typography-base-product-label-sm-line-height: 1.3333;
  --typography-base-product-label-sm-font-weight: var(--primitive-typography-font-weight-medium, 500);
  /* chart */
  --typography-base-chart-axis-title-font-size: var(--primitive-typography-font-size-14, 0.875rem);
  --typography-base-chart-axis-title-line-height: 1.4286;
  --typography-base-chart-axis-title-font-weight: var(--primitive-typography-font-weight-medium, 500);
  --typography-base-chart-tick-font-size: var(--primitive-typography-font-size-14, 0.875rem);
  --typography-base-chart-tick-line-height: 1.0000;
  --typography-base-chart-tick-font-weight: var(--primitive-typography-font-weight-regular, 400);
  --typography-base-chart-tick-sm-font-size: var(--primitive-typography-font-size-12, 0.75rem);
  --typography-base-chart-tick-sm-line-height: 1.0000;
}

/* -- Content flow (context themes; each rung a --primitive-spacing-{n}) */
.flow-prose { --flow-tight: 0.25rem; --flow-default: 1rem; --flow-loose: 1.5rem; --flow-section: 2.5rem; }
.flow-product { --flow-tight: 0.25rem; --flow-default: 0.5rem; --flow-loose: 1rem; --flow-section: 1.5rem; }
.flow-compact { --flow-tight: 0.25rem; --flow-default: 0.25rem; --flow-loose: 0.5rem; --flow-section: 0.5rem; }
```
<!-- GEN:css-appendix END -->
