---
id: '0007'
title: Tables
status: accepted
date: 2026-10-01
released-in: null
deciders: [Chris Knight]
areas: [Tables]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0007 — Tables

## Context

Code is the source of truth for Tables ([0001](./0001-sources-of-truth.md)). Designers still need to compose tables in Figma without rebuilding the component there. The Figma tables need to be a kit that works the way the code does, and changes to it need to stay predictable.

_The following decisions relate to Figma_

## Decision

- **Figma tables are a kit, and code is authoritative.** The kit is built from cells, rows and header rows.
- **Cells have fixed widths, and everything above them hugs.** A width change shows straight away in the row and the table. Columns line up because the header and body cells use the same width.
- **The cell is the unit you swap.** Its renderer (text, number, boolean or mini-chart) is swapped in, and alignment belongs to the renderer.
- **Widths are xs 64, sm 88, md 120, lg 220, xl 300, or fill.** Fill is set on the instance. It is not a variant.

## Options considered

- **Rows that hug fixed-width cells** (chosen; recorded as "Approach A")

## Consequences

- To change the whole table, edit the `Table Row` and `Table Header Row` masters. Edits to an instance affect only that instance.
- The kit is housed in a "Table Kit" doc frame on the Tables page.
