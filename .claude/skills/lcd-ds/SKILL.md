---
name: lcd-ds
description: >
  How to apply the London City Data Design System (lcd-ds) in this repo:
  typesets and roles, flow, spacing, elevation, the layout grid, colour tokens,
  chart and table styling, token names, and migrating v3 classes and tokens to
  v4. Use when styling a component or page, choosing a class or token, reading
  or changing packages/themes, or checking code against the specification.
---

# lcd-ds

The design system is a set of CSS custom properties and the classes built on them. Values come from Figma, and Style Dictionary turns them into the files in `packages/themes/styles/`.

The specification is [design-system-specification.md](../../../design-system-specification/design-system-specification.md). Decisions and their reasons are in [decisions/](../../../design-system-specification/decisions/), summarised in [RULES.md](../../../design-system-specification/RULES.md). Where this skill and the build disagree, the build is right and this skill needs fixing.

## Outputs

| File | Contents |
| --- | --- |
| `reset.css` | Element defaults at zero specificity, for apps without Tailwind's preflight |
| `tokens.css` | Every custom property. Light mode on `:root`, dark on `.dark` |
| `system.css` | Every class the spec names: typesets, roles, usage aliases, flow, measure, content styles, forms, emphasis, elevation, layout and focus styles |
| `index.css` | Imports `reset.css`, `tokens.css` and `system.css`, in that order |
| `tailwind.cjs` | The Tailwind preset, imported as `@ldn-viz/themes/tailwind`. It maps Tailwind's theme onto the custom properties and adds no classes. It empties Tailwind's font sizes, weights and line heights, so `text-sm`, `font-bold` and `leading-*` produce nothing |
| `colors.js` | Resolved colour values, as `mode.light` and `mode.dark` |
| `tokens.scss` | Every custom property as a Sass `!default` variable with its resolved value, plus `$modes`, `$breakpoints`, `$typography` and `$grid` maps. Not used in this repo |
| `tokens.json` | Every token with its value, for tooling. Not published |

An app imports `@ldn-viz/themes/index.css`. A Tailwind app also uses the preset, and imports `index.css` before the `@tailwind` directives so a utility wins over a system class.

## Styling something

Make these choices in order:

| Choice | Example | Reference |
| --- | --- | --- |
| Typeset, set once on a container: longform for reading, product for interfaces | `typeset-longform`, `typeset-product` | [typography.md](references/typography.md) |
| Role, chosen for what the text does | `title-md`, `body-sm` | [typography.md](references/typography.md) |
| Flow, for the space between blocks | `flow-standard`, `mt-flow-loose` | [flow.md](references/flow.md) |
| Spacing, for the space inside a component | `--spacing-4`, `p-4` | [spacing.md](references/spacing.md) |
| Colour, from a semantic token | `--color-text-muted`, `bg-color-surface` | [colour.md](references/colour.md) |

## References

The references follow the order of the specification.

| File | Covers |
| --- | --- |
| [tokens.md](references/tokens.md) | Token tiers, the naming grammar, usage aliases as a concept |
| [typography.md](references/typography.md) | Typesets, roles, sizes, emphasis, usage aliases, title groups, measure, content styles |
| [spacing.md](references/spacing.md) | The spacing scale, and when to use spacing or flow |
| [flow.md](references/flow.md) | Flow contexts, steps, the rules that assign steps, utilities |
| [elevation.md](references/elevation.md) | Elevation classes, shadows, square corners |
| [layout-grid.md](references/layout-grid.md) | Grid tokens, container padding, gutters |
| [colour.md](references/colour.md) | Semantic colour groups, interactive tokens, colour in JavaScript |
| [charts-and-tables.md](references/charts-and-tables.md) | `ChartContainer`, chart text, Plot defaults, tables |
| [migration.md](references/migration.md) | v3 to v4 mappings for imports, tokens and classes |

## Code anchors

| What | Where |
| --- | --- |
| Token source (Figma export) | `packages/themes/tokens/lcd-ds.tokens.json`, `lcd-ds-usage.tokens.json` |
| Build entry | `packages/themes/sd.build.js`, run by `npm run build-tokens` in `packages/themes` |
| Every class name | `packages/themes/sd/system.config.js` |
| Class generator | `packages/themes/sd/system.js` |
| Content styles (hand-written) | `packages/themes/sd/content.css`, scoped by `sd/content.js` |
| Form styles (hand-written) | `packages/themes/sd/forms.css`, checked by `sd/forms.js` |
| Usage aliases | `packages/themes/sd/usage.js` |
| Tailwind preset | `packages/themes/sd/tailwind.js` |
| Colour lookup in JavaScript | `packages/utils/src/colors/tokenNameToValue.ts`, used through `theme.tokenNameToValue()` in `packages/ui/src/lib/theme/themeState.svelte.ts` |

`styles/` is gitignored. Build it before reading it.

## Build and check

```sh
npm run build-tokens -w @ldn-viz/themes
python3 design-system-specification/scripts/verify_build.py
python3 design-system-specification/scripts/gen_spec.py --check
python3 design-system-specification/scripts/check_spec.py
python3 design-system-specification/scripts/adr_check.py
```

`check_spec.py` checks the build against the spec, and checks that every class and token named in RULES.md exists. To change the spec, follow [SPEC-CHANGE-PROTOCOL.md](../../../design-system-specification/governance/SPEC-CHANGE-PROTOCOL.md).

`@ldn-viz/ui`, `charts`, `maps`, `tables` and `utils` are imported from their built `dist/`. After editing one, rebuild it with `npm run build -w @ldn-viz/<package>` (`utils` first) or other packages see the old code.

## Accessibility

The spec has no Accessibility section yet. The build has one accessibility feature: a focus outline on every focusable element, set in the Base section of `system.css` from `--color-interactive-focus`. An element can change it with `--outline-size`, `--outline-style`, `--outline-color` and `--outline-offset`.

## Not implemented

The spec or ADRs describe these, and the build doesn't have them or doesn't enforce them.

| Described | Source | In the build |
| --- | --- | --- |
| Layout grid, Colour and Accessibility sections | Spec scope | No section or ADR. [layout-grid.md](references/layout-grid.md) and [colour.md](references/colour.md) describe the build |
| Square corners | [0006](../../../design-system-specification/decisions/0006-visual-rules.md) | Not enforced: the preset keeps Tailwind's `rounded-*` for things that are round |
| Semantic tokens only | [0002](../../../design-system-specification/decisions/0002-token-naming-grammar.md) | Not enforced: SVG text in some table renderers, deck.gl cluster labels and Plot options in chart stories set sizes and weights directly |

## Names after the design review

The structure and naming of typesets, roles, flow contexts and steps are set by the spec. RFC 0002's design review may change a few of the v3 to v4 mappings in [migration.md](references/migration.md), and a later Figma export may add usage aliases.
