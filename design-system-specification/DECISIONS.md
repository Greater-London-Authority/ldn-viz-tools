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

## 2026-08-19 — Context sealing (change-set 03): a declared context seals its subtree

Corrective. Two symptoms reported independently — footnote list items in `ChromeFooter` 8px apart instead of 4px, and a chart subtitle rendering at 18px inside a `prose` page instead of its own 16px — were one defect: **an ancestor context reaching past a component that has declared its own.**

- **A declared context seals its subtree.** The innermost declared context wins for both spacing and typography, at any depth. A component that declares its own context is not reached into by an ancestor's. RULED.
- **Every flow rule is rooted at the element declaring the context** — child combinator immediately after the `:is()` context group, no exceptions. Six selectors used a descendant combinator and so reached arbitrary depth, through `not-prose` and through nested contexts, into any component: `figure > figcaption`, `:is(ul, ol) > li + li`, `li > :is(ul, ol)`, `dl > dd`, `dl > dt`, `dl > dt:first-child`. The reach was necessary (an `li` is a grandchild of the flow root, so a child-combinator rule never matches it); the _unbounded_ reach was not. The list rules keep a descendant reach **within** a list that is itself a direct child of the flow root, so nested lists retain their rhythm. RULED.
- **The component author could not override those rules, which is why this shipped.** The rule computes to (0,1,3), so the obvious `[&>li+li]:mt-0` reaches only (0,1,2) and fails silently. Any bespoke list inside a data-visualisation component picked up the ghost margin; `ChromeFooter` and `TableContainer` were both exposed and are both fixed. `gap-1` is now the sole source of footnote spacing, which is correct.
- **Typography responsive values are delivered on the context element, never on the role element.** The per-role loop in `typography.cjs` emitted `.prose .subtitle { --subtitle-font-size: … }`, setting the variable on the element carrying the role class, while `contexts.cjs` sets the same variable on the context element for inheritance. Not a specificity contest: an inherited value is used only when no declaration exists on the element, so the element-level rule from the outer context won outright — raising `.chart`'s specificity would not have helped and `not-prose` did not exclude it. The loop is deleted; all three contexts now publish their full role set on themselves at every breakpoint. Source order stops mattering; resolution is by structure. RULED.
- **Chart is in the context loop despite mode-invariant values, so that it seals.** `responsive.cjs` has no `chart` key and the loop guards for it; chart keeps the md-pinned block from `contexts.cjs`. A `chart` key in `responsive.cjs` would make the three contexts structurally symmetrical and is worth adding if chart ever scales — deliberately out of scope while the values do not.
- **A nested context seals only the roles it defines.** Chart defines seven; a `body` inside a chart still resolves from the enclosing context. Intended fall-through, documented rather than treated as a gap. RULED.
- **The `.not-prose` selector variants are gone.** They existed only to keep element-level targeting working across a `not-prose` boundary; inheritance crosses it regardless.
- **Guards added to `regen_spec.py`** — each confirmed to fail against the pre-change source before being accepted: flow rules are rooted (`check_flow_rooted`, catches a regression to unbounded reach — one missing `>`, invisible in review); typography is never delivered on the role element (`check_typography_delivery`, catches reintroduction of the per-role loop, and asserts all three contexts are in the delivery loop); chart's shared role names agree with their product source (`check_chart_seals`, plus `PINNED` entries for `chart/title` 20, `chart/subtitle` 16, `chart/eyebrow` 14). `check_flow_owl_guard`'s "sibling" classification was reworked for rooted selectors — the pair must be direct children of the flow root, so `> :is(ul, ol) li + li` is still correctly exempt (9 sibling, 6 descendant, unchanged from 02).
- **Build impact:** zero emitted-token change (`verify-build` zero-diff throughout — neither change touches token emission). Compiled selector diff against a real Tailwind compile of `ldn-theme.cjs`: **31 selectors removed** (25 per-role typography rules — 13 prose, 12 product — and the 6 unrooted flow selectors), **6 added** (the rooted flow selectors), and `.product` gains the full per-breakpoint aggregate block it never had. No other rule changes.
- Noted: `chart/subtitle` had been rendering at 18px inside prose since the chart family shipped. Every other shared role name coincided in value, which is why it went unseen — the generalisable risk is a shared role _name_, not this one value.
- **Owed: browser confirmation of computed values.** The sandbox cannot cover it. Checks: a `ChartContainer` in a docs page (subtitle 16px at `base` and `xl`); its footnote list (4px, not 8px); a markdown article (list items, figure captions, description lists space as before — the main regression surface); a list as a direct child of `flow-product` (still spaced); `ChromeFooter`'s `<ul class="product caption">` in a prose page (caption still 12px).
- Out of scope, unchanged: `ChromeFooter`'s `gap-1` (correct as it stands, and the component's own spacing); the redundant `flow-prose` on the outer container in `[...slug]/+page.svelte`, which wraps a single child and does nothing.

