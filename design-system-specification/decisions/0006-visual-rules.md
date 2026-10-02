---
id: '0006'
title: Visual rules
status: accepted
date: 2026-10-01
released-in: null
deciders: [Chris Knight]
areas: [Visual]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0006 — Visual rules

## Context

A few visual rules apply to every component, in every context, in both Figma and code. They are too general to sit under any one foundation, so they are recorded together.

## Decision

- **Corners are square.** The radius is 0 everywhere. Only things that are genuinely round, such as a circular avatar or a dot, are round. Bars, cards, cells, buttons, inputs and containers never are.

## Options considered

- **Square corners everywhere** (chosen)

## Consequences

- Any rounded corner on a bar, card, cell, button, input or container is drift and should be fixed.
