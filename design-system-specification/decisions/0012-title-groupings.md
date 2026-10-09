---
id: '0012'
title: Title Groupings
status: accepted
date: 2026-10-05
released-in: null
deciders: [Chris Knight]
areas: [Typography]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0012 — Title Groupings

## Context

A title group consists of a stack: 'Eyebrow'(optional), 'Title', 'Subtitle' and we use this device throughout our designs, eg. on components such as Cards, Charts and Tables.

Because a card or a panel can contain another titled element, eg. a chart, or a pair of charts within a card, we need a strategy to avoid the titles clashing.

## Decision

- **Dominant and demoted treatments.** A title group on its own takes the dominant treatment: 'Eyebrow' (optional), 'Title', 'Subtitle'. When two or more title groups exist in the same component, one keeps the dominant treatment ('Title', 'Subtitle') and each competing group is demoted. A demoted group holds only an 'Eyebrow'.

## Consequences

- The titling hierarchy of nested, titled elements needs to be considered using this system.