## 2026-08-18 — Flow amendments (change-set 02): utility surface narrowed, author rungs win

Corrective pass on the block below, from testing the utility surface against real authoring scenarios.

- **Context-prefixed flow utilities withdrawn.** Only the four context-agnostic keys are generated — `mt-flow-{rung}` / `gap-flow-{rung}` — not the twelve `flow-{context}-{rung}` from change-set 01. `mt-flow-product-section` resolves the flat var directly, so it is context-**in**dependent by construction: dropped inside `.flow-prose` it pins that one gap to 24px (= `--primitive-spacing-6`), i.e. `mt-6` wearing a flow badge, reading as system-conformant to a reviewer while opting its element out of the surrounding rhythm. A component that must hold its density wherever it lands declares its own context class (`Toast` already does), which gives the whole subtree one density instead of pinning gaps individually. The twelve flat `--flow-{context}-{rung}` vars are untouched — still the value source the context blocks reference; they simply stop being reachable from a utility. Consumer scan before removal: zero usage. RULED.
- **Two live usages were migrated, and the scan that was meant to find them missed both.** The amendment's consumer-scan command globs `--include=*.svelte --include=*.css`, but the hits were in `.md` content files: `apps/web/src/content/design-system/index.md` and `.../application-design/index.md` both carried `mt-flow-product-section` on a `grid-gutter` div. Withdrawing the utility without migrating them would have dropped the class silently. Both rewritten to `mt-flow-section`; verified value-preserving at 24px in a browser. **Any future flow/spacing consumer scan in this repo must include `.md`** — `apps/web/src/content` is markdown with inline Svelte and Tailwind classes, so it is a first-class consumer, not documentation.
- **The no-context case is exactly what Amendment 3A buys.** `design-system/index.md`'s grid has no flow ancestor anywhere in its layout chain (`DocsLayout` → `AppShell`, no flow class). Under Option B its `mt-flow-section` would have resolved an undefined var and computed to 0 — a silent no-op shipped on the design system's own landing page. Under 3A it resolves product from `:root` and stays 24px.
- **Rung utilities never carry a density, only a relationship.** Density comes from the context class in scope, always. RULED.
- **Author-declared rungs beat DOM-inferred ones**, enforced by a `[class*="mt-flow-"]` exclusion on the receiving compound rather than by escalating specificity. The owl and heading rules are (0,3,0) and a generated utility is (0,1,0); specificity beats layer order, so an explicit `mt-flow-section` on a direct child was silently overridden — the exact silent-failure class this work exists to remove. Same mechanism as the existing `sr-only` guard. RULED.
- **The guard goes on all nine sibling rules, not the six the amendment listed.** Uniformity is the invariant, not the count. The guard adds (0,1,0) when appended to an `:is()`-terminated compound but nothing when folded into an existing `:not()` list, so a partial application reorders the flow rules against each other — [flow.cjs](../packages/themes/tailwind-custom/flow/flow.cjs) notes the companion rules are "placed after rules 1 & 3 so they win at equal specificity", and raising rule 3 while leaving them put inverts that. Measured in a headless browser against the six-rule variant: eyebrow→heading coupling flipped from `tight` (4px) to `section` (24px) **with no author utility involved**, and `mt-flow-*` stayed silently overridden on `.subtitle`/`.subhead` and eyebrow pairings. All nine sibling rules guarded; the four descendant rules (`figcaption`, `li + li`, `dd`, `dt`) stay exempt by decision. RULED.
- **Product ramp on `:root`** (Amendment 3, Option A). `custom/flow` emits the four bare `--flow-{rung}` vars on `:root` from the product ramp, so the rungs are always defined and product is the library's default density; context classes override. Without it, `mt-flow-section` in a component with no ancestor context class resolves an undefined custom property — invalid at computed-value time, `margin-top` falls back to `0`, a silent no-op, which is the normal case for a library component. Coherent with `contexts.cjs`, where product is already the default typography context. `.flow-product` stays meaningful: it arms the owl, which `:root` cannot do. RULED.
- **Verified in a headless browser, not by reasoning alone.** Twelve computed-`margin-top` scenarios in `.flow-product` / `.flow-compact` / `.flow-prose` / no-context: explicit rungs win over the owl (24px not 8px), over the heading rules (4px not 24px), over companion coupling (24px not 4px) and over the eyebrow `:has()` rule (4px not 24px); unguarded coupling is unchanged (eyebrow→heading and subtitle both 4px); a rung utility with no context class anywhere resolves to product (24px); and context switching still re-densifies (compact 4px, prose 16px).
- **Guards updated** (supersede the corresponding change-set 01 items): utility surface is exactly the four context-agnostic keys with **no** context-prefixed key; `:root` defines all four bare rungs pointing at the default context; and `check_flow_owl_guard` asserts every sibling rule in `flow/flow.cjs` carries the exclusion, classifying "sibling" as `<context> > A + B` so the descendant rules are not false-flagged. Each was confirmed to fail on its own regression before being accepted. Unchanged from 01: reference integrity, value parity, and the `tw-extend/*.cjs` category guard.
- **Build impact:** exactly two emitted files differ from the end of change-set 01 — `flow.css` (gains the four bare `:root` rungs) and `tw-extend/flow.cjs` (12 keys → 4). All other emitted files byte-identical; `verify-build` reproducible.
- Noted: three consecutive narrowings of the utility surface, each prompted by testing an authoring scenario rather than by review of the concept. The concept layer has not moved since the Figma audit.
- OPEN, carried forward: the `margin` theme key still generates horizontal `mx-flow-*` / `ml-flow-*`, contradicting the vertical-only rule. The narrowing to four keys shrinks the blast radius (`mx-flow-loose`, not twelve variants) but does not close it.
- OPEN: `.grid-gutter` / `.grid-gutter-fluid` have **zero usage** in `packages/ui` or `packages/charts` despite being wired to `grid-spacing` tokens with responsive overrides. A hardcoded `gap-4` on a card grid is statically wrong, not merely off-system: fluid gutter is 16px at every mode so `gap-4` coincides today and masks the error, but contained gutter is 16/20/24/24/32/32, so `gap-4` is already wrong at four of six breakpoints. Same migration shape as flow's — value-preserving at fluid, value-**correcting** at contained. Separate commit, needs visual review since contained surfaces will legitimately shift at `sm` and above.

