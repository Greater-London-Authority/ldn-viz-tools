---
id: '0014'
title: Custom properties are the public surface, published through an exports map
status: proposed
date: 2026-10-15
released-in: null
deciders: [Chris Knight]
areas: [tokens]
breaking: true
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Scope', 'Development']
pr_url: ''
---

# 0014 — Distribution and outputs

## Context

`@ldn-viz/themes` emitted nine CSS files, four Tailwind extension files, a JavaScript module and a docs module, all imported by path. A full set-up imported the nine CSS files in a set order and then added the Tailwind preset. The file split followed the pipeline's internals, not a choice a consumer makes. The specification promises use outside Tailwind (_Scope_), but the classes it names were only available as Tailwind plugins. Proposed in [RFC 0003](../rfcs/0003-v4-token-pipeline-and-outputs.md), workstreams 2 and 5.

## Decision

- **CSS custom properties are the single public surface of the system.** Every other output is either a window onto them or an export of their resolved values.
- **The package publishes named outputs through a `package.json` `exports` map, and only the paths it lists can be imported.**

  | Output                  | Contains                                                  | Kind         |
  | ----------------------- | --------------------------------------------------------- | ------------ |
  | `reset.css`             | Element defaults at zero specificity                      | Base         |
  | `tokens.css`            | Every custom property; light on `:root`, dark on `.dark`  | Source       |
  | `system.css`            | Every class the specification names                       | Window       |
  | `index.css`             | Imports `reset.css`, `tokens.css` and `system.css`        | Convenience  |
  | `tailwind`              | The Tailwind preset                                       | Window       |
  | `colors.js`             | Resolved colour values for light and dark                 | Value export |
  | `scss`                  | Sass variables and maps with resolved values              | Value export |
  | `docs/tokens/tokens.js` | Every token with its metadata, for the documentation site | Value export |

- **Three set-ups match the specification's tiers:** the full system (`index.css`, plus the preset with Tailwind), tokens only (`tokens.css`) and values only (`colors.js` or `scss`).
- **Typography and flow are not split into separate files**, because a typeset class turns on a flow context, so their selectors have to be imported together.
- **Old paths are not kept.** The release that introduces this map removes them, and a migration table maps every published path to its replacement.

## Options considered

- **Named outputs behind an exports map, old paths removed** (chosen).
- **Keep the per-category files.** Rejected: they mirror the pipeline, not a consumer's choice, and they need imports in a set order.
- **Keep the old paths as deprecated entries until the next major.** Rejected in favour of one break with a complete migration table.

## Consequences

- A major release of `@ldn-viz/themes`. Consumers replace their imports and the renamed properties using `packages/themes/MIGRATION.md`.
- Any deep import the map doesn't list, including `styles/*`, `ldn-theme.cjs` and `tailwind-custom/*`, stops resolving.
