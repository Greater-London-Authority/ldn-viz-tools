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
