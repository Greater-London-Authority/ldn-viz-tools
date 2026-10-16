# Spec change protocol

This is a practical guide to changing the [design system specification](../design-system-specification.md). It covers how the specification is put together, the order in which to make a change, and how to confirm that the specification still matches the build before you open a pull request.

It does not describe how decisions are agreed. The [README](../README.md) explains when a change needs a Request for Comment (RFC) or an Architectural Decision Record (ADR), and the [ADR lifecycle](./ADR-LIFECYCLE.md) explains how ADRs are written, accepted and changed.

## How the specification is put together

The specification contains two kinds of content.

**Hand-written prose** explains what each part of the system is for and why it works the way it does. You edit it directly.

**Generated blocks** hold the values. They sit between pairs of markers, such as `<!-- GEN:spacing-table START -->` and `<!-- GEN:spacing-table END -->`, which do not appear in the rendered page. There are five of these blocks:

- `longform-matrix` and `product-matrix`: the font size, line height and weight of every role in each typeset, at each breakpoint;
- `alias-table`: each usage alias class and the role it reads;
- `spacing-table`: the public spacing scale;
- `flow-table`: the value of each flow step in each context.

The values in the generated blocks come from the build, not from the specification. They travel in one direction:

1. Values are set as variables in Figma.
2. The variables are exported to `packages/themes/tokens/lcd-ds.tokens.json`. The usage aliases are exported separately, to `packages/themes/tokens/lcd-ds-usage.tokens.json`.
3. Style Dictionary (`packages/themes/sd.build.js`) turns the tokens into the package's outputs in `packages/themes/styles/`. Two of them are read by the scripts: `tokens.json`, which holds every custom property with its resolved value, and `system.css`, which holds every class the specification names.
4. `gen_spec.py` reads those two files and rewrites the generated blocks.

This is set out in [ADR-0001](../decisions/0001-sources-of-truth.md) and [ADR-0013](../decisions/0013-token-export-and-parsing.md). In practice, it means you never type a value into a generated block. A value edited by hand is overwritten the next time the blocks are regenerated, and until then the specification disagrees with the CSS that consumers receive. If a value is wrong, it is corrected in Figma and flows down from there.

The class names in `system.css` do not come from Figma. They are set in the naming configuration, `packages/themes/sd/system.config.js`, and the element styles for unclassed markup and forms are written by hand in `packages/themes/sd/content.css` and `packages/themes/sd/forms.css`. A change to any of these is a change to the build, so it is made in code and checked with the package's tests (`npm test` in `packages/themes`) as well as the scripts below.

`packages/themes/styles/` is not committed. Everyone builds it locally, and the package is built again when it is published, so a pull request carries the token export and the regenerated specification but not the built CSS. Reviewers see a change of value in the generated blocks of the specification.

## The scripts

