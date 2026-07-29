# DECISIONS — GLA / ldn-viz design system

**Read this first, every session.** The changelog below is the authoritative list of decisions; the reference sections at the end are what those decisions add up to. When a question feels settled, it's here.

_Figma file: "Design System ver 3.1" (was "3.0 Agent Enhanced"). Dynamic-page file. Desktop Bridge on port 9223._

**Jump to:** [Changelog](#changelog) · [Status](#status) · [Current values](#current-values) · [Reference](#reference)

---

## How to update this file

**A new decision → a dated block at the top of the [Changelog](#changelog).** Nothing below it changes. There are no section numbers anywhere in this file, by design: numbering a reverse-chronological log means either renumbering on every append or counting downwards forever.

Four rules:

1. **Entries are brief — one line per decision.** State what was decided, not why. Rationale belongs in the linked detail doc; the changelog is an index of rulings, not a record of reasoning.
2. **If a decision changes a standing rule, edit the rule in [Reference](#reference) too.** The changelog says what happened on a date; Reference says what is true now. Never leave two live answers to one question.
3. **Never rewrite a past entry.** The one permitted edit is appending `— superseded YYYY-MM-DD` to the affected line, so a reader can see the ruling existed without having to reconcile it.
4. **Numbers live in [Current values](#current-values), once.** Don't restate a font size in three dated blocks — change the table and log that you changed it.

Cross-references are by heading name, not number, so they survive inserts. Same-day entries are distinguished by subject and ordered newest-first within the day.

**Markers:** `RULED` settled, don't re-litigate · `OPEN` needs a decision · `PENDING` decided, not yet done · `RETIRED` migrated off · `superseded` replaced, pointer follows · ✅ done · ▶ in flight · ⚠ warning.

---

# Changelog

_Newest first. Append at the top._

## 2026-07-28 — Spec re-baseline

- **`design-system-specification-2026-07-27.md` renamed to canonical `design-system-specification.md`** — `regen_spec.py`'s default `--spec` path now resolves without an override.
- **`regen_spec.py` guard updated for the 07-27 rename:** `PRODUCT_ROWS` (`dashboard-head`→`page-head`, `card-panel-title`→`title`), `PRODUCT_MATRIX_OMIT` (`card-panel-subtitle`/`card-panel-eyebrow`→`subtitle`/`eyebrow`), `SAMPLE`, and the `PINNED` product-eyebrow-weight check all moved off the old component-specific names. Without this the guard was checking roles that no longer exist and would have false-failed forever.
- **`verify-build` → `gen` → `check` run clean:** zero-diff build, all generated blocks (CSS appendix, spacing table/alias, prose/product matrices) regenerated, all 12 `PINNED` decisions pass against emitted output — including the corrected `chart/title`/`chart/eyebrow` line-height from the fix below and the `tick-sm` font-weight binding fixed 07-27.
- Closes the "spec prose" in-flight row — superseded, see [Status](#status).

## 2026-07-28 — Repo audit: line-height alias bug found and fixed

Detail: read-only repo audit of the Status section against emitted output (tokens JSON, build pipeline, `styles/typography.css`, tailwind-custom cjs files), prompted by suspected drift.

- **`sd.build.js` line-height resolution was broken for semantic→semantic aliases.** `chart/title` and `chart/eyebrow` line-height are authored as references to `product/title` / `product/eyebrow` (correct in the source token JSON), but the build's ratio calculator read the font-size sibling's *original* (unresolved) value and regex-matched it against a primitive-only pattern (`size\.(\d+)`). When that sibling's font-size was itself a semantic alias rather than a primitive reference, the regex failed and the code silently fell back to dividing by a hardcoded `16`. Emitted `chart/title` line-height was **1.7500** instead of **1.4000**; `chart/eyebrow` was **1.2500** instead of **1.4286**. `chart/subtitle` coincidentally matched (its aliased font-size happens to be 16px). RULED — fixed.
- **Fix:** `getFontSizeForLineHeight` in `sd.build.js` now reads the sibling font-size token's resolved `.value` instead of regex-parsing `.original.value` — the same approach the font-size branch already used for its own aliasing. Rebuilt; all three aliased chart roles now correctly equal their product source at every breakpoint. This directly disproves the `Typography.mdx` claim that these roles "cannot drift" — they did; now fixed.
- **Repo-side rename migration confirmed complete**, superseding the "▶ next" status: `outputReferences` has been `true` on the typography platform since 2026-07-24 (`8d9e559f`); cjs renames (`card-panel-*` / `dashboard-head` → generic role names) landed 2026-07-27 (`6e60de6f`) — zero stale references anywhere in `.cjs`/`.css`.
- **Spec prose confirmed present** (naming rule, chart rationale, twelve-role correction, line-height-as-reference exception) in `design-system-specification-2026-07-27.md`. Re-baseline — rename to canonical `design-system-specification.md`, run `regen_spec.py check` — still outstanding. — superseded 2026-07-28
- **`label-tight` / `label-sm-tight` correction:** these DO emit — real Tailwind utility classes in `roles.cjs`, live in 7 components (`Button`, `TabLabel`, `NavigationMenuItem`, `ThemeSwitcher`, `MultipleActionButton`, `GeocoderSuggestion`, `GeocoderSuggestionList`). What's actually missing is a dedicated backing token: they currently reuse the `label` / `label-sm` vars with `line-height` hardcoded to the literal `1`. Re-scoped, not closed.

## 2026-07-27 — Chart typography family + product ladder renamed

Detail: `audit-2026-07-27-chart-family.md`. Figma-only session.

- **Product roles renamed:** `card-panel-title` → `product/title`; `card-panel-subtitle` → `product/subtitle`; `card-panel-eyebrow` → `product/eyebrow`; `dashboard-head` → `product/page-head`. `section-head` unchanged. RULED.
- **Rename only** — the variables persist, so all 398 bound nodes ride along.
- **New standing rule:** role names may be domain-specific within a context family, never component-specific. See [Token and naming grammar](#token-and-naming-grammar).
- **Chart family closed at eight roles**, with `chart/note` added for footer source/citation. RULED.
- **`chart/legend` not created** — legend entries bind `chart/label`. RULED. (Set was briefly specified at nine, corrected down after the Figma pass.)
- **Chart object tier aliases product semantic→semantic**, not via a shared primitive. RULED. First such alias in typography; makes `outputReferences` a prerequisite rather than a nice-to-have.
- **No deprecation window** — old names simply gone, so the repo migration must be atomic within one release. RULED.
- **Compressed tick density stays spec-only** (12 / 11 documented, not emitted). Unchanged by this pass.
- **Metric duplication kept, spec prose corrected instead** — `subtitle`/`eyebrow` duplicate `body`/`label`, and the spec's "ten roles, ten font-size variables" claim (line 147) is wrong against twelve product roles in Figma. Fixing the prose beats re-pointing 398 nodes. PENDING on the spec session.
- **Bugs fixed:** `chart/axis-title` and `chart/label` line-height 44 → 20 at `xl`; `Semantic/Chart/tick-sm` was missing its `fontWeight` binding, now binds all five props.
- **`label-tight` / `label-sm-tight` still cannot emit** — style-only, no backing variables. OPEN.
- **Figma pass applied and verified live:** `semantic-typography` now 168 variables (was 148); zero stale `card-panel*` / `dashboard-head` references in any name or description; aliasing confirmed resolving through the chain; 13 chart containers re-pointed (title 915→902, eyebrow 228→215, subtitle 170→157, each new chart style +13).
- **Line-height and letter-spacing are now references, not literals** for the three aliased chart roles — the first exception to the literals rule, so the token-architecture doc and spec prose must acknowledge it. PENDING.
- **Guard:** new `PINNED` entries for each chart↔product alias and for chart line-height at all modes; `card-panel-eyebrow` pin → `product/eyebrow`; `PRODUCT_ROWS` keys updated; no `chart/legend` pin.
- ⚠ **Nothing here is verified against emitted output** — no repo access that session. A rebuild is required to confirm every value claim.

## 2026-07-24 — Spacing alias: spec and guard closeout

- **Spec documents the public layer** — `--primitive-spacing-{n}` reframed as the private source, new public spacing layer section, generated `GEN:spacing-alias` table, t-shirt section rewritten in past tense.
- **Guard covers the alias** — `regen_spec.py check` asserts every `--spacing-{n}` is a pure reference to its identically-keyed primitive and that all dev-facing rungs exist, catching dropped-rung and mis-key (`spacing-9` → `primitive-spacing-10`) errors.
- **Confirmed at HEAD:** no t-shirt or `--typography-spacing-*` emission anywhere in `sd.config.json`, `sd.build.js`, the token export or emitted output — t-shirt step 4 is already done at the pipeline level; only accept-and-re-baseline remains.

## 2026-07-24 — Repo consumer migration off t-shirt spacing (step 3)

Gated on `verify-build` zero-diff; closed with a full-repo scan.

- **`verify-build` zero-diff confirmed** before and after — consumer edits are downstream-only and did not touch emitted output.
- **Two live dangling references found and migrated:** `packages/ui/src/lib/select/Select.svelte` and `packages/themes/tailwind-custom/typography/semantics.cjs`. This contradicted the assumption that the source-side drop had already made all consumer refs harmless.
- **All six `--typography-spacing-*` uses were construction, not rhythm** (list indent, blockquote border and indent, table cell padding, code padding) → mapped to numbered `--spacing-{n}`, not to `flow`. Established the rhythm-vs-construction gate as the deciding test.
- **`format.cjs` confirmed fully dead** — file gone, no importers, nothing to migrate.
- **Full scan clean:** no t-shirt Tailwind classes (`mt-xxs`, `p-lg`) in any Svelte template; no stray `--primitive-spacing-*` in components or hand-CSS.
- **`apps/web/src/content/design-system/foundations/design-tokens.md` updated** — retired t-shirt/em example replaced with the numbered scale plus a `flow` pointer.
- **Step 3 done and full-scan verified.** Step 4 remains, separate and gated.

## 2026-07-24 — Spec reconciliation and tooling (Step 5)

Detail: `spec-pipeline-reconciliation.md`. Build reproduced in-sandbox, zero-diff vs shipped `styles/` — all drift was spec-side.

- **Spec is now downstream of the build** for every concrete value and name; only prose is hand-written. RULED.
- **Caption 12 propagated** through both matrices and all role tables; 13px (old `fs-n2`) retired.
- **13px fully removed → 17-step scale** (was 18); the 13 → 26 doubling chain dropped, 26 now hand-placed.
- **Line-height split into two policies** — grid leading vs reading leading. See [Current values](#current-values).
- **xl prose-body line-height data error fixed**, 1.75 → 1.625. Verified via rebuild.
- **Chart ticks: emitted default is 14 / 12** — supersedes the 12 / 11 recorded 2026-07-21.
- **Fluid `clamp()` tier marked spec-only** — absent from cjs and emitted output.
- **Phantom names purged from the spec** (`--fs-*`, `--lh-*`, `--sp-*`, `--fw-*`, `--prose-*`, `--ui-*`); real grammar documented.
- **Numbered spacing scale emits** alongside deprecated t-shirt during the window — t-shirt step 1 done.
- **New tooling, canonical:** `regen_spec.py` (`verify-build` / `gen` / `check`) and `SPEC-CHANGE-PROTOCOL.md`; value blocks live between `<!-- GEN:* -->` markers; a `PINNED` list machine-checks decisions against emitted output.
- ⚠ **Constraint surfaced:** `semantic-flow` / `semantic-spacing` / `grid-spacing` divide `primitive.spacing` by 16 expecting px. The easiest thing in the system to break.

## 2026-07-21 — Code cutover

Detail: `implementation-audit.md`. Reconciles the first `.cjs`/token pass, done without full sight of the new system, back to the spec.

- **Caption = 12px**, prose and product. Resolves the long-standing 12-vs-13 question; prose moves 13→12.
- **`format` mechanism retired** — prose vertical rhythm consolidates on `flow`. Delete `format.cjs`, drop its import and loop from `typography.cjs`, move prose block spacing in `semantic.cjs` off em-based margins.
- **Four line-height data errors fixed in Figma:** Display/lg 67→72, Subtitle/xl 35→24, Title-4 base+xl 30→28, Metric-sm/xl 28→20. Clustered in the `base` and `xl` modes — sweep both columns wholesale. _The `Lead base+xl 32→28` item was dropped — superseded 2026-07-24._
- **Prose eyebrow weight 600 → 500 Medium.**
- **Markdown heading ladder h1–h4 → Title 1–4** — h1 was rendering as the 56px hero Headline.
- **Tight label variants — INCLUDE.** Line-height treatment only, no new size token.
- **Chart typography subset — INCLUDE**, reaching the token export. _Tick densities superseded 2026-07-24._
- **`sm` breakpoint wired up** in `responsive.cjs` — the full 5-step scale is live.
- **Eyebrow tracking 0**; casing HOLD, resist uppercase.
- **`semantic-spacing` t-shirt scale DEPRECATED** toward the numbered scale. _Completed 2026-07-24._
- **Metric default line-height 1.0**, both Metric and Metric Sm, all sizes.

---

# Status

## Done ✅

- Composition cluster (TitleGroup, ChromeHeader, Card, ChartContainer, Metric) + Titling set (Product/Prose).
- Buttons — 6 sets, 574 variants: tight-label type, icons recoloured, colour migrated, described.
- UI page — 67 components: typography → altSemantic, colour → current tokens, all described. Legend deduped, Toast verified sound.
- Table kit built, housed, conforming doc frame.
- Chart typography subset specified, styles created.
- Chart kits built on the Charts page ("content" frame) — Bar, HBar, Bar Stacked, HBar Stacked, Line Chart (kit) + Lines, Area Chart (kit) + Area, Slope Chart, Donut, Bar Chart (kit). Padding-driven bar model.
- ChartContainer moved to the Charts page (canonical `6204:2827`, housed in `6497:279020`); old `6403:178823` deleted.
- Vertical flow doc-frame on the Spacing page (`6845:219201`), replacing `Proto`.
- Spec reconciled to emitted output; `regen_spec.py` and the change protocol in place.
- T-shirt repo consumer migration (step 3), full-scan verified; spacing alias spec and guard closeout.
- Chart family and product ladder renamed and verified in Figma.
- Repo binding migration for the 07-27 rename: `outputReferences` on the typography platform (`8d9e559f`, 07-24) and cjs renames (`6e60de6f`, 07-27) — verified zero stale `card-panel-*` / `dashboard-head` references anywhere in `.cjs`/`.css` (repo audit, 07-28).
- Line-height alias bug in `sd.build.js` found and fixed (07-28): `chart/title` / `chart/eyebrow` now correctly resolve to product's line-height (1.4000 / 1.4286) at every breakpoint instead of a silent `/16` fallback (1.7500 / 1.2500). Rebuilt and verified against `styles/typography.css`.
- Spec re-baselined (07-28): `design-system-specification-2026-07-27.md` renamed to canonical `design-system-specification.md`; `regen_spec.py`'s `PRODUCT_ROWS`/`PRODUCT_MATRIX_OMIT`/`SAMPLE`/`PINNED` updated off the old `card-panel-*` / `dashboard-head` names onto the 07-27 rename. `verify-build` → `gen` → `check` all green — no drift between decisions, tokens, build and spec.

## In flight ▶

| Work                                                                                                                                                            | Owner         | State            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ---------------- |
| Repoint the 11 raw SVG exports in "Example downloads" (`6497:277388`) — 348 unstyled text nodes, 323 hardcoded hex fills, 0 tokens. Needs a hex→token map first | Figma         | ▶ next (charts)   |

## Open / deferred

- **Eyebrow casing** — currently uppercase and tracked in places; "resist uppercase for now", decision pending. OPEN.
- **`label-tight` / `label-sm-tight` have no dedicated backing token** — the Tailwind classes emit and are live in 7 components (`Button`, `TabLabel`, `NavigationMenuItem`, `ThemeSwitcher`, `MultipleActionButton`, `GeocoderSuggestion(List)`), but reuse `label`/`label-sm`'s vars with `line-height` hardcoded to `1` rather than having their own `semantic-typography` entry. OPEN.
- **Fluid tier home** — implement 4 `clamp()` roles + unitless lh in cjs post-SD, or keep spec-only. Currently spec-only. OPEN.
- **Compressed tick density** — if 12 / 11 should become real tokens that's 2 variables + 2 `PINNED` entries. Separate decision. OPEN.
- **Doc-frame home for component docs** — undecided; batch, don't scatter. OPEN.
- **Maps page** — still a gap, empty. Re-assess later.
- `static` / white-for-contrast mop-up on buttons.
- Retire the old Metric family and old Section break sets — user moving them to the archive page; the composition sweep fixes instances.
- Table kit: bind cell padding/height to spacing variables; parameterise mini-chart and boolean renderers; reconcile widths against real Storybook columns; retire the original flat mockup table.
- ChartContainer description still implies "chart carries its own note" — needs rewording to match the slot model.
- `tw-extend/primitive-spacing.cjs` emitted but not wired into `ldn-theme.cjs`.
- T-shirt step 4 remainder: accept-and-re-baseline only.
- Repo/Claude Code: full cutover via parser alias; migrate real Storybook tables and charts.
- Rename/rescope the old type-scale skill; decide umbrella vs sub-skills.

## Drift warnings ⚠

- **Transport docs drifted materially behind the live file** (caught 2026-07-20 via ground-truth recon). Re-verify against Figma before trusting any snapshot line here.
- **`charts/bar-chart.md` is partly stale** — still describes static SVG specimens for line/area/scatter, which real kits superseded. Re-audit when next touching charts.
- **`Typography.mdx:95`** claims aliased chart roles "cannot drift" — true again as of the 07-28 fix, but re-verify after any future change to `sd.build.js`'s line-height handling; this exact claim broke silently once already.

---

# Reference

_What the decisions above add up to. Edited in place — this is current truth, not history._

## Current values

The numbers that keep getting re-litigated. **This table is the answer.** Change it here, then log that you changed it.

| Thing                          | Value                                     | Notes                                                        |
| ------------------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| Type scale                     | **17 steps**                              | 13px removed; 26 hand-placed as Title 2's `sm` step          |
| Caption, prose + product       | **12px**                                  | product lh 16; 13px / old `fs-n2` retired, not emitted       |
| Prose body                     | fs 16 all modes, lh **1.625**             | reading leading                                              |
| Prose body-sm                  | lh **1.571**                              | reading leading                                              |
| Product body / body-sm         | grid **24 / 20**                          | grid leading, not reading                                    |
| Prose Lead                     | lh **32**, ratio 1.4545, all modes        | verified emitted                                             |
| Display / `lg`                 | lh **72**                                 |                                                              |
| Subtitle / `xl`                | lh **24**                                 |                                                              |
| Title-4 `base` + `xl`          | lh **28**                                 |                                                              |
| Metric-sm / `xl`               | lh **20**                                 |                                                              |
| Metric + Metric Sm             | lh **1.0** tight, all sizes               | default                                                      |
| Tight label variants           | lh **1.0**, single-line only              | same size/weight as Label, Label Sm                          |
| Eyebrow, prose + product       | weight **500** Medium, tracking **0**     | casing OPEN                                                  |
| `product/title`                | 20 / 28 / semi-bold                       |                                                              |
| `product/subtitle`             | 16 / 24 / regular                         | exact metric duplicate of `product/body`, kept deliberately  |
| `product/eyebrow`              | 14 / 20 / medium                          | exact metric duplicate of `product/label`, kept deliberately |
| `product/page-head`            | 28→36, lh 36 / 36 / 40 / 40 / 44          |                                                              |
| `chart/axis-title`             | 14 / 500 / lh **20 at all modes**         | == `product/label`                                           |
| `chart/label`                  | 14 / 400 / lh **20 at all modes**         | == `product/body-sm`; legend entries bind this               |
| `chart/tick` · `chart/tick-sm` | **14 / 12** default density               | compressed 12 / 11 is spec-only; 11 is the sub-floor         |
| Breakpoints                    | 5 steps — default, `sm`, `md`, `lg`, `xl` | `sm` wired into `responsive.cjs`                             |
| Corner radius                  | **0** everywhere                          | unless genuinely round                                       |

- **`0.86` in exports is a rem bug** ≈ 14px. Always correct it.
- **Line-height is two policies:** _grid leading_ for structural roles (4px grid — a reference for authoring, not a cascade `var()`) and _reading leading_ for prose body and body-sm only.
- **One exception:** for the three aliased chart roles (`chart/title`, `chart/subtitle`, `chart/eyebrow`), line-height and letter-spacing are references, not literals. Everywhere else they are literals. State this as an exception, never as an absolute.

## Sources of truth

- **Spec is authoritative for typography, spacing, flow, grid and colour** — `design-system-specification.md`, renamed from `type-scale-specification.md`, now covering all five foundations.
- **But the spec is downstream of the build for every concrete value or name.** Value tables and the CSS appendix are generated from emitted `styles/`; only intent and rationale prose is hand-written. The spec may be out of date — a rerun fixes that — but it must never be silently wrong.
- **Existing infra convention beats the spec on naming** — e.g. `spacing-`, not `sp-`.
- **Code/Storybook is authoritative for tables and charts** (behavioural, data-driven). Figma is _representative_, not a reimplementation.
- **Observable Plot is the charting library** — authoritative for real charts.
- **Figma leads the typography and colour cutover ahead of the repo** (explicit "bite the bullet"). Temporary Figma↔code mismatch is accepted; the repo catches up via the SD parser (alias `altProse`→`prose`, `altProduct`→`prose`). Foundation lives in Figma as parallel `alt*` groups beside legacy.
- **Figma-only sessions have no repo access.** Nothing decided in one is verified against emitted output until a rebuild.

## Token and naming grammar

- **Two tiers everywhere: primitive → semantic.** Components bind to semantic only — never primitives, never raw hex.
- **Component context prefix dictates the type family** (governing rule): `Product/*` → `altSemantic/Product/*`; `Prose/*` → `altSemantic/Prose/*`; `Chart/*` → `altSemantic/Chart/*`. No cross-mixing.
- **Real grammar:** primitives named by px; semantics as `--typography-{mode}-{family}-{role}-{prop}`; spacing primitives as `--primitive-spacing-{n}`. Note `semi-bold` is hyphenated.
- **Role names may be domain-specific within a context family, never component-specific.** Product names answer "where does this sit in the ladder" — structural, therefore generic. Chart names answer "what part of a chart is this" — anatomical, therefore specific, because external consumers arrive with that vocabulary. Two registers, one rule. `card-panel-title` broke it and had to name two components as a compromise; `chart/title` satisfies it.
- **A context family earns a complete vocabulary only when it has genuinely divergent values AND is consumed as a standalone published surface.** Chart passes both. A future `map` family is tested against the same bar, not waved through on chart's precedent.
- **A domain family may alias the object tier and below, never page furniture.** A chart _is_ an object, so it reaches `title` / `subtitle` / `eyebrow` plus its own internal anatomy — never `page-head` or `section-head`.
- **Semantic→semantic aliasing is permitted** for object-tier domain roles, rather than co-reference to a shared primitive: it encodes the dependency direction, is drift-proof, and inherits the source's responsive behaviour. Everything else in typography aliases primitives only (`typography/font/size/14` and the like).
- **`outputReferences` on the typography platform is a prerequisite.** Without it typography emits resolved literals, so an alias is indistinguishable from a copied value and drift is invisible. Until it lands the guard can only assert value-equality.
- **Renames ship without a deprecation window while consumption is prospective.** No installed base means no alias to cushion — but it makes the consumer migration atomic within one release, with full-scan verify before the commit, not after.
- **A new role must pass the one-sentence-job test.** "Like X, but in a different place" is a position, not a role.
- **Stick with the system, not legacy sizing** — migrate off-system sizes to the correct role even if it visibly resizes (Accordion body 20→16, input label 16→14).
- **Colour grammar:** `interactive/{intent}[-muted][-state]`, plus `text`, `label`, `surface`, `container`, `canvas`, `border`, `inverse`, `static`, `data`, `chart`, `geo`. One `interactive/{intent}` token serves both fill and text; disabled splits — fill → `disabled-muted`, text → `disabled`. Colour is strictly semantic→primitive.

## Typography

- **Product ladder:** `product/page-head` → `product/section-head` → `product/title`, with `subtitle` and `eyebrow` as shared treatments applied by the primary-slot rule.
- **Suffix asymmetry is deliberate.** `-head` stays on both upper rungs so the register is consistent within the page-furniture tier; the leaf stays bare because it is the default. `page-title` / `section-title` / `title` would make the bare leaf ambiguous against the other two.
- **Chart family is closed at eight roles.** Aliased from product: `chart/title`, `chart/subtitle`, `chart/eyebrow`. Chart-internal: `chart/note` (footer source/citation), `chart/axis-title`, `chart/label`, `chart/tick`, `chart/tick-sm`.
- **`chart/legend` does not exist** — a legend entry is a data label, so it binds `chart/label`.
- **Markdown heading ladder:** h1–h4 → Title 1–4. Headline (56px) is hero chrome only, never a content h1.
- **Tight Label treatment:** `label` / `label-sm` at line-height 1.0 for single-line controls — buttons, tabs, chips. No line breaks. (`altSemantic/Product/label-tight`, `label-sm-tight`.)
- **Derived UI application rules:** control and nav labels → Label 14, shrinking legacy 16; input value/placeholder/body → body 16; helper, hint, secondary → body-sm 14; small functional → caption; genuine titles → `product/title` 20; sidebar and nav section titles → Label, not a title.
- **Prose Eyebrow** exists as an overline/kicker, 14 Medium.
- **Data title is a binding, not a routing instruction.** The primary-slot rule resolves it to `chart/title` when it owns the slot, `chart/eyebrow` when it yields.
- **Title emphasis uses the standard `emphasis` axis, not a bespoke `treatment` prop.** The dominant/demoted title choice is surfaced on components and in Figma via the library-wide `emphasis` axis (as on `Button`): `primary` = dominant `Title`, `secondary` = demoted `Eyebrow` — matching the treatments table's Colour column. "Treatment" remains the spec's concept word for the ladder; it is no longer a component/Figma enum. Renamed `treatment`/`Dominant`/`Demoted` → `emphasis`/`Primary`/`Secondary` in `TitleGroup`, `ChromeHeader`, `Card` and the Figma `TitleGroup` variant (399 instances migrated). `Supporting`/`Subtitle` stays a separate slot, so the axis is two-valued.
- **Metric duplication is intentional.** `product/subtitle` and `product/eyebrow` duplicate `body` and `label` metrically. A distinct variable can be retuned independently later; a treatment-only mapping cannot. The same duplication already exists inside the chart family — only `tick` and `tick-sm` are genuinely distinct — so domain-renaming existing metrics is established practice, not an exception being carved.

## Spacing and flow

- **`--spacing-{n}` is the public layer.** Authored code consumes `--spacing-{n}` and `mt-{n}`; `--primitive-spacing-{n}` is the private source. **Never bind to `--primitive-spacing-*` directly** — including component-internal spacing.
- **`--spacing-{n}` must be a pure `var(--primitive-spacing-{n})` reference** to the identically-keyed primitive. `regen_spec.py check` asserts this and that every dev-facing rung exists.
- **Numbered scale emits** `--primitive-spacing-{n}` plus sub-steps `-px`, `-0-5`, `-1-5`, `-2-5`, `-3-5`.
- **No named spacing-role set beyond `flow` and `grid`.**
- **Vertical rhythm consolidates on `flow`** — the context flow ramp `--flow-*` plus the owl selector.
- **The rhythm-vs-construction gate decides the source:** rhythm → `flow`; construction (padding, border-width, list indent, cell padding) → numbered `--spacing-{n}`. See `.claude/skills/lcd-ds/references/component-migration.md` (the rhythm-vs-construction gate; migrated from the former `llm-docs/migration-spacing-mapping.md`).
- **T-shirt mapping**, for any straggler: `xxs`→1, `xs`→2, `sm`→3, `md`→4, `lg`→5, …
- **`--spacing-{tshirt}` and `--typography-spacing-*` are RETIRED** — not emitted, no live consumers. `format.cjs` no longer exists.
- ⚠ **Constraint — the easiest thing in the system to break:** `semantic-flow`, `semantic-spacing` and `grid-spacing` reference `primitive.spacing` and divide by 16 expecting **px**. The shared primitive must stay px in the token graph; rem conversion happens only at emit time.

## Visual rules

- **No rounded corners.** Radius is 0 everywhere unless the element is genuinely round — a circular avatar, a dot. Never on bars, cards, cells, buttons, inputs or containers. (Caught: bar chart bars had radius 2.)
- **X-axis and category labels sit BELOW the axis baseline**, not above; y-axis ticks sit left of the plot.

## Tables

- Composable **kit**, code-authoritative. Lives in a "Table Kit" doc frame on the Tables page.
- **Approach A — row-based, hug everything** — chosen over column-based: cell (fixed Width variant) → row (HUG) → table (HUG). Width changes ripple up visibly; columns align by using the same Width variant on header and body.
- **Cell is the swappable unit.** `Table Cell` has a `Renderer` instance-swap — Text, Number, Boolean, Mini-chart. Alignment lives in the renderer, not the cell. "fill" is an instance setting, not a variant.
- **Width set:** xs 64 / sm 88 / md 120 / lg 220 / xl 300 / fill.
- Composed `Table Row` (Stripe variant) and `Table Header Row`, both hug. Width changes propagate via the row and header **masters**; per-instance edits stay local.

## Charts

- Figma is **representative**, not data-accurate.
- **Figma component variables cannot drive geometry.** "A few variables" means editable height, label, colour-swap and duplicatable parts — not data-binding. Bars are sized by resize, not computed.
- **`ChartContainer` is canonical:** component `6204:2827` on the Charts page, housed in doc-frame `6497:279020`. Verified 2026-07-20; old canonical `6403:178823` deleted and the `previously`-frame version retired.
- **ChartContainer is static chrome, invariant:** ChromeHeader (title + optional eyebrow/subtitle/hint) + `Content` SLOT + ChromeActions (download/export).
- **Slot contents are per-plot, composed by the designer** — legend, plot, footer (notes/citation). Not baked into the container, not baked into the plot mark.
- **Chart SVG imports arrive raw:** unstyled live text, hardcoded hex. On-system means assigning `Chart/*` roles and repointing fills to `data/*` / `chart/*`.
- **Real flexible kits now exist** for the bar family and for line, area, slope and donut — superseding the earlier "static tokenised SVG specimens only for line/multiline/area/scatter" position.

## Documentation

- **Two tiers.** In scope during sweeps, lightweight: component metadata and descriptions, plus intro/overview doc-frames. Deferred to a holistic docs pass: usage dos and don'ts, accessibility notes, full states-strip treatment.
- **Doc-frame placement is batched, not scattered.** No decided home for component docs yet. Emerging pattern: a **foundation** doc-frame can live on its foundation's page — see Vertical flow on the Spacing page. That is placement-with-its-foundation, distinct from the undecided component-docs home. Composition and titling doc-frames currently sit on the Typography page and will relocate.
- **Doc frames MUST follow `skills/ds-doc-frame`:** `.DS-Section-header` (`425:7094`, `Title#425:0`) + `Doc/*` styles, not product roles + geometry (outer 1280 / pad 0 → content pad [32, 60, 32, 60] / gap 40 → `Doc/Body` intro + optional `Doc/Caption` states strip). **Load the skill before building any doc, overview or housing frame.**
- **Vertical flow doc-frame** (2026-07-20): node `6845:219201` on the "Spacing, rhythm, grids and containers" page, replacing the old `Proto` frame. Intro prose plus three illustrations — the ramp × three contexts as **true-height** shaded gaps (a scaled-bar version was rejected as misleading), the same blocks in prose vs product, and coupling (wrapped/tight vs loose-sibling/default). Gap values faithful to the `semantic-flow` vars.

## Figma conventions

- **`.DS-` prefix** = docs scaffolding, audited only on Get Started. `.DS-Page-Head` is an ignorable waymarker.
- **`.` prefix**, single dot without DS, = internal/private sub-component. Not scaffolding, not published, legitimate — migrate normally.
- **Real components are never skipped in sweeps.**
- **`component archive` page (`6405:179693`) — ignore in audits.**

## Figma mechanics

Gotchas, on the way to becoming a skill.

- **Use async variants** on this dynamic-page file: `getNodeByIdAsync`, `getStyleByIdAsync`, `getLocalTextStylesAsync`, `getMainComponentAsync`, `figma.variables.getVariableByIdAsync`, `getLocalVariableCollectionsAsync`.
- **`globalThis` does not persist** across `figma_execute` calls — inline all data.
- **`resize()` resets `primaryAxisSizingMode` to FIXED** — set it back to AUTO if hugging. `combineAsVariants` also clobbers it.
- **Read-after-write size measurements lag one step** — re-read to verify.
- **Setting a text style does not carry colour** — re-bind the fill variable after `setTextStyleIdAsync`.
- **Full-page 278-master scans time out** at over 4 minutes — scan subsets.

## Working stance

- **Propose then write** on destructive or structural edits. Read-only recon first; verify with screenshots.
- **Verify migrations with a full scan, never a sample** — a sample missed rare tokens on buttons.
- **Store big reads to disk.**
- **Build from ground truth, not memory** — re-read the reference artefact and its IDs before encoding or rebuilding. This is how the `ds-doc-frame` drift was caught.
- **Canonical home for tooling is the git repo**; loose downloads are disposable.
- **Spec value blocks are generated, not hand-edited.** They live between `<!-- GEN:* -->` markers, produced by `regen_spec.py`, governed by `SPEC-CHANGE-PROTOCOL.md`. Re-baseline sequence: `verify-build` → `gen` → `check`.

## Skills

Load before the matching task.

- **`skills/ds-spec`** — the spec-derived skill covering the whole system: typography, chart subset, colour, spacing, flow, grid. Load whenever choosing type, colour, spacing, grid or chart values, or deciding roles and tokens. Its `references/design-system-specification.md` is the canonical full spec — exact values, full mappings, CSS block. Built as one comprehensive skill, with the option to split into `ds-typography` / `ds-colour` / `ds-spacing-flow-grid` later; each `##` foundation block is self-contained to make that painless. Supersedes `type-scale-system`, now in `_retired/`.
- **`skills/ds-doc-frame`** — building any doc, overview or housing frame. Done; IDs verified live in v3.1.
- **Planned:** `ds-token-migration` (Base→altSemantic conversion table, colour deprecated→current mapping, verify-full-scan discipline); `ds-component-build` (hug sizing, renderer-swap, variant and resize traps including the padding-driven bar model and the no-radius rule); possibly `ds-figma-conventions`.

## Thread transport

**Load:** `DECISIONS.md` (this file) · `skills/ds-spec/` (the spec and system rules — the crux artefact) · the relevant task skill, e.g. `ds-doc-frame` for doc frames.

**Reference as needed:** `component-drift-inventory.md` (narrative record) · `charts/*.md` and `tables/*.md` (kit specifics) · `figma-file-conventions.md` · `token-architecture-and-naming.md` · `SPEC-CHANGE-PROTOCOL.md`.

**Then:** connect the Desktop Bridge plugin on port 9223 and verify IDs are still live before relying on them.
