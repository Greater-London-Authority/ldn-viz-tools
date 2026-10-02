---
id: '0002'
title: Token Naming Grammar
status: accepted
date: 2026-09-30
released-in: null
deciders: [Chris Knight]
areas: [Design Tokens]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0002 — Token Naming Grammar

## Context

Consistent naming grammar for design tokens should be clear and logical. Keep it simple, flexible and understandable. Guard against bloat and cognitive load.

## Decision

- Two tiers: primitive → semantic. Primitives hold values. Semantic tokens say what a value is for. Components use semantic tokens only, never primitives or raw values.

- Primitives are named by their value.
  --primitive-typography-font-size-14 · --primitive-typography-font-weight-semi-bold · --primitive-spacing-4 (4 × 4px)

- Semantic tokens are named by their role, never by value or component.
  title, not 20 (value) and not card-panel-title (component).

- One pattern per category:

| Category   | Pattern                                     | Example                                   |
| ---------- | ------------------------------------------- | ----------------------------------------- |
| Typography | --typography-{mode}-{context}-{role}-{prop} | --typography-base-product-title-font-size |
| Colour     | --color-{group}[-{variant}][-{state}]       | --color-interactive-primary-muted-hover   |
| Spacing    | --spacing-{n}                               | --spacing-4                               |
| Flow       | --flow-[{context}-]{step}                   | --flow-prose-loose, --flow-loose          |

- The context segment decides the family. It is prose, product or chart, and families never mix: a Product/\* component uses product tokens only.

- Role names are generic within a context. Product names say where something sits in the hierarchy (page-head, section-head, title). Chart names say which part of the chart it is (axis-title, tick), because that's the vocabulary chart users already have.

- Name segments run from general to specific, and modifiers go last. label-sm, primary-muted-hover.

- The default has no modifier: title and --flow-{step} are the plain forms.

- Spelling: lowercase kebab-case throughout. Multi-word values are hyphenated (semi-bold, page-head). Fractional steps use a hyphen, because dots aren't valid in CSS names: --spacing-0-5, not --spacing-0.5

## Options considered

- **Semantic tokens are named by their role, never by value or component.**
- **Component scoped tokens** On face value component scoped tokens may appear more user friendly, however they leave the door open to token bloat, so role based naming is enforced for semantic tokens.

- **The default has no modifier**
- **Include default modifier** Decided not to include this to keep usage terse. Favouring --color-text over --color-text-default.

## Consequences

- **`outputReferences` in the style dictionary pipeline is on for the typography platform, and must stay on.** Without it typography emits resolved literals, so an alias is indistinguishable from a copied value and drift is invisible.
