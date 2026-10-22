---
id: '0002'
title: Version 4 — typesets and flow
status: accepted
date: 2026-09-28
authors: [Chris Knight]
reviewers: [James Scott-Brown, Mike Brondbjerg]
---

# RFC 0002 — Typesets and flow

## Summary

The v3 refactor introduced contexts (prose, product, compact) and type sets (prose, product, chart) so that a report and a dashboard could set type and space differently. The concept is sound, but the implementation has problems: the names are ambiguous, a context takes several classes to set up, and the documentation doesn't do a good enough job in explaining how to use it.

This RFC reconsiders contexts to be closer to the product archetypes we already design (dashboard, map, notebook, report and documentation). Each archetype selects a type set and a density, and is applied in one step. The documentation is then restructured around a plain hierarchy of foundations. Typography, flow and the docs are planned together because the names and the structure of each depend on the others.

## Outcome

The reviewers accepted this RFC. Its outcome was recorded on 20 October 2026. The RFC set the scope of the work. The ADRs listed under [Decisions this RFC produced](#decisions-this-rfc-produced) record each decision as it is made, and they can change as the work continues.

Archetypes were not adopted as classes. Each archetype maps to a typeset, a flow context and a grid. The docs page on application types will set out that mapping, as part of the docs restructure. Contexts became two typesets and three flow contexts:

- `typeset-longform` is for reading, in reports and documentation. It also sets the `flow-spacious` context, so one class sets both type and spacing.
- `typeset-product` is for interfaces: dashboards, maps, notebooks, and components such as charts and tables. It sets type only.
- `typeset-product--formatted` is for content from a CMS or Markdown in a product setting. It adds the `flow-standard` context and styles unclassed text elements ([0015](../decisions/0015-system-classes.md)).
- `flow-spacious`, `flow-standard` and `flow-compact` set spacing without setting a typeset, so flow can be applied on its own in a product context or elsewhere ([0016](../decisions/0016-flow-in-system-css.md)).

A product can mix archetypes, such as a dashboard set in product with a landing page set in longform, and contexts can nest ([0016](../decisions/0016-flow-in-system-css.md)).

The four flow steps (`tight`, `default`, `loose` and `section`) stay. The rest of workstream 3 (which step each element takes, coupling, sealing, choosing a context, and hero spacing) is recorded in [0005](../decisions/0005-flow.md).

## Motivation

I feel the refactor missed the mark on a number of levels. I got elements of it wrong, and now that the system is being used by a wider group, the issues are being raised. I would like to address what I see as foundational flaws as quickly as possible before the system proliferates further and fixing them becomes more difficult.

- **It is too complicated.** The system was developed over many sessions with an LLM, and in that process the developer experience was lost sight of. Neither our own developers nor consuming teams find it intuitive.
- **"Prose" is ambiguous.** It names a context, a type set, a flow theme and a class. It is regularly applied ad hoc to style any paragraph, which shows that the name does not say what it is for.
- **Setting a context takes several classes.** A typical container needs a type context class and a flow class (`prose flow-prose`, `product flow-product`). The two can disagree, and nothing warns when they do.
- **Flow is too abstract to put into practice.** The concept (density set by context, steps assigned by markup) is sound, but authors cannot predict the gap they will get or work out which rule produced it. Coupling also has gaps: the bare product `.title` role is not covered by the companion-coupling rules in `flow.cjs`.
- **Typography fails on two levels.** It is hard to explain and implement, and its responsive values need visual improvement.
- **The documentation adds friction.** Both the public docs and the LLM-facing docs and skills are verbose. They explain how the system was reasoned about rather than what a user needs to do.

If nothing changes, every new consumer adds markup that uses `prose` and `flow-*` in the current way. Each one raises the cost of migration later, and the ad hoc usage spreads further because the docs do not correct it.

## Scope

1. Archetypes replace contexts
2. Type sets
3. Flow and density
4. Documentation and skills

## Non-goals

- **Design tokens.** The primitive and semantic token structure stays. Changes to tokens are limited to renames that follow from workstreams 1–3.
- **The underlying spacing scale.** `--spacing-{n}` and the decision that construction space and rhythm are separate jobs ([0004](../decisions/0004-spacing.md)) stay as they are.
- **The grid system.** Behaviour is unchanged. Only its names and its explanation change, as part of workstream 4.
- **Chart roles.** The plan was to keep the chart role set as specified ([0008](../decisions/0008-charts.md)). Instead, the chart typeset was removed. Chart text takes product roles and the chart usage aliases, such as `chart-title` and `chart-label`.
- **Figma.** The plan was for Figma variables and styles to follow the code renames. Instead, Figma is the source, and the code follows the export ([0013](../decisions/0013-token-export-and-parsing.md)).

## Workstream 1 — Archetypes replace contexts

- **The change.** Now: authors choose one of three contexts (prose, product, compact) and apply a type class and a flow class separately. Proposed: authors choose the archetype of the thing they are building, and that sets both the type set and the density. The archetypes are already established in our product work:

  | Archetype     | The question it answers  | Reading pattern                      |
  | ------------- | ------------------------ | ------------------------------------ |
  | Dashboard     | How did this go?         | Scanned, not read in order           |
  | Map           | Where, and what is near? | Explored spatially                   |
  | Notebook      | What if I change this?   | Sequential, with backtracking        |
  | Report        | What did we find?        | Linear, in the order the author sets |
  | Documentation | How do I do X?           | Entered mid-page for one task        |

  Five archetypes do not need five type sets. The work is to define how archetypes map onto a small number of type sets and densities (workstreams 2 and 3), so that authors learn familiar names and maintainers keep a small set of values.

  "Compact" stops being a context. It becomes the density of small, self-contained components such as tooltips, alerts and dialogs.

- **To be defined.**
  - The mapping from each archetype to a type set and a density.
  - How an archetype is applied (one class, one attribute or a layout component) and where it goes (the page root, a region, or both).
  - Nesting: what happens to a report-style text block inside a dashboard card, or a chart inside a report. The current rule, that the innermost context wins and overrides only the roles it defines, needs to be kept or simplified.
- **Why it has to break.** Aliasing the old names to archetypes would keep the ambiguity of "prose" alive, and the one-step application cannot be added without removing the two-class pattern.
- **Affected surface.** `packages/themes/tailwind-custom/typography/contexts.cjs` and `semantics.cjs`, `packages/themes/styles/flow.css`, both copies of `flow.cjs`, and the spec sections _Semantic Layer: Prose_, _Semantic Layer: Product / UI_, _Per-context weight identity_ and _Content Flow_. A full scan, including `.md` files under `apps/web/src/content`, is needed before the RFC is accepted.
- **Migration.** To be decided: whether old classes stay as deprecated aliases for one minor release, and whether a codemod can rewrite `prose flow-prose` and `product flow-product` pairs. Order: `themes` first, then `ui`, `charts`, `maps` and `tables`, then `apps/web`, then consuming apps.
- **Change-sets.** (1) Archetype classes added beside the old ones. (2) Internal components migrated. (3) Docs content migrated. (4) Old classes removed.
- **ADRs this produces.** _Archetypes_ (new). _Typography_ (supersedes [0003](../decisions/0003-typography.md)).

## Workstream 2 — Type sets

- **The change.** Now: three type sets (prose, product, chart), with roles that share names across sets and sometimes alias each other. Proposed: a smaller, plainly named set of type sets, each tied to the archetypes that use it, with a role inventory a user can learn from one page.
- **To be defined.**
  - How many type sets are needed. A starting hypothesis is one set for reading (report, documentation, the prose cells of a notebook) and one for interfaces (dashboard, map, notebook chrome), with chart kept as a component-level set.
  - Names for the sets that say what they are for, replacing "prose" and "product".
  - Base size, scale ratio, line height and measure for each set, checked against real pages.
  - Responsive values. The current per-breakpoint matrices need a visual review at each breakpoint, particularly for heading steps on small screens.
  - Whether monospace (notebook and documentation) and tabular numerals (dashboard values) need roles of their own, or are treatments of existing roles.
  - Whether map labels need a cartographic set, or stay within the maps package.
- **Why it has to break.** The role names and the values both change. Keeping the old values under new names would carry over the responsive problems.
- **Affected surface.** `roles.cjs`, `responsive.cjs`, `typography.cjs`, the typography tokens, Figma text styles, and every component that binds a role.
- **Migration.** A role mapping table from old to new, published with the release. Where a role keeps its name and job, its class does not change.
- **Change-sets.** (1) Values and responsive matrix in tokens. (2) Role classes. (3) Component bindings. (4) Figma text styles.
- **ADRs this produces.** _Type sets_ (new, or folded into the _Typography_ ADR above).

## Workstream 3 — Flow and density

- **The change.** Now: flow is set with a separate `flow-*` class, assigns steps through selector rules authors cannot see, and has known coupling gaps. Proposed: density comes from the archetype with no extra class, and the rules for which gap appears where can be stated in a short table that users can check against what they see.
- **To be defined.**
  - Whether the four steps (`tight`, `default`, `loose`, `section`) stay, and whether their names say enough.
  - Which flow behaviour is automatic and which is opt-in. The current approach, where markup assigns steps and authors override them, needs testing against what developers expect.
  - Coupling rules, including the uncovered product `.title`.
  - Where hero spacing and readable width belong once contexts are gone.
- **Why it has to break.** The `flow-prose`, `flow-product` and `flow-compact` classes go when density moves to the archetype.
- **Affected surface.** `flow.css`, both copies of `flow.cjs`, the `mt-flow-*` and `gap-flow-*` utilities, components that declare their own flow context, and the spec section _Content Flow_.
- **Migration.** Old `flow-*` classes kept as deprecated aliases while workstream 1 migrates. `mt-flow-*` and `gap-flow-*` keep their names if the step names stay.
- **Change-sets.** (1) Density driven by the archetype. (2) Coupling fixes. (3) Components that set their own density. (4) Old classes removed.
- **ADRs this produces.** Amendments to [0005 Flow](../decisions/0005-flow.md), and [0016](../decisions/0016-flow-in-system-css.md).

## Workstream 4 — Documentation and skills

- **The change.** Now: the docs follow the structure of the specification and explain the reasoning behind it. Proposed: docs organised as a plain hierarchy of foundations, each page short and task-led, with the reasoning kept in the ADRs. GOV.UK as a reference point with one clear name per style and plain, task-first pages;
- **Proposed structure.**
  - **Getting started:** install from npm; using the styles, scripts and assets; understanding design tokens
  - **Surface:** elevation
  - **Typography:** typeface; type scale; type sets
  - **Spacing:** responsive spacing; density; flow
  - **Layout:** screen size; grid system; page wrappers
  - **Colour etc ...**
- **To be defined.**
  - Where archetypes appear. They are the entry point for choosing a type set and a density, so they may need a page of their own ahead of the foundations, or a section under Getting started.
  - How users access the system from different tools (Svelte, plain HTML and CSS, Figma), and whether each needs its own getting-started route.
  - New names for the grid system, if any.
  - How far the LLM-facing skills (`lcd-ds`, `ds-writing` and others) can be cut down once the spec is simpler.
- **Why it has to break.** Docs URLs change with the new structure. Redirects are needed for pages that consuming teams link to.
- **Affected surface.** `apps/web/src/content`, Storybook MDX pages in `packages/*/src/lib`, skill references under `.claude/skills`, and `design-system-specification.md`.
- **Change-sets.** (1) New navigation and redirects. (2) Getting started. (3) One pull request per foundation section. (4) Skills.
- **ADRs this produces.** _Documentation_ (amends [0009](../decisions/0009-documentation.md)).

## Sequencing

| Phase | Work                                                                             | Exit condition                                                          | Status                                                                                             |
| ----- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 0     | RFC 0001 governance in place; full usage scan; this RFC accepted                 | RFC accepted; scan results recorded in this RFC                         | Done                                                                                               |
| 1     | Archetype mapping, type set names and application method decided                 | Archetypes and Typography ADRs accepted                                 | Done. Archetypes became guidance, not an ADR (see Outcome).                                        |
| 2     | Type set values and responsive review; flow and density rules                    | Type sets and Flow ADRs accepted; specimens reviewed at each breakpoint | Done, apart from the specimen review at each breakpoint, which moves to the Figma foundation pages |
| 3     | Implementation in `themes` with deprecated aliases; internal components migrated | No internal use of old classes; build and checks pass                   | Done                                                                                               |
| 4     | Docs restructure and skills update                                               | New navigation live; skills reviewed against the released spec          | In progress                                                                                        |
| 5     | Release; consuming teams migrate; old classes removed in the following release   | Aliases removed                                                         | Not started                                                                                        |

## Verification

- `verify-build` and `check` pass at the end of each phase.
- A scan shows no use of retired classes in `packages` or `apps`, including `.md` content.
- Specimen pages, one per archetype, are checked in the browser at each breakpoint and in light and dark modes. Tooling cannot judge whether a heading step reads well on a small screen.
- At least one real product of each archetype is migrated and reviewed before release.
- A developer outside the team uses the new getting-started docs to set up a page without help.
- The skills are reviewed against the released spec, and any rule that only exists in a skill is moved into the spec or removed.

## Communication

- **Designers working in Figma:** renamed text styles and variables announced with phase 2, with the mapping from old to new.
- **Public docs site:** the new structure ships in phase 4, with redirects from old URLs.

## Risks

- **Change fatigue.** A second breaking change soon after v3 may cost goodwill. Deprecated aliases and a clear migration guide reduce this.
- **The archetype mapping does not fit real products.** Some products mix archetypes, such as a report with an embedded dashboard. Nesting needs to be tested on real pages in phase 1, not only on specimens.
- **Losing simplicity again.** Detail could build up during implementation as it did in v3. Each ADR should be tested against one question: can a new developer apply this from the docs page alone?
- **Scope growth.** Monospace, tabular numerals and cartographic labels could each turn into a workstream. Any that do should become separate RFCs.

## Open questions

1. ~~Is the starting hypothesis of two type sets (reading and interface) plus chart enough, or do report and documentation need separate values?~~ Closed: there are two typesets and no chart typeset. Reports and documentation share `typeset-longform`. Dashboards, maps and notebooks use `typeset-product`, and content from a CMS or Markdown in a product setting uses `typeset-product--formatted` ([0003](../decisions/0003-typography.md), [0015](../decisions/0015-system-classes.md)).
2. ~~How is an archetype applied: a class, a data attribute, or a layout component?~~ Closed: archetypes are not applied directly. A class sets the typeset, and `typeset-longform` sets the `flow-spacious` context as well. A flow context class can be set on its own ([0016](../decisions/0016-flow-in-system-css.md)).
3. ~~Can a page contain more than one archetype, and if so, what are the nesting rules?~~ Closed: yes. The innermost typeset wins through inheritance ([0015](../decisions/0015-system-classes.md)). A nested flow context takes its space above from the outer context, and only its own children take the new density ([0016](../decisions/0016-flow-in-system-css.md)).
4. ~~What do we call the type sets, given that "prose" and "product" are being retired?~~ Closed: `longform` and `product`, with the `--formatted` modifier on product. The flow contexts are `spacious`, `standard` and `compact`.
5. ~~Do the docs lead with archetypes, or introduce them inside Typography and Spacing?~~ Closed: the docs lead with the foundations. Archetypes appear on the application types page under Application design, which names the typeset, flow context and grid for each one.

## Decisions this RFC produced

- [0003 Typography](../decisions/0003-typography.md) was rewritten around the longform and product typesets, in place of a new ADR that superseded it. It also covers the type sets, so there is no separate Type sets ADR.
- [0005 Flow](../decisions/0005-flow.md) was rewritten around the spacious, standard and compact contexts, and is amended by [0016](../decisions/0016-flow-in-system-css.md).
- [0015 System classes](../decisions/0015-system-classes.md), proposed in RFC 0003, adds `typeset-product--formatted` and the content styles.
- There is no Archetypes ADR (see Outcome).
- Changes to [0009 Documentation](../decisions/0009-documentation.md) for the docs restructure will be recorded when that work is done.
