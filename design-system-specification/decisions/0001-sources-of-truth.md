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
amended-by: ['0013']
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

- **Figma leads design work.** New values and new thinking start in Figma, so a temporary mismatch between Figma and code is accepted.
- **Values flow from Figma to the spec.** Figma exports the variables, the build transforms them, and the spec's value tables are generated from the build. The tables are never edited by hand. The spec can be out of date after a change in Figma, and a rerun of the scripts fixes that, but it must never be silently wrong.
- **The ADRs and the spec are authoritative for the rules of typography, spacing, flow, grid and colour.** Their prose, which states intent and rules, is written by hand.
- **When Figma and the spec disagree, Figma wins on values and the spec wins on rules.** A Figma design that breaks a rule is either progression, which needs an ADR before the spec changes, or regression, which is fixed in Figma. A difference can also be accepted where matching Figma to code one to one makes no sense.
- **Code and Storybook are authoritative for tables and charts**, because they are behavioural and driven by data. Figma is representative, not a reimplementation.
