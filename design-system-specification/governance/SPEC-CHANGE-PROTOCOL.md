# Spec change protocol

This is a practical guide to changing the [design system specification](../design-system-specification.md). It covers how the specification is put together, the order in which to make a change, and how to confirm that the specification still matches the code before you open a pull request.

It does not describe how decisions are agreed. The [README](../README.md) explains when a change needs a Request for Comment (RFC) or an Architectural Decision Record (ADR), and the [ADR lifecycle](./ADR-LIFECYCLE.md) explains how ADRs are written, accepted and changed.

## How the specification is put together

The specification contains two kinds of content.

**Hand-written prose** explains what each part of the system is for and why it works the way it does. You edit it directly.

**Generated blocks** hold the values: the responsive type matrices, the spacing tables and the CSS appendix. They sit between pairs of markers, such as `<!-- GEN:spacing-table START -->` and `<!-- GEN:spacing-table END -->`. The markers do not appear in the rendered page. There are five of these blocks: `prose-matrix`, `product-matrix`, `spacing-table`, `spacing-alias` and `css-appendix`.

The values in the generated blocks come from the build, not from the specification. They travel in one direction:

1. Values are set as variables in Figma.
2. The variables are exported to `packages/themes/tokens/design-tokens.tokens.json`.
3. Style Dictionary (`packages/themes/sd.build.js`) turns the tokens into CSS in `packages/themes/styles/`.
4. `gen_spec.py` reads that CSS and rewrites the generated blocks.

This is set out in [ADR-0001](../decisions/0001-sources-of-truth.md). In practice, it means you never type a value into a generated block. A value edited by hand is overwritten the next time the blocks are regenerated. Until then, the specification disagrees with the CSS that consumers receive. If a value is wrong, it is corrected in Figma and flows down from there.

## The scripts

Three scripts in [`../scripts`](../scripts) support this. The [README](../README.md#running-the-scripts) shows how to run them.

- **`verify_build.py`** runs the Style Dictionary build and compares the result with the CSS committed in `packages/themes/styles/`. If they match, the committed CSS is a reliable basis for the specification.
- **`gen_spec.py`** regenerates the five blocks from the committed CSS. With `--check`, it changes nothing and reports any block that is out of date.
- **`check_spec.py`** checks the committed CSS and the Tailwind plugins against the rules the system depends on. It does not read the specification.

`check_spec.py` checks two things:

- **Pinned values.** The `PINNED` list near the top of the script holds values that the specification also states in its prose, such as the 12px caption, the 14px chart tick and the 1.625 reading leading for prose body text. If the CSS no longer matches one of these, the prose that states it is now wrong.
- **Structural rules.** These include:
  - each `--spacing-{n}` refers to the matching primitive;
  - the flow scale matches the values set in Figma;
  - every flow rule is attached directly to its context element;
  - typography values are set on the context element;
  - chart roles that share a name with a product role have the same size;
  - every generated Tailwind extension file is used somewhere.

Each of these rules comes from an ADR. The comment above each constant in the script names the ADR it comes from.

## Before you start

Run `verify_build.py` before you change anything. If it reports a difference, the committed CSS does not match what the tokens produce. This usually means someone changed the tokens or the build without rebuilding. Resolve that first, so that the differences you see later come from your own change.

## Making a change that rests on a decision

A change of this kind needs an accepted ADR, for example renaming a role, changing a type size or adding a flow step. Make the change in this order once the ADR is accepted:

1. Update the rule in [`RULES.md`](../RULES.md) and cite the ADR.
2. Make the change in Figma, export the tokens to `packages/themes/tokens/design-tokens.tokens.json`, and rebuild with `npm run build-tokens` in `packages/themes`.
3. Run `gen_spec.py` to bring the generated blocks up to date.
4. Update the prose that describes the changed rule. List the sections you changed in the ADR's `spec` field.
5. Run `check_spec.py`. If a pinned value or structural rule now fails because of the change you intended, update the constant in `check_spec.py` and point its comment at the new ADR. If it fails for a reason you did not intend, the build has regressed: fix the build, not the check.
6. Commit the tokens, the CSS in `packages/themes/styles/`, the specification, `RULES.md` and any script changes in the same pull request. Reviewers can then see the decision, the values and the description together.

Not every decision changes a value. A decision about naming or documentation may only need steps 1, 4 and 6.

## Making an everyday fix

Corrections that do not change a rule do not need an ADR. Examples are a typo, an unclear sentence or a broken link. Edit the prose directly and confirm that `gen_spec.py --check` still passes. You only touched hand-written text, so `check_spec.py` gives the same result as before.

If you find a value in the prose that disagrees with the generated blocks, the generated value is the correct one. Change the prose to match. If the generated value itself looks wrong, raise it as an issue, because changing it means changing Figma.

## Changing what the generated blocks contain

Some changes to the specification requires changes to the scripts.

- **A new role appears in the type matrices.** `gen_spec.py` stops with an error if the CSS contains a prose or product role that the matrix does not list. Add the role to `PROSE_ROWS` or `PRODUCT_ROWS` in `gen_spec.py`. A product role that should not have its own row can go in `PRODUCT_MATRIX_OMIT` instead. There is no equivalent for prose roles. Several roles can share a row only if they have the same size at every breakpoint. The script checks this.
- **A row label needs renaming.** Row labels come from `PROSE_ROWS` and `PRODUCT_ROWS`, not from the specification. Edit them there and regenerate.
- **A new generated block.** Write a function in `gen_spec.py` that returns the block's Markdown. Add the function to `BLOCKS` under the block's name. Then place the `START` and `END` markers for that name in the specification where the block should appear.

## Before you open a pull request

Both of these must finish without an error:

```sh
python3 design-system-specification/scripts/gen_spec.py --check
python3 design-system-specification/scripts/check_spec.py
```

They are not run in continuous integration, so the author of the pull request is responsible for running them.
