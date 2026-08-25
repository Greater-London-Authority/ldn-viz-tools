---
name: ds-writing
description: >
  Voice, structure and verification rules for writing GLA / ldn-viz design system
  documentation — the public docs site (apps/web/src/content), Storybook MDX pages
  (packages/*/src/lib/*.mdx), and the agent-facing skill references under
  .claude/skills. Use whenever writing or rewriting a documentation page, a
  Storybook page, a component description, or a skill reference; also use when
  reviewing prose someone else has drafted. Trigger on: "document this", "write the
  docs", "write a guide", "docs page", "Storybook page", "MDX", "rewrite this page",
  "user guide", "explain how to use", or any request to produce human-readable prose
  about the design system. This skill exists because the register is specific and
  easy to get wrong, and because unverified claims have repeatedly reached published
  pages — follow it, do not approximate it from memory.
---

# Writing design system documentation

Two failures recur. This skill exists to prevent both.

1. **Unverified claims reach published pages** — carried across from the spec, from
   an older doc, or from a plausible inference, without being checked against what
   the code actually does.
2. **The register drifts** into a clipped, aphoristic style that assumes the reader
   already knows the system.

---

## Part 1 — Verification

**Nothing goes in a document that has not been read out of the build or the source
file.** Not from the spec, not from an existing doc, not from a previous session's
notes, not from memory of how the system works.

The spec is a specification. It describes intent, some of which is not implemented.
An existing doc is a previous author's understanding, which may be stale. Neither is
evidence.

### Before writing, establish ground truth

- Clone or pull the branch actually being documented. Confirm the branch and commit.
- Run the token build if values are involved: `node ./sd.build.js` in
  `packages/themes`. Read the emitted `styles/*.css`.
- Read the plugin source for anything behavioural — selectors, class names, plugin
  registration, theme wiring.
- Extract value tables by parsing emitted CSS, not by transcribing them.

### Every claim needs a class of evidence

| Claim type                      | Verify by                                                    |
| ------------------------------- | ------------------------------------------------------------ |
| A number (size, spacing, ratio) | Parse it out of emitted CSS                                  |
| A class name exists             | `grep` the plugin source and the emitted output              |
| A class does X                  | Read the rule, including its selector and its specificity    |
| A plugin/dependency is in play  | Read the plugin list, not the `package.json` dependency list |
| An import reaches the browser   | Read the app's `app.postcss` or equivalent entry point       |
| "Automatic" / "handled for you" | Find the rule that does it                                   |

### Known traps

- **A dependency in `package.json` is not a registered plugin.** `@tailwindcss/typography`
  is a dependency of `@ldn-viz/themes` and is registered nowhere. Documenting it as
  available was wrong.
- **The spec specifies things that were never built.** At the time of writing:
  `.text-strong` / `.text-soft`, `--flow-leading`, `.prose-column` /
  `--readable-width`, the fluid `clamp()` tokens, hero `em` margins, and a `.note`
  class for the `chart/note` token. Re-check this list; do not trust it either.
- **A token can emit without a class existing.** `chart/note` emits at all five modes
  and has no utility. Emitted token ≠ usable class.
- **Older docs are a source of infection.** The `.prose` error entered a rewrite
  because it was already in `Typography.mdx`. When rewriting, treat the existing
  page as a list of claims to check, not as material to carry over.

### When something cannot be verified

Leave it out and say so in the response. Never write around a gap with a hedge
("generally", "typically", "should"). A hedge in a design system document reads as
a rule and gets followed.

---

## Part 2 — Register

Write as if explaining the system to a capable colleague who has not used it before.
Complete sentences. Define a term before relying on it. Give the reasoning, not just
the rule.

### Openings

A **Principles** section opens by introducing its subject, not by asserting a rule.
The reader needs to know what the thing is before being told how to think about it.

> Typography is the art and technique of arranging type to make written language
> legible, readable and appealing when displayed. We have developed a typographic
> system to unify our apps, charts and graphical output.

Not:

> **Bind to a role, never to a size.** Every piece of text has a job.

The second sentence may be true and may even belong on the page — as the opening of
a later section, written out in prose, with its reasoning attached.

### Do not write

- **Bolded slogans and aphorisms.** No "The one rule", "The honest headline", "The
  ownership question", "A rung carries a relationship, never a density."
- **Blockquoted mottos** used as a substitute for explanation.
- **Meta-commentary about the document.** No "worth reading twice", "read carefully",
  "this is the important bit", "the through-line".
- **Clipped fragments strung on em-dashes** in place of sentences.
- **Insider verbs.** "ships", "lands", "emits", "wired", "bites", "fires". Prefer
  "is included", "is available", "is applied", "takes effect".
- **Stacked imperatives.** A run of "Do X. Don't Y. Never Z." reads as a checklist
  from someone impatient with the reader.
- **Numbered practice steps** ("1 · Declare a context"). Use descriptive headings.
- **Emphatic repetition for weight** — bolding a sentence to make it land.

### Do write

- Full sentences with subjects and verbs.
- The reason alongside the instruction. "Section heads are kept deliberately calm,
  one step above the content beneath them, because they may appear several times and
  a large heading repeated six times reads as noise rather than as structure."
- Terms defined at first use: primary slot, identity weight, type set, rung.
- Worked examples in prose form, as a short list of situations and their resolution.
- Plain description of exceptions, without framing them as clever.

### Vocabulary

| Prefer                       | Over                                                    |
| ---------------------------- | ------------------------------------------------------- |
| are included / are available | ship                                                    |
| is applied / takes effect    | fires, is armed                                         |
| private to the system        | private source, the fiction, the phantom                |
| set / type set               | family (when describing prose/product/chart to readers) |
| closes up to                 | hugs                                                    |
| step aside / step down       | demote, yield the slot (as bare jargon)                 |
| the space between blocks     | rhythm (unless introduced first)                        |

British spelling throughout: colour, behaviour, centred, organised, recognised.

---

## Part 3 — Structure

### Public docs site — `apps/web/src/content`

Frontmatter: `title`, `description`, `section`, `navLabel`, `heroImage`, `thumbnail`.
`section` must be one of `Getting Started`, `Foundations`, `Application design`,
`Data visualisation`. Page order is controlled by `apps/web/src/lib/navigation.ts`,
not by filename — a new page needs adding there, and needs a thumbnail asset.

Every page splits into **Principles** and **Practice**, separated by `---`.

- **Principles** — what the thing is, what decisions it encodes, and why. No class
  names except where naming a role. No code except illustrative CSS. The reader
  should be able to stop here and design correctly.
- **Practice** — how to use it in a Tailwind project. Opens with the standing line:
  `**This guidance applies to projects using `@ldn-viz/themes` in a project using Tailwind.**`
  Then classes, markup examples, live rendered examples, and a closing section of
  things to avoid.

Live examples use `<div class="border border-color-border-muted p-4 my-4">`. Content
is already inside `.prose flow-prose`, so a product or chart example needs
`not-prose` plus its own set class.

### Storybook MDX — `packages/*/src/lib/*.mdx`

**Terser and more mechanical, but the same voice.** The audience is a developer with
the component library open, who wants the answer quickly. That permits:

- Shorter paragraphs, and tables where the site would use prose.
- Leading with the class name rather than the concept.
- Examples that escalate in complexity, minimal framing between them.
- File paths and code anchors, which the site page should not carry.

It does not permit slogans, meta-commentary, or dropping the reasoning entirely. A
developer choosing between two roles needs the same "because" the designer needed.

Omit from Storybook: the full responsive matrices, design rationale that does not
change what you type, and anything the site page covers better. Link instead.

### Skill references — `.claude/skills/*/references/*.md`

A different audience with different rules. These are for agents, and terseness is
correct. They **must** carry what the public pages must not:

- Code anchors — the file that implements each behaviour.
- A **Not implemented** section listing spec-only features, so the next session
  cannot re-infer an implementation from the spec.
- Corrections and known-wrong claims, named, so they are not regenerated.
- Migration mappings and retired names.

### What never goes in a public page

- **Change history.** No "Retired" section, no "superseded", no "this used to be
  called X". A usage guide describes the system as it is. History lives in
  `DECISIONS.md`; migration mappings live in the skill references.
- **Internal token names** (`--primitive-*`, `--typography-{mode}-{family}-…`).
  Readers bind to roles and utilities. Emitted grammar belongs in the spec.
- **Open questions, caveats about the implementation, or known looseness.** If it is
  not settled enough to document plainly, it is not ready for the page.
- **Repository paths and commit references.**

---

## Part 4 — Before and after

**Assumed knowledge, no reasoning.**

> Don't put a rung on a first child — no gap to size, and it collapses through a
> plain block parent (flex parents are immune, which makes it inconsistent and worse).

> A rung applied to the first element in a stack has no effect, because there is no
> preceding element for the space to sit between. Worse, the margin may collapse
> through the parent and push the whole container down instead, which happens in some
> layouts and not others. Apply spacing to the element that needs space above it.

**Slogan instead of explanation.**

> **Rung utilities carry a relationship, never a density.** Density comes from
> context, always.

> The four names describe how closely two blocks are related, not how far apart they
> sit. The distance is decided by the context the blocks are in, so the same name
> produces a wider gap in an article than in a dashboard.

**Insider verbs and clipped fragments.**

> Ten of eleven rules are keyed to typographic selectors — which is exactly why
> `flow-product` appears to do nothing but apply a uniform 8px in a `div`-based
> dashboard.

> Most of the rules recognise elements by what they are: a heading, a figure, a list
> item. In reading content that works well, because the markup already describes the
> content. A dashboard is built largely from generic containers, which carry no such
> description, so only the general rule applies and every gap comes out the same.

---

## Checklist before delivering

- Branch and commit confirmed; build run; values parsed from emitted output.
- Every class name in the document grepped in the plugin source.
- Every "automatically" traced to the rule that does it.
- No claim carried over from a previous doc without being re-checked.
- Principles opens by introducing the subject.
- No slogans, no meta-commentary, no changelog, no internal token names.
- British spelling.
- In the response, state plainly anything that could not be verified, and anything
  found to be wrong in the existing documentation.
