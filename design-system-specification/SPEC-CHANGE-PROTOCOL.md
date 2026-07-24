# Spec change protocol

_How changes flow through the GLA / ldn-viz design system without the spec drifting into misinformation. Lives beside `DECISIONS.md`. Read the core rule; the rest is mechanics._

## The core rule

**For anything with a concrete value or name, the spec is downstream of the build — never the source.** The emitted CSS in `styles/` is ground truth: it ships, and the Style Dictionary build is deterministic (reproducible zero-diff). So the spec's value content is *generated* from that output, and only its prose — intent, rationale, role logic — is hand-written. Generated numbers can be out of date (a rerun fixes that); they can't be silently wrong.

Three artifacts, three distinct jobs — don't blur them:

- **`DECISIONS.md`** — the decision ledger. One line per settled decision. The *why*.
- **Figma variables → token export → `styles/`** — the value source. The *what*, authoritative.
- **`design-system-specification.md`** — the reconciled narrative. Prose by hand; value tables + CSS appendix generated.

## Two kinds of change, two directions

**A decision** (rename a role, refine chart typography, "tick should be X"): enters as prose, flows *down* the pipeline.
1. Add a one-line entry to `DECISIONS.md`.
2. Write/adjust the **intent** in the spec prose (not the numbers).
3. Make it real in **Figma**, re-export tokens, rebuild.
4. Regenerate the spec's value blocks so the numbers catch up (`regen_spec.py gen`).
5. Update the pinned value in `regen_spec.py`'s `PINNED` list if the decision changed a checked value.

**A value/name reality** (what a token actually is): only ever flows *up* from Figma. Never hand-edit a value in the spec and treat it as truth — that is exactly what caused the earlier drift. Figma → tokens → emitted → reconcile spec to it.

## The tool: `regen_spec.py`

Generates the pure-value blocks and lints the hand-written prose values. stdlib Python; run from the repo root (or pass `--spec` / `--styles` / `--project`).

- `python3 regen_spec.py verify-build --project .` — reproduce the SD build, diff vs shipped `styles/`. A zero-diff means the emitted output is trustworthy. **Run this first, every session.**
- `python3 regen_spec.py gen` — regenerate the four marked blocks (CSS appendix, spacing table, prose matrix, product matrix) from `styles/`. Prose is untouched.
- `python3 regen_spec.py check` — exit non-zero if any generated block is stale **or** any pinned decision no longer matches the emitted output. This is the guard: run before every hand-off / commit.

Generated blocks are wrapped in `<!-- GEN:name START -->` … `<!-- GEN:name END -->` markers (invisible in rendered markdown). Everything outside the markers is hand-written and safe to edit freely. The current spec already has the four markers in place.

The `PINNED` list in the script encodes decisions that also appear as prose values (caption = 12, tick = 14 / tick-sm = 12, prose body reading-leading 1.625, eyebrow weight 500, …). When `check` flags one, it means a decision effectively changed — update the prose that states it, then re-pin. This is the machine-checkable link between `DECISIONS.md` and the spec.

## One canonical home

Loose downloads are the root of the version confusion. Pick one home — ideally the **ldn-viz git repo**, with the spec under `docs/` alongside `DECISIONS.md`, `regen_spec.py`, and this file. Rule: **only files at `HEAD` are canonical; anything in Downloads is disposable.** Archive the scattered copies now. Git gives you history and diffs, which is precisely what "which version is real" needs. (If staying in Claude Projects instead, treat the Project files as that home and update them at the end of every session.)

Claude can't be the source of truth between threads — its memory is limited and project-scoped, so each thread re-derives from the canonical files. That is the safe design: the files are authoritative; a thread is a worker that reads them in and writes changes back.

## The per-thread ritual

**Start:** load `DECISIONS.md`, the spec, the latest token export, and the pipeline (`sd.build.js`, `sd.config.json`). Run `verify-build`. A green diff is your trustworthy baseline before touching anything.

**During:** make changes per the two-directions rule above. Structural/destructive edits: propose, then write. Verify migrations with a full scan, not a sample.

**End:** update `DECISIONS.md`; `gen`; `check` (must be green); commit. Hand off as a single dated bundle with a one-line manifest — not scattered files.

## First application: retiring the t-shirt spacing scale

The very first move is a **scope decision** — record it in `DECISIONS.md` before doing anything, because it determines where the work happens:

- **spec-only** — document the numbered scale as canonical, t-shirt as deprecated (already done in the spec's Spacing section).
- **Figma** — delete the `semantic-spacing` t-shirt variables once nothing authored references them.
- **repo / emission** — migrate component bindings from `--spacing-{tshirt}` onto `--primitive-spacing-{n}`, then drop the t-shirt emit; full-scan verify.

Hard constraint through all of it: `semantic-flow`, `semantic-spacing`, and `grid-spacing` reference `primitive.spacing` and divide the resolved value by 16 expecting **px**. The shared primitive value must stay **px in the token graph**; rem conversion happens only at emit time. Any migration step that changes this reintroduces NaN / wrong units — the single easiest thing to break.
