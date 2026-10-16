---
id: '0016'
title: Flow rules and utilities are generated into system.css, and a context's ramp is set on its children
status: proposed
date: 2026-10-16
released-in: null
deciders: [Chris Knight]
areas: [Flow, Spacing]
breaking: true
supersedes: []
superseded-by: null
amends: ['0005']
amended-by: []
spec: ['Flow']
pr_url: ''
---

# 0016 — Flow in system.css

## Context

[0005](./0005-flow.md) places the flow context classes in `flow.css`, the spacing rules in `tailwind-custom/flow/flow.cjs` and the `mt-flow-*` and `gap-flow-*` utilities in `tw-extend/flow.cjs`. [0015](./0015-system-classes.md) moves every class into a generated `system.css`. Testing the generated rules on a page without Tailwind showed two behaviours the Tailwind version depended on without stating: preflight had zeroed browser margins, and a nested context's own top margin had read the nested ramp rather than its parent's. Proposed in [RFC 0003](../rfcs/0003-v4-token-pipeline-and-outputs.md), workstream 3.

## Decision

This amends the consequences of 0005. Its rules stand.

- **The context classes, the flow rules and the `mt-flow-*` and `gap-flow-*` utilities are generated into `system.css`.** The values stay in `tokens.css`.
- **`typeset-longform` sets the flow context as well as the typeset; a flow context never sets a typeset.** A container with `typeset-longform` gets both longform type and `flow-spacious` spacing, so every flow selector that names `.flow-spacious` also names `.typeset-longform`. A container with `flow-spacious` (or any flow context) gets spacing only, and its text keeps the typeset it is in. Flow can be set independently of typography.
- **A context sets its ramp on its children, not on itself.** A nested context is a child of the outer one, so the space above it comes from the outer ramp, and only its own children take the new density. Descendants inherit from the child they sit in, so a utility anywhere in the subtree resolves against the nearest context.
- **Flow owns the block margins of its children.** Each child's margins are set to zero at zero specificity (`:where()`), so a browser margin cannot collapse with a flow margin and swallow a smaller step, and any class still wins.

## Options considered

- **Ramp on the children, margins zeroed by flow** (chosen).
- **Ramp on the context element.** Rejected: a nested context's own top margin then reads its own ramp, so a compact panel inside spacious content sits too close to its neighbours.
- **Rely on Tailwind's preflight to zero margins.** Rejected: the classes must work without Tailwind ([0015](./0015-system-classes.md)).

## Consequences

- `tailwind-custom/flow/` and `tw-extend/flow.cjs` are removed. The Tailwind preset no longer defines flow spacing, so `mt-flow-*` and `gap-flow-*` come only from `system.css`.
- Tailwind variants of the flow utilities (`md:mt-flow-loose`) no longer exist.
- `--flow-tight`, `--flow-default`, `--flow-loose` and `--flow-section` are still set on `:root` (pointing at standard), so a utility outside any context resolves.
