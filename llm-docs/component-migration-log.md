# Component type/spacing/radius migration — batch log

Log of each batch run against `packages/ui/src/lib` per the protocol in
`.claude/skills/lcd-ds/references/component-migration.md` (the type/spacing mapping
was migrated there from the former `migration-type-mapping.md` +
`migration-spacing-mapping.md`, verified against current roles). Scope per batch:
type utilities → semantic role (function-first), spacing utilities → gate
(rhythm→flow / construction→token, most construction left as bare on-scale
Tailwind per the 2026-07-24 carve-out retirement), `rounded-*` removed unless
genuinely round. Colour is always out of scope.

---

## Batch 1 — Button, Callout, Input/InputWrapper, Tabs/TabList/TabLabel/TabPanel, Header/HeaderTitle/HeaderItem/HeaderRight

### Changed
- **Button.svelte**: `text-xs/sm/base/lg` sizes → `label-sm`/`label` + `leading-none` (tight-label). Off-system resizes: md 16→14px, lg 18→14px (non-square); lg-square 12→label-sm (no resize). Added `product` context to root.
- **TabLabel.svelte**: `text-xs` (vertical) → `label` (12→14 resize); `text-base` (horizontal) → `label` (16→14 resize, matches the map's named "level-1 legacy 16→14" case). Both + `leading-none`.
- **TabList.svelte**: added `product` to root class list (context for TabLabel's `label`).
- **InputWrapper.svelte**: `text-sm` (hint/error text) → `body-sm`. Added `product` to outer wrapper div.
- **Header.svelte**: `py-[.5rem]` → `py-2` (off-scale arbitrary snapped to on-scale token; 8px = 8px, zero visual change).
- Callout / Input / Tabs / TabPanel / HeaderItem / HeaderRight: no edits (Callout's type roles already migrated in an earlier pass; rest had no type utilities or only on-scale construction spacing).

### Flagged
1. **Callout title→body→more rhythm vs construction** — my call: **rhythm** (mini-document, same shape as the doc's own Card exemplar). **Not applied**: existing `mb-*` is a documented, deliberate workaround for the (now-fixed 2026-07-22) owl/`sr-only` bug, recorded as "correct as-is, revisit later"; converting now would also force the already-flagged Callout size-prop-drift (padding vs type-size) decision, which is out of scope for a token migration. Recommend a dedicated follow-up pass.
2. **TabList `space-y-0.5`/`space-x-0.5`+`pt-5`** — ambiguous: vertical repeated-peer reading (flow) vs. control-cluster reading (construction, per the `gap-*` toolbar carve-out, not explicitly extended to `space-y-*`). My call: **construction** (fixed navigational widget, not open content stack). Left untouched.
3. **Button `lg`/square: `space-y-4`** — looks like a latent bug (icon-only button with internal vertical rhythm). Not fixed, flagged for review.
4. **InputWrapper `[&>div]:text-sm`** — arbitrary-variant utility targeting a wildcard descendant div (Overlay/Trigger wrapper), no clean function-first mapping possible. Left untouched.
5. **HeaderTitle `text-lg font-semibold`** (app title/wordmark) — no map row fits global chrome app title; candidates (`card-panel-title`, `section-head`) are context-wrong. Left untouched, recommend a new role or explicit confirmation.
6. Off-system resizes recorded: Button md 16→14, Button lg 18→14, TabLabel vertical 12→14, TabLabel horizontal 16→14.

### Out-of-scope colour
All `text-color-*`/`bg-color-*`/`border-color-*` across all files; `border-l-[5px]` (Callout, Header) — previously documented brand accent.

### Radius
None found in any of the 12 files reviewed.

### Survivors (grep-verified)
Construction padding/margin utilities (all files) — on-scale, correctly left bare per the retired-carve-out ruling. `text-color-*` — colour. `text-left/text-center/text-nowrap` — alignment, not type-role scope. `border-l-[5px]` — brand accent. `[&>div]:text-sm` — flagged item 4. `h-[50px]` — dimension, out of scope.

---

## Batch 2 — Switch, Checkbox/CheckboxGroup, RadioButton/RadioButtonGroup, Select, NonIdealState

### Changed
- **NonIdealState.svelte**: `gap-2` (icon/spinner → title → children, flex-col) → `flow-product`. Classified rhythm (icon↔caption coupling, same pattern `flow.cjs` already special-cases for figure/caption); `gap-2` = 8px = exactly `flow-product`'s `default` step, confirming the read. Direct children of the div, no markup change needed.
- Switch / Checkbox / CheckboxGroup / RadioButton / RadioButtonGroup / Select: no edits — either already compliant or blocked/ambiguous (see flags).

---

## Batch 3 — Tooltip, Popover, Modal, Breadcrumbs, Spinner/LoadingIndicator

### Changed
- **Tooltip.svelte**: `Tooltip.Content` `text-sm` → `body-sm` (helper/explanatory overlay text, exact 14px match, no resize). Added `product` context to the same element.
- **Popover.svelte**: `Popover.Content` `text-sm` → `body-sm`, same reasoning. Added `product` context to the same element.
- **Breadcrumbs.svelte**: container `text-sm` → `body-sm` + `product` context. Judgment call, not a hard block — see flags.
- Modal / Spinner / LoadingIndicator: no edits (Modal's title has no clean map entry; Spinner/LoadingIndicator have no type/spacing/radius utilities at all — pure SVG + colour-stroke classes).

### Flagged
1. **Breadcrumbs `text-sm` → `body-sm` vs. `label`** — judgment call, not a full block. Breadcrumb items are technically nav items (map row: "nav item/menu item/tab label → product/label + tight-label, 14/500"), but they render as a continuous wrapping inline trail with separators, not discrete single-line controls — the tight-label lh 1.0 treatment reads oddly there. Went with **`body-sm`** (secondary/de-emphasized trail text, 14/400, exact size match) as the better function fit; flagging the alternative reading (`label`, weight 500 + tight lh) in case the design intends breadcrumbs as nav controls.
2. **Popover title (`<p class="font-medium">`)** — no map row for "small overlay-panel title." **Resolved by user: `label-sm`.** Applied directly by user (`class="label-sm"`, `product` context already present on the `Popover.Content` ancestor).
3. **Modal `Dialog.Title` (`font-medium`)** — no map row for "dialog/modal title," and previously had no explicit size at all. **Resolved by user: `label`.** Applied: `class="product label"` on `Dialog.Title`.

### Out-of-scope colour
`text-color-*`/`bg-color-*`/`border-color-*` throughout; `border-l-[5px]` on Modal's header (Callout/Header's brand-accent pattern, already documented) — untouched.

### Radius
None found in any of the 6 files.

### Left as-is
- **Spinner.svelte / LoadingIndicator.svelte** — no type, spacing, or radius utilities present at all (pure SVG geometry + `stroke-color-*` classes). Nothing in scope to change.
- **Modal** construction padding (`p-3`, `pr-4`, `px-4 py-6`, `p-4`) and the horizontal button-row `gap-2` (axis rule: horizontal → always construction) — on-scale, left as bare Tailwind.

### Survivors (grep-verified)
`p-2` (Tooltip, Popover) — construction, on-scale. `font-medium` (Popover title, Modal title) — flagged items 2–3. `border-l-[5px]`, `p-3/pr-4/px-4 py-6/gap-2/p-4` (Modal) — brand accent / construction, per table above.

**Post-batch resolution (user):** Popover title → `label-sm` (with `product` context already present on `Popover.Content`); Modal `Dialog.Title` → `product label`. Both applied by user.

---

## Batch 4 — Sidebar, AppShell, Footer, CopyButton, Flag (+ sidebarUtils.ts, adjacent)

### Changed
- **Footer.svelte**: `text-xs` (CIU credit line) → `caption` (small functional/meta text, exact 12px match). Added `product` context to the immediate wrapper div.
- **sidebarUtils.ts** `tabLabelOverride`: `[&>button]:text-xs` → `[&>button]:label`. Not a `.svelte` file, but included because it's a direct, tightly-coupled override that re-styles `TabLabel`'s own button (already migrated to `label` in batch 1) when used inside a `Sidebar`'s tab list — leaving it as `text-xs` would silently reintroduce a 12px override fighting the 14px `label` role at equal CSS specificity, undoing batch 1's fix for this composed usage. `.product` context is already present via `TabList`'s root (batch 1).
- Sidebar / AppShell / CopyButton / Flag: no edits (see flags/left-as-is below).

### Flagged
**Post-batch resolutions (user):** `sidebarUtils.ts` `tabLabelOverride` → `[&>button]:label-sm` (not `label`); Flag banner message → `label`. For the Flag change, added `product` context to Flag's root div — `label` only resolves its font-size/weight from CSS custom properties that are exclusively defined inside a `.prose`/`.product`/`.chart` context block, so it needed a context ancestor to actually take effect.

1. **Sidebar `space-y-4`** (TabPanel content wrapper + sections wrapper, both holding a sequence of section-like content) — read naively this looks like rhythm ("field after field"), but 16px doesn't match `flow-product`'s `default` (8px) step, and there's no owl rule that assigns "loose" (16px) to plain sibling `<div>`s without a heading/block-object marker. Per the spacing map's own guidance ("if an existing `space-y-N` doesn't match the context's default... re-run the gate rather than forcing a flow step"), I re-ran it and read this as **construction** — a fixed, designed vertical offset in closed sidebar chrome, not open editorial rhythm. Left as bare Tailwind, flagging the re-examination for your confirmation.
2. **Sidebar `ml-[80px]`** — off-scale arbitrary, but almost certainly tied to the fixed width of the icon/toggle strip it's offsetting past, not a spacing-scale value. Snapping to the nearest token (`--spacing-16` = 64px) would shift content 16px out of alignment with that icon strip. Left untouched — flagging rather than force-snapping, since this one risks breaking a real alignment dependency.
3. **AppShell `<p class="product body font-bold">`** — `body` role (already migrated, correct) has a stray `font-bold` (700) stacked on top, overriding the role's own weight (400). No "bold body" role exists in the map. Left untouched (didn't remove `font-bold`, since that would be "fixing" a value judgement, not migrating a token) — flagged for a decision: drop `font-bold` (accept default body weight) or confirm a bold variant is wanted.
4. **Flag message (`text-base uppercase`)** — no map row for a full-width status/alert banner message. Doesn't fit `label` (control) or `eyebrow` (muted kicker) cleanly given the uppercase, white-text, banner treatment. Left untouched, flagged for a design decision.

### Out-of-scope colour
All `text-color-*`/`bg-color-*`/`border-color-*` throughout; inline colour classes in Flag's `colorClass` lookup.

### Radius
None found in any of the 6 files (5 components + sidebarUtils.ts).

### Left as-is
- **Sidebar/AppShell/Footer/sidebarUtils.ts construction spacing** (`pb-6`, `pb-4`, `px-6 pt-6`, `px-4 py-4`, `sm:space-x-4`, `md:px-8`, `px-4 py-2`, `!space-y-0.5 !p-0`, `!space-y-0 !p-0`, `mr-0 mb-1`) — all on-scale (or intentional `0`/`!important` resets), correctly left as bare Tailwind.
- **Footer `mt-auto`** — not a scale value (flexbox "push to bottom" trick), not in scope for the spacing token gate.
- **Footer `tracking-wide`** — letter-spacing utility; not one of the four in-scope categories (`text-*`/`leading-*`/`font-*`/spacing), left untouched.
- **CopyButton** — only construction `ml-2` on its icons (axis rule: horizontal → always construction); no type utilities present (all text comes through the already-migrated `Button` component).

### Survivors (grep-verified)
`pb-6/pb-4/px-6 pt-6/space-y-4` (Sidebar) — flagged item 1 or construction, per table above. `font-bold` (AppShell) — flagged item 3. `px-4/py-4/pb-4/py-2` (Footer) — construction. `ml-2` (CopyButton) — construction. `px-4` (Flag) — construction; `text-base uppercase` (Flag) — flagged item 4. `!space-y-*/!p-0/mr-0/mb-1` (sidebarUtils.ts) — construction, intentional resets.

---

## Batch 5 — Overlay/Trigger, MultipleActionButton, PlacardButton, AsyncButton, DataDownloadButton

### Changed
- **MultipleActionButton.svelte** (`DropdownMenu.Content`):
  - Added `product` context to `DropdownMenu.Content` (covers all three role classes below).
  - `DropdownMenu.GroupHeading` `text-sm` → `body-sm` (secondary/plain text, exact 14px match — see flag below for the alternative reading).
  - Menu item primary label `text-sm font-medium` → `label leading-none` — clean, confident: exact 14/500 match for "nav item/menu item/tab label" per the type map, tight-label applied since it's single-line.
  - Menu item description `text-xs text-color-text-muted` → `caption` — exact 12px match ("small functional — timestamp, badge, meta").
- **PlacardButton.svelte**: content wrapper `space-y-2` → `flow-product`. Classified rhythm: PlacardButton's title→body→footer shape matches the doc's own "Card (title/body/actions)" mini-document exemplar; `space-y-2` = 8px = exactly `flow-product`'s `default` step, confirming the read. Title and body are direct children of this div, so no markup change was needed.
- Overlay / Trigger / AsyncButton / DataDownloadButton: no edits — no in-scope utilities present (Overlay and DataDownloadButton are pure composition with no Tailwind classes of their own; Trigger and AsyncButton only have construction margins/dimensions/colour).

### Flagged
1. **MultipleActionButton `GroupHeading` — `body-sm` vs. `label`** — judgment call, not a hard block, same shape as the Breadcrumbs case in batch 3. It's a heading for a group of menu items (structurally a heading), but carries no explicit weight in the original code (plain `text-sm`, no `font-medium`), reading as intentionally plain rather than a control-style label. Went with **`body-sm`** (exact match, zero visual change); flagging the alternative (`label`, weight 400→500) in case group headings are meant to read as control labels.
2. **PlacardButton title (`text-2xl font-bold`, 24/700)** — no map row fits exactly. Two off-system candidates conflict: `section-head` (24/600) matches size but not weight; `dashboard-head` (28/700) matches weight but not size. Left untouched rather than force either — recommend a design decision on which axis (size or weight) should win, or whether this needs its own "CTA/placard title" role.
3. **PlacardButton body (`prose h-full leading-snug`)** — the `.prose` context already applies correct body typography (including line-height) to bare `<p>` elements via the shared `semantics.cjs` selector, so `leading-snug` is a stray override fighting the role's own line-height rather than a documented per-component exception. Left untouched (uncertain whether the tightened leading was a deliberate density choice for this card), flagged for a decision: drop `leading-snug` and let `.prose`'s body line-height apply, or confirm the override is intentional.

### Out-of-scope colour
`text-color-*`/`bg-color-*`/`border-color-*`/`divide-color-*` throughout; PlacardButton's inline `style:color`/`style:background-color` palette lookups (colour, untouched); AsyncButton's `stroke-color-*` spinner classes.

### Radius
None found in any of the 6 files.

### Left as-is
- **Overlay.svelte / DataDownloadButton.svelte** — pure composition over already-migrated child components; no Tailwind utility classes of their own to migrate.
- **AsyncButton.svelte** — only construction dimensions (`w-*`/`h-*`/`stroke-[10]`, not in scope) and colour; no type/spacing utilities in scope.
- **Trigger.svelte** `ml-0.5` (icon offset) — construction, on-scale.
- **MultipleActionButton** `p-1`/`p-2`/`gap-0`/`mr-1` — construction, on-scale/zero.
- **PlacardButton** `p-4`, `mt-4`, `px-4 py-2` (footer bar) — construction: `mt-4` separates two fixed named parts (content block / CTA footer bar) of one closed widget, not open rhythm.

### Survivors (grep-verified)
`ml-0.5` (Trigger) — construction. `gap-0`/`p-1`/`p-2`/`mr-1` (MultipleActionButton) — construction. `text-2xl font-bold` (PlacardButton title) — flagged item 2. `prose ... leading-snug` (PlacardButton body) — flagged item 3. `mt-4 px-4 py-2` (PlacardButton footer) — construction.

---

## Correction — `label-tight` / `label-sm-tight` (found during batch 6, applied retroactively)

**Important finding.** While reading `NavigationMenuItem.svelte` (already using `class="... label-tight ..."` directly) I found that `roles.cjs` **already defines real `label-tight`/`label-sm-tight` role classes** (line-height 1.0 baked in, same size/weight as `label`/`label-sm`), built through the exact same mechanism as every other role (`typography.cjs`'s `rolesKeys` loop). This **contradicted** the then-current `migration-type-mapping.md` guidance ("[tight-label] is currently **not** present as a variable... must be applied at the component level") — that doc was stale on this specific point; the token exists and `NavigationMenuItem` was already using it correctly. (The mapping doc has since been migrated into `.claude/skills/lcd-ds/references/component-migration.md`, which reflects that `label-tight`/`label-sm-tight` exist.)

My earlier batches used the doc's literal instruction (`label`/`label-sm` + a manual `leading-none` override) instead. That was **visually correct** (line-height 1.0 either way) but didn't bind to the canonical semantic role, which the overall migration rule requires ("bind to semantic roles only... never a leftover Tailwind class/override").

**Fixed retroactively, this batch:**
- **Button.svelte**: all four `label-sm leading-none` → `label-sm-tight`; all `label leading-none` → `label-tight`.
- **TabLabel.svelte**: both orientation variants `label leading-none` → `label-tight`.
- **MultipleActionButton.svelte**: menu item label `label leading-none` → `label-tight`.

No visual change from this correction — same computed size/weight/line-height, now via the proper token. (Resolved: the source-of-truth mapping now lives in `.claude/skills/lcd-ds/references/component-migration.md` and reflects that `label-tight`/`label-sm-tight` do exist.)

---

## Batch 6 — NavigationMenu/NavigationMenuItem, Toaster/Toast, ColorLegend, ImageDownloadButton

### Changed
- **Toast.svelte**: type heading (`text-lg font-bold`, "Notice"/"Success"/etc.) → `card-panel-title`. Function-first match: a toast is structurally a small status banner, same category as `Callout` (which already uses `card-panel-title` for its title) — confident precedent-following edit despite the compound off-system resize (18→20px, 700→600 weight). Body message `text-sm` → `body-sm` (exact 14px match). Added `product` context to the outer `role="alert"` div.
- **Toaster.svelte**: `space-y-1` (stacked toast messages) → `flow-product`. Classified rhythm — literally "field after field" (repeated peer toast messages stacking vertically); `space-y-1` = 4px = exactly `flow-product`'s `tight` step, confirming the read. Toasts render as direct children, no markup change needed.
- NavigationMenu / NavigationMenuItem / ImageDownloadButton: no edits — already correctly migrated (`product`, `label-tight`) or pure composition with nothing of their own.
- ColorLegend.svelte: no edits — see flag below, this one is a different kind of case entirely.

### Flagged
1. **ColorLegend.svelte is not a Tailwind-class migration candidate at all.** Its text sizing is set via raw SVG presentation attributes (`font-size="10px"`, `font-weight="bold"`) on hand-authored `<text>` elements, plus **D3-generated tick labels** created imperatively inside `updateLegend()` (via `axisBottom()`), which aren't authored in the template and can't be given a Tailwind class without touching the D3 rendering code itself. This is chart-context content (title/tick roles conceptually apply — `chart/axis-title`, `chart/tick-sm`) but converting it means changing how typography is applied (attribute → CSS class, plus editing the D3 call to set a class on generated nodes), which is a behavior-adjacent code change beyond a class swap and out of scope for this pass. Recommend a dedicated follow-up that also decides how to class D3-generated SVG text.

### Out-of-scope colour
`text-color-*` throughout; Toast's `typeClasses` (bg/border colour lookup); ColorLegend's `fill="currentColor"`/`theme.tokenNameToValue(...)` calls.

### Radius
None found in any of the 6 files.

### Left as-is
- **ImageDownloadButton.svelte** — pure composition over the already-migrated `MultipleActionButton`; no Tailwind classes of its own.
- **NavigationMenu.svelte** `space-x-1` (horizontal tab-like nav wrap) — construction (axis rule: horizontal → always construction).
- **NavigationMenuItem.svelte** `p-1.5`, `pl-4`, `mb-1` — construction (fixed internal offsets: label padding, child-list indent, list↔expanded-child gap), on-scale, left bare.
- **Toast.svelte** `p-2 pb-4 pl-4 pr-2`, `pr-2`, `mb-1` (title→body offset) — construction: `mb-1` separates two fixed named parts of one closed toast widget, not open rhythm.

### Survivors (grep-verified)
`space-x-1` (NavigationMenu) — construction. `p-1.5`/`pl-4`/`mb-1` (NavigationMenuItem) — construction. `p-2 pb-4 pl-4 pr-2`/`mb-1`/`pr-2` (Toast) — construction, per table above. ColorLegend and ImageDownloadButton — no survivors (no Tailwind type/spacing/radius classes present at all; ColorLegend's typography is SVG attributes, see flag).

---

## Batch 7 — CheckboxSolid, RadioButtonSolid, LayerControl, MergeValuesControl/HelpText, PageMetadata

### Changed
- **HelpText.svelte**: `text-sm` → `body-sm` + `product` context. Clean, confident: this component's entire purpose is to render helper/instructional text, an exact function-first + exact-size match.
- CheckboxSolid / RadioButtonSolid / LayerControl / MergeValuesControl / PageMetadata: no edits — see flags (several genuine ambiguities and a couple of likely pre-existing bugs surfaced this batch) or pure out-of-scope content (PageMetadata is `<svelte:head>` meta tags only, no classes at all).

### Flagged
1. **CheckboxSolid `form-label leading-tight`** — `leading-tight` is Tailwind's own utility (1.25), not our system's tight-label convention (`label-tight`/1.0) nor a value explained by `form-label` alone. This checkbox-as-button label can wrap to two lines (icon + text in a `flex-col` box), so it may be a deliberate choice distinct from the single-line-only tight-label treatment — forcing `label-tight` here could feel cramped if labels wrap. No map row covers "solid/button-styled checkbox label." Left untouched, flagged for a decision.
2. **CheckboxSolid vs. RadioButtonSolid inconsistency** — two structurally near-identical sibling components diverge: CheckboxSolid has `leading-tight` on its label, RadioButtonSolid doesn't; CheckboxSolid's icon offset is `mb-0.5`/`mt-0.5`, RadioButtonSolid's is `mb-1`/`mt-1` (double). Not fixed (per "don't fix what looks wrong, flag it"), but flagging since it looks like unintentional drift between two components that should probably match.
3. **LayerControl gap-4/MergeValuesControl gap-4 — same re-examination as Sidebar's `space-y-4` (batch 4)**: MergeValuesControl's outer `gap-4` (16px) separates genuinely distinct, non-repeating sections (help text / unassigned list / new-category control / grouped list) inside one closed drag-and-drop widget. 16px matches `flow-product`'s `loose` step, not `default`, and there's no owl rule that gets plain sibling `<div>`s to "loose" without a heading/block-object marker — re-running the gate (per the spacing map's own guidance), I read this as **construction**, consistent with the Sidebar precedent. Left as bare Tailwind.
4. **MergeValuesControl `<span class="font-bold">` and the group-rename `<input class="... font-bold">`** — both set only a weight, with no explicit size at all (same shape as Modal's `Dialog.Title` gap from batch 3, now user-resolved to `label` there — but these two have no clear single-line-control framing to justify the same fix). No map row for "inline section sub-heading" or "editable inline field, bold." Left untouched, flagged.
5. **MergeValuesControl `class="padding-0 width-fit ..."`** — `padding-0` and `width-fit` are not real Tailwind utilities (would need to be `p-0` and `w-fit`); as written they do nothing. Not fixed (outside "don't guess-fix" boundary — this isn't a token migration question, it's a pre-existing dead class), but flagging since it's squarely adjacent to the padding utilities I'm auditing.
6. **MergeValuesControl `class="black flex items-center ..."`** — `black` isn't a valid Tailwind utility either; likely leftover/dead. Flagged, not touched (not a type/spacing/radius utility, so strictly out of this pass's scope regardless).
7. **MergeValuesControl inline Button override `class="h-5 py-0 leading-5"`** — this Button call passes `leading-5` (Tailwind utility, 20px), which **will win over the Button's own internal `label-tight` (1.0)** in the compiled cascade — Tailwind utilities sit in a later cascade layer than `addComponents`-registered role classes like `label-tight`, so utilities always beat them regardless of class order in the markup. This means the tight-label treatment I confirmed for `Button` in batches 1/6 is being silently overridden here. Left untouched (not this component's role to resolve someone else's override without confirming intent), flagged for a decision: was `leading-5` intentional, or should it be dropped now that `Button` handles its own line-height correctly?

### Out-of-scope colour
`text-color-*`/`bg-color-*`/`border-color-*` throughout; CheckboxSolid/RadioButtonSolid's `peer-checked:`/`peer-focus:` colour states.

### Radius
None found in any of the 6 files.

### Left as-is
- **PageMetadata.svelte** — `<svelte:head>` meta tags only, zero CSS classes of any kind.
- **LayerControl.svelte** `space-x-1`/`mr-1` — construction (axis rule + fixed single offset). Its `form-label font-normal leading-none` label is the same open question as batch 2's Checkbox/RadioButton `font-normal` flag (item 2 there) — not re-flagged as new, just noted as another instance of the same "`form-label` family vs. `label`/`label-tight` family" ambiguity.
- **CheckboxSolid/RadioButtonSolid** `p-2`, icon offset margins — construction, on-scale.
- **MergeValuesControl** — remaining `py-1 pl-2`/`p-2`/`gap-1`/`mr-2` — construction, on-scale.
- Deferred: `LayerControl`'s sibling subcomponents (`ColorPicker`, `OpacityControl`, `ResizeControl`, `FillTypeControl`) not read this batch — held for a future batch rather than expanding scope further here.

### Survivors (grep-verified)
`form-label leading-tight`/`mb-0.5 mt-0.5` (CheckboxSolid) — flagged items 1–2. `form-label`/`mb-1 mt-1` (RadioButtonSolid) — flagged item 2, construction otherwise. `space-x-1`/`mr-1`/`form-label font-normal leading-none` (LayerControl) — construction / same open question as batch 2. `gap-4`/`font-bold`/`py-1 pl-2`/`p-2`/`gap-1`/`padding-0 width-fit`/`leading-5` (MergeValuesControl) — flagged items 3–7 or construction, per table above.

**Post-batch resolutions (user):**
- Flags 1–2 (CheckboxSolid/RadioButtonSolid label) → **`product label`** on both (replacing `form-label`/`form-label leading-tight`). CheckboxSolid was already updated by the user; applied the same to RadioButtonSolid.
- Icon offset inconsistency → standardized on **`0.5`**: RadioButtonSolid's `mb-1`/`mt-1` → `mb-0.5`/`mt-0.5` to match CheckboxSolid.
- **MergeValuesControl flagged for deprecation** — no further migration work on this component; flags 3–7 above stand as documentation but are not being chased further.

---

## Batch 8 — layerControl (remaining): ColorPicker, ResizeControl, FillTypeControl, OpacityControl, OpacityIcon, ResizeIcon, LayerControlGroup

### Changed
- **ColorPicker.svelte**: popover instructional text `text-xs` → `caption`. Function-first + exact match: this text sits inside `Popover.Content`, whose ambient default is already `body-sm` (14/400, from batch 3) — the original code's deliberate `text-xs` (12) is a genuine departure from that ambient size, i.e. this really is caption-weight micro-copy, not helper text that happened to be off-scale. `caption` (12/400) preserves the intended contrast with zero resize.
- **FillTypeControl.svelte**: same edit, same reasoning, identical instructional-text pattern ("Click to assign a fill type to this layer.").
- ResizeControl / OpacityControl / OpacityIcon / ResizeIcon / LayerControlGroup: no edits.

### Flagged
1. **LayerControlGroup's two `space-y-1` instances** — same shape and same conclusion as batch 2's CheckboxGroup/RadioButtonGroup: the inner `<ul>` wrapping repeated `<LayerControl>` peers is genuine "field after field" rhythm, but the owl mechanism can't reach it cleanly without either resizing the unrelated Clear-button→list relationship or adding a wrapping element (markup restructure, out of scope). Left as bare Tailwind, pointing back to the batch 2 precedent rather than re-litigating it.

### Out-of-scope colour
`text-color-*`/`bg-color-*`/`border-color-*` throughout; ColorPicker's `theme.tokenNameToValue(...)` swatch colours; FillTypeControl's inline pattern-swatch `style:background-*`.

### Radius — kept and justified
- **ColorPicker**: all three `rounded-full` instances (the two colour-chip trigger divs + each swatch-option div in the popover) — genuinely round colour dots/chips, explicitly the kind of case named in the doc's exception list. Kept.

### Left as-is
- **ResizeControl/OpacityControl** `gap-4`/`pt-2` — construction (axis rule: horizontal `items-center` rows → always construction).
- **FillTypeControl** `gap-2` (outer, between the radio-group block and the pattern-swatch block) — construction: two fixed, non-repeating sections in one closed popover panel, not open rhythm (same reasoning as the Sidebar/MergeValuesControl precedent). `gap-0.5`/`gap-2` (inner wraps) — construction, axis rule.
- **LayerControlGroup** `pl-5`, `!px-0` — construction, on-scale.
- **OpacityIcon/ResizeIcon** — pure SVG path/stroke icons, no type/spacing/radius utilities of any kind.

### Survivors (grep-verified)
`rounded-full` ×3 (ColorPicker) — kept, genuinely round. `gap-0.5`/`gap-4`/`pt-2` (ColorPicker, ResizeControl) — construction. `gap-2`/`gap-0.5` (FillTypeControl) — construction, per table above. `gap-4` (OpacityControl) — construction. `space-y-1` ×2/`pl-5`/`!px-0` (LayerControlGroup) — flagged item 1 or construction.

---

## Batch 9 — AnalyticsAndCookieConsent, PrivacyPolicyLink, CookieControlSettings, LoginLink, AuthMenu

### Changed
None — every file in this batch was either pure composition around already-migrated components, third-party vendor CSS, or a single flagged no-entry case.

### Flagged
1. **AnalyticsAndCookieConsent.svelte is not a token-migration candidate.** Its only styling is a `<style global>` block of `!important` overrides targeting a third-party widget's own DOM (`#ccc`, `.ccc-notify-button`, etc. — the CivicUK cookie-control script). This isn't our Tailwind/type-scale surface at all; it's vendor-widget CSS we don't control the markup/class conventions for. Same category as ColorLegend's SVG-attribute case in batch 6 — flagged as out of scope rather than touched.
2. **AuthMenu `<span class="font-bold">{$userName}</span>`** — inline emphasis on a username within a sentence, no size set at all (inherits ambient/browser default, no `product`/`prose` context anywhere in this component). No map row for "inline emphasized username." Left untouched, flagged.

### Out-of-scope colour
AnalyticsAndCookieConsent's vendor CSS hex colours (`#e7135d`, `#9e0059`, etc.) — third-party branding, not our token system, untouched regardless.

### Radius
None found (AnalyticsAndCookieConsent's vendor CSS is out of scope regardless; no other files have any classes at all).

### Left as-is
- **PrivacyPolicyLink / CookieControlSettings / LoginLink** — pure composition around the already-migrated `Button`; no Tailwind classes of their own.
- **AuthMenu** `dark` class — theme selector, not a type/spacing/radius utility.

### Survivors (grep-verified)
`font-bold` (AuthMenu) — flagged item 2. No other survivors — the other four files have no in-scope classes at all.

---

## Batch 10 — LoginForm, HandleRedirectFromAuth, CheckboxGroupSolid, RadioButtonGroupSolid, PlaceholderImage

### Changed
- **LoginForm.svelte**: header title `text-lg font-medium` ("{app_name}: Log In") → `label`, following the precedent the user already set for Modal's `Dialog.Title` (batch 3) — structurally the same case (a title bar atop a form/dialog-like overlay), same off-system resize (18→14px). Added `product` context to the header bar div.

### Flagged
1. **LoginForm `<form class="space-y-4 p-3">`** — ambiguous, same shape as the Sidebar/MergeValuesControl re-examination cases: 16px doesn't match `flow-product`'s `default` (8px). Two readings compete here: **construction** (a fixed, short sequence of parts in one closed auth-form widget — consistent with the Sidebar/MergeValuesControl precedent), or **rhythm** (the doc's own definition includes "coupled content blocks," and this reads somewhat like a natural stacked-content flow: instruction text → status callout → CTA button). Left as bare Tailwind, flagging both readings rather than picking one — this is genuinely closer to 50/50 than the earlier construction calls.

### Out-of-scope colour
`bg-black/60`, `bg-white`, `text-color-text` (LoginForm).

### Radius
None found in any of the 5 files.

### Left as-is
- **HandleRedirectFromAuth.svelte** — headless component, no template/markup at all.
- **PlaceholderImage.svelte** — only a dimension (`h-8 w-8`) and colour classes; no type/spacing/radius utilities.
- **CheckboxGroupSolid/RadioButtonGroupSolid** — their option rows render as a horizontal `flex` button-row (unlike the vertical `CheckboxGroup`/`RadioButtonGroup`/`LayerControlGroup` cases), so there's no vertical-list rhythm ambiguity here: axis rule makes it construction outright. `CheckboxGroupSolid`'s outer `space-y-1` (select-all → button row) is the same fixed-2-part construction call as its non-solid sibling.
- **LoginForm** `mx-2`, `p-4`, `p-3` — construction, on-scale.

### Survivors (grep-verified)
`mx-2`/`p-4`/`space-y-4 p-3` (LoginForm) — construction or flagged item 1. `space-y-1` (CheckboxGroupSolid) — construction (fixed 2-part composition, not blocked-rhythm this time since the list itself is horizontal).

---

## Batch 11 — Geocoder, GeocoderSuggestion, GeocoderSuggestionList, Geolocator, TargetIcon

### Changed
- **GeocoderSuggestion.svelte**: address line `leading-4` (a raw line-height override with no accompanying size utility) → `body-sm`. Clean function-first match: a secondary descriptive line under a primary suggestion label is exactly the "helper/secondary text" case, and `body-sm` carries its own correct size+line-height, replacing the bare override.
- **GeocoderSuggestionList.svelte**: `text-sm` on the list container → `body-sm` (exact match) + added `product` context — this single ancestor addition covers `GeocoderSuggestion`'s `body-sm` edit too, no need to duplicate the context class per-row.

### Flagged
1. **Both `<h1>` suggestion-name elements** (`GeocoderSuggestion`'s `{suggestion.name}` and `GeocoderSuggestionList`'s "No locations found") **have no type role at all** — no `text-*`/`font-*` utility present, so they render at whatever Tailwind's preflight leaves headings at (unstyled, inheriting ambient size). Function-wise this reads strongly as a "nav item/menu item" (`label-tight`), but there's no existing utility to migrate *from* — adding one would be introducing new type styling rather than mapping an existing class. Left untouched, flagged rather than guessed. (Aside: using `<h1>` for a single list-item's text is also a heading-level oddity worth a look, but that's a structural/semantic-HTML question, not this pass's concern.)
2. **`p-0.25` appears twice** (Geocoder's clear-button `XMark` icon, Geolocator's clear-button `XMark` icon) — `0.25` isn't a step in Tailwind's default spacing scale (smallest fractional step is `0.5`), and doesn't match our spacing token table either (smallest is `--spacing-0-5` = 2px). Both sibling icons in the same components use valid `p-0.5`, suggesting this is a copy-paste typo repeated in two places, not an intentional value. Not fixed (not a token-migration decision, a probable pre-existing bug), but flagged since it's squarely in the padding audit.
3. **Two more likely-invalid utility classes**: Geocoder's clear button `class="y-auto absolute ..."` (`y-auto` isn't a real Tailwind utility) and GeocoderSuggestionList's `class="max-height-[60vh] ..."` (should be `max-h-[60vh]`). Neither is in the type/spacing/radius scope of this pass, but flagging alongside the `p-0.25` finds since they're the same category of dead class.

### Out-of-scope colour
`text-color-*`/`bg-color-*`/`border-color-*` throughout.

### Radius
None found in any of the 5 files.

### Left as-is
- **TargetIcon.svelte** — pure SVG path/line icon, no classes of any kind.
- **Geocoder** `pl-10`, `pr-8`, **GeocoderSuggestion** `px-2.5 py-1.5`, `mb-1`, **GeocoderSuggestionList** `px-2.5 py-1.5` (×2), **Geolocator** `p-1` — construction, on-scale, left as bare Tailwind. `left-2`/`top-2`/`right-1`/`top-1`/`left-0`/`top-11` — absolute-positioning offsets, not in the four in-scope utility categories (not padding/margin/gap), left untouched regardless.

### Survivors (grep-verified)
`pl-10`/`pr-8`/`p-0.25` (Geocoder) — construction / flagged item 2. `px-2.5 py-1.5`/`mb-1`/`h1` (GeocoderSuggestion) — construction / flagged item 1. `px-2.5 py-1.5` ×2 (GeocoderSuggestionList) — construction. `p-1`/`p-0.5`/`p-0.25` (Geolocator) — construction / flagged item 2.

**Post-batch resolutions (user):**
- **`<h1>`s removed** by the user in both `GeocoderSuggestion` and `GeocoderSuggestionList` (now plain `<p>`/`<li>` text) — this cleared the structural objection behind flag 1, so I applied the recommended role now that there's a real element to attach it to: `label-tight` added to the suggestion-name `<p>` and to the "No locations found" `<li>` (both already sit under the `product` context added to the list in this same batch).
- **Flag 2 fixed**: `p-0.25` → `p-0.5` in both Geocoder.svelte and Geolocator.svelte's clear-button `XMark` icons, matching their sibling icons.
- **Flag 3 fixed**: `max-height-[60vh]` → `max-h-[60vh]` in GeocoderSuggestionList (real Tailwind utility, same effect intended). `y-auto` removed from Geocoder's clear button — it wasn't a real utility and did nothing, and no clear correct replacement was evident from context, so it was dropped rather than guessed at (zero visual change, since it was a no-op class either way).

---

## Batch 12 — Theme, ThemeSwitcher, FooterCookieMenu, SidebarTabList, SidebarToggle

### Changed
- **ThemeSwitcher.svelte**: dropdown menu item text (`highlightedClasses`/`nonHighlightedClasses`) → added `label-tight` — same "dropdown menu item" pattern as `MultipleActionButton` (batch 5), previously had no type role at all (just padding/colour), now correctly bound. Added `product` context to `DropdownMenu.Content`.
- Theme / FooterCookieMenu / SidebarTabList / SidebarToggle: no edits — `SidebarTabList`'s "Close" button text already resolves correctly via `tabLabelOverride` (fixed in batches 4/6), nothing further needed there.

### Flagged
1. **ThemeSwitcher `buttonClasses`: `rounded-full` on the icon-only mode-toggle button** — not one of the doc's named genuinely-round exceptions (avatar/dot/pill-toggle-knob); every other `Button` instance in the system (including its own `square` variant) has zero border-radius. This looks like a one-off that doesn't match the system-wide flat-corner rule, but I didn't remove it — flagging for a decision rather than guessing.
2. **ThemeSwitcher `buttonClasses`: `text-xs`** — this is passed as a `class` override into the `Button` component, which (per the batch 7 finding, flag 7) means it sits in Tailwind's utility layer and **will win over `Button`'s own internal `label`/`label-sm-tight` sizing** regardless of the `size` prop passed in. Migrating this to a role class wouldn't cleanly resolve the conflict either, since two component-layer classes of equal specificity would then compete on stylesheet-registration order rather than intent. Same underlying issue as batch 7 flag 7 — left untouched, flagged as another instance of it rather than re-solving it here.

### Out-of-scope colour
`text-color-*`/`bg-color-*` throughout; `capitalize` (text-transform, not a type-role utility, left untouched regardless).

### Radius
`rounded-full` (ThemeSwitcher) — flagged item 1, not removed.

### Left as-is
- **Theme.svelte** — a headless `ModeWatcher` wrapper, no markup/classes at all.
- **FooterCookieMenu** `space-x-2` — construction (axis rule: horizontal → always construction).
- **SidebarTabList** `mb-1` (icon→"Close"-text offset) — construction, on-scale.
- **SidebarToggle** `p-1` (×2) — construction, on-scale. Its custom `<style>` block (`--size: clamp(...)`) isn't a Tailwind class, out of scope regardless.

### Survivors (grep-verified)
`py-1 px-2` (ThemeSwitcher) — construction. `rounded-full`/`text-xs`/`p-1` (ThemeSwitcher `buttonClasses`) — flagged items 1–2 / construction. `space-x-2` (FooterCookieMenu) — construction. `mb-1` (SidebarTabList) — construction. `p-1` ×2 (SidebarToggle) — construction.

---

## Batch 13 (final) — LogoLOTI, LogoByCIU, LogoCIU, LogoMayor, ColorLegendOrdinalHorizontalAlt, ColorLegendOrdinalChips

This completes coverage of every real component in `packages/ui/src/lib` (demo-only Storybook scaffolding files were treated as out of scope throughout, per the standing note in earlier batches).

### Changed
- **ColorLegendOrdinalHorizontalAlt.svelte**:
  - Wrapper `gap-2` (title → chart) → `flow-product`. Clean rhythm case — a title-then-content coupling, and 8px matched `flow-product`'s `default` step exactly (no special "loose" marker needed, unlike the figure/table block-object rule). Added `chart` context to the same wrapper.
  - Title `font-semibold` (no size at all previously) → `axis-title`. Function-first: this is literally a chart-legend title, the type map's own "axis title → chart/axis-title" row.
  - Per-swatch SVG `<text>` data labels: added `label` role (chart/label, 14/400) — these are authored template elements (not D3-generated like `ColorLegend`'s tick labels), so unlike that flagged case, classing them directly was straightforward. Kept the existing `select-none` and the inline `style:font-weight` highlight-toggle, which now layers on top of `label`'s own weight as an intentional per-value emphasis override.
- **ColorLegendOrdinalChips.svelte**:
  - Title `font-semibold` → `axis-title`, same reasoning as above. Added `chart` context to the outer wrapper.
  - Per-chip label `<span>`: added `label` role alongside its existing conditional `font-semibold`/`font-normal` highlight toggle (same "role + deliberate override" pattern as the SVG text above).
- Logo files: no edits — all four are pure SVG path/polygon marks with zero CSS classes.

### Flagged
1. **ColorLegendOrdinalChips's vertical orientation has no gap at all** between chip rows (`orientation === 'vertical'` branch is just `'flex flex-col'`, no `gap`/`space-y`), while the horizontal branch has `gap-2`. This looks like a likely oversight — chips would render with rows touching — but per "don't fix what looks wrong," left untouched and flagged rather than adding a gap value that wasn't there.

### Out-of-scope colour
`text-color-label` (both chip/legend files); logo files' `fill="currentColor"` (colour by inheritance, not a token).

### Radius
None found in any of the 6 files.

### Left as-is
- **All four logo files** — pure SVG mark/wordmark paths, zero classes of any kind.
- **ColorLegendOrdinalChips** `mr-1` (swatch→label offset), `gap-2` (horizontal chip wrap) — construction (fixed single offset / axis-rule horizontal gap).

### Survivors (grep-verified)
`gap-2` (ColorLegendOrdinalChips, horizontal branch) — construction. `mr-1` — construction. `font-semibold`/`font-normal` (ColorLegendOrdinalChips per-chip label) — intentional highlight-toggle layered on top of the new `label` role, not a leftover. No survivors in any logo file or in ColorLegendOrdinalHorizontalAlt.

---

## Migration complete

Every real component (`.svelte`, non-story, non-demo) in `packages/ui/src/lib` has now been reviewed across 13 batches. Summary of what's left for follow-up passes, consolidated from the flags above:

- **Structural/markup-blocked rhythm cases** (need a wrapping element, out of scope for a class-only pass): `CheckboxGroup`/`RadioButtonGroup` (batch 2), `LayerControlGroup` (batch 8), `CheckboxGroupSolid` doesn't apply (horizontal layout).
- **Deferred to a dedicated pass**: `ColorLegend.svelte`'s D3-generated + SVG-attribute typography (batch 6); the construction-spacing→explicit-`--spacing-*`-binding pass mentioned throughout (currently correct as bare on-scale Tailwind per the 2026-07-24 carve-out retirement).
- **Design decisions still open**: Callout's rhythm-vs-construction call (batch 1); several "no map entry" titles/headings (AppShell's `font-bold`-on-`body`, NonIdealState's title, MergeValuesControl's spans — flagged deprecated, so no action needed there); the two `Button`-override cascade conflicts (batch 7 item 7, batch 12 item 2) that need a site-wide decision on how consumer class overrides should interact with `Button`'s internal role classes; ThemeSwitcher's non-conforming `rounded-full`.
- **Likely pre-existing bugs surfaced, not fixed**: CheckboxSolid/RadioButtonSolid drift (batch 7), several dead/invalid utility classes (`padding-0`, `width-fit`, `black` in MergeValuesControl — deprecated, no action; both `p-0.25` typos already fixed by user in batch 11), ColorLegendOrdinalChips's missing vertical gap (this batch).
- **MergeValuesControl** is flagged for deprecation per your instruction — no further migration work should target it.

---

# packages/charts — batch 14

Same protocol applied to `packages/charts/src/lib` (8 non-story components: `chartContainer/` and `observablePlot/`). Small enough package to cover in one batch.

### Changed
- **Footer.svelte** (chartContainer): footnote list `text-xs` → `caption` (exact 12px match — byline/source/note/description-link text is textbook "small functional/meta" text). Added `product` context to the `<ul>` — nested inside the parent `ChartContainer`'s `chart` context without conflict, since context classes just scope their own CSS custom properties.
- **ObservablePlotInner.svelte**: default tooltip container `text-sm` → `label` (exact 14px match, no resize). Added `chart` context — this is chart-data-adjacent content (the fallback tooltip shows raw data values), so `chart/label` ("series/data label") is the better function fit than a generic `product` role.
- ChartContainer / ExportBtns / SubTitle / Title / DemoTooltip / ObservablePlot: no edits.

### Flagged
1. **No `flow-chart` context exists.** `flow.cjs` only defines `flow-prose`/`flow-product`/`flow-compact`. Two genuine rhythm cases in this package have no context to convert to:
   - `ChartContainer`'s `mb-4` (title/subtitle block → controls/legend/chart) — a title→content coupling, same shape as the flow.cjs's own heading-spacing rule.
   - `Footer`'s `space-y-0.5` (byline/source/note/description-link lines) — literally "field after field" repeated lines.
   Both left as bare Tailwind. Recommend a design decision: either charts should borrow `flow-product`/`flow-compact` for rhythm, or a dedicated `flow-chart` context should be added to `flow.cjs`.
2. **SubTitle.svelte / Title.svelte already use `product/card-panel-subtitle` and `product/card-panel-title`** despite living inside a `chart`-context `ChartContainer`. This is almost certainly deliberate and correct-by-necessity — the type map's Chart context section has no title/subtitle role at all (only axis-title/label/tick/tick-sm), so falling back to the nearest Product role is the sensible choice. Left as-is, not flagged as a problem — noting it here only so the "chart context has gaps" theme is documented in one place alongside items 1 and 3.
3. **ExportBtns's `space-y-2` on a `flex flex-wrap` row** — `space-y-*` targets block/flex-col stacking; on a wrapping horizontal row it will still add `margin-top` to every child regardless of visual row position, which reads as a likely axis mismatch (probably intended `gap-2`). Per the axis rule this would be construction either way (horizontal container), so reclassifying it doesn't change the target type, only the utility — left untouched and flagged as a probable pre-existing bug rather than fixed.
4. **Footer's `<span class="mr-1 font-bold">Source:</span>` / `Note:`** — inline bold label prefixes with no size set, same "no map entry for inline emphasis" shape as AuthMenu's username (batch 9) and MergeValuesControl's spans (batch 7). Left untouched.
5. **DemoTooltip.svelte `text-xl`** — this is example/reference tooltip content (filename literally `Demo*`), same ambiguity as the `ui` package's Storybook-demo files that were treated as lower priority throughout. If it should be migrated: function-first this is chart tooltip content → `chart/label`, which would be a significant resize (20→14px). Left untouched pending a decision on whether Demo files are in scope at all.
6. **Two raw-CSS rules targeting third-party-generated markup** — `ObservablePlot.svelte`'s `:global(.defaultColorLegendLabel-swatch) { font-size: 1rem; }` and `ObservablePlotInner.svelte`'s `:global(.themed-chart svg)`/`[aria-label='tip']` rules target Observable Plot's own internally-generated SVG/legend DOM, not our component markup. Same category as `ColorLegend`'s D3-generated-content flag (batch 6) — out of scope for a Tailwind-class migration, left untouched.

### Out-of-scope colour
`text-color-*`/`bg-color-*` throughout; `--color-chart-background`/`--color-border-muted` in ObservablePlotInner's global style block.

### Radius
None found in any of the 8 files (the tooltip's decorative pointer in `ObservablePlotInner` is a rotated square, not rounded — nothing to flag there).

### Left as-is
- **ChartContainer** `not-prose` — correct, deliberate use of the Tailwind-prose-plugin opt-out marker (matches the `:not(.not-prose, .not-prose *)` guards throughout `semantics.cjs`), not a leftover to migrate.
- **ExportBtns** `mt-2`, `mr-2`, `ml-2` (icons) — construction, on-scale.
- **Footer** `mt-1`, `mr-4`, `mr-1` (×2), `!p-0`, `ml-auto` — construction (or, for `ml-auto`, not a scale value at all — same category as the `ui` package's `mt-auto`/`ml-auto` cases).
- **ObservablePlotInner** `p-2` (tooltip), dimensions on the pointer triangle — construction / out of scope.

### Survivors (grep-verified)
`mb-4` (ChartContainer) — flagged item 1. `space-y-2`/`mt-2`/`mr-2`/`ml-2` (ExportBtns) — flagged item 3 or construction. `mt-1`/`mr-4`/`space-y-0.5`/`mr-1 font-bold` ×2 (Footer) — flagged items 1/4 or construction. `text-xl` (DemoTooltip) — flagged item 5. `p-2` (ObservablePlotInner) — construction.

This completes both `packages/ui/src/lib` and `packages/charts/src/lib`.

---

# packages/maps

Same protocol applied to `packages/maps/src/lib` (~33 non-story, non-demo/test components across `map/`, `mapControl*/`, `mapDeck*/`, `mapDraw/`, `mapLayer*/`, `mapMarker/`, `mapPopover/`, `mapLegend/`, `mapContextLayers/`, `mapCursorEvent/`). `Test*`/`Demo*` files and `+layout.svelte`/`+page.svelte` route files are treated as out of scope, consistent with the demo-file precedent from `packages/ui`.

## Batch 15 — Map, MapLibre, MapControlGroup, MapControlZoom, MapControlPan, MapControlFullscreen, MapControlRefresh, MapControlBorough

### Changed
None — every file in this batch was either pure logic/composition, out-of-scope vendor CSS, or on-scale construction spacing.

### Flagged
1. **MapLibre.svelte's `<style>` block targets third-party MapLibre/Mapbox-generated DOM** (`.maplibregl-ctrl-attrib-inner`, etc.) via `@apply text-xs` / `@apply pt-0.5`. Same category as `ObservablePlot`'s and `AnalyticsAndCookieConsent`'s vendor-CSS flags (charts batch, ui batch 9) — this sizes the map's attribution/copyright control, not our component markup, so it's out of scope for a Tailwind-class migration. Left untouched.

### Out-of-scope colour
`text-color-*`/`bg-color-*` throughout, including inside MapLibre's vendor-CSS block.

### Radius
None found in any of the 8 files.

### Left as-is
- **Map.svelte** — pure composition/context-provider, no template classes of its own.
- **MapControlGroup**'s `space-y-2` (stacked control groups) and **MapControlZoom/Fullscreen/Refresh**'s `space-y-1` — classified **construction**, same reasoning as `TabList` (ui batch 1): these are fixed control-cluster toolbars (a stack of map buttons), not open-ended editorial content, so they don't qualify for flow even though the utility is nominally "vertical repeated-peer." (Fullscreen/Refresh currently render only one child each, so the utility is inert either way — noted, not fixed.)
- **MapControlPan**'s per-icon asymmetric padding (`pb-1 pt-0.5`, `pl-0.5 pr-1`, etc.) — deliberate directional nudge for each chevron in a D-pad layout; construction, on-scale, left as bare Tailwind.
- **MapControlGroup**'s `positionClasses` (`top-6`, `left-1/2`, etc.) — absolute-positioning offsets, not one of the four in-scope utility categories.
- **MapControlBorough** — delegates entirely to the already-migrated `Select` component; no classes of its own beyond layout.

### Survivors (grep-verified)
`text-xs`/`pt-0.5` (MapLibre, vendor CSS) — flagged item 1. `space-y-2` (MapControlGroup) — construction. `space-y-1`/`p-0.5` ×2 (MapControlZoom) — construction. `pb-1 pt-0.5`/`pl-0.5 pr-1`/`pl-1 pr-0.5`/`pb-0.5 pt-1` (MapControlPan) — construction. `space-y-1`/`p-1` (MapControlFullscreen, MapControlRefresh) — construction.

## Batch 16 — MapControlGeocoder, MapControlGeolocator, MapControlLocationSearch, MapCursorEvent, BoroughsContextLayer

### Changed
None — all five files are pure composition/logic wrappers (around the already-migrated `Geocoder`/`Geolocator` `ui` components, or headless map-layer/cursor-event plumbing with no template classes at all). `MapControlLocationSearch`'s only classes are `flex shadow` and a `max-w-[calc(...)]` dimension, neither in scope.

### Flagged
None.

### Survivors
None — no in-scope classes present in any of the five files.

## Batch 17 — MapDeckOverlay, DefaultPopover, MapDeckPopovers, MapDeckTooltips, FileUpload, MapDraw, MapDrawControls

### Changed
- **FileUpload.svelte**: drop-zone instructional text `text-sm` → `body-sm` (exact 14px match, textbook helper text). Added `product` context to the root div (also covers the "Upload" label discussed in the flags below).
- MapDeckOverlay / DefaultPopover / MapDeckPopovers / MapDeckTooltips / MapDraw: no edits — headless logic or pure composition with no in-scope classes.

### Flagged
1. **FileUpload's drop-zone `rounded-lg`** — a drag-and-drop file zone with rounded corners. Not one of the doc's genuinely-round exceptions (avatar/dot/pill-knob); per the system-wide flat-corner rule this looks like it should be removed, but per "don't fix what looks wrong," left in place and flagged rather than guessed.
2. **FileUpload `<p class="form-label text-sm">Upload</p>`** — same "`form-label` family vs. `label`/`label-tight` family" open question raised repeatedly in the `ui` package (batch 2's Checkbox/RadioButton `font-normal`, batch 7's LayerControl label). Left untouched.
3. **FileUpload root `gap-2`** — a fixed 3-part composition (title / drop-zone-or-status / action-row) inside one closed widget, so by the established precedent (Sidebar, MergeValuesControl, LoginForm) this reads as construction — but unlike those cases, `gap-2` (8px) actually *matches* `flow-product`'s `default` step exactly, which weakens my confidence it's clearly not rhythm. Flagging as a genuine close call (same shape as LoginForm's batch-10 flag) rather than picking a side.

### Out-of-scope colour
`text-color-*`/`bg-color-*`/`border-color-*` throughout.

### Radius
`rounded-lg` (FileUpload) — flagged item 1, not removed.

### Left as-is
- **MapDeckOverlay** — no template/markup at all.
- **DefaultPopover / MapDeckPopovers / MapDraw** — pure composition/logic, no classes of their own.
- **MapDeckTooltips** `maplibregl-popup` — a marker class, not a Tailwind utility; delegates all content styling to `MapMarkerStyledContainer` (not yet reviewed — later batch).
- **FileUpload** `p-4`/`p-2`/`mb-2`/`mr-2`/`mt-2`/`gap-2` (action row) — construction, on-scale.
- **MapDrawControls**'s repeated `pb-1 pt-0.5` icon nudge (×8, one per draw-mode icon) — construction, deliberate consistent per-icon offset, on-scale.

### Survivors (grep-verified)
`gap-2`/`form-label text-sm`/`rounded-lg`/`p-2`/`mb-2`/`mr-2`/`mt-2` (FileUpload) — flagged items 1–3 or construction, per table above. `pb-1 pt-0.5` ×8 (MapDrawControls) — construction.

## Batch 18 — MapLayerSource, GeoJSONMapLayerSource, MapLayerView, MapLegend, MapPopover

### Changed
- **MapLegend.svelte**:
  - Title `font-bold` (no size at all) → `label-sm`, following the precedent you set for Popover's title (batch 3/its resolution) — same shape, a small overlay-panel heading.
  - Content wrapper `text-sm` → `body-sm` (exact match — this is the ambient default for whatever legend content is slotted in).
  - Added `product` context to the root div, covering both edits.
- MapLayerSource / GeoJSONMapLayerSource / MapLayerView / MapPopover: no edits — all pure headless logic/composition, no template classes at all.

### Flagged
None.

### Out-of-scope colour
`text-color-*`/`bg-color-*` (MapLegend).

### Radius
None found in any of the 5 files.

### Left as-is
- **MapLegend** `gap-3`/`px-4 py-3` — construction (fixed 2-part composition: header row + content, consistent with the Sidebar/FileUpload precedent); `right-1`/`top-1` on the close button — absolute-positioning offsets, not in scope.
- The other four files have no markup/classes of their own.

### Survivors (grep-verified)
`gap-3`/`px-4 py-3` (MapLegend) — construction. No other survivors.

## Batch 19 (final) — MapMarker, MapMarkerContainer, PlacementCenterMarker, PlacementFollowMarker, PlacementNoneMarker, MapMarkerFlyToFeature, MapMarkerPlacement, PlacementCenterAboveFeature, PlacementFollowMouse, MapMarkerStyledContainer

This completes `packages/maps/src/lib`.

### Changed
- **MapMarkerStyledContainer.svelte**: outer container `text-sm` → `body-sm` + added `product` context. This is the shared styling wrapper "suitable for the vast majority of map tooltips and popups" (per its own doc comment) — same ambient-default pattern as `Tooltip`/`Popover` in the `ui` package and `ObservablePlotInner`'s tooltip in `charts`, all resolved the same way.
- **PlacementCenterMarker / PlacementFollowMarker / PlacementNoneMarker.svelte**: each has a `text-sm` descriptive line ("Centred above the feature.", etc.) → `body-sm`. No `product` context added directly in these files — they render as children passed through `MapMarkerContainer` → `MapMarkerPlacement` → `MapMarkerStyledContainer`, so the context added there covers them. (First pass at this added a wrapping `<div class="product">` directly in these three files — caught before finalizing that it was an unnecessary markup restructure once `MapMarkerStyledContainer` already provides the ancestor context; corrected to a plain class-attribute edit.)
- MapMarker / MapMarkerContainer / MapMarkerFlyToFeature / MapMarkerPlacement / PlacementCenterAboveFeature / PlacementFollowMouse: no edits — pure headless logic/composition, no classes of their own.

### Flagged
None.

### Out-of-scope colour
`text-color-*`/`border-color-*`/`fill-color-*`/`stroke-color-*` (MapMarkerStyledContainer, including its SVG tip/arrow).

### Radius
None found in any of the 10 files. The SVG "tip" at the bottom of `MapMarkerStyledContainer` is a pointed triangle (polygon + two lines), not a rounded shape — nothing to flag there.

### Left as-is
- **MapMarkerStyledContainer** `class:p-4={!noPad}` — construction, on-scale (didn't show in the grep pass since it's a Svelte `class:` directive rather than a plain string, but was reviewed manually).
- Positioning offsets (`bottom-[calc(1rem-1px)]`, `left-1/2`, etc.) — not in the four in-scope utility categories.
- All other files in this batch — pure logic/composition, no template classes of their own.

### Survivors (grep-verified)
None via the standard grep pass (the one construction padding utility present uses Svelte's `class:` directive syntax and was reviewed manually instead, per the note above).

---

This completes `packages/ui/src/lib`, `packages/charts/src/lib`, and `packages/maps/src/lib`. Remaining un-swept packages in the monorepo: `tables`, `utils`, `themes` (the latter is the token/theme source itself, not a component consumer).

### Flagged
1. **CheckboxGroup `<ul>` and RadioButtonGroup vertical option stack** — genuine "field after field" rhythm per the gate, but `flow-*`'s owl mechanism can't cleanly reach just the list: the shared wrapper also contains an unrelated sibling (select-all checkbox / Clear button) whose relationship to the list is a different, non-rhythmic composition. Applying `flow-product` to the shared wrapper would correctly space the list but would also resize the select-all→list gap (4px→8px), which I've classified construction. Properly separating the two needs a wrapping element — a markup restructure, out of scope this pass. Left as bare `space-y-1`. Recommend a structural follow-up pass.
2. **Checkbox/RadioButton `font-normal` override on `form-label`** — no map row covers checkbox/radio option labels specifically (map's "control label" examples are short button/tab/chip text; these are closer to full-sentence body copy). Don't know what `form-label` resolves to under the hood (shared `forms.cjs`, out of scope to open). Left untouched, flagged rather than guessed.
3. **NonIdealState title (`text-lg font-bold`)** — no map entry fits (not card-panel-title: wrong weight/context; not section-head: too small). Left untouched, flagged.

### Out-of-scope colour
All `text-color-*`/`bg-color-*`/`border-color-*`, plus inline `style` color overrides (Checkbox/RadioButton `--color-interactive-primary` etc.).

### Radius — kept and justified
- Switch: both `rounded-full` (track pill + thumb knob) — genuinely round, explicitly named in the doc's exception list.
- RadioButton: `border-radius: 50%` on the `:before` dot indicator — genuinely round.
- Select: `--sv-border-radius: 0px` — already zero, nothing to change.

### Left as-is
- **Select.svelte** — no edits; already binds internal padding/offsets directly to `var(--spacing-*)` tokens in its `<style>` block, ahead of the deferred construction-spacing-binding pass.

### Survivors (grep-verified)
`rounded-full` ×2 (Switch) — kept, genuinely round. `border-radius: 50%` (RadioButton) — kept. `--sv-border-radius: 0px` (Select) — already zero. `leading-none`/`pl-2`/`pr-2` (Switch) — correct tight-label + construction. `ml-2 font-normal` (Checkbox, RadioButton) — flagged item 2. `space-y-*`/`gap-x-3 gap-y-1`/`px-0` (CheckboxGroup, RadioButtonGroup) — flagged item 1 or construction per the batch table. `px-2 py-2` (NonIdealState) — construction. `text-lg font-bold` (NonIdealState) — flagged item 3.
