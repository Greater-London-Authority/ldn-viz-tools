# DECISIONS — GLA / ldn-viz design system project

**Read this first, every session.** It is the authoritative list of standing decisions and current status — flat, one line each, no narrative. When a question feels settled, it's here. The detailed record lives in `component-drift-inventory.md`; the exacting _procedures_ live in `skills/`. This file is the quick ground-truth so we don't re-litigate settled things.

_Figma file: currently titled "Design System ver 3.1" (was "3.0 Agent Enhanced"). Dynamic-page file._

---

## Code cutover — resolutions (2026-07-21)

_Settled after the first spec-vs-code audit (`implementation-audit.md`). The first `.cjs`/token pass was Claude Code work done without full sight of the new system; these rulings reconcile it to the spec. Spec stays authoritative for typography + spacing._

- **Caption = 12px** (both prose and product). Resolves the long-standing 12-vs-13 question; product was already 12, prose moves 13→12. Update prose caption token; product caption already correct at 12/lh16.
- **`format` mechanism is retired** — prose vertical rhythm consolidates on **`flow`** (context flow ramp `--flow-*` + owl selector), which is the spec model. Delete `format.cjs`, drop its import + loop from `typography.cjs`, and move prose block spacing in `semantic.cjs` off the em-based `--typography-spacing-*` margins onto `flow`. `format.cjs`'s `--spacing-*-em` refs were dangling anyway.
- **Line-height data errors (audit §A) — being fixed in Figma variables** by user: Display/lg 67→72, Subtitle/xl 35→24, Title-4 base+xl 30→28, Metric-sm/xl 28→20. Errors clustered in the `base`+`xl` modes; sweep both columns wholesale. (SUPERSEDED 2026-07-24: the earlier `Lead base+xl 32→28` is dropped — Lead keeps lh 32 / ratio 1.4545 at all modes, verified emitted. A separate xl prose-body lh error, 1.75→1.625, was fixed 2026-07-24.)
- **Prose Eyebrow weight → Medium 500** (was Semibold 600 in tokens). User fixing the Figma variable. (Product `card-panel-eyebrow` already 500.)
- **Markdown heading ladder → h1–h4 map to Title 1–4** (was shifted up a rung; h1 was rendering as the 56px hero Headline). Headline is hero chrome only, never content h1. Fix in `semantic.cjs`.
- **Tight label variants — INCLUDE.** `label-tight` / `label-sm-tight` = same size/weight as Label/Label Sm, line-height 1.0, single-line only. Line-height treatment, no new size token. Button/tab/chip default.
- **Chart typography subset — INCLUDE.** `Chart/axis-title|label|tick|tick-sm` reach the token export. (UPDATED 2026-07-24: emitted default density is Tick 14 / Tick Sm 12, not 12/11 — see 2026-07-24 block.)
- **`sm` breakpoint — WIRE IT UP.** Tokens carry correct `sm` values but `responsive.cjs` skips it (default→md→lg→xl). Add `sm` so the full 5-step scale is live.
- **Eyebrow tracking (letter-spacing) = 0** (verified emitted 2026-07-24); weight 500. **Casing — HOLD** (resist uppercase for now; still pending).
- **`semantic-spacing` t-shirt scale — DEPRECATE toward the primitive/numbered scale.** Used by some existing components but not universally; migrate off it gradually rather than entrenching a second spacing grammar beside the numbered `--primitive-spacing-{n}` scale.
- **Metric default line-height = 1.0** (tight) confirmed as the default for both Metric and Metric Sm, all sizes.

---

## Spec reconciliation + tooling — resolutions (2026-07-24)

_Reconciled `design-system-specification.md` to the verified emitted output (Step 5 changelist from `spec-pipeline-reconciliation.md`). Build reproduced in-sandbox, zero-diff vs shipped `styles/`; all drift was spec-side. New stance: the spec is downstream of the build for every concrete value/name._

