---
id: '0010'
title: Figma conventions
status: accepted
date: 2026-10-01
released-in: null
deciders: [Chris Knight]
areas: [Figma]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0010 — Figma conventions

## Context

The Figma file mixes several kinds of thing on the same pages: published components, private sub-components that only exist to build other components, scaffolding for the documentation, and old work that has been archived.

When we audit the file or sweep through it, we need to be able to tell these apart just by looking at the layer name. Otherwise we risk skipping something that matters, or spending time migrating something that is only there to hold the docs together.

The documentation also needs its own text. Titles, intro prose and captions on doc frames are not part of any product, so they shouldn't be set in product typography roles. If they were, it would be hard to tell documentation from the components it describes, and any change to a product role would change the docs too.

## Decision

- **Names starting with `.DS-` are documentation scaffolding.** We only audit these on the Get Started page. `.DS-Page-Head` is just a page marker and can be ignored.
- **Names starting with a single `.` are private sub-components.** They aren't published, but they are real components.
- **Documentation text uses the `Doc/*` text styles.** This is a separate family of styles kept only for documentation: `Doc/Title`, `Doc/Heading`, `Doc/Subheading`, `Doc/Body`, `Doc/Body-sm`, `Doc/Caption` and `Doc/Mono`. They are for the doc frame itself, meaning its title, intro and captions. Components shown as examples inside a doc frame keep their own styles. `Doc/*` styles are never used in product designs, and product roles are never used for documentation text.
- **We never skip a real component during a sweep**, whether it is published or private.
- **The component archive page is not audited.**

## Options considered

- **Use a prefix on the layer name to show what kind of thing it is** (chosen).

## Consequences

- Anyone auditing the file needs to know these prefixes, and anyone adding scaffolding or sub-components needs to name them accordingly.
