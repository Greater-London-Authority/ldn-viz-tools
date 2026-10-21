---
id: '0019'
title: The system targets WCAG 2.2 AA, with one focus outline and stated contrast exceptions for data colour
status: proposed
date: 2026-10-21
released-in: null
deciders: [Chris Knight, James Scott-Brown]
areas: [Accessibility, Colour, Typography]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0019 — Accessibility

## Context

The spec lists accessibility in its scope, but no decision sets a target. The docs cite WCAG 2.1 AA. The build has a focus outline from `--color-interactive-focus` on every focusable element, and four `--focus-ring` tokens that are raw hex values with no dark value, and that nothing uses. Two data colours are below 3:1 against a light background.

## Decision

- **The target is WCAG 2.2 AA** for components, documentation pages and the Figma library.
- **Every focusable element shows one focus style: an outline on `:focus-visible`.** It is `max(2px, 0.08em)` solid in `--color-interactive-focus`, offset by its own width. An element can change it with `--outline-size`, `--outline-style`, `--outline-color` and `--outline-offset`. There are no focus-ring tokens.
- **Contrast follows WCAG:** 4.5:1 for text, 3:1 for large text, and 3:1 for interface components and the parts of a chart that carry meaning.
- **Two data colours are exceptions to the 3:1 rule:**
  - `--color-data-context` is meant to recede behind the highlighted series. It is always used alongside `--color-data-primary`, and never carries meaning alone.
  - `--color-data-categorical-yellow` is used only for large areas, with an outline or a direct label.
- **No text is smaller than 12px.** The smallest roles, `label-sm` and `caption-sm`, are 12px.
- **Running text is no wider than 80 characters** ([0015](./0015-system-classes.md)).

## Options considered

- **WCAG 2.2 AA** (chosen). It is the current version, and the one UK public sector sites are tested against.
- **WCAG 2.1 AA.** Not adopted. It is out of date.
- **A box-shadow focus ring from the `--focus-ring` tokens.** Not adopted. The outline already meets the need, follows the mode, and works without Tailwind. The tokens are removed.

## Consequences

- The `--focus-ring` tokens and the focus ring effect style are removed in Figma. Its 92 uses in the v3.1 components map to the outline when they are migrated.
- `Button`, `TabLabel`, `CheckboxSolid` and `RadioButtonSolid` set Tailwind `focus:ring-*` colours. They need checking so that each shows only the outline.
- The docs accessibility page moves from WCAG 2.1 to 2.2.
