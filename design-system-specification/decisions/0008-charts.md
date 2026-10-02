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

Code is the source of truth for Charts ([0001](./0001-sources-of-truth.md)). Charts are drawn with Observable Plot.

Figma variables cannot bind shapes to data, so a Figma chart can only show what a chart looks like.

Charts also arrive from outside the system, such as SVG exports.

## Decision

- **Observable Plot draws real charts. Figma charts are representative.** They are built to look right, not to be accurate to the data.
- **`ChartContainer` is fixed chrome around a slot.** It has a header (title, with an optional eyebrow, subtitle and hint), a `Content` slot, and actions such as download and export.
- **The designer composes what goes in the slot for each chart.** The legend, plot and footer (notes and citation) are not built into the container or into the plot.
- **Category and x-axis labels sit below the baseline.** Y-axis ticks sit to the left of the plot.
- **A chart is on-system when its text uses `Chart/*` roles and its colours use `data/*` and `chart/*` tokens.**

## Options considered

- **A fixed container with a slot that is composed for each chart** (chosen)

## Consequences

- Figma chart kits are edited by resizing, editing labels, swapping colours and duplicating parts. Bars are sized by resizing them, not by calculating from data. Kits exist for bar (padded bar model), line, area, slope and donut charts.
- Imported SVG charts arrive with unstyled live text and hard-coded hex values. Both have to be rebound before the chart is on-system.
