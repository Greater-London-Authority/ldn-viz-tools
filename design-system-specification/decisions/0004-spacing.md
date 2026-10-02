---
id: '0004'
title: Spacing
status: accepted
date: 2026-10-01
released-in: null
deciders: [Chris Knight]
areas: [Spacing]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0004 — Spacing

## Context

Space in a layout does one of two jobs. It builds a component: padding, list indents, cell padding. Or it sets the rhythm between blocks of content. Before this decision both jobs drew on a mix of sources: a numbered scale, t-shirt sizes (`--spacing-md`) and typography-owned spacing (`--typography-spacing-*`). The same gap was written several ways, and nothing showed which job a value was doing.

## Decision

- **Decide the job first.** Space that builds a component, such as padding, borders or indents, uses the spacing scale. Space between blocks of content uses flow ([0005](./0005-flow.md)).
- **Use `--spacing-{n}`, never the primitive.**
- **There is one scale, numbered in 4px steps.** `--spacing-4` is 16px. There are no named spacing sets apart from flow and grid.

## Options considered

- **One numbered scale, with rhythm handled separately by flow** (chosen)
- **T-shirt sizes (`xs`–`lg`).** Retired. The names hid the value, so they gave no help when matching a design, and they did not separate construction from rhythm.
- **Typography-owned spacing (`--typography-spacing-*`).** Retired. It tied space to type roles, which made each role answer for layout as well as type ([0003](./0003-typography.md): typography sets type, not space).
- **Named spacing roles per component.** Not adopted. They would grow into a component-scoped token set, which [0002](./0002-token-naming-grammar.md) rules out.

## Consequences

- T-shirt spacing (`--spacing-md`) and `--typography-spacing-*` are retired. Map any that remain by size: `xxs`→1, `xs`→2, `sm`→3, `md`→4, `lg`→5, and so on.
- Each `--spacing-{n}` is a plain `var()` reference to `--primitive-spacing-{n}`.
- ⚠ **The spacing primitive must stay in px in the token graph.** Flow, spacing and grid tokens all divide it by 16 to get rem. Changing it to rem breaks all three without an error.
