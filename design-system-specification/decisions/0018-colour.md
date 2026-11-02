---
id: '0018'
title: Colour is chosen by role from semantic tokens that have a value for each mode
status: accepted
date: 2026-10-22
released-in: null
deciders: [Chris Knight, James Scott-Brown]
areas: [Colour]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Colour', 'Chart and map colours']
pr_url: ''
---

# 0018 — Colour

## Context

The spec lists colour in its scope, but no decision describes how colour tokens are chosen. The naming grammar is in [0002](./0002-token-naming-grammar.md) and data colour is in [0008](./0008-charts.md). The v4 export removed the `container` colour tokens and replaced them with `surface`, and components chose label colours on filled controls in different ways.

## Decision

- **Every semantic colour has a light and a dark value.** Light values are set on `:root` and dark values on `.dark`. A component that uses semantic tokens changes mode with no changes of its own.
- **Choose a token by the role of the element:** text, label, canvas, surface, border, interactive, inverse, static, data, chart or geo. The palette (`--color-palette-{hue}-{step}`) is not used in components. Its one use is a quantitative scale in a chart or map ([0008](./0008-charts.md)).
- **The canvas is the page background, and a surface is a card or panel on it.** The two have the same value in each mode. Elevation sets a surface apart from the canvas ([0011](./0011-elevation.md)). `--color-surface-muted` sets a region apart inside a surface.
- **Interactive tokens are chosen by intent, then emphasis, then state:** `--color-interactive-{intent}[-muted][-{state}]`. The intents are `primary`, `secondary`, `positive`, `negative` and `caution`. The states are `hover` and `active`. Focus has one colour for every intent ([0019](./0019-accessibility.md)).
- **Text and icons on a filled control use `--color-inverse-text`.** The exception is `primary`, whose fill stays dark in both modes, so its text uses `--color-static-white`.
- **Disabled text and icons use `--color-interactive-disabled`. A disabled fill uses `--color-interactive-disabled-muted`.**
- **Content on an inverse background uses the `inverse` tokens**, such as `--color-inverse-text` on `--color-inverse-surface`.
- **`static` colours don't change with the mode.** They are for the few places that must look the same in both: `--color-static-white`, `--color-static-black`, `--color-static-brand`, and the GLA brand hues as `--color-static-gla-{hue}`.
- **Charts use the `chart` and `data` tokens, and maps use the `geo` tokens.**

## Options considered

- **Semantic tokens with a value for each mode, chosen by role** (chosen)
- **Container colours for each level (`--color-container-level-{0..3}`).** Removed in v4. Level 0 becomes `surface`, and levels 1 to 3 become `surface-muted`. Elevation shows the level.
- **`static-white` on light fills and `inverse-text` on dark fills, set separately for each mode.** Not adopted. `--color-inverse-text` is white in light mode, so one token gives the same result.

## Consequences

- `Button.svelte` sets `text-color-static-white` with `dark:text-color-inverse-text` on the positive, negative and caution variants. Both can be replaced by `text-color-inverse-text`.
- In Figma, the positive, negative and caution button labels bind to `inverse/text`.
- The Tailwind preset exposes semantic tokens only. It stops adding the `seed` and `gla` primitives as colours. The GLA hues come back as semantic `static/gla/{hue}` variables added in Figma, so `color-static-gla-pink` and the other class names don't change.
