---
id: '0012'
title: Title Groupings
status: accepted
date: 2026-10-05
released-in: null
deciders: [Chris Knight, James Scott-Brown]
areas: [Typography]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Title groups', 'Which step each child takes']
pr_url: ''
---

# 0012 — Title Groupings

## Context

A title group consists of a stack: 'Eyebrow'(optional), 'Title', 'Subtitle' and we use this device throughout our designs, eg. on components such as Cards, Charts and Tables.

Because a card or a panel can contain another titled element, eg. a chart, or a pair of charts within a card, we need a strategy to avoid the titles clashing.

## Decision

- **Dominant and demoted treatments.** A title group on its own takes the dominant treatment: 'Eyebrow' (optional), 'Title', 'Subtitle'. When a component contains two or more title groups, the designer chooses which should be dominant. A dominant group has a title and an optional subtitle, and no eyebrow. Demoted groups consist of an eyebrow only. The text that would have been the title is set as the eyebrow. A subtitle pairs only with a dominant title, never with an eyebrow, so a demoted group's subtitle is dropped.
- **Titles default to `title-md`.** A title group's title uses `title-md` unless the design needs a larger one.
- **The parts of a title group have no space between them.** The eyebrow, title and subtitle sit directly on one another, in every typeset and flow context, and their line heights separate them. Flow gives no step between them ([0005](./0005-flow.md)).

Worked examples:

- **A card containing text, with no titled element inside it.** The card's title
  group is the only one, so it can have an eyebrow, a title and a subtitle.
- **A card containing one chart, where the chart is the main subject.** The
  designer makes the chart's group dominant. The chart has a title and
  subtitle, and the card's title is set as an eyebrow. The eyebrow sits
  directly above the chart's title, but it is the card's demoted group, not
  part of the chart's group.
- **A card containing two related charts.** The designer makes the card's group
  dominant, so the card has a title and subtitle. Each chart's title is set as
  an eyebrow.

## Consequences

- The titling hierarchy of nested, titled elements needs to be considered using this system.
