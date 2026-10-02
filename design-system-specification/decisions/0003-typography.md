---
id: '0003'
title: Typography
status: accepted
date: 2026-09-30
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

# 0003 — Typography

## Context

Text in the design system appears on three kinds of surface: long-form reading content, product interfaces such as dashboards or maps, and charts. Each needs its own size, leading and density, yet they draw on one type scale and often nest inside each other, as when a chart sits in a card on a page of prose.

We needed a system that sets type by what text does and the context in which it sits, and that works with the spacing rules to keep layouts balanced.

## Decision

- **There are three contexts: prose, product and chart.** Prose is for reading, product is for interfaces, and chart is for data graphics. Every piece of text belongs to one of them.
- **Bind to a role, never a size.** Pick the role for what the text does. Size, line height and weight are determined by role.
- **Set the context on the container, not on the text.** Text takes its type from the nearest declared context, and the innermost context wins.
- **A nested context overrides only the roles it defines.** Everything else comes from the context around it. Body text inside a chart is still the surrounding body.
- **A role name means the same thing everywhere.** The chart roles `title`, `subtitle` and `eyebrow` are aliases of the product roles with the same names, so they always have the same values. If two contexts give different values for a shared name, that is a bug.
- **Role sets are closed.** Adding a role needs a decision. Reuse an existing role first: a legend entry is a chart `label`.
- **Hierarchy follows structure.** In prose, h1–h4 map to Title 1–4, and Display and Headline are for heroes only. In product, the order is page-head → section-head → title.
- **A title group has one dominant title.** When the title gives way, it becomes an eyebrow. A subtitle is a separate slot, not a weaker title.
- **Variants change treatment, not size.** Tight label (line height 1) is for single-line controls and adds no new size.
- **Typography sets type, not space.** The vertical space between pieces of text is set by flow.

## Options considered

- **Roles named by what text does, within a context**
- **Roles named by component or size** (`card-panel-title`, t-shirt roles). This was the earlier approach. It meant the same job was styled in different ways from place to place.
