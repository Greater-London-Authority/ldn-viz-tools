---
id: '0008'
title: Charts
status: accepted
date: 2026-10-01
released-in: null
deciders: [Chris Knight]
areas: [Charts]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0008 — Charts

## Context

Code is the source of truth for Charts ([0001](./0001-sources-of-truth.md)). Charts are drawn with Observable Plot. Where it is not possible to generate a desired chart in Observable Plot, D3 is used as a lower-level library.

Figma variables cannot bind shapes to data, so a Figma chart is only an illustrative example of a particular chart type.

Charts also arrive from outside the system, such as SVG exports.

The guidance on data colour was written in the docs site's data visualisation pages and copied into the spec, with no decision behind it.

## Decision

- **Observable Plot or D3 draws real charts. Figma charts are representative.** They are built to look right, not to be accurate to the data.
- **`ChartContainer` is fixed chrome around a slot.** It has a header (title, with an optional eyebrow, subtitle and hint), a `Content` slot, and actions such as download and export. The hint is an optional Svelte slot for a hint/overlay component, not a typography role.
- **The designer composes what goes in the slot for each chart.** The legend, plot and footer (notes and citation) are not built into the container or into the plot.
- **Category and x-axis labels sit below the baseline.** Y-axis ticks sit to the left of the plot.
- **A chart is on-system when its text uses the product typeset roles or the usage aliases, and its colours use `data/*` and `chart/*` tokens, or the palette ramps for a quantitative scale.** Both are valid for chart text ([0003](./0003-typography.md)).
- **Series take the data roles in order:** `--color-data-primary`, `--color-data-secondary`, then `--color-data-tertiary`. In light mode they are categorical blue, dark pink and orange. In dark mode they are cyan, pink and orange. Each role has a value for each mode, so a chart switches without changes.
- **To highlight one series, set it in `--color-data-primary` and the rest in `--color-data-context`.** Context is grey.
- **A chart uses no more than three categorical colours.** A chart that needs colours beyond the three series roles takes them from `--color-data-categorical-{hue}`, choosing hues with the most contrast against the background. Where more categories need telling apart, use labels, line styles or small multiples.
- **Common encodings have their own roles:**
  - `--color-data-positive` (blue) and `--color-data-negative` (red), for diverging data such as opinion, and for good and bad. Blue and red avoid the red–green pair that many readers can't tell apart.
  - `--color-data-neutral-0` for "neither" and `--color-data-neutral-1` for "don't know".
  - `--color-data-male` (green) and `--color-data-female` (purple), for sex in demographic data.
  - `--color-data-empty`, for missing or filtered-out data.
- **Quantitative scales are built from the palette ramps. There are no scale tokens.** A sequential scale uses up to five steps of one hue, `--color-palette-blue-{step}` by default, with the higher value on the higher step. Palette steps rise in contrast against the background in both modes, so the scale reverses in dark mode without changes. A diverging scale uses the red ramp for negative values and the blue ramp for positive values, and can add a grey step for values that are exactly zero. A scale that needs more than one hue uses an established perceptually even ramp, such as viridis.
- **Chart chrome uses the `chart` tokens:** `--color-chart-surface`, `--color-chart-axis`, `--color-chart-grid`, `--color-chart-label` and `--color-chart-label-muted`.

## Options considered

- **A fixed container with a slot that is composed for each chart** (chosen)
- **Green for positive and red for negative.** Not adopted, because many readers can't tell red from green.
- **Tokens for each step of a sequential and diverging scale.** Not adopted for now. The palette ramps already change with the mode, and a chart chooses how many steps it needs.

## Consequences

- Figma chart kits are edited by resizing, editing labels, swapping colours and duplicating parts. Bars are sized by resizing them, not by calculating from data. Kits exist for bar (padded bar model), line, area, slope and donut charts.
- Imported SVG charts arrive with unstyled live text and hard-coded hex values. Both have to be rebound before the chart is on-system.
- The docs pages name `color-data-good` and `color-data-bad`, which don't exist. They are `--color-data-positive` and `--color-data-negative`.
