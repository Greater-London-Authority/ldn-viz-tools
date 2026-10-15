---
id: '0013'
title: The Figma export is normalised once, before any filtering
status: proposed
date: 2026-10-15
released-in: null
deciders: [Chris Knight]
areas: [tokens]
breaking: true
supersedes: []
superseded-by: null
amends: ['0001']
amended-by: []
spec: ['Development', 'Token naming grammar']
pr_url: ''
---

# 0013 — Token export and parsing

## Context

The version 4 Figma export, `lcd-ds.tokens.json`, replaces `design-tokens.tokens.json`. Its collection names, mode structure and shadow tokens differ from the old export. Every alias also carries the mode of the collection it was exported from, as in `{primitive.xl.typography.scale.14}`. The old pipeline chose shadows by excluding every other category, and it would have dropped or mis-grouped tokens from the new export. Proposed in [RFC 0003](../rfcs/0003-v4-token-pipeline-and-outputs.md), workstream 1.

## Decision

- **The token source is `packages/themes/tokens/lcd-ds.tokens.json`, taken as Figma exports it.**
- **The export is normalised in one step before Style Dictionary filters or formats any token.** Keys are kebab-cased, the `semantic-` collection prefix is dropped, the export mode is stripped from references into `primitive` whatever the mode is called, and multi-layer shadows become one shadow token.
- **Emitted names follow the naming grammar ([0002](./0002-token-naming-grammar.md)).** Colour modes move from the name to the selector, and a trailing `default` is dropped from semantic tokens but kept on primitives.
- **Filters select tokens by type and path**, not by excluding other categories.
- **Units are set by one transform keyed on path.** Font weights stay unitless, breakpoints become `px` and every other dimension becomes `rem`.
- **Tests check that every reference resolves, and that every emitted name is unique and follows the grammar.**

All of the export's quirks are handled in one place, so every later step can assume the grammar. The step handles any mode name, so a new mode in Figma doesn't break the build.

## Options considered

- **Normalise once, then filter by type** (chosen).
- **Patch the old filters to the new shape.** Rejected because it keeps the exclusion-list approach that caused the shadow problems.
- **Change the export in Figma to suit the pipeline.** Rejected: the export is taken as it is, and fixes needed on the Figma side are raised separately.

## Consequences

- Several custom properties are renamed, for example `--grid-spacing-*` becomes `--grid-*`, and `--flow-prose-*` becomes `--flow-spacious-*`. The full list is in `packages/themes/MIGRATION.md`.
- The pipeline depends on Figma exporting every mode. A partial export builds without error but drops light mode or breakpoints.
- The normaliser is `packages/themes/sd/normalise.js`, and its tests are in `normalise.test.js` beside it.
