---
id: '0020'
title: Text has two emphasis levels, and text-wash is deprecated with its inverse counterpart
status: proposed
date: 2026-11-04
released-in: null
deciders: [Chris Knight]
areas: [Colour, Accessibility]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Colour']
pr_url: ''
---

# 0020 — Text emphasis

## Context

Version 4 has three text tokens: `--color-text`, `--color-text-muted` and `--color-text-wash`. In light mode, `--color-text-wash` (grey 600, `#757c80`) is 4.24:1 on `--color-surface` and 3.75:1 on `--color-surface-muted`, below the 4.5:1 that [0019](./0019-accessibility.md) sets for text. The first grey step that passes is grey 700, the value of `--color-text-muted`. In dark mode, `--color-text-wash` is lighter than `--color-text-muted`, so it gives more emphasis. `--color-inverse-text-wash` is also lighter than `--color-inverse-text-muted` in both modes.

## Decision

- **Text has two emphasis levels, `--color-text` and `--color-text-muted`.** Placeholders and other secondary text use `--color-text-muted`.
- **Every `--color-inverse-*` token has a base counterpart, and the two are added, changed and removed together.**
- **`--color-text-wash` and `--color-inverse-text-wash` are deprecated.** Each has the value of its `muted` counterpart until both are removed in version 5.

A third level that passes 4.5:1 would sit between 4.5:1 and the 5.83:1 of `--color-text-muted`. A placeholder in `--color-text-muted` is still distinct from a typed value, which uses `--color-text`.

## Options considered

- **Two levels, with `text-wash` deprecated** (chosen)
- **Keep `text-wash` and set it to a value between grey 600 and grey 700.** Not adopted. The value would need a new primitive, and its contrast would fall between 4.5:1 and the 5.83:1 of `--color-text-muted`.
- **Remove `text-wash` now.** Not adopted. Version 4 has been released with the token, so removing it would break consumers that use it.

## Consequences

- In Figma, `text-wash` and `inverse/text-wash` alias `text-muted` and `inverse/text-muted` in both modes. Every other node is bound to `text-muted` or `inverse/text-muted`, apart from the swatches of the deprecated tokens on the Design Tokens page.
- Input, Geocoder and Select placeholders, the placeholder rule in `forms.css` and `reset.js`, and level 4 of the navigation menu use `--color-text-muted`.
- In dark mode, `--color-inverse-text-muted` is 3.96:1 on `--color-inverse-surface-muted`. This decision doesn't change that, and it is recorded in `SNAGS.md`.
