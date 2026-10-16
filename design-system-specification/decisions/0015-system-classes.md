---
id: '0015'
title: Every class the specification names is generated as plain CSS in system.css
status: proposed
date: 2026-10-16
released-in: null
deciders: [Chris Knight]
areas: [tokens, typography, flow]
breaking: true
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: ['Scope', 'Semantic Typesets', 'Usage Aliases', 'Flow', 'Elevation']
pr_url: ''
---

# 0015 — System classes

## Context

Typesets, roles, responsive type, flow rules, the grid classes and the focus styles were Tailwind plugins in `tailwind-custom/` and `ldn-theme.cjs`, maintained by hand. A team without Tailwind got the custom properties but none of the classes the specification describes, which contradicts _Scope_. The plugins had also drifted from the token export: after [0014](./0014-distribution-and-outputs.md) they read several hundred custom properties that no longer exist. Proposed in [RFC 0003](../rfcs/0003-v4-token-pipeline-and-outputs.md), workstream 3.

## Decision

- **Style Dictionary generates every class the specification names into `system.css`, as plain CSS that reads the custom properties in `tokens.css`.** No class is written by hand, and the Tailwind preset adds none.
- **Class names come from one config file (`sd/system.config.js`).** The generator never spells a name, so a rename is an edit to the config.
- **A typeset publishes every role's properties on itself, one media query per breakpoint. Role classes read those properties.** Inheritance makes the innermost typeset win, with no rule that pairs a typeset with a role. The default typeset, product, is also published on `:root`, so a role class outside any typeset still resolves.
- **A typeset sets its body text on itself.** Unclassed text inside it (rendered Markdown, for example) takes `body-md` without a class, and a typeset nested in another resets text to its own size. The product typeset sets this on `body`, not `:root`, because a font size on the root element would change the size of every `rem`.
- **Usage aliases are generated from the Figma usage export.** Longform aliases are element selectors inside `typeset-longform`, wrapped in `:where()` so any class on the element wins. Product aliases are classes that resolve against the nearest typeset. Aliases for figures in columns or on axes take tabular numerals, as `metric` does.
- **`system.css` is unlayered and is imported before Tailwind's directives**, so at equal specificity a Tailwind utility wins over a system class.
- **The build fails if a class reads a custom property that is not a token.** A token renamed or dropped in the export cannot ship as a `var()` that resolves to nothing.
- **Element defaults ship separately in `reset.css`, as complete as Tailwind's preflight.** It is a port of preflight, rule for rule, with tokens in place of Tailwind theme values, and every element selector is wrapped in `:where()`, so it has zero specificity. Browser defaults are removed, not restyled: lists lose their markers and indents, headings their size, links their colour. A product interface then never overrides a browser default, and a typeset restores what its content needs (see content styles below). `index.css` imports it first.
- **Unclassed markup gets content styles inside a typeset.** Rendered Markdown and CMS output can't carry classes, so `system.css` styles the elements themselves (links, emphasis, inline and block code, lists to three levels, definition lists, quotes, rules, tables, figures, disclosure) inside `typeset-longform` and `typeset-product`, with print and forced-colours rules. Type comes from the usage aliases. The other styles are compound design decisions, not token values, so they are written by hand as plain CSS (`sd/content.css`), reading only tokens, role properties and flow steps.
- **The generator scopes the content styles; nobody writes the scoping by hand.** Each rule is applied as `.typeset-x :where(element)`, at the typeset's specificity, so any class on the element wins. Content styles and element aliases both stop at `.not-typeset` and at a different typeset nested inside, whose own rules take over. They never apply from `:root`, so a product page with no typeset class keeps the reset. The build fails if the stylesheet reads a custom property that isn't a token, role property or flow step.

Generating the classes from the same dictionary as the properties keeps the two in step and makes the system usable without Tailwind. In exchange, Tailwind variants of system classes (`md:mt-flow-loose`, `hover:title-md`) no longer exist.

## Options considered

- **Generated plain CSS, names from one config** (chosen).
- **Keep the Tailwind plugins.** Rejected: the classes stay unavailable outside Tailwind, and the plugins already disagreed with the export.
- **Hand-written CSS.** Rejected: it would drift from the export as the plugins did.
- **Native `@layer` blocks.** Rejected: Tailwind v3's output is unlayered, so its preflight would beat every layered rule regardless of specificity.
- **Role rules scoped by typeset (`.typeset-longform .title-md`).** Rejected: an outer typeset then overrides a nested one whenever its selector comes later in the sheet.
- **Reset rules at the top of `system.css`.** Rejected: a team that wants the classes without element resets could not opt out.
- **Content styles as JavaScript objects in the config**, as the old `semantics.cjs` was. Rejected: compound rules are hard to read and review as objects, and lose CSS tooling.
- **Content styles as Figma tokens** (`--blockquote-border-width` and so on). Rejected: a lot of machinery for values that don't change between modes. A value that differs between typesets can become a property each typeset sets, when one does.
- **CSS `@scope (.typeset-longform) to (.not-typeset)`.** Deferred: it expresses the boundary natively, and handles a typeset nested in itself, but browser support is too recent for public-sector audiences. Because the generator owns the scoping, adopting it later changes one function.

## Consequences

- Breaking for consumers who relied on the preset alone. A Tailwind app imports `index.css` (or `system.css`) as well as the preset. `packages/themes/MIGRATION.md` lists the change.
- Responsive and state variants of system classes stop working. A scan of `packages` and `apps` found none in use.
- `tailwind-custom/` and `ldn-theme.cjs` are removed. The Tailwind preset is generated (`styles/tailwind.cjs`) and only maps the theme onto the custom properties; it adds no plugins.
- The form classes (`.form-input`, `.form-checkbox` and the rest) are plain CSS in `system.css`, written by hand in `sd/forms.css`: a port of `@tailwindcss/forms` with the system's form styles folded in. `@tailwindcss/forms` is no longer a dependency. The select chevron is a data URI, which can't read a custom property, so the build writes one per mode from the resolved colour token.
- `scripts/check_spec.py` reads the removed plugin files. It is rewritten against the new outputs in workstream 6.
- `.not-prose` becomes `.not-typeset`. Internal uses (the docs site and Storybook) move in phase 5.
- A selector can't tell which ancestor typeset is nearest, so content nested three typesets deep (longform, product, longform) gets no content styles. `@scope` removes this limit.
- Product has no element aliases yet, so unclassed headings in `typeset-product` take body text until the usage export adds them. Product brings no flow context, so Markdown in a product typeset also needs a flow class.
- [0016](./0016-flow-in-system-css.md) amends [0005](./0005-flow.md) for the flow rules that moved.
