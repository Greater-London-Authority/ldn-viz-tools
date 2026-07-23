# Spacing migration map — Tailwind → flow or spacing token

_Draft skeleton. The hard part of spacing migration is **classification**, not lookup: the same `space-y-4` becomes flow in one place and a spacing token in another. Classify every spacing utility through the gate below **before** mapping it._

## The gate — rhythm vs construction (do this first)

For each spacing utility, decide which kind of spacing it is:

- **Rhythm** — the gap between **vertically** stacked repeated peers (field after field, card after card, row after row) or between coupled content blocks (heading↔body, figure↔caption). Open-ended sequences. → **flow** (context class + let the coupling rules place it).
- **Construction** — the fixed internal geometry that assembles a single component: padding, control/icon gaps, the offset between the named parts of one widget (this label / this input / this helper). Closed, designed set. → **spacing token** (`primitive.spacing.*`; component-internal carve-out permits primitives).

**Axis rule (decides most edge cases):** flow is a **vertical** mechanism only — it applies `margin-top` down a stack. **Horizontal** peer gaps have no flow equivalent, so they are **always construction**, even when they're gaps between repeated peers that would otherwise read as rhythm (e.g. `space-x-*` between horizontal nav items, a horizontal flex/grid `gap`). Only vertical stacking is eligible for flow. So: repeated-peer gap **+ vertical** → flow; repeated-peer gap **+ horizontal** → construction.

**Structural reach of flow:** the owl selector only sees **direct-child adjacencies of the flow root** (`> * + *`). A rhythm relationship expressed by a margin nested several DOM levels inside a child (e.g. an `mb-*` on a submenu `<ul>` deep inside an `<li>`) is real rhythm the owl cannot reach — applying `flow-*` to the outer container would blanket-space *all* children and change layout. Classify it rhythm, keep it as the primitive, and flag it (same disposition as the sr-only case, different structural reason).

**Test:** *vertical gap between repeated peers / coupled blocks* → flow. *Gap between the fixed named parts of one component, or any horizontal gap* → spacing token.

**Heuristic by utility (starting bias, not a rule):**
- `space-y-*` — vertical margin, usually inter-block **rhythm** → lean flow.
- `space-x-*` — horizontal → **construction** (no horizontal flow) → spacing token.
- `gap-*` — flex/grid gap; **construction** by default, and always construction when the container is horizontal → spacing token. Only a *vertical* `gap` on a content stack is a flow candidate; a `gap` on a control cluster or toolbar is construction.
- `p-*`, `px/py-*` — padding, always **construction** → spacing token.
- `mt/mb/my-*` (single vertical margins) — ambiguous → run the gate.
- `ml/mr/mx-*` (single horizontal margins) — **construction** → spacing token.

