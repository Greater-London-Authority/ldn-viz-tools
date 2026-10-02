---
id: '0001'
title: Sources of truth
status: accepted
date: 2026-09-30
released-in: null
deciders: [Chris Knight]
areas: []
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0001 — Sources of truth

## Context

Establishing where the source of truth lies allows decisions to flow consistently and for drift to be easily identified.

Figma is the frontier; development, discussion and ideation happen there. This means that there can be some temporary mismatch between Figma and code.
The trade off is that discrepancies between figma and code need to be assessed as either new work: progression, or drift: regression. A third option is that the difference is accepted because a 1:1 figma <-> code structural match does not make sense.

Figma outputs the raw design tokens from variables, that are then transformed by the style dictionary pipeline.

The spec remains the source of truth until new thinking or values are released from Figma.

## Decision

- Figma file: "Design System ver 3.1" (was "3.0 Agent Enhanced"). Dynamic-page file. Desktop Bridge on port 9223.

- Figma leads the typography and colour cutover ahead of the repo. Temporary Figma↔code mismatch is accepted.

- Figma-only sessions have no repo access. Nothing decided in one is verified against emitted output until a rebuild.

- Spec is authoritative for typography, spacing, flow, grid and colour — design-system-specification.md.

- Code/Storybook is authoritative for tables and charts (behavioural, data-driven). Figma is representative, not a reimplementation.

- The spec is downstream of the build. Value tables are generated from emitted styles/; only intent and rationale prose is hand-written. The spec may be out of date against a change from figma, a rerun fixes that, but it must never be silently wrong.
