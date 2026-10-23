---
id: '0019'
title: The system targets WCAG 2.2 AA, with one focus colour and stated contrast exceptions for data colour
status: accepted
date: 2026-10-22
released-in: null
deciders: [Chris Knight, James Scott-Brown]
areas: [Accessibility, Colour, Typography]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Accessibility', 'Interactive colours']
pr_url: ''
---

# 0019 — Accessibility

## Context

The spec lists accessibility in its scope, but no decision sets a target. The docs cite WCAG 2.1 AA. The build has a focus outline from `--color-interactive-focus` on every focusable element, and four `--focus-ring` tokens that are raw hex values with no dark value, and that nothing uses. Two data colours are below 3:1 against a light background.

## Decision

- **The target is WCAG 2.2 AA** for components, documentation pages and the Figma library.
- **Focus has one colour, `--color-interactive-focus`, and two forms.** There are no focus-ring tokens, and there is no focus colour for each status.
  - **By default, an outline on `:focus-visible`.** It is `max(2px, 0.08em)` solid, offset by its own width. An element can change it with `--outline-size`, `--outline-style`, `--outline-color` and `--outline-offset`.
  - **On a filled control, an inset ring.** `Button`, `TabLabel`, `CheckboxSolid` and `RadioButtonSolid` turn the outline off and draw two lines inside their edge: 2px of `--color-interactive-focus` at the edge, and 2px of `--color-surface` inside it. The surface line keeps the focus line visible against the control's own fill. The ring is drawn inside the edge so that focus stays visible on the tabbed sidebar buttons, which an outline outside the edge would not be. It is also kept as a design choice for filled controls.
- **Figma follows the code for focus.** The `focus` effect style draws the inset ring with two inner shadows, bound to `interactive/focus` and `surface`. The focussed button variants use it.
- **Contrast follows WCAG:** 4.5:1 for text, 3:1 for large text, and 3:1 for interface components and the parts of a chart that carry meaning.
- **Two data colours are exceptions to the 3:1 rule:**
  - `--color-data-context` is meant to recede behind the highlighted series. It is always used alongside `--color-data-primary`, and never carries meaning alone.
  - `--color-data-categorical-yellow` is used only for large areas, with an outline or a direct label.
- **No text is smaller than 12px.** The smallest roles, `label-sm` and `caption-sm`, are 12px.
- **Running text is no wider than 80 characters** ([0015](./0015-system-classes.md)).

## Options considered

- **WCAG 2.2 AA** (chosen). It is the current version, and the one UK public sector sites are tested against.
- **WCAG 2.1 AA.** Not adopted. It is out of date.
- **A box-shadow focus ring from the `--focus-ring` tokens.** Not adopted. The outline and the inset ring already meet the need, and both follow the mode. The tokens are removed.
- **A focus colour for each status** (`interactive/negative-focus`, `positive-focus` and `caution-focus`), proposed in Figma. Not adopted. No component used them, and one colour is easier to recognise as focus.
- **Only the outline, on every element.** Not adopted. The filled controls already draw the inset ring, and the code is the reference for focus.

## Consequences

- In Figma, the four `focus-ring/*` effect styles and the three status focus variables are removed (22 October 2026). The 225 layers that used the styles now use `focus`.
- The status variants of `Button` also set `focus:ring-color-interactive-focus`, which the `focus-visible:ring-color-surface` on every button overrides. The class can go (C4).
- The docs accessibility page moves from WCAG 2.1 to 2.2.