**Known review item:** Figma has instances where `flow` was used for single-component internal geometry (e.g. an input's label/input/helper stack). Under the gate these are *construction* → flag for review and likely re-map to spacing tokens. Do not auto-strip; surface them.

**Composite exception:** "mini-document" components — Card (title/body/actions), ChromeHeader (title/eyebrow/subtitle), TitleGroup — are genuine titling **rhythm**. flow + coupling is correct there.

## Path A — rhythm → flow

Don't map to a px margin. Replace the `space-y`/margin utility with the appropriate **flow context class** on the container and let the coupling rules assign the gap. Pick the context by the content:

| container content | context class |
|---|---|
| long-form editorial / markdown | `flow-prose` |
| product UI block stacks (field stacks, panel sections) | `flow-product` |
| dense / data-heavy stacks (compressed tables, tight panels) | `flow-compact` |

Flow step values, for reference when checking that an existing gap lands on the right rung:

| step | prose | product | compact |
|---|---|---|---|
| tight | 4 | 4 | 4 |
| default | 16 | 8 | 4 |
| loose | 24 | 16 | 8 |
| section | 40 | 24 | 8 |

If an existing `space-y-N` doesn't match the context's `default`, that's a signal it was either a coupling relationship (should be tight/loose, handled by the rules) or genuinely construction (Path B) — re-run the gate rather than forcing a flow step.

## Path B — construction → spacing token

**End-state ruling (set during Callout test, 2026-07-22):** construction spacing **may remain as numeric Tailwind utilities** for this migration where the value equals the primitive step — this is the documented component-internal carve-out, and it's the less disruptive choice. Converting internal padding to explicit `spacing.*` bindings is a **separate later pass** that also verifies the values are correct. So "done" for a component does **not** require converting `p-*`/`gap-*` internal padding; leave numerically-correct Tailwind in place and note it. (The table below is the target for that later binding pass, and for any value that is *not* already on-scale.)

`primitive.spacing.N` is a 4px scale where the number is the multiplier (`spacing.4` = 16px), so it aligns 1:1 with Tailwind's spacing scale — mostly a direct number swap.

| Tailwind | px | → token |
|---|---|---|
| `0.5` | 2 | `spacing.0.5` |
| `1` | 4 | `spacing.1` |
| `1.5` | 6 | `spacing.1.5` |
| `2` | 8 | `spacing.2` |
| `2.5` | 10 | `spacing.2.5` |
| `3` | 12 | `spacing.3` |
| `3.5` | 14 | `spacing.3.5` |
| `4` | 16 | `spacing.4` |
| `5` | 20 | `spacing.5` |
| `6` | 24 | `spacing.6` |
| `7` | 28 | `spacing.7` |
| `8` | 32 | `spacing.8` |
| `10` | 40 | `spacing.10` |
| `12` | 48 | `spacing.12` |
| `16` | 64 | `spacing.16` |

Off-scale arbitraries (`p-[15px]`, `mt-[13px]`) are off-system → snap to the nearest token and flag.

## Do NOT map to `semantic-spacing` (t-shirt scale)

`semantic-spacing` (`xxs … 9xl`) is **deprecating** toward the numbered/primitive scale. Do not introduce new bindings to it during migration; migrate off it where encountered. (Reference only: `xxs`4 `xs`8 `sm`12 `md`16 `lg`20 `xl`24 `2xl`28 `3xl`32 `4xl`40 `5xl`48 …)

## Corners (system-wide visual rule)

`rounded-*` → **remove** (corner radius is 0 everywhere) **unless** the element is genuinely round — a circular avatar, a dot, a pill toggle knob. Never leave radius on bars, cards, cells, buttons, inputs, containers. Flag any radius kept, with the reason it's genuinely round.

## Report requirement (per component)

For each component: every spacing utility with its **classification** (rhythm/construction) and its target (flow context+relationship, or spacing token); every `flow`-as-construction instance flagged for review; every off-scale value snapped + flagged; every `rounded-*` removed or justified. Grep the migrated file for surviving `space-y-*`, `gap-*`, `p-*`, `m-*`, `rounded-*` and list any that remain.

## Flow mechanism note (fixed 2026-07-22)

Earlier, `flow-*` could not be applied to components with an `sr-only`/conditional first child (e.g. Callout's no-title state) because the owl selector `> * + *` counted the collapsed DOM sibling — double-spacing and injecting a phantom gap. `flow.cjs` now guards both ends of every owl pair with `:not(.sr-only, [hidden], template)`, so rhythm classifications can use the real `flow-*` class. Components migrated *before* this fix that fell back to numerically-identical `mb-*` (Callout) are correct as-is but can be revisited to use `flow-*` in a later pass. If a codebase uses a different collapse convention (`visually-hidden`, `[aria-hidden]` spacers), add it to the guard list in `flow.cjs`.

## Deferred items (raised during Callout test)

- **Construction-spacing value verification** — internal `p-*`/`gap-*` left as Tailwind this pass; a later pass checks the values are right and decides whether to bind them to `spacing.*` explicitly.
- **Callout size-prop drift** — Figma models Callout as a single size (panel-title/body); code has `sm/md/lg`. After migration the prop varies *density* (padding) only, not type size — which narrows the gap. Post-migration decision: Figma gains density variants, or code drops the size prop. Component-API change, not a token migration — out of scope here.
- **`border-l-[5px]` = branded accent (not an error)** — intentional brand element, correctly out of scope for a type/spacing/radius run. Follow-up: promote the arbitrary `[5px]` to a named token (e.g. a `border/brand-accent` width) so its intent is legible and future sweeps don't re-flag it as a stray value.
