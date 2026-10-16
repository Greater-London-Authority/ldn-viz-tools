---
id: '0011'
title: Elevation
status: accepted
date: 2026-10-05
released-in: null
deciders: [Chris Knight]
areas: [Elevation]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0011 — Elevation

## Context

Applications are represented by a conceptual 'stack' of elements, with `canvas` being at the base, then `surface`(s) at different levels of elevation. Different levels of elevation are created visually by including shadows of different size and spread on UI elements. The concept is similar to that of a z-index, but the two are not explicitly tied.

## Decision

- **An elevation class adds a corresponding shadow.**
- **Elevation runs on a numbered scale from 0 to 6.** `elevation-0` is 'on the canvas' and has no visual effect. `elevation-1` through `elevation-6` raise elements up off the canvas step by step.
- **Elevation is visual, z-index is architectural.**

## Options considered

- **Elevation is applied using a shadow class** (rejected) Shadows are of a random size value. Elevation is explicit in intent.

## Consequences

- `elevation-1` should be used instead of `shadow-sm`. Shadow tokens are still emitted, but stepped elevation is always expressed with an elevation class.
- Container colours (`--color-container-level-*`) are deprecated in favour of `surface`.
