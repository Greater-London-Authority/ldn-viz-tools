---
id: '0017'
title: Pages use a contained or a fluid layout, with padding and gutters set by breakpoint
status: proposed
date: 2026-10-21
released-in: null
deciders: [Chris Knight, James Scott-Brown]
areas: [Layout grid, Spacing]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
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
- **Padding and gutter are set for each breakpoint and layout** by `--grid-{breakpoint}-{contained|fluid}-{container-padding|gutter}`, from `base` to `2xl`. The spec's table of values is generated from the build.
- **Space between tiled blocks, such as cards or panels, is a gutter class**: `.grid-gutter` in a contained layout and `.grid-gutter-fluid` in a fluid one. A `gap-{n}` utility doesn't follow the breakpoints, so it matches the gutter at only some of them.
- **There are no column tokens.** Columns are set with CSS grid, or Tailwind's grid utilities, on each page.
- **The grid places blocks horizontally.** Vertical space between blocks is flow ([0005](./0005-flow.md)).
- **Every layout class is in `system.css`.** `.container` is generated there alongside `.container-fluid`, so the contained layout works without Tailwind.

## Options considered

- **Two layouts, with padding and gutter tokens for each breakpoint** (chosen)
- **`gap-{n}` utilities between tiled blocks.** Not adopted. `gap-4` matches the fluid gutter, but not the contained gutter from `sm` up.
- **Column-count tokens.** Not adopted. The number of columns depends on the content of each page.
- **Keeping the contained layout in the Tailwind preset only.** Not adopted, because it breaks [0015](./0015-system-classes.md).

## Consequences

- `.container` is generated into `system.css`. The preset's `container` sets padding only and doesn't centre the container, so the generated class adds `margin-inline: auto` to match `.container-fluid`.
- Card grids that use `gap-4` change from `sm` up when they move to `.grid-gutter`, and need a visual review.
- The docs layout page describes column counts that are not in the build, and need checking.