## 2026-08-18 — Flow ramp reference chain restored; flow leaves the typography plugin

- **Flow ramp reference chain restored.** `custom/flow` now emits flat `--flow-{context}-{rung}` vars in a `:root` block as the single value source, plus `.flow-{context}` blocks that are pure `var()` references to them. Previously the context blocks restated literals and `--flow-{context}-{rung}` **was emitted by nothing**, so every generated Tailwind flow utility resolved to its literal fallback permanently — values right, reference chain dead, Figma changes unable to propagate. RULED.
- **`tw/css-flow-variables` keyed on `{context}-{step}`.** It read `token.attributes.type` only, so all four rungs of a context collapsed onto one key (`"flow-prose"` x4, last-wins): 3 keys where 12 were intended. Both flow formats now destructure `[, context, step]` from `token.path`, so they cannot diverge on naming again and the var name is guaranteed to match the flat output. RULED.
- **`styles/tw-extend/flow.cjs` wired into `ldn-theme.cjs`** via the `margin` and `gap` theme keys — yielding `mt-flow-product-loose`, `gap-flow-prose-section` — and **never `spacing`**, which would also generate `p-flow-*` / `w-flow-*` and reopen the padding/rhythm confusion this work closes. Padding is construction and comes from `--spacing-{n}`. Verified by compiling a probe against the theme: `mt-`/`gap-`/`mb-` flow utilities emit, `p-flow-*` and `w-flow-*` do not. RULED.
- **Flow moved out of the typography plugin** to `tailwind-custom/flow/`, registered in `ldn-theme.cjs` as a peer of `customTypography` (immediately before it, preserving the previous cascade order). Flow shipping _inside_ the typography plugin was a material cause of the belief that flow is a typographic construct; it is a layout one. RULED.
- **`flow.cjs` no longer declares the ramp.** The three `.flow-{context}` variable blocks are deleted; the file keeps only behaviour (owl, block objects, heading tiers, companion coupling, lists, description lists). Values live in `flow.css` — imported by every consuming app, so it owns them unconditionally and no fallbacks are needed. One ramp, one declaration. RULED.
- **`.chart` in the flow block-object list is deliberate and stays.** It identifies a set-off block object alongside `figure`/`img`/`table`/`pre`/`blockquote`, and does not conflict with the `.chart` typography context — a chart in prose wants both chart typography and generous surrounding space, and the two systems compose. RULED (no change). Rationale is now a comment in `flow.cjs` so it is not re-reported as a bug a third time.
- **Flow rungs are author-declared in product context and DOM-inferred in prose context.** Same ramp, same four names; the difference is who assigns them. RULED.
- **Guards added to `regen_spec.py`** (`check_flow`, `check_tw_extend_wired`): flow reference integrity (every `.flow-{context}` rung a pure reference to a flat var present in the same file), rung completeness (`tw-extend/flow.cjs` exports exactly the 12 `flow-{context}-{rung}` keys), value parity against the pinned Figma ramp (`FLOW_RAMP_PX` — prose 4/16/24/40, product 4/8/16/24, compact 4/4/8/8), and a **category guard** asserting every generated `styles/tw-extend/*.cjs` is required somewhere in the repo. The last one closes the emitted-but-unwired failure class, of which this was the third instance (`primitive-spacing.cjs`, the line-height alias regex, flow). All pass.
- **Build impact confirmed minimal:** building at the previous commit vs. after these changes differs in exactly two emitted files — `flow.css` and `tw-extend/flow.cjs`. Every other emitted file is byte-identical.
- **The plugin relocation does reorder the emitted CSS, and that reorder is inert.** Compiling `@tailwind components` against the old and new theme shows two differences: the three `.flow-{context}` variable blocks are gone (Change 6, intended), and the flow rule block now emits _before_ all typography rules rather than between contexts and semantics — `customFlow` is registered ahead of `customTypography`. Checked rather than assumed: flow's rules declare only `margin-top`, and typography declares `margin-top` **nowhere** (all 15 `margin-top` declarations in the emitted components CSS belong to flow rules), so no property collision exists at any specificity and source order cannot decide anything. Custom-property definition order is likewise irrelevant — custom properties resolve at computed-value time, not by source position. RULED safe.
- OPEN: the `margin` theme key also generates horizontal `mx-flow-*` / `ml-flow-*`, contradicting the vertical-only rule. Accepted for now; the alternative is a bespoke plugin emitting only `mt-*` and `gap-*`.
- OPEN: `regen_spec.py gen` emits unformatted markdown while the committed spec is prettier-formatted, so `gen` → `check` can never both pass — `check` reports all five blocks stale immediately after a clean `gen`. **Pre-existing**, reproduced at the previous commit against that commit's own build output; not introduced here. Either have `gen` emit prettier-compatible output or run prettier as part of the documented re-baseline sequence.

