---
name: ds-writing
description: >
  Writing rules for all agent prose in ldn-viz-tools: docs site pages, Storybook
  MDX, skill files, ADRs, RFCs, code comments, commit messages and PR
  descriptions. Use before writing or reviewing any of these.
---

# Writing

Prose written by AI should be easy to read and fact checked against the code. This skill applies to all agent writing in this repo.

## Style

Write for a colleague who hasn't used the system. Use full sentences. Define a term when you first use it. Give the reason with an instruction. Say each thing once.

Use British spelling.

## AI tells

Check every draft for these.

| Tell | Example | Write |
| --- | --- | --- |
| Inflated verbs: carries, holds, owns, encodes, surfaces, ships, lands, wires, fires, leverages, ensures | The typeset carries a flow context. | The typeset sets a flow context. |
| A clause that adds emphasis and no information | The rules come from the spec, and they do real work. | The rules come from the spec. |
| A contrast with something nobody said | Flow is a relationship, not a distance. | Flow sets the space between blocks. |
| Fragments joined by em dashes | Flow spaces children — direct ones — never grandchildren. | Flow spaces only the direct children of its context. |
| Lists of three for rhythm | Tokens keep the system consistent, flexible and maintainable. | Tokens keep values consistent. |
| Signposting: note that, importantly, crucially, it's worth noting | Note that the class is optional. | The class is optional. |
| Slogans and mottos | **Bind to a role, never a size.** | Choose the role for what the text does. The role sets the size. |
| Headings, bold labels or tables on short content | `## Overview` above two sentences | The two sentences |
| A closing recap | In short, … | Nothing |
| Code described as if it thinks | The token knows which mode it's in. | The token has a value for each mode. |
| Hedges: generally, typically, in most cases | Card titles generally use `.card-title`. | Card titles use `.card-title`. |
| Shorthand the reader hasn't been given | rung, through-line | step |
| Talking about the document | This is the important part. | Nothing |

## Comments, commits and PRs

A comment explains why the code is written the way it is, where the code doesn't show it. It doesn't describe what the code does, what changed, or the task that prompted it.

```js
// Updated to use the new spacing token      (history: put it in the commit)
// Loop over the roles                        (repeats the code)
// 38 × body size is about 79 characters of Inter, inside WCAG 1.4.8's 80
```

Match the comment density of the surrounding file.

A commit message says what changed, and why if that isn't obvious. A PR description says what changed, why, and how it was tested.

## Checking facts

Check every claim in the build or the source. The spec includes things that aren't built, and existing pages can be out of date.

Run `npm run build-tokens` in `packages/themes`, then check:

| Claim | Check in |
| --- | --- |
| A value | `packages/themes/styles/tokens.json` |
| A class exists | `packages/themes/styles/system.css` |
| Where a class name is set | `packages/themes/sd/system.config.js` |
| What a class does | Its rule in `system.css`, including the selector |
| Something happens automatically | The rule that does it |
| A decision and its reason | `design-system-specification/decisions/` (see `INDEX.md`) |
| An old name and its new one | `packages/themes/MIGRATION.md` |

The `lcd-ds` skill lists features the spec describes and the build doesn't have, under "Not implemented". Check the build as well, because the list can be out of date.

Leave out anything you can't verify, and say so in your reply.

## Where text goes

[writing-documentation.md](../../../design-system-specification/writing-documentation.md) says which document answers which question. Facts flow from ADR to RULES to spec to docs. Docs can simplify the spec but can't add to it.

### Docs site (`apps/web/src/content`)

Page content sits in `.typeset-longform`. For a product example, nest a `.typeset-product` block. Use `.not-typeset` for a block with no typeset styling. Live examples use `<div class="border border-color-border-muted p-4 my-4">`.

Start a page by introducing its subject. Page order is set in `apps/web/src/lib/navigation.ts`.

Public pages leave out:

- change history and old names
- internal token names such as `--primitive-*`
- open questions and implementation caveats
- repository paths and commit references

RFC 0002 workstream 4 will restructure the site. Until then, follow the existing pages for frontmatter and sections.

### Storybook MDX (`packages/*/src/lib/*.mdx`)

Written for a developer using the component. Use shorter paragraphs and more tables than the site, and lead with the class name. File paths are allowed. Link to the site for design reasoning.

### Skill files (`.claude/skills`)

Written for agents. Include code anchors, a "Not implemented" list, migration mappings and known wrong claims.

## Before you deliver

- Values and class names are checked in the build.
- Each "automatically" is traced to a rule.
- Nothing is copied from an older page unchecked.
- The draft is checked against the AI tells table.
- Your reply lists what you couldn't verify and anything wrong in existing pages.
