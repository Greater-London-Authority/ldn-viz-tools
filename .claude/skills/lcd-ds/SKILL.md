---
name: lcd-ds
description: >
  Operational guide to the London City Data Design System (lcd-ds) as implemented
  in this monorepo — typography roles, colour tokens, flow/vertical rhythm, the
  spacing scale, chart styling, the layout grid, token architecture/naming, and
  class migrations. Use whenever you touch design-system styling: picking or
  renaming a typography role (title-1..4, body, label, eyebrow, subtitle…),
  binding a colour token, wiring flow/coupling, choosing spacing, styling an
  Observable Plot chart, resolving a token via tokenNameToValue, migrating retired
  classes (typography-spacing-*, t-shirt roles), or reconciling code with the spec.
  Trigger on: "typography role", "prose/product/chart context", "flow", "coupling",
  "companion", "spacing scale", "colour token", "semantic token", "chart.surface",
  "tokenNameToValue", "design token", "retired class", "migrate to new system",
  "lcd-ds", "design system".
---

# London City Data Design System (lcd-ds)

The operational how-to for applying the design system **in this codebase**. The
authoritative source is the spec — this skill distills the rules you apply day to
day, pins the exact code anchors, and records gotchas the spec doesn't cover.
When rationale matters, follow the spec links.

**Source of truth (do not duplicate — read when you need the "why"):**

- `design-system-specification/design-system-specification.md` — the full spec
- `design-system-specification/DECISIONS.md` — dated changelog of rulings
- `design-system-specification/token-architecture-and-naming.md` — token names/tiers
- `design-system-specification/SPEC-CHANGE-PROTOCOL.md` — how to change the spec
- `packages/ui/src/lib/Typography.mdx` — the developer-facing typography guide

## The three rules that cut across everything

1. **Bind to a role/token, never a raw value.** Every piece of text has a job
   (a section head, an axis tick) and the system names it — pick the role and
   size/weight/leading arrive with it. Every colour is a semantic token. Never
   `text-3xl`, never a raw hex, never `--primitive-*` in authored code.
2. **Size, weight, and colour are three orthogonal axes.** A "subtle heading" is
   a heading in a muted colour; an "emphasised caption" is Caption + `.text-strong`.
   Don't invent a size to express weight or colour. (Extending: read `references/tokens.md`.)
3. **Rhythm is a property of context, not of type.** Spacing between blocks comes
   from a `flow` context, not from margins bundled onto a role. (See `references/flow.md`.)

## Router — read the reference(s) for the task

| Working on…                                                                                                                                  | Read                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Picking/renaming a type role, the title ladder, companion coupling (eyebrow/subtitle/subhead)                                                | `references/typography.md` (+ `references/flow.md` for coupling) |
| Colour: binding a token, interactive/status/inverse, data colours                                                                            | `references/colour.md`                                           |
| Vertical rhythm, the owl rule, coupling, contexts (prose/product/compact)                                                                    | `references/flow.md`                                             |
| Margins/padding/gaps, the numbered scale, retired t-shirt scale                                                                              | `references/spacing.md`                                          |
| Styling an Observable Plot chart, chart roles, `tokenNameToValue` in charts                                                                  | `references/charts.md`                                           |
| Column grids, gutters, container padding, contained vs fluid                                                                                 | `references/layout-grid.md`                                      |
| Token tiers, naming, primitive→semantic aliasing, adding a role, `tokenNameToValue`                                                          | `references/tokens.md`                                           |
| Migrating a **component's** raw Tailwind (`text-*`/`space-*`/`p-*`/`rounded-*`) → roles + flow (function-first, rhythm-vs-construction gate) | `references/component-migration.md`                              |
| Sweeping a **package/app** off already-retired classes/tokens to the new system                                                              | `references/migration.md`                                        |

Most tasks need two files (e.g. chart colour = `charts.md` + `colour.md`;
type spacing = `typography.md` + `flow.md`). Read what the router points to
rather than guessing from memory — the details are exacting.

## Where it lives in code (shared anchors)

- **Tailwind plugin (roles, contexts, flow, semantics, responsive):**
  `packages/themes/tailwind-custom/typography/*.cjs` — consumed **from source**
  via `packages/themes/ldn-theme.cjs` (a workspace symlink). Edits are live from
  source, but **restart the dev/Storybook server** — Tailwind reads its config at load.
- **Emitted CSS:** `packages/themes/styles/*.css` (`typography.css`, `flow.css`,
  `spacing.css`, `grid-spacing.css`, `light.css`, `dark.css`).
- **Emitted token JS:** `packages/themes/styles/js/color-tokens.js`,
  `packages/themes/styles/tw-extend/*.cjs`.
- **Token source + build:** `packages/themes/tokens/design-tokens.tokens.json`,
  `packages/themes/sd.config.json`, `packages/themes/sd.build.js` (Style Dictionary).
- **Runtime token lookup:** `packages/utils/src/colors/tokenNameToValue.ts`;
  `theme.tokenNameToValue(...)` / `theme.currentTheme` in
  `packages/ui/src/lib/theme/themeState.svelte.ts`.

## Build/consumption gotcha (bites often)

`@ldn-viz/{charts,ui,utils}` are consumed via their **built `dist/`** (`svelte`/
`module` fields). If you edit source in one of those packages, **rebuild it**
(`npm run build -w @ldn-viz/<pkg>`) or downstream consumers (and the other apps'
Storybook) keep seeing the old code. Build order follows the dep graph:
`utils` → `charts`/`ui`. The `themes` tailwind plugin is the exception — source-consumed.