Four scripts in [`../scripts`](../scripts) support this. The [README](../README.md#running-the-scripts) shows how to run them, including building the tokens first.

- **`verify_build.py`** runs the Style Dictionary build again and compares the result with the build already in `packages/themes/styles/`. If they match, the build is reproducible and the local output is current.
- **`gen_spec.py`** regenerates the five blocks from `tokens.json` and `system.css`. With `--check`, it changes nothing and reports any block that is out of date.
- **`check_spec.py`** checks the build against the values and rules the specification depends on, and checks the names in `RULES.md`. It does not read the specification itself.
- **`adr_check.py`** checks the decision records against the [ADR lifecycle](./ADR-LIFECYCLE.md), and with `--write-index` regenerates `decisions/INDEX.md`.

`check_spec.py` checks three things.

- **Pinned values.** Constants near the top of the script hold values that the specification also states in its prose: the identity weight of each role, the font weights and typefaces, the type scale, the line height formula, the breakpoints, the flow ramp, the public spacing steps, the elevation steps and the emphasis modifiers. If the build no longer matches one of these, the prose that states it is now wrong.
- **Structural rules.** These include:
  - each `--spacing-{n}` refers to the matching primitive;
  - each flow step refers to a primitive spacing value, and content outside any context takes the standard steps;
  - both typesets define every role and size the specification lists, and no others;
  - every class the specification names is in `system.css`, including the four flow utilities with the default step implied (`.mt-flow`, not `.mt-flow-default`);
  - every flow rule is attached directly to its context element, and lets an author's `mt-flow-*` class replace the step it would assign;
  - role values are set on the typeset, never on the text element;
  - each usage alias reads a single role;
  - every file in `styles/` is published in the package's exports map, apart from `tokens.json`, which is for these scripts only.
- **Names in `RULES.md`.** Every class it names must be in `system.css`, and every token it names must be in `tokens.json`. A name that `RULES.md` rules out, such as `.mt-flow-default`, must be absent.

Each of these comes from an ADR. The comment above each constant in the script names the ADR it comes from.

Some results are reported as `[WARN]`. A warning does not fail the run. It marks drift that does not yet reach a page, such as a primitive line height that breaks the formula but is not used by any role, or a proposed ADR that `RULES.md` does not cite yet.

## Before you start

Build the tokens, then run `verify_build.py` before you change anything. If it reports a difference, the build is not reproducible, which usually means it depends on something outside the repository. Resolve that first, so that the differences you see later come from your own change.

## Making a change that rests on a decision

A change of this kind needs an accepted ADR, for example renaming a role, changing a type size or adding a flow step. Make the change in this order once the ADR is accepted:

1. Update the rule in [`RULES.md`](../RULES.md) and cite the ADR.
2. Make the change at its source. A value is changed in Figma and exported to `packages/themes/tokens/lcd-ds.tokens.json` (or `lcd-ds-usage.tokens.json` for a usage alias). A class name is changed in `packages/themes/sd/system.config.js`. Then rebuild with `npm run build-tokens` in `packages/themes`.
3. Run `gen_spec.py` to bring the generated blocks up to date.
4. Update the prose that describes the changed rule. List the sections you changed in the ADR's `spec` field.
5. Run `check_spec.py`. If a pinned value or structural rule now fails because of the change you intended, update the constant in `check_spec.py` and point its comment at the new ADR. If it fails for a reason you did not intend, the build has regressed: fix the build, not the check.
6. Run `adr_check.py --write-index`, so that `decisions/INDEX.md` lists the ADR with its current status.
7. Commit the token export, the specification, `RULES.md`, the ADR, `decisions/INDEX.md` and any changes to the build or the scripts in the same pull request. Reviewers can then see the decision, the values and the description together.

Not every decision changes a value. A decision about naming or documentation may only need steps 1, 4, 6 and 7.

## Making an everyday fix

Corrections that do not change a rule do not need an ADR. Examples are a typo, an unclear sentence or a broken link. Edit the prose directly and confirm that `gen_spec.py --check` still passes. If you edited `RULES.md`, run `check_spec.py` and `adr_check.py` too, because both read it.

If you find a value in the prose that disagrees with the generated blocks, the generated value is the correct one. Change the prose to match. If the generated value itself looks wrong, raise it as an issue, because changing it means changing Figma.

## Changing what the generated blocks contain

Some changes to the specification require changes to the scripts.

- **A role or size is added.** The role set is closed, so this needs an ADR. The roles and sizes are listed in `ROLES` and `SIZES` in `scripts/spec_common.py`, and both `check_spec.py` and `gen_spec.py` read them. Until they are updated, `check_spec.py` reports the new tokens as outside the specification's role set, and the matrices leave them out. The role's identity weight is pinned in `ROLE_WEIGHTS` in `check_spec.py`.
- **A breakpoint is added.** Add it to `BREAKPOINTS` in `scripts/spec_common.py`, so that the matrices gain a column and `check_spec.py` expects the role values at that breakpoint.
- **A new generated block.** Write a function in `gen_spec.py` that returns the block's Markdown, and add it to `BLOCKS` under the block's name. Then place the `START` and `END` markers for that name in the specification where the block should appear. `gen_spec.py` stops with an error if the specification has markers that no function writes, or a function has no markers.

Generated tables are written in the layout Prettier gives them, so formatting the specification does not make a block look out of date.

## Before you open a pull request

All of these must finish without an error, after building the tokens:

```sh
python3 design-system-specification/scripts/verify_build.py
python3 design-system-specification/scripts/gen_spec.py --check
python3 design-system-specification/scripts/check_spec.py
python3 design-system-specification/scripts/adr_check.py
```

They are not run in continuous integration, so the author of the pull request is responsible for running them.