## 2026-07-28 — Spec re-baseline

- **`design-system-specification-2026-07-27.md` renamed to canonical `design-system-specification.md`** — `regen_spec.py`'s default `--spec` path now resolves without an override.
- **`regen_spec.py` guard updated for the 07-27 rename:** `PRODUCT_ROWS` (`dashboard-head`→`page-head`, `card-panel-title`→`title`), `PRODUCT_MATRIX_OMIT` (`card-panel-subtitle`/`card-panel-eyebrow`→`subtitle`/`eyebrow`), `SAMPLE`, and the `PINNED` product-eyebrow-weight check all moved off the old component-specific names. Without this the guard was checking roles that no longer exist and would have false-failed forever.
- **`verify-build` → `gen` → `check` run clean:** zero-diff build, all generated blocks (CSS appendix, spacing table/alias, prose/product matrices) regenerated, all 12 `PINNED` decisions pass against emitted output — including the corrected `chart/title`/`chart/eyebrow` line-height from the fix below and the `tick-sm` font-weight binding fixed 07-27.
- Closes the "spec prose" in-flight row — superseded, see [Status](#status).

## 2026-07-28 — Repo audit: line-height alias bug found and fixed

Detail: read-only repo audit of the Status section against emitted output (tokens JSON, build pipeline, `styles/typography.css`, tailwind-custom cjs files), prompted by suspected drift.

- **`sd.build.js` line-height resolution was broken for semantic→semantic aliases.** `chart/title` and `chart/eyebrow` line-height are authored as references to `product/title` / `product/eyebrow` (correct in the source token JSON), but the build's ratio calculator read the font-size sibling's _original_ (unresolved) value and regex-matched it against a primitive-only pattern (`size\.(\d+)`). When that sibling's font-size was itself a semantic alias rather than a primitive reference, the regex failed and the code silently fell back to dividing by a hardcoded `16`. Emitted `chart/title` line-height was **1.7500** instead of **1.4000**; `chart/eyebrow` was **1.2500** instead of **1.4286**. `chart/subtitle` coincidentally matched (its aliased font-size happens to be 16px). RULED — fixed.
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

| Work                                                                                                                                                            | Owner | State           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | --------------- |
| Repoint the 11 raw SVG exports in "Example downloads" (`6497:277388`) — 348 unstyled text nodes, 323 hardcoded hex fills, 0 tokens. Needs a hex→token map first | Figma | ▶ next (charts) |

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
- **A declared context seals its subtree, and typography is delivered on the context element.** Each of `prose` / `product` / `chart` publishes its full role set on itself at every breakpoint; nothing targets the role element. A declaration on an element beats an inherited one outright, so element-level delivery from an outer context overrode a nested context's own values. A nested context seals only the roles it defines — other roles fall through to the enclosing context.
- **A role name shared between two type sets must resolve to the same value, or be treated as a live bug.** `chart/title`, `chart/subtitle` and `chart/eyebrow` alias product; `chart/label` restates the same primitive. `regen_spec.py check` asserts the agreement, because a divergence is invisible until the context is nested.
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
- **Every flow rule is rooted at the element declaring the context** — a child combinator immediately after the `:is()` context group, no exceptions. A descendant combinator there reaches into any component at any depth and cannot be overridden by the component author ((0,1,3) vs the (0,1,2) an arbitrary-variant override reaches). The list rules keep a descendant reach only _within_ a list that is itself a direct child of the flow root. Guarded by `regen_spec.py check`.
- **A component's own spacing wins inside it.** A bespoke list in a component (`gap-1` in `ChromeFooter`) is the sole source of its spacing; the surrounding flow context does not reach in.
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
