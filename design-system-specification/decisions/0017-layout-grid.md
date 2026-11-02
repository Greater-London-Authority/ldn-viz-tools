---
id: '0017'
title: Pages use a contained or a fluid layout, with padding set by breakpoint and flow between blocks
status: accepted
date: 2026-10-22
released-in: null
deciders: [Chris Knight, James Scott-Brown]
areas: [Layout grid, Spacing]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Layout grid']
pr_url: ''
---

# 0017 — Layout grid

## Context

The spec lists the layout grid in its scope, but no decision describes it. The build has 24 grid tokens, `--grid-{breakpoint}-{layout}-{container-padding|gutter}`, the `.container-fluid`, `.grid-gutter` and `.grid-gutter-fluid` classes in `system.css`, and a contained layout that exists only as Tailwind's `container` in the preset. A team without Tailwind can't use the contained layout, although [0015](./0015-system-classes.md) puts every named class in `system.css`.

## Decision

- **A page uses one of two layouts.**
  - **Contained** is for document-like pages, such as articles, documentation and forms. Its width steps up with the breakpoints, it is centred, and its padding grows with the viewport.
  - **Fluid** is for dashboards and application shells. It fills the width of the viewport, and its padding stays between 16px and 24px.
- **The container's padding sets the page edge.** Components don't add their own padding at the page edge. A component's own padding comes from the spacing scale ([0004](./0004-spacing.md)), whatever layout it sits in.
- **Container padding is set for each breakpoint and layout** by `--grid-{breakpoint}-{contained|fluid}-container-padding`, from `base` to `2xl`. The spec's table of values is generated from the build.
- **Space between tiled blocks, such as cards or panels, is the flow step of the context**: `gap-flow` on the grid or flex container ([0005](./0005-flow.md)). A row of cards and a stack of cards then have the same space between them, and both follow the density of the context. There are no gutter tokens or classes.
- **There are no column tokens.** Columns are set with CSS grid, or Tailwind's grid utilities, on each page.
- **Every layout class is in `system.css`.** `.container` is generated there alongside `.container-fluid`, so the contained layout works without Tailwind.

## Options considered

- **Two layouts, with padding tokens for each breakpoint, and flow between blocks in both directions** (chosen)
- **Gutter tokens and classes for each breakpoint and layout** (`.grid-gutter`, `.grid-gutter-fluid`). Adopted first, then replaced on 22 October 2026. The gutter was a different value from the flow step, so cards in a row and cards in a stack were spaced differently, and the classes did the job `gap-flow` already does.
- **Context-named gap classes** (`gap-standard`, `gap-spacious`, `gap-compact`). Not adopted. They name a density, which the flow utilities never do ([0002](./0002-token-naming-grammar.md)), so a grid moved into a compact panel would keep a standard gap.
- **`gap-{n}` utilities between tiled blocks.** Not adopted. A fixed gap doesn't follow the context.
- **Column-count tokens.** Not adopted. The number of columns depends on the content of each page.
- **Keeping the contained layout in the Tailwind preset only.** Not adopted, because it breaks [0015](./0015-system-classes.md).

## Consequences

- `.container` is generated into `system.css`. The preset's `container` sets padding only and doesn't centre the container, so the generated class adds `margin-inline: auto` to match `.container-fluid`.
- Card grids use `gap-flow`. In a standard context that is 8px, where the fluid gutter was 16px, so dashboards with card grids need a visual review.
- The gutter variables are removed from Figma. Layout-grid gutters and the gaps between tiled frames bind the default flow step of their context: `spacious/default` on longform pages and `standard/default` on product screens.
- The docs layout page describes column counts that are not in the build, and need checking.
