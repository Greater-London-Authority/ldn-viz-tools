# Component type/spacing/radius migration — batch log

Log of each batch run against `packages/ui/src/lib` per the protocol in
`migration-type-mapping.md` + `migration-spacing-mapping.md`. Scope per batch:
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