- **Spec is now downstream of the build.** Value tables + CSS appendix are generated from emitted `styles/`; only prose (intent/rationale) is hand-written. Spec can be out-of-date (a rerun fixes it) but not silently wrong.
- **Caption = 12 propagated** through both spec matrices + all role tables. 13px (old `fs-n2`) retired — no role uses it, not emitted.
- **13px fully removed → 17-step scale** (was 18). Caption at step -2 = 12; the `13 → 26` doubling chain dropped, 26 now hand-placed (still Title 2's `sm` step).
- **Line-height = two policies:** grid leading (structural roles, 4px grid, a reference — not a cascade `var()`) + reading leading (prose **body 1.625**, **body-sm 1.571** only). Product body/body-sm stay grid 24/20.
- **xl prose-body lh data error fixed** (1.75 → 1.625; body fs stays 16 at all modes). Verified via rebuild.
- **Chart ticks — emitted reality:** default **Tick 14 / Tick Sm 12**; **compressed** 12 / 11; 11 sub-floor. Supersedes the earlier 12/11 record. axis-title 14/500/lh20, label 14/400/lh20 confirmed.
- **Eyebrow:** tracking 0 (emitted), weight 500; casing on hold (resist uppercase).
- **Fluid `clamp()` tier = spec-only** — absent from cjs + emitted; marked spec-only, intended home the cjs post-SD layer.
- **Phantom names purged from the spec** (`--fs-*`/`--lh-*`/`--sp-*`/`--fw-*`/`--prose-*`/`--ui-*`); real grammar documented (primitives by px, `--typography-{mode}-{family}-{role}-{prop}`, `--primitive-spacing-{n}`). Note `semi-bold` is hyphenated.
- **Numbered spacing scale emits** (`--primitive-spacing-{n}` + sub-steps `-px/-0-5/-1-5/-2-5/-3-5`) — t-shirt retirement **step 1 done**; emits alongside the deprecated `--spacing-{tshirt}` during the window.
- **NEW tooling (canonical):** `regen_spec.py` (`verify-build` / `gen` / `check`) + `SPEC-CHANGE-PROTOCOL.md`. Spec value blocks live between `<!-- GEN:* -->` markers; a `PINNED` list machine-checks decisions vs emitted. Canonical home = git repo; loose downloads disposable.
- **CONSTRAINT (t-shirt migration):** `semantic-flow` / `semantic-spacing` / `grid-spacing` reference `primitive.spacing` and ÷16 expecting **px** — the shared primitive value must stay px in the token graph; rem conversion only at emit time. The single easiest thing to break.
- **Semantic spacing scale:** spacing consumption alias --spacing-{n} → primitive; no --primitive-\* in authored code; no named spacing-role set beyond flow/grid

---

## Repo consumer migration off t-shirt spacing — resolutions (2026-07-24)

_Step 3 of the t-shirt retirement (see token-architecture-and-naming.md §5, SPEC-CHANGE-PROTOCOL.md). Gated on `verify-build` zero-diff, closed with a full-repo scan per the migration brief's §6 targets._

- **`verify-build` zero-diff confirmed** before and after migration — repo build reproduces shipped `styles/` exactly; consumer edits did not touch emitted output (expected, since they're downstream-only changes).
- **Full scan found two live dangling t-shirt/em-set references** (contradicting the assumption that source-side drop already made all consumer refs dangling-but-harmless): `packages/ui/src/lib/select/Select.svelte` (`--spacing-xs`, `--spacing-sm`) and `packages/themes/tailwind-custom/typography/semantics.cjs` (`--spacing-xxs` + 6× `--typography-spacing-{lg,xs,md,xxs}`). Both **migrated** to the numbered `--spacing-{n}` scale per the mapping table (xxs→1, xs→2, sm→3, md→4, lg→5, ...).
- **`--typography-spacing-*` em set ruling:** all six `semantics.cjs` uses were padding/border-width (list indent, blockquote border+indent, table cell padding, code padding) — **construction, not rhythm** per the rhythm-vs-construction gate (`llm-docs/migration-spacing-mapping.md`). Mapped directly to numbered `--spacing-{n}` rem tokens rather than to `flow`. `format.cjs` itself no longer exists and has no importers — confirmed fully dead, nothing to migrate there.
- **No live t-shirt Tailwind classes** (`mt-xxs`, `p-lg`, etc.) found anywhere in Svelte templates. **No stray `--primitive-spacing-*`** usage in components/hand-CSS outside the token build itself.
- **`apps/web/src/content/design-system/foundations/design-tokens.md` updated** — doc prose no longer shows the retired t-shirt/em example (`--spacing-md` / `--typography-spacing-md`); now documents the numbered scale + a pointer to `flow` for vertical rhythm.
- **T-shirt retirement scope decision — RESOLVED:** repo consumer migration (step 3) is done and full-scan-verified. Remaining work is **step 4 only** (separate, gated): drop `--spacing-{tshirt}` + `--typography-spacing-*` emission from `sd.config.json`/`sd.build.js`, unwire the t-shirt Tailwind file, delete `semantic-spacing` in Figma, re-run full-scan verify, then re-baseline.

## Spacing alias — spec + guard closeout (2026-07-24)

- **Spec documents the public layer.** `design-system-specification.md` reframes `--primitive-spacing-{n}` as the private source, adds a `## Public spacing layer (--spacing-{n} / mt-{n})` subsection + generated `GEN:spacing-alias` table, and rewrites the t-shirt section to past tense (retired; source emits neither t-shirt nor `--typography-spacing-*`; consumers migrated, full-scan verified).
- **Guard now covers the alias.** `regen_spec.py check` asserts every `--spacing-{n}` is a pure `var(--primitive-spacing-{n})` reference to the identically-keyed primitive and that all dev-facing rungs exist — catches the dropped-rung and mis-key (spacing-9→primitive-spacing-10) classes. New `GEN:spacing-alias` block generated from styles/.
- **Observed (confirmed at HEAD):** the current `sd.config.json` / `sd.build.js` / token export / emitted output carry NO t-shirt or `--typography-spacing-*` emission — so step 4's "drop emit / unwire t-shirt Tailwind file" is already complete at the pipeline level. Remaining step-4 items reduce to Figma `semantic-spacing` rename (done) + accept-and-re-baseline.

---

## Sources of truth (who's authoritative)

- **Spec is authoritative for typography, spacing, flow, grid, colour** — `design-system-specification.md` (renamed from type-scale-specification.md; now covers all five foundations).
- **Existing infra convention beats the spec on naming** (e.g. `spacing-` not `sp-`).
- **Code/Storybook is authoritative for tables and charts** (behavioural / data-driven). Figma is _representative_, not a reimplementation.
- **Observable Plot is the charting library** — authoritative for real charts.
- **Figma LEADS the typography + colour cutover ahead of the repo** (user's explicit "bite the bullet"). Temporary Figma↔code mismatch is accepted; repo catches up later via the SD parser (alias altProse→prose, altProduct→prose). Foundation lives in Figma as parallel `alt*` groups beside legacy.
- **This session has no repo access.** Repo/code work (SD parser aliasing, migrating real Storybook tables/charts, the actual cutover) is separate Claude Code work.

## Token / naming grammar

- Two-tier everywhere: **primitive → semantic**; components bind to semantic only, never primitives, never raw hex.
- **Component context prefix dictates type family** (governing rule): `Product/*` → `altSemantic/Product/*`; `Prose/*` → `altSemantic/Prose/*`; `Chart/*` → `altSemantic/Chart/*`. No cross-mixing.
- **Stick with the system, not legacy sizing** — migrate off-system sizes to the correct role even if it visibly resizes (e.g. Accordion body 20→16, input label 16→14).
- Colour: current semantic grammar is `interactive/{intent}[-muted][-state]`, plus text/label/surface/container/canvas/border/inverse/static/data/chart/geo. One `interactive/{intent}` token serves both fill and text; disabled splits (fill→disabled-muted, text→disabled).

## Visual rules (system-wide)

- **No rounded corners.** Corner radius is **0** everywhere, UNLESS the element is genuinely round (e.g. a circular avatar, a dot). Never add radius to bars, cards, cells, buttons, inputs, containers, etc. (Caught: bar chart bars had radius 2 — removed.)
- **X-axis / category labels sit BELOW the axis baseline**, not above; y-axis ticks sit left of the plot. (Chart convention.)

## Typography — key standing rules (in spec + ds-doc-frame skill)

- **Tight Label treatment**: `label` / `label-sm` at line-height 1.0 for single-line controls (buttons, tabs, chips). No line breaks. (`altSemantic/Product/label-tight`, `label-sm-tight`.)
- **Derived UI application rules**: control/nav labels → Label 14 (shrink legacy 16); input value/placeholder/body → body 16; helper/hint/secondary → body-sm 14; small functional → caption; genuine titles → card-panel-title 20; sidebar/nav section titles → Label (not a title).
- **Prose Eyebrow** role exists (overline/kicker, 14 Medium). **Eyebrow casing**: currently uppercase+tracked; user said "resist uppercase for now" — NO changes made, pending decision.
- **Chart typography subset** (dedicated, like the colour subset): `Chart/axis-title` 14 Med lh20, `Chart/label` 14 Reg lh20, `Chart/tick` **14** Reg tight, `Chart/tick-sm` **12** Reg tight — **default density** (verified emitted 2026-07-24). A **compressed** density drops the pair to 12 / 11; 11 is the sub-floor, never below. `0.86` in exports = rem bug ≈14px, always correct it.

## Tables — decisions

- Composable **kit**, code-authoritative. Kit lives in a "Table Kit" doc frame on the Tables page.
- **Approach A (row-based, hug everything)** chosen over column-based: cell (fixed Width variant) → row (HUG) → table (HUG). Width changes ripple up visibly; columns align by using the same Width variant on header + body.
- **Cell = the swappable unit**: `Table Cell` has a `Renderer` instance-swap (Text/Number/Boolean/Mini-chart). Alignment lives in the renderer, not the cell. "fill" is an instance setting, not a variant.
- Width set: **xs 64 / sm 88 / md 120 / lg 220 / xl 300 / fill**.
- Composed `Table Row` (Stripe variant) + `Table Header Row`, both hug. Width changes propagate via the row/header **masters** (per-instance edits stay local).
- PENDING: bind cell padding/height to spacing variables (user doing this); parameterise mini-chart (bar+label per row) + boolean (true/false); reconcile widths vs real Storybook columns (repo); retire the original flat mockup table.

## Charts — decisions

- Figma is **representative**, not data-accurate. Hybrid kit: **flexible components for the bar family** (bar, horizontal bar, split bar) + reuse Donut; **static tokenised SVG specimens for line/multiline/area/scatter** (geometry is the data — don't parameterise).
- Best-practice caveat: Figma component variables can't drive geometry — "a few variables" = editable height/label/colour-swap + duplicatable parts, not data-binding. Bars sized by resize, not computed.
- **ChartContainer** is CANONICAL. NOTE (verified 2026-07-20): old canonical `6403:178823` is GONE; the live canonical is component **`6204:2827`** on the Charts page, housed in doc-frame **`6497:279020`**. Old `Chart Container` in the `previously` frame retired.
- ChartContainer = **static chrome, invariant**: ChromeHeader (title + optional eyebrow/subtitle/hint) + `Content` SLOT + ChromeActions (download/export).
- **Slot contents = per-plot, composed by the designer**: legend + plot + footer (notes/citation). NOT baked into the container, NOT baked into the plot mark. (Update ChartContainer's description to say this — currently implies "chart carries its own note".)
- DONE (verified 2026-07-20): ChartContainer moved off Typography onto the Charts page; old superseded one deleted. (This TODO is complete.)
- Chart SVG imports come in RAW: unstyled live text + hardcoded hex. On-system = (a) assign `Chart/*` roles, (b) repoint fills to `data/*`/`chart/*`.

## Documentation — scope + placement

- **Two tiers.** In-scope during sweeps (lightweight): component **metadata/descriptions** + intro/overview **doc-frames**. DEFERRED to a holistic docs pass: usage dos/don'ts, accessibility notes, full states-strip treatment.
- **Doc-frame placement is deferred/batched** — no decided home yet. Don't scatter doc-frames; batch them later. (Composition/titling doc-frames currently live on the Typography page and will relocate when a components-docs home is decided.) Emerging pattern: a **foundation** doc-frame can live on the page for its foundation (see the Vertical flow doc on the Spacing page) — this is placement-with-its-foundation, distinct from the still-undecided _component_-docs home.
- **Vertical flow doc-frame** (built 2026-07-20): on the "Spacing, rhythm, grids and containers" page, node **`6845:219201`** ("Vertical flow"), replacing the old `Proto` frame. Follows `ds-doc-frame` (header + Doc/\* chrome, tokens bound). Content: intro prose + three illustrations — (1) the ramp × three contexts shown as **true-height** shaded gaps (NOT scaled — an earlier scaled-bar version was rejected as misleading), (2) same blocks in prose vs product, (3) coupling (wrapped/tight vs loose-sibling/default). Gap values faithful to the `semantic-flow` vars.
- **Doc frames MUST follow `skills/ds-doc-frame`** — `.DS-Section-header` (425:7094, Title#425:0) + `Doc/*` styles (NOT product roles) + geometry (outer 1280/pad0 → content pad[32,60,32,60]/gap40 → Doc/Body intro + optional Doc/Caption states strip). Load the skill before building ANY doc/overview/housing frame.

## Figma file conventions

- `.DS-` prefix = docs scaffolding (audited only on Get Started; `.DS-Page-Head` is an ignorable waymarker).
- `.`-prefix (single dot, no DS) = internal/private sub-component (not scaffolding, not published) — legitimate, migrate normally.
- Real components never skipped in sweeps. Component-internal spacing MAY use primitives (carve-out).
- `component archive` page (6405:179693) — IGNORE in audits.

## Working stance

- Propose-then-write on destructive/structural edits; read-only recon first; verify with screenshots; verify migrations with a FULL scan, not a sample (a sample missed rare tokens on buttons). Store big reads to disk.
- Build from **ground truth, not memory** — re-read the reference artifact/IDs before encoding or rebuilding (this is how the ds-doc-frame drift was caught and fixed).

## Figma mechanics (gotchas — will become a skill)

- figma_execute on this dynamic-page file: use **async** variants (getNodeByIdAsync, getStyleByIdAsync, getLocalTextStylesAsync, getMainComponentAsync, figma.variables.getVariableByIdAsync, getLocalVariableCollectionsAsync).
- **globalThis does NOT persist** across figma_execute calls — inline all data.
- **resize() resets primaryAxisSizingMode to FIXED** — set back to AUTO after if hugging. combineAsVariants also clobbers it.
- **Read-after-write size measurements lag one step** (stale) — re-read to verify.
- Setting a text style does NOT carry colour — re-bind the fill variable after setTextStyleIdAsync.
- Full-page 278-master scans TIME OUT (>4min) — scan subsets.

## Skills (load before the matching task)

- **`skills/ds-spec`** — THE spec-derived skill: the whole design system (typography + chart-type subset + colour + spacing + flow + grid). Load this whenever choosing type/colour/spacing/grid/chart values or deciding roles/tokens. Its `references/design-system-specification.md` is the canonical full spec (exact values, full mappings, CSS block). Built as ONE comprehensive skill with the option to split into `ds-typography` / `ds-colour` / `ds-spacing-flow-grid` sub-skills later (each `##` foundation block is self-contained to make that painless). SUPERSEDES the old `type-scale-system` skill (now in `_retired/`, from when the spec was typography-only).
- **`skills/ds-doc-frame`** — building any doc/overview/housing frame. DONE; IDs verified live in v3.1.
- PLANNED: `ds-token-migration` (Base→altSemantic conversion table + colour deprecated→current mapping + verify-full-scan discipline); `ds-component-build` (hug sizing, renderer-swap, variant/resize traps incl. the padding-driven bar model + no-radius rule); possibly `ds-figma-conventions`.

## Thread transport (what a new thread must load)

To continue this work in a fresh thread, load: **DECISIONS.md** (this file — standing decisions), **skills/ds-spec/** (the spec + system rules; the crux artifact), and the relevant task skill (**ds-doc-frame** for doc frames). Reference detail as needed: component-drift-inventory.md (narrative record), charts/_.md + tables/_.md (kit specifics), figma-file-conventions.md. The Figma file is "Design System ver 3.1"; connect the Desktop Bridge plugin (port 9223) and verify IDs are still live before relying on them.

## Open / deferred items (not done, by design)

- static/white-for-contrast mop-up on buttons.
- Rename/rescope the old type-scale skill; decide umbrella-vs-sub-skills.
- ~~caption → 12px global assessment~~ RESOLVED 2026-07-21: **caption = 12px** (prose + product). See Code cutover resolutions.
- Retire old Metric family + old Section break sets (user moving to archive page; composition sweep fixes instances).
- Repo/Claude-Code: full cutover via parser alias; migrate real Storybook tables + charts.
- Maps page: still a gap (empty / re-assess later).
- ~~T-shirt retirement — scope decision OPEN~~ RESOLVED 2026-07-24: spec-only done; **repo consumer migration (step 3) done, full-scan verified**; **step 4 pipeline-level emit already dropped** (confirmed at HEAD — `sd.config.json`/`sd.build.js`/emitted output carry no t-shirt or `--typography-spacing-*` output). See Repo consumer migration + Spacing alias closeout resolutions. Remaining: Figma `semantic-spacing` rename (done) + accept-and-re-baseline only.
- **Fluid tier home** — implement 4 `clamp()` roles + unitless lh in cjs (post-SD) OR keep spec-only. Currently spec-only.
- **`tw-extend/primitive-spacing.cjs`** emitted but not wired into `ldn-theme.cjs` (repo).

## Status snapshot (what's on the new system)

- ✅ Composition cluster (TitleGroup, ChromeHeader, Card, ChartContainer, Metric) + Titling set (Product/Prose).
- ✅ Buttons (6 sets, 574 variants): tight-label type, icons recoloured, colour migrated, described.
- ✅ UI page (67 components): typography → altSemantic, colour → current tokens, all described. Legend deduped. Toast verified sound.
- ✅ Table kit built + housed + conforming doc frame.
- ✅ Chart typography subset specified + styles created (user binding to vars).
- ✅ Chart kits BUILT on the Charts page ("content" frame) — Bar, HBar, Bar Stacked, HBar Stacked, Line Chart (kit)+Lines, Area Chart (kit)+Area, Slope Chart, Donut, Bar Chart (kit). (Padding-driven bar model.) This is well beyond what the older notes describe — the "static SVG specimen only for line/area/scatter" decision was superseded by real kits. `charts/bar-chart.md` is now partly stale on this point.
- ✅ ChartContainer moved to Charts page (canonical `6204:2827`, housed in `6497:279020`); old `6403:178823` deleted.
- ✅ Vertical flow doc-frame built on the Spacing page (`6845:219201`), replacing `Proto`.
- ▶ NEXT (charts): the genuinely open item is **repointing the 11 raw SVG exports** in the "Example downloads" frame (`6497:277388`) — verified untouched (348 unstyled text nodes, 323 hardcoded hex fills, 0 tokens). Assign `Chart/*` roles + repoint fills to `data/*`/`chart/*`. Needs a hex→token colour map first (read `data/*`+`chart/*`, confirm mapping, then migrate + full-scan verify).
- ✅ Spec reconciled to emitted output (2026-07-24): Step 5 applied, 17-step scale, two-policy line-height, chart 14/12, fluid spec-only; value blocks generated between `GEN` markers; `regen_spec.py` + `SPEC-CHANGE-PROTOCOL.md` added.
- ⚠ GENERAL: the transport docs had drifted materially behind the live file (caught 2026-07-20 via ground-truth recon). Re-verify against Figma before trusting any snapshot line; re-audit `charts/bar-chart.md` similarly when next touching charts.
- ✅ T-shirt spacing repo consumer migration (2026-07-24, step 3): `Select.svelte` + `semantics.cjs` migrated off `--spacing-{tshirt}`/`--typography-spacing-*` onto numbered `--spacing-{n}`; full-scan verified zero remaining t-shirt/em-set/stray-primitive refs in consumers; build re-verified zero-diff.
- ✅ Spacing alias spec + guard closeout (2026-07-24): spec documents `--primitive-spacing-{n}` as private source + new "Public spacing layer" section with generated `GEN:spacing-alias` table; t-shirt section rewritten past-tense as retired; `regen_spec.py check` now guards every `--spacing-{n}` is a pure reference to its identically-keyed primitive (dropped-rung + mis-key protection). Step 4 confirmed already complete at the pipeline level (no t-shirt/em-set emission at HEAD) — only Figma cleanup + re-baseline remain.
