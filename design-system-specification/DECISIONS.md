# DECISIONS — GLA / ldn-viz design system

**Read this first, every session.** This is the authoritative list of standing decisions and current status. When a question feels settled, it's here.

Related artefacts: the narrative record lives in `component-drift-inventory.md`; the exacting _procedures_ live in `skills/`; the canonical full spec is `design-system-specification.md`.

_Figma file: currently titled "Design System ver 3.1" (was "3.0 Agent Enhanced"). Dynamic-page file._

---

## How to use and update this file

The file has three parts, and which part you edit depends on what happened:

| Part                                                            | Contains                               | How it changes                                                   |
| --------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| **[Part 1 — Standing rules](#part-1--standing-rules)**          | Current truth. What is the case _now_. | **Edited in place.** Overwrite the old value; don't annotate it. |
| **[Part 2 — Decision log](#part-2--decision-log-newest-first)** | Dated resolutions and their rationale. | **Append-only, newest first.** Never rewrite a past entry.       |
| **[Part 3 — Status](#part-3--status)**                          | Done / next / open / in-flight.        | Edited in place as work lands.                                   |

**The rule that keeps this maintainable:** when a decision changes, edit the rule in Part 1 **and** add a new dated entry to Part 2. Never leave two live answers to the same question.

The only permitted edit to a past log entry is appending an italic supersession pointer, e.g. `_Superseded 2026-07-24 → §1.3_`. That keeps history readable without making the reader reconcile four dates to learn one number.

If you only want to know what's true, read Part 1 and stop. Part 2 is for _why_.

### Conventions

- **Status markers:** `RULED` (settled, don't re-litigate) · `OPEN` (needs a decision) · `PENDING` (decided, not yet done) · `DEPRECATED` (being migrated off) · `SUPERSEDED` (replaced; pointer follows).
- **Progress markers** (Part 3 only): ✅ done · ▶ next / in progress · ⚠ warning.
- **Dates** are ISO `YYYY-MM-DD` throughout.
- **One bullet = one line, unwrapped.** Don't hard-wrap prose — it makes git diffs unreadable when a sentence is edited mid-paragraph.
- **Cross-refs** use `§` and the section number, so they survive rewording of headings.

---

# Part 1 — Standing rules

## 1.1 Sources of truth

- **Spec is authoritative for typography, spacing, flow, grid, colour** — `design-system-specification.md` (renamed from `type-scale-specification.md`; now covers all five foundations).
- **But the spec is downstream of the build for every concrete value or name.** Value tables + the CSS appendix are generated from the emitted `styles/`; only prose (intent, rationale) is hand-written. The spec may be out of date — a rerun fixes it — but it must never be silently wrong.
- **Existing infra convention beats the spec on naming** (e.g. `spacing-`, not `sp-`).
- **Code/Storybook is authoritative for tables and charts** (behavioural / data-driven). Figma is _representative_, not a reimplementation.
- **Observable Plot is the charting library** — authoritative for real charts.
- **Figma LEADS the typography + colour cutover ahead of the repo** (user's explicit "bite the bullet"). Temporary Figma↔code mismatch is accepted; the repo catches up later via the SD parser (alias `altProse`→`prose`, `altProduct`→`prose`). Foundation lives in Figma as parallel `alt*` groups beside legacy.
- **Figma-only sessions have no repo access.** Repo/code work (SD parser aliasing, migrating real Storybook tables/charts, the actual cutover) is separate Claude Code work, and nothing decided in a Figma session is verified against emitted output until a rebuild.

## 1.2 Token and naming grammar

- **Two tiers everywhere: primitive → semantic.** Components bind to semantic only — never primitives, never raw hex.
- **Component context prefix dictates the type family** (governing rule): `Product/*` → `altSemantic/Product/*`; `Prose/*` → `altSemantic/Prose/*`; `Chart/*` → `altSemantic/Chart/*`. No cross-mixing.
- **Real grammar:** primitives named by px; semantics as `--typography-{mode}-{family}-{role}-{prop}`; spacing primitives as `--primitive-spacing-{n}`. Note `semi-bold` is hyphenated.
- **Phantom names are not grammar** — `--fs-*`, `--lh-*`, `--sp-*`, `--fw-*`, `--prose-*`, `--ui-*` do not exist and were purged from the spec.
- **Role names may be domain-specific within a context family, never component-specific.** Product names answer "where does this sit in the ladder" — structural, therefore generic. Chart names answer "what part of a chart is this" — anatomical, therefore specific, because external consumers arrive with that vocabulary. Two registers, one rule.
- **A context family earns a complete vocabulary only when it has genuinely divergent values AND is consumed as a standalone published surface.** Chart passes both. A future `map` family is tested against the same bar, not waved through on chart's precedent.
- **A domain family may alias the object tier and below, never page furniture.** A chart _is_ an object, so it reaches `title` / `subtitle` / `eyebrow` plus its own internal anatomy — never `page-head` or `section-head`.
- **Semantic→semantic aliasing is permitted** for object-tier domain roles (`chart/title` aliases `product/title`), rather than co-reference to a shared primitive. It encodes the dependency direction, is drift-proof, and inherits product's responsive behaviour. This is a new mechanism as of 2026-07-27 — everything else in typography aliases primitives only.
- **`outputReferences` on the typography platform is a PREREQUISITE.** Without it typography emits resolved literals, so an alias is indistinguishable from a copied value and drift is invisible. Until it lands, the guard can only assert value-equality.
- **Stick with the system, not legacy sizing** — migrate off-system sizes to the correct role even if it visibly resizes (e.g. Accordion body 20→16, input label 16→14).
- **Colour grammar:** `interactive/{intent}[-muted][-state]`, plus `text` / `label` / `surface` / `container` / `canvas` / `border` / `inverse` / `static` / `data` / `chart` / `geo`. One `interactive/{intent}` token serves both fill and text; disabled splits (fill → `disabled-muted`, text → `disabled`). Colour is strictly semantic→primitive.

## 1.3 Current values — quick reference

The numbers that keep getting re-litigated. **This table is the answer.** Change it here first, then log the change in Part 2.

| Thing                          | Current value                           | Notes                                                     |
| ------------------------------ | --------------------------------------- | --------------------------------------------------------- |
| Type scale                     | **17 steps**                            | 13px removed entirely; 26 hand-placed (Title 2 `sm` step) |
| Caption (prose + product)      | **12px**                                | product lh 16; 13px / old `fs-n2` retired, not emitted    |
| Prose body line-height         | **1.625** (font-size 16 at all modes)   | reading leading                                           |
| Prose body-sm line-height      | **1.571**                               | reading leading                                           |
| Product body / body-sm         | grid **24 / 20**                        | grid leading, not reading                                 |
| Prose Lead                     | lh **32**, ratio 1.4545, all modes      | verified emitted                                          |
| Display / `lg`                 | lh **72**                               |                                                           |
| Subtitle / `xl`                | lh **24**                               |                                                           |
| Title-4 `base` + `xl`          | lh **28**                               |                                                           |
| Metric-sm / `xl`               | lh **20**                               |                                                           |
| Metric + Metric Sm             | lh **1.0** (tight), all sizes           | default                                                   |
| Tight label variants           | lh **1.0**, single-line only            | `label-tight`, `label-sm-tight`                           |
| Eyebrow (prose + product)      | weight **500** Medium, tracking **0**   | casing OPEN — see §1.4                                    |
| `product/title`                | 20 / 28 / semi-bold                     |                                                           |
| `product/subtitle`             | 16 / 24 / regular                       |                                                           |
| `product/eyebrow`              | 14 / 20 / medium                        |                                                           |
| `product/page-head`            | 28→36, lh 36 / 36 / 40 / 40 / 44        |                                                           |
| `chart/axis-title`             | 14 / 500 / lh 20 at **all** modes       |                                                           |
| `chart/label`                  | 14 / 400 / lh 20 at **all** modes       | legend entries bind this                                  |
| `chart/tick` · `chart/tick-sm` | **14 / 12** (default density)           | compressed 12 / 11 is spec-only; 11 is the sub-floor      |
| Breakpoints                    | 5 steps — `sm` `md` `lg` `xl` + default | `sm` wired into `responsive.cjs`                          |
| Corner radius                  | **0** everywhere                        | see §1.6                                                  |

- **`0.86` appearing in exports is a rem bug** ≈ 14px. Always correct it.
- **Line-height is two policies, not one:** _grid leading_ for structural roles (4px grid — a reference for authoring, not a cascade `var()`) and _reading leading_ for prose body / body-sm only.
- **Exception to the above:** for the three aliased object-tier chart roles (`chart/{title,subtitle,eyebrow}`), line-height and letter-spacing are **references**, not literals — the first time line-height participates in a reference chain. `token-architecture-and-naming.md` §2/§6 and the spec's Line Height Scale prose must state this as an exception rather than an absolute.

## 1.4 Typography — standing rules

_Also encoded in the spec and the `ds-doc-frame` skill._

- **Product ladder:** `product/page-head` → `product/section-head` → `product/title`, with `subtitle` and `eyebrow` as shared treatments applied by the primary-slot rule.
- **Suffix asymmetry is deliberate.** `-head` is retained on both upper rungs so the register stays consistent within the page-furniture tier; the leaf stays bare because it is the default. Renaming to `page-title` / `section-title` / `title` would make the bare leaf ambiguous against the other two.
- **Chart family is closed at EIGHT roles.** Object tier, aliased from product: `chart/title`, `chart/subtitle`, `chart/eyebrow`. Chart-internal: `chart/note` (source/citation in the container footer), `chart/axis-title`, `chart/label`, `chart/tick`, `chart/tick-sm`. No role is added unless it passes the one-sentence-job test.
- **`chart/legend` does not exist** — a legend entry is a data label, which is `chart/label`'s job. Legend entries bind `chart/label`.
- **Markdown heading ladder:** h1–h4 map to Title 1–4. Headline (56px) is hero chrome only, never a content h1.
- **Tight Label treatment:** `label` / `label-sm` at line-height 1.0 for single-line controls (buttons, tabs, chips). No line breaks. Default for button/tab/chip. (`altSemantic/Product/label-tight`, `label-sm-tight`.)
- **Derived UI application rules:** control/nav labels → Label 14 (shrink legacy 16); input value/placeholder/body → body 16; helper/hint/secondary → body-sm 14; small functional → caption; genuine titles → `product/title` 20; sidebar/nav section titles → Label (not a title).
- **Prose Eyebrow** role exists (overline/kicker, 14 Medium).
- **Eyebrow casing — OPEN.** Currently uppercase + tracked in places; user said "resist uppercase for now". No changes made, pending decision.
- **Fluid `clamp()` tier is spec-only** — absent from cjs and emitted output. Intended home is the cjs post-SD layer. See §3.3.
- **`label-tight` / `label-sm-tight` are style-only** — no backing variables in `semantic-typography`, so they cannot emit. **OPEN.**

## 1.5 Spacing, flow and rhythm

- **`--spacing-{n}` is the public layer.** Authored code consumes `--spacing-{n}` (and `mt-{n}` etc.); `--primitive-spacing-{n}` is the private source. **Never bind to `--primitive-spacing-*` directly** — including component-internal spacing.
- **`--spacing-{n}` must be a pure `var(--primitive-spacing-{n})` reference** to the identically-keyed primitive. `regen_spec.py check` asserts this and that every dev-facing rung exists, catching dropped-rung and mis-key (`spacing-9` → `primitive-spacing-10`) errors.
- **Numbered scale emits** `--primitive-spacing-{n}` plus sub-steps `-px` / `-0-5` / `-1-5` / `-2-5` / `-3-5`.
- **No named spacing-role set beyond `flow` and `grid`.**
- **Vertical rhythm consolidates on `flow`** — the context flow ramp `--flow-*` plus the owl selector. The `format` mechanism is retired; the em-based `--typography-spacing-*` margins are gone.
- **The rhythm-vs-construction gate** decides where spacing comes from: rhythm → `flow`; construction (padding, border-width, list indent, cell padding) → numbered `--spacing-{n}`. See `llm-docs/migration-spacing-mapping.md`.
- **T-shirt mapping** (for any straggler found): `xxs`→1, `xs`→2, `sm`→3, `md`→4, `lg`→5, …
- **`--spacing-{tshirt}` and `--typography-spacing-*` are RETIRED** — not emitted, no live consumers. See §2.2 and §2.3.
- **⚠ CONSTRAINT — the single easiest thing to break:** `semantic-flow` / `semantic-spacing` / `grid-spacing` reference `primitive.spacing` and divide by 16 expecting **px**. The shared primitive value must stay px in the token graph; rem conversion happens only at emit time.

## 1.6 Visual rules (system-wide)

- **No rounded corners.** Corner radius is **0** everywhere, UNLESS the element is genuinely round (a circular avatar, a dot). Never add radius to bars, cards, cells, buttons, inputs or containers. (Caught: bar chart bars had radius 2 — removed.)
- **X-axis / category labels sit BELOW the axis baseline**, not above; y-axis ticks sit left of the plot.

## 1.7 Tables

- Composable **kit**, code-authoritative. The kit lives in a "Table Kit" doc frame on the Tables page.
- **Approach A (row-based, hug everything)** chosen over column-based: cell (fixed Width variant) → row (HUG) → table (HUG). Width changes ripple up visibly; columns align by using the same Width variant on header and body.
- **Cell is the swappable unit.** `Table Cell` has a `Renderer` instance-swap (Text / Number / Boolean / Mini-chart). Alignment lives in the renderer, not the cell. "fill" is an instance setting, not a variant.
- **Width set:** xs 64 / sm 88 / md 120 / lg 220 / xl 300 / fill.
- Composed `Table Row` (Stripe variant) + `Table Header Row`, both hug. Width changes propagate via the row/header **masters**; per-instance edits stay local.
- **PENDING:** bind cell padding/height to spacing variables (user doing this); parameterise mini-chart (bar + label per row) and boolean (true/false); reconcile widths against real Storybook columns (repo); retire the original flat mockup table.

## 1.8 Charts

- Figma is **representative**, not data-accurate.
- **Figma component variables cannot drive geometry.** "A few variables" means editable height/label/colour-swap plus duplicatable parts — not data-binding. Bars are sized by resize, not computed.
- **`ChartContainer` is CANONICAL:** component **`6204:2827`** on the Charts page, housed in doc-frame **`6497:279020`**. (Verified 2026-07-20; the old canonical `6403:178823` is deleted, and the old `Chart Container` in the `previously` frame is retired.)
- **ChartContainer is static chrome, invariant:** ChromeHeader (title + optional eyebrow/subtitle/hint) + `Content` SLOT + ChromeActions (download/export).
- **Slot contents are per-plot, composed by the designer:** legend + plot + footer (notes/citation). NOT baked into the container, NOT baked into the plot mark. (ChartContainer's description still implies "chart carries its own note" — **PENDING** update.)
- **Chart SVG imports arrive RAW:** unstyled live text, hardcoded hex. Getting them on-system = (a) assign `Chart/*` roles, (b) repoint fills to `data/*` / `chart/*`.
- **Data title is a binding, not a routing instruction.** The primary-slot rule resolves it to `chart/title` when it owns the slot and `chart/eyebrow` when it yields.
- **Kit approach:** real flexible kits now exist for the bar family _and_ line/area/slope/donut — see §3.1. This supersedes the earlier "static tokenised SVG specimens only for line/multiline/area/scatter" position; `charts/bar-chart.md` is partly stale on this point.

## 1.9 Documentation — scope and placement

- **Two tiers.** In scope during sweeps (lightweight): component **metadata/descriptions** plus intro/overview **doc-frames**. DEFERRED to a holistic docs pass: usage dos/don'ts, accessibility notes, full states-strip treatment.
- **Doc-frame placement is deferred and batched** — no decided home yet, so don't scatter doc-frames. Emerging pattern: a **foundation** doc-frame can live on the page for its foundation (see the Vertical flow doc on the Spacing page). That is placement-with-its-foundation, distinct from the still-undecided _component_-docs home. Composition/titling doc-frames currently sit on the Typography page and will relocate.
- **Doc frames MUST follow `skills/ds-doc-frame`:** `.DS-Section-header` (`425:7094`, `Title#425:0`) + `Doc/*` styles (NOT product roles) + geometry (outer 1280 / pad 0 → content pad [32, 60, 32, 60] / gap 40 → `Doc/Body` intro + optional `Doc/Caption` states strip). **Load the skill before building ANY doc/overview/housing frame.**
- **Vertical flow doc-frame** (built 2026-07-20): node **`6845:219201`** ("Vertical flow") on the "Spacing, rhythm, grids and containers" page, replacing the old `Proto` frame. Content: intro prose + three illustrations — (1) the ramp × three contexts shown as **true-height** shaded gaps (NOT scaled; a scaled-bar version was rejected as misleading), (2) the same blocks in prose vs product, (3) coupling (wrapped/tight vs loose-sibling/default). Gap values are faithful to the `semantic-flow` vars.

## 1.10 Figma file conventions

- **`.DS-` prefix** = docs scaffolding (audited only on Get Started; `.DS-Page-Head` is an ignorable waymarker).
- **`.` prefix** (single dot, no DS) = internal/private sub-component — not scaffolding, not published, legitimate, migrate normally.
- **Real components are never skipped in sweeps.**
- **`component archive` page (`6405:179693`) — IGNORE in audits.**

## 1.11 Figma mechanics (gotchas — will become a skill)

- `figma_execute` on this dynamic-page file: use **async** variants — `getNodeByIdAsync`, `getStyleByIdAsync`, `getLocalTextStylesAsync`, `getMainComponentAsync`, `figma.variables.getVariableByIdAsync`, `getLocalVariableCollectionsAsync`.
- **`globalThis` does NOT persist** across `figma_execute` calls — inline all data.
- **`resize()` resets `primaryAxisSizingMode` to FIXED** — set it back to AUTO afterwards if hugging. `combineAsVariants` also clobbers it.
- **Read-after-write size measurements lag one step** (stale) — re-read to verify.
- **Setting a text style does NOT carry colour** — re-bind the fill variable after `setTextStyleIdAsync`.
- **Full-page 278-master scans TIME OUT** (>4 min) — scan subsets.

## 1.12 Working stance

- **Propose-then-write** on destructive or structural edits; read-only recon first; verify with screenshots.
- **Verify migrations with a FULL scan, not a sample** — a sample missed rare tokens on buttons.
- **Store big reads to disk.**
- **Build from ground truth, not memory** — re-read the reference artefact and its IDs before encoding or rebuilding. This is how the `ds-doc-frame` drift was caught and fixed.
- **Canonical home for tooling is the git repo**; loose downloads are disposable.
- **Spec value blocks are generated, not hand-edited.** They live between `<!-- GEN:* -->` markers, produced by `regen_spec.py` (`verify-build` / `gen` / `check`), governed by `SPEC-CHANGE-PROTOCOL.md`. A `PINNED` list machine-checks decisions against emitted output. Re-baseline sequence: `verify-build` → `gen` → `check`.

## 1.13 Skills (load before the matching task)

- **`skills/ds-spec`** — THE spec-derived skill: the whole design system (typography + chart-type subset + colour + spacing + flow + grid). Load whenever choosing type/colour/spacing/grid/chart values or deciding roles and tokens. Its `references/design-system-specification.md` is the canonical full spec (exact values, full mappings, CSS block). Built as ONE comprehensive skill, with the option to split into `ds-typography` / `ds-colour` / `ds-spacing-flow-grid` later — each `##` foundation block is self-contained to make that painless. Supersedes the old `type-scale-system` skill (now in `_retired/`, from when the spec was typography-only).
- **`skills/ds-doc-frame`** — building any doc/overview/housing frame. DONE; IDs verified live in v3.1.
- **PLANNED:** `ds-token-migration` (Base→altSemantic conversion table + colour deprecated→current mapping + verify-full-scan discipline); `ds-component-build` (hug sizing, renderer-swap, variant/resize traps including the padding-driven bar model and the no-radius rule); possibly `ds-figma-conventions`.

## 1.14 Thread transport (what a new thread must load)

**Load:** `DECISIONS.md` (this file — standing decisions) · `skills/ds-spec/` (the spec + system rules — the crux artefact) · the relevant task skill (`ds-doc-frame` for doc frames).

**Reference as needed:** `component-drift-inventory.md` (narrative record) · `charts/*.md` + `tables/*.md` (kit specifics) · `figma-file-conventions.md` · `token-architecture-and-naming.md` · `SPEC-CHANGE-PROTOCOL.md`.

**Then:** the Figma file is "Design System ver 3.1" — connect the Desktop Bridge plugin (port 9223) and verify IDs are still live before relying on them.

---

# Part 2 — Decision log (newest first)

## 2.1 · 2026-07-27 — Chart typography family + product object-tier renaming

_Prompted by team discussion plus the typography migration. Two changes, one rule: the `card-panel-*` names were component-specific, and the chart family was too thin to publish. Audit run read-only against live Figma (`audit-2026-07-27-chart-family.md`). No repo access this session, so no value claim below is verified against emitted output — all of them need a rebuild to confirm._

**All rulings in this block are settled** — ladder renaming, the chart set, semantic→semantic aliasing, no deprecation window, xl line-height fix folded in. Standing rules extracted to §1.2 and §1.4.

### Product ladder — renamed

- **`card-panel-title` → `product/title`.** The leaf is the recursive, general case; the upper rungs are named exceptions at fixed positions. The spec's own UI mapping already routes modal, callout, sidebar and panel headers to this role, so the old name undercounted its documented scope by three component types.
- **`card-panel-subtitle` → `product/subtitle`; `card-panel-eyebrow` → `product/eyebrow`.** Bare shared treatments, detached from the leaf rung — matching prose, which already has bare `subtitle` / `eyebrow`. Rename only: the variables persist, so all 398 bound nodes ride along.
- **`dashboard-head` → `product/page-head`.** "Dashboard" names a product type — the same category error as naming a role after a card. A settings page, report or form has a top page title and is not a dashboard.
- **`section-head` — UNCHANGED.** "Section" is a structural concept, not a surface or component. Clean.

### Chart family — expanded

- **Published set = EIGHT roles (RULED).** Object tier, aliased from product: `chart/title`, `chart/subtitle`, `chart/eyebrow`. New chart-internal: `chart/note` (source/citation in the container footer) — previously resolved to product Caption and would otherwise have been invented locally. Pre-existing and unchanged: `chart/axis-title`, `chart/label`, `chart/tick`, `chart/tick-sm`.
- **`chart/legend` — NOT created (RULED).** A legend entry is a data label, which is exactly `chart/label`'s job (14 / Regular), so a dedicated role fails the one-sentence-job test — it would read "like `label`, but in the legend", a position difference, not a role. The set was briefly specified at nine and corrected down after the Figma pass rather than shipping a role that duplicated a sibling.
- **Compressed tick density stays spec-only.** The 12 / 11 pair remains documented, not emitted; only the default 14 / 12 ships. Unchanged by this pass. If compressed ticks should become real tokens, that is 2 new variables + 2 new `PINNED` entries — a separate decision.
- **Alias mechanism = semantic→semantic (RULED)**, not co-reference to a shared primitive. The audit confirmed every `chart/*` and `product/*` token previously aliased _primitives_ only (`typography/font/size/14` etc.); no semantic→semantic alias existed anywhere in typography, and colour is likewise strictly semantic→primitive. So this is genuinely new machinery.
- **`outputReferences` on the typography platform is now a PREREQUISITE, not parked.**

### Consequences accepted

- **`eyebrow` / `subtitle` metric duplication is KEPT, and the spec corrected to match.** Audit finding: `card-panel-subtitle` (16/24/regular) is an exact metric duplicate of `product/body`, and `card-panel-eyebrow` (14/20/medium) of `product/label`. The spec claims the opposite — line 147's "reuse the steps above rather than adding variables… need no new tokens" and "Ten roles, ten font-size variables" — while Figma has twelve product roles with full 5-prop × 5-mode sets. Resolution: **fix the spec prose, not the tokens.** A distinct variable can be retuned independently of `body` / `label` later; a treatment-only mapping cannot. Deleting the two to make the claim true would re-point 398 nodes for no gain.
- **The same duplication already exists inside the chart family** (`chart/axis-title` == `product/label`, `chart/label` == `product/body-sm`; only `tick` 14/14 and `tick-sm` 12/12 are genuinely distinct). Domain-renaming existing metrics is established practice here, not an exception being carved.
- **Deprecation window: NONE — straight through (RULED).** No deprecated-alias emit for `card-panel-*` or `dashboard-head`; the old names are simply gone. External chart consumption is _prospective_ — the family is being built so outside teams **can** consume it, but nobody consumes the product role names today, so there is no installed base to cushion.
- **Therefore the repo migration must be atomic within one release.** No alias window means no overlap period: the rename and every consumer binding land together, or the build breaks. Full-scan verify **before** the commit, not after. This is the one place the clean break costs something.

### Bugs folded into this pass

- **`chart/axis-title/line-height` and `chart/label/line-height` were 44 at `xl`**, 20 at every other mode (ratio 3.1429 instead of 1.43) — almost certainly pasted from `dashboard-head`'s xl value of 44, the same `base`+`xl` clustering as the 2026-07-21 sweep. Not caught by `regen_spec.py`: `PINNED` covered chart font-size and axis-title font-weight, never line-height. **Fixed in this pass.**
- **`Semantic/Chart/tick-sm` had no `fontWeight` bound variable** (it bound the other four). **Fixed.**
- **`label-tight` / `label-sm-tight` are style-only** — no backing variables in `semantic-typography`, so they cannot emit. Logged, not fixed. **STILL OPEN** after the Figma pass → §1.4.

### Figma pass — applied and verified (2026-07-27, live file, read-only verify)

All of the above authored in Figma by Chris and verified against the live file the same session. `semantic-typography` is now **168 variables** (was 148: +20 = 4 new chart roles × 5 props).

- **Product ladder renamed on BOTH objects** — variables `product/{page-head,section-head,title,subtitle,eyebrow}` and text styles `Semantic/Product/*` to match. Metrics intact through the rename (see §1.3).
- **Zero stale references** — no `card-panel*` or `dashboard-head` in any variable name, variable description, style name or style description.
- **Semantic→semantic aliasing CONFIRMED WORKING.** `chart/{title,subtitle,eyebrow}` alias `product/{title,subtitle,eyebrow}` across all 5 props × 5 modes; text styles resolve correctly through the chain (`Chart/title` reads 20/28/Semi Bold). The mechanism holds in Figma. **Repo-side resolution remains unproven until a rebuild.**
- **Both bugs fixed** — `chart/axis-title` and `chart/label` line-height now 20 at every mode including `xl`; `Semantic/Chart/tick-sm` now binds all five props.
- **Node bindings reconciled exactly, no orphans.** Product counts each fell by 13 (title 915→902, eyebrow 228→215, subtitle 170→157) and each new chart style gained exactly 13 — i.e. 13 chart containers re-pointed onto the chart roles. `tick` 332, `label` 170, `tick-sm` 60, `axis-title` 9 unchanged. `chart/note` 39 bindings, `product/page-head` 23.
- **NEW — line-height and letter-spacing are now REFERENCES, not literals** for the three aliased object-tier chart roles. Aliasing all five props is the stricter, more correct choice for a pure alias, but it is the first time line-height participates in a reference chain, so the docs must record it as an exception → §1.3.

### Guard changes (`regen_spec.py`)

- New `PINNED` entries asserting each chart object-tier alias equals its product source (`chart/title` == `product/title`, etc.). Value-equality now; reference-assertion once `outputReferences` lands.
- New `PINNED` entries for `chart/axis-title` and `chart/label` line-height = 20 at **all** modes (the gap that let the xl error through).
- Update the existing `product card-panel-eyebrow wt 500` pin to `product/eyebrow`.
- Update `PRODUCT_ROWS` keys: `dashboard-head` → `page-head`, `card-panel-title` → `title`.
- No `chart/legend` pin — the role does not exist.

## 2.2 · 2026-07-24 — Spacing alias: spec + guard closeout

- **Spec documents the public layer.** `design-system-specification.md` reframes `--primitive-spacing-{n}` as the private source, adds a `## Public spacing layer (--spacing-{n} / mt-{n})` subsection plus a generated `GEN:spacing-alias` table, and rewrites the t-shirt section in past tense (retired; source emits neither t-shirt nor `--typography-spacing-*`; consumers migrated, full-scan verified).
- **Guard now covers the alias.** `regen_spec.py check` asserts every `--spacing-{n}` is a pure `var(--primitive-spacing-{n})` reference to the identically-keyed primitive, and that all dev-facing rungs exist — catching the dropped-rung and mis-key (`spacing-9` → `primitive-spacing-10`) classes.
- **Observed (confirmed at HEAD):** the current `sd.config.json` / `sd.build.js` / token export / emitted output carry NO t-shirt or `--typography-spacing-*` emission — so step 4's "drop emit / unwire t-shirt Tailwind file" is already complete at the pipeline level. Remaining step-4 items reduce to the Figma `semantic-spacing` rename (done) plus accept-and-re-baseline.

## 2.3 · 2026-07-24 — Repo consumer migration off t-shirt spacing

_Step 3 of the t-shirt retirement (see `token-architecture-and-naming.md` §5, `SPEC-CHANGE-PROTOCOL.md`). Gated on `verify-build` zero-diff, closed with a full-repo scan per the migration brief's §6 targets._

- **`verify-build` zero-diff confirmed** before and after migration — the repo build reproduces shipped `styles/` exactly, and consumer edits did not touch emitted output (expected, since they are downstream-only changes).
- **Full scan found two live dangling t-shirt/em-set references**, contradicting the assumption that the source-side drop had already made all consumer refs dangling-but-harmless: `packages/ui/src/lib/select/Select.svelte` (`--spacing-xs`, `--spacing-sm`) and `packages/themes/tailwind-custom/typography/semantics.cjs` (`--spacing-xxs` + 6× `--typography-spacing-{lg,xs,md,xxs}`). Both **migrated** to the numbered `--spacing-{n}` scale per the mapping in §1.5.
- **`--typography-spacing-*` em set ruling:** all six `semantics.cjs` uses were padding or border-width (list indent, blockquote border + indent, table cell padding, code padding) — **construction, not rhythm** per the gate in `llm-docs/migration-spacing-mapping.md`. Mapped directly to numbered `--spacing-{n}` rem tokens rather than to `flow`. `format.cjs` no longer exists and has no importers — confirmed fully dead, nothing to migrate there.
- **No live t-shirt Tailwind classes** (`mt-xxs`, `p-lg`, etc.) anywhere in Svelte templates. **No stray `--primitive-spacing-*`** usage in components or hand-CSS outside the token build itself.
- **`apps/web/src/content/design-system/foundations/design-tokens.md` updated** — the prose no longer shows the retired t-shirt/em example (`--spacing-md` / `--typography-spacing-md`); it now documents the numbered scale plus a pointer to `flow` for vertical rhythm.
- **T-shirt retirement scope — RESOLVED.** Repo consumer migration (step 3) is done and full-scan-verified. Remaining work is **step 4 only** (separate, gated): drop `--spacing-{tshirt}` + `--typography-spacing-*` emission from `sd.config.json` / `sd.build.js`, unwire the t-shirt Tailwind file, delete `semantic-spacing` in Figma, re-run full-scan verify, then re-baseline. _See §2.2 — most of step 4 turned out to be already done at HEAD._

## 2.4 · 2026-07-24 — Spec reconciliation + tooling

_Reconciled `design-system-specification.md` to the verified emitted output (Step 5 changelist from `spec-pipeline-reconciliation.md`). Build reproduced in-sandbox, zero-diff vs shipped `styles/`; all drift was spec-side._

- **Spec is now downstream of the build** → §1.1.
- **Caption = 12 propagated** through both spec matrices and all role tables. 13px (old `fs-n2`) retired — no role uses it, not emitted.
- **13px fully removed → 17-step scale** (was 18). Caption at step −2 = 12; the `13 → 26` doubling chain is dropped, and 26 is now hand-placed (still Title 2's `sm` step).
- **Line-height split into two policies** — grid leading vs reading leading → §1.3.
- **xl prose-body lh data error fixed** (1.75 → 1.625; body font-size stays 16 at all modes). Verified via rebuild.
- **Chart ticks — emitted reality:** default **Tick 14 / Tick Sm 12**; compressed 12 / 11; 11 sub-floor. Supersedes the 12/11 record in §2.5. `axis-title` 14/500/lh20 and `label` 14/400/lh20 confirmed.
- **Eyebrow:** tracking 0 (emitted), weight 500; casing on hold.
- **Fluid `clamp()` tier = spec-only** — absent from cjs and emitted; marked spec-only, intended home the cjs post-SD layer.
- **Phantom names purged from the spec** and the real grammar documented → §1.2.
- **Numbered spacing scale emits** — t-shirt retirement **step 1 done**; emits alongside the deprecated `--spacing-{tshirt}` during the window.
- **NEW tooling (canonical):** `regen_spec.py` (`verify-build` / `gen` / `check`) + `SPEC-CHANGE-PROTOCOL.md` → §1.12.
- **CONSTRAINT flagged (t-shirt migration):** the px-in-the-token-graph requirement → §1.5.
- **Semantic spacing scale:** consumption alias `--spacing-{n}` → primitive; no `--primitive-*` in authored code; no named spacing-role set beyond `flow` / `grid`.

## 2.5 · 2026-07-21 — Code cutover

_Settled after the first spec-vs-code audit (`implementation-audit.md`). The first `.cjs`/token pass was Claude Code work done without full sight of the new system; these rulings reconcile it to the spec. Spec stays authoritative for typography + spacing._

- **Caption = 12px** (both prose and product). Resolves the long-standing 12-vs-13 question; product was already 12, prose moves 13→12. Update the prose caption token; product caption is already correct at 12/lh16.
- **`format` mechanism is retired** — prose vertical rhythm consolidates on **`flow`** (context flow ramp `--flow-*` + owl selector), which is the spec model. Delete `format.cjs`, drop its import and loop from `typography.cjs`, and move prose block spacing in `semantic.cjs` off the em-based `--typography-spacing-*` margins onto `flow`. `format.cjs`'s `--spacing-*-em` refs were dangling anyway.
- **Line-height data errors (audit §A) — fixed in Figma variables** by user: Display/lg 67→72, Subtitle/xl 35→24, Title-4 base+xl 30→28, Metric-sm/xl 28→20. Errors clustered in the `base` + `xl` modes; sweep both columns wholesale. _Superseded in part 2026-07-24: the `Lead base+xl 32→28` item is dropped — Lead keeps lh 32 / ratio 1.4545 at all modes, verified emitted. A separate xl prose-body lh error (1.75→1.625) was fixed 2026-07-24 → §2.4._
- **Prose Eyebrow weight → Medium 500** (was Semibold 600 in tokens). User fixing the Figma variable. (Product eyebrow already 500.)
- **Markdown heading ladder → h1–h4 map to Title 1–4** (was shifted up a rung; h1 was rendering as the 56px hero Headline). Fix in `semantic.cjs`.
- **Tight label variants — INCLUDE.** `label-tight` / `label-sm-tight` = same size and weight as Label / Label Sm, line-height 1.0, single-line only. A line-height treatment, no new size token.
- **Chart typography subset — INCLUDE.** `Chart/axis-title|label|tick|tick-sm` reach the token export. _Superseded 2026-07-24: emitted default density is Tick 14 / Tick Sm 12, not 12/11 → §2.4._
- **`sm` breakpoint — WIRE IT UP.** Tokens carry correct `sm` values but `responsive.cjs` skipped it (default→md→lg→xl). Add `sm` so the full 5-step scale is live.
- **Eyebrow tracking (letter-spacing) = 0** (verified emitted 2026-07-24); weight 500. **Casing — HOLD** (resist uppercase for now; still pending).
- **`semantic-spacing` t-shirt scale — DEPRECATE** toward the primitive/numbered scale. Used by some existing components but not universally; migrate off it gradually rather than entrenching a second spacing grammar beside `--primitive-spacing-{n}`. _Completed — see §2.3, §2.2._
- **Metric default line-height = 1.0** (tight) confirmed as the default for both Metric and Metric Sm, all sizes.

---

# Part 3 — Status

## 3.1 On the new system ✅

- ✅ Composition cluster (TitleGroup, ChromeHeader, Card, ChartContainer, Metric) + Titling set (Product/Prose).
- ✅ Buttons — 6 sets, 574 variants: tight-label type, icons recoloured, colour migrated, described.
- ✅ UI page — 67 components: typography → altSemantic, colour → current tokens, all described. Legend deduped. Toast verified sound.
- ✅ Table kit built + housed + conforming doc frame.
- ✅ Chart typography subset specified + styles created (user binding to vars).
- ✅ Chart kits BUILT on the Charts page ("content" frame) — Bar, HBar, Bar Stacked, HBar Stacked, Line Chart (kit) + Lines, Area Chart (kit) + Area, Slope Chart, Donut, Bar Chart (kit). Padding-driven bar model. This is well beyond the older notes → see §1.8.
- ✅ ChartContainer moved to Charts page (canonical `6204:2827`, housed in `6497:279020`); old `6403:178823` deleted.
- ✅ Vertical flow doc-frame built on the Spacing page (`6845:219201`), replacing `Proto`.
- ✅ Spec reconciled to emitted output (2026-07-24) → §2.4.
- ✅ T-shirt spacing repo consumer migration (2026-07-24, step 3) → §2.3.
- ✅ Spacing alias spec + guard closeout (2026-07-24) → §2.2.
- ✅ Chart family + product ladder renamed and verified in Figma (2026-07-27) → §2.1.

## 3.2 Next ▶

- ▶ **Charts:** repoint the 11 raw SVG exports in the "Example downloads" frame (`6497:277388`) — verified untouched (348 unstyled text nodes, 323 hardcoded hex fills, 0 tokens). Assign `Chart/*` roles + repoint fills to `data/*` / `chart/*`. Needs a hex→token colour map first: read `data/*` + `chart/*`, confirm the mapping, then migrate and full-scan verify.
- ▶ **Repo (Claude Code), atomic in one release:** re-export variables; `outputReferences` on typography; cjs locals + utility renames; repo binding migration. No alias window → full-scan verify before the commit.
- ▶ **Spec session:** naming rule, chart family rationale, product tables, three stale rows, the line 147 correction, the line-height-as-reference exception; guard updates.
- ▶ Then `verify-build` → `gen` → `check` to re-baseline.

## 3.3 Open / deferred (not done, by design)

- `static` / white-for-contrast mop-up on buttons.
- Rename/rescope the old type-scale skill; decide umbrella vs sub-skills.
- Retire the old Metric family + old Section break sets (user moving them to the archive page; the composition sweep fixes instances).
- Repo / Claude Code: full cutover via parser alias; migrate real Storybook tables + charts.
- Maps page: still a gap (empty — re-assess later).
- **Eyebrow casing** — resist uppercase for now, decision pending → §1.4.
- **Fluid tier home** — implement 4 `clamp()` roles + unitless lh in cjs (post-SD), OR keep spec-only. Currently spec-only.
- **`label-tight` / `label-sm-tight` cannot emit** — style-only, no backing variables in `semantic-typography`.
- **`tw-extend/primitive-spacing.cjs`** emitted but not wired into `ldn-theme.cjs` (repo).
- **T-shirt step 4 remainder:** accept-and-re-baseline only. Pipeline emit already dropped at HEAD; Figma `semantic-spacing` rename done → §2.2.
- **ChartContainer description** still implies "chart carries its own note" — needs updating → §1.8.
- **Table kit PENDING items** → §1.7.

## 3.4 Work split (in flight, from 2026-07-27)

| Change                                                                                                                                                     | Owner              | Status                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------------------------- |
| Rename the 4 product role groups; author the new chart roles as semantic→semantic aliases; fix the xl lh error + `tick-sm` weight binding                  | Figma (Chris)      | ✅ DONE + verified 2026-07-27 |
| Re-export variables; `outputReferences` on typography; cjs locals + utility renames; repo binding migration (atomic — no alias window)                     | repo / Claude Code | ▶ NEXT                        |
| Spec prose (naming rule, chart family rationale, product tables, three stale rows, line 147 correction, line-height-as-reference exception); guard updates | spec session       | ▶ IN PROGRESS                 |

## 3.5 Drift warnings ⚠

- ⚠ **Transport docs had drifted materially behind the live file** (caught 2026-07-20 via ground-truth recon). Re-verify against Figma before trusting any snapshot line here.
- ⚠ **`charts/bar-chart.md` is partly stale** — it still describes static SVG specimens for line/area/scatter, which real kits superseded. Re-audit when next touching charts.
- ⚠ **Nothing in §2.1 is verified against emitted output.** That session had no repo access; a rebuild is required to confirm every value claim, and repo-side resolution of the new semantic→semantic aliases is unproven until then.
