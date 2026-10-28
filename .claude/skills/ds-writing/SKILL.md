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

## Four tests

Apply these to every sentence as you write it, and again in review. They catch tells that the examples below don't list, because they test what the words do.

1. **Delete it.** Remove the sentence, clause or word. If the reader loses no fact, leave it out. A second clause after ", and" often fails, because it restates the first or follows from it.
2. **Is the verb literal?** The subject has to do what the verb says. A rule doesn't rest on anything. A link doesn't name anything.
3. **Who is it for?** A sentence is about the subject, for the reader the document names. A sentence about the document itself, or about how it was made, is for someone else.
4. **Can it be checked?** A claim points to something a reader could check, such as a value, a rule in the build or a decision record. Leave out a claim that sounds certain but points at nothing.

## Examples of tells

| Tell                                                                                                              | Test | Example                                                              | Write                                                           |
| ----------------------------------------------------------------------------------------------------------------- | ---- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| Inflated verbs: carries, holds, owns, encodes, surfaces, ships, lands, wires, fires, leverages, ensures, rests on | 2    | The typeset carries a flow context.                                  | The typeset sets a flow context.                                |
| A second clause that restates the first or adds emphasis                                                          | 1    | The rules come from the spec, and they do real work.                 | The rules come from the spec.                                   |
| One fact split into two balanced halves                                                                           | 1    | Each rule rests on a record, and the link after it names the record. | Each rule links to the record it comes from.                    |
| A contrast with something nobody said                                                                             | 1    | Flow is a relationship, not a distance.                              | Flow sets the space between blocks.                             |
| Fragments joined by em dashes                                                                                     | 1    | Flow spaces children — direct ones — never grandchildren.            | Flow spaces only the direct children of its context.            |
| Lists of three for rhythm                                                                                         | 1    | Tokens keep the system consistent, flexible and maintainable.        | Tokens keep values consistent.                                  |
| Signposting: note that, importantly, crucially, it's worth noting                                                 | 1    | Note that the class is optional.                                     | The class is optional.                                          |
| Slogans and mottos                                                                                                | 1    | **Bind to a role, never a size.**                                    | Choose the role for what the text does. The role sets the size. |
| Headings, bold labels or tables on short content                                                                  | 1    | `## Overview` above two sentences                                    | The two sentences                                               |
| A closing recap                                                                                                   | 1    | In short, …                                                          | Nothing                                                         |
| Code described as if it thinks                                                                                    | 2    | The token knows which mode it's in.                                  | The token has a value for each mode.                            |
| Hedges: generally, typically, in most cases                                                                       | 4    | Card titles generally use `.card-title`.                             | Card titles use `.card-title`.                                  |
| Shorthand the reader hasn't been given                                                                            | 3    | rung, through-line                                                   | step                                                            |
| Talking about the document                                                                                        | 3    | This is the important part.                                          | Nothing                                                         |
| A claim about the text that nobody checked                                                                        | 4    | Every rule links to its decision record.                             | Nothing, or a claim you have checked                            |

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

| Claim                           | Check in                                                  |
| ------------------------------- | --------------------------------------------------------- |
| A value                         | `packages/themes/styles/tokens.json`                      |
| A class exists                  | `packages/themes/styles/system.css`                       |
| Where a class name is set       | `packages/themes/sd/system.config.js`                     |
| What a class does               | Its rule in `system.css`, including the selector          |
| Something happens automatically | The rule that does it                                     |
| A decision and its reason       | `design-system-specification/decisions/` (see `INDEX.md`) |
| An old name and its new one     | `packages/themes/MIGRATION.md`                            |

The `lcd-ds` skill lists features the spec describes and the build doesn't have, under "Not implemented". Check the build as well, because the list can be out of date.

Leave out anything you can't verify, and say so in your reply.

## Where text goes

[writing-documentation.md](../../../design-system-specification/writing-documentation.md) says which document answers which question. Facts flow from ADR to RULES to spec to docs. Docs can simplify the spec but can't add to it.

### Docs site (`apps/web/src/content`)

Page content sits in `.typeset-longform`. For a product example, nest a `.typeset-product` block. Use `.not-typeset` for a block with no typeset styling. Live examples use `<div class="border border-color-border-wash p-4 my-4">`.

Start a page by introducing its subject. Follow the page template in [writing-documentation.md](../../../design-system-specification/writing-documentation.md#docs-site-page-template).

Public pages leave out:

- change history and old names
- internal token names such as `--primitive-*`
- open questions and implementation caveats
- repository paths and commit references

### Storybook MDX (`packages/*/src/lib/*.mdx`)

Written for a developer using the component. Use shorter paragraphs and more tables than the site, and lead with the class name. File paths are allowed. Link to the site for design reasoning.

### Skill files (`.claude/skills`)

Written for agents. Include code anchors, a "Not implemented" list, migration mappings and known wrong claims.

## Language review

Prose for the spec, the docs site, Storybook MDX, ADRs, RFCs and skills has a language review before you deliver it. A separate agent does the review, because it reads the text without knowing what you meant to write.

- Review only the paragraphs the change adds or edits.
- Start the reviewer with the Agent tool on a small model, `sonnet` or `haiku`. Give it the four tests, the examples table and the paragraphs, and nothing about the task, so that it reads the text as a reader would.
- Ask it to return only the sentences that fail, each with the number of the test it fails and a rewrite.
- Apply the rewrites you agree with. Check that each keeps the facts of the original.

A prompt for the reviewer:

```text
Review these paragraphs for a design system's documentation. Apply the four
tests below to every sentence. List only the sentences that fail: quote the
sentence, give the number of the test it fails, and give a rewrite that keeps
its facts. Don't comment on sentences that pass.

<the four tests and the examples table>

<the paragraphs>
```

Code comments, commit messages and PR descriptions don't need the review.

## Before you deliver

- Values and class names are checked in the build.
- Each "automatically" is traced to a rule.
- Nothing is copied from an older page unchecked.
- Each sentence passes the four tests.
- The language review has run on the prose it covers, and your reply says what it changed.
- Your reply lists what you couldn't verify and anything wrong in existing pages.
