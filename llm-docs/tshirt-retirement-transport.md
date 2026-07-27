# Thread transport — retiring the t-shirt spacing scale

_Hand-off for a fresh, dedicated thread. Load the artifacts below, decide scope first, then start from "The plan". Ground truth beats memory — re-derive from the uploaded files and reproduce the build before changing anything._

---

## The governing decision (settled 2026-07-24)

Components and authored CSS bind to a **thin semantic layer only** — **never** to `--primitive-*`. The primitive scale stays private to the token graph. The public handles are:

- **`--spacing-{n}`** — a consumption alias emitted as `var(--primitive-spacing-{n})` (same mechanism as colour's `outputReferences`). This is the numbered semantic layer; it is authored in **Figma too, for parity**.
- **`mt-{n}` / `p-{n}` / …** — Tailwind utilities that compile to `var(--spacing-{n})`. So `mt-2` ⇒ `margin-top: var(--spacing-2)`. Never `mt-primitive-spacing-2`, never `var(--primitive-spacing-2)` in dev-facing output.
- **`flow` / `grid-spacing`** — the *named* semantic spacing roles (vertical rhythm; layout structure). These already exist and are the meaningful spacing vocabulary.

**No new named spacing-role set** (`--space-inset`, `--space-stack-*`, …) beyond `flow` / `grid-spacing` — that is the token-explosion risk this decision exists to resist. A 1:1 numbered alias carries no decisions and is free; a named role must earn a one-sentence job that flow/grid don't already cover. Default: no.

Tiers, end to end:

```
--primitive-spacing-{n}   (private; px in graph)
        │  var()
        ▼
--spacing-{n}             (public alias; the thin layer; in Figma for parity)   +   flow / grid-spacing (named roles)
        │                                                                            │
        ▼                                                                            ▼
mt-{n} / p-{n} / …         (what a dev writes)                                   .flow-* / grid utilities
```

Net effect on the migration: the `--spacing-*` namespace is **re-based, not deleted** — it currently holds t-shirt words (`xxs…9xl`); it ends holding numbered aliases (`1…24`). The `--spacing-*` convention and `mt-{n}` muscle memory survive; only the internal source and the deprecated t-shirt *names* change.

---

## Decide first — scope (this picks the *kind* of thread)

- **Pipeline / Figma (prerequisite, user in progress).** Author the `--spacing-{n}` semantic collection in Figma referencing `primitive.spacing`; emit it as `--spacing-{n}: var(--primitive-spacing-{n})`; point the Tailwind spacing extend at the alias. Doable in a **sandbox thread** with the Desktop Bridge ("Design System ver 3.1", port 9223), or by the user directly.
- **Repo / components (the migration).** Rebind consumers off the t-shirt tokens onto `--spacing-{n}` / `mt-{n}`, then drop the t-shirt emit. This is **Claude Code work with repo access** — a sandbox thread cannot do it, only produce the plan (this doc).
- **Spec** is documented; it needs a light update once the alias emits (below).

If the goal is the component cutover, open a **Claude Code** thread against ldn-viz. Say which scope and the thread scopes itself.

---

## Load these (canonical set)

1. **`DECISIONS.md`** (2026-07-24) — standing decisions incl. the governing decision above (user is adding it).
2. **`token-architecture-and-naming.md`** — §2 (numbered scale + locked sub-step spellings) and §5 (phased retirement). Note §5's "thin semantic alias" option is now *the* path, not an alternative.
3. **`design-system-specification.md`** — the reconciled, `GEN`-marked spec.
4. **`SPEC-CHANGE-PROTOCOL.md`** + **`regen_spec.py`** — guardrails (`verify-build` / `gen` / `check`).
5. **Pipeline (NOW-FIXED, alias-emitting state):** `sd.build.js`, `sd.config.json`, latest `design-tokens.tokens.json` export (with the `--spacing-{n}` alias + Figma parity layer), emitted `styles/`, and `tw-extend/`.

First action: reproduce the SD build (style-dictionary@5.5.0, export under `./tokens/`) and `verify-build` against shipped `styles/` for a zero-diff baseline. **Then confirm the alias actually emits** (`--spacing-{n}: var(--primitive-spacing-{n})` present; Tailwind `mt-{n}` resolves to `var(--spacing-{n})`) before migrating anything — the migration target must exist first.

---

## State carried (so the new thread doesn't rediscover it)

- **Numbered primitive emits** — step 1 done: `--primitive-spacing-{n}` (0–96) + sub-steps `-px`, `-0-5`, `-1-5`, `-2-5`, `-3-5` in `primitive-scale.css`.
- **T-shirt scale still emits alongside** (expected during the window): `spacing.css` carries **14 `--spacing-{xxs…9xl}` rem tokens** *and* **14 `--typography-spacing-{xxs…9xl}` em tokens**. Tailwind: `tw-extend/spacing.cjs` (t-shirt) + `tw-extend/primitive-spacing.cjs` (numbered) both emit.
- **No key collision during the window.** Word-keyed t-shirt tokens (`--spacing-md`) and number-keyed aliases (`--spacing-4`) share the `--spacing-*` namespace but not keys, so they coexist safely until the word set is dropped.
- **Build is deterministic, zero-diff reproducible** (2026-07-24).

### Migration mapping (dev-facing: t-shirt → public alias `--spacing-{n}` / `mt-{n}`)

| t-shirt | value | → alias / utility | (alias resolves to) |
|---|---|---|---|
| `--spacing-xxs` | 4px  | `--spacing-1`  / `mt-1`  | `var(--primitive-spacing-1)` |
| `--spacing-xs`  | 8px  | `--spacing-2`  / `mt-2`  | `var(--primitive-spacing-2)` |
| `--spacing-sm`  | 12px | `--spacing-3`  / `mt-3`  | `var(--primitive-spacing-3)` |
| `--spacing-md`  | 16px | `--spacing-4`  / `mt-4`  | `var(--primitive-spacing-4)` |
| `--spacing-lg`  | 20px | `--spacing-5`  / `mt-5`  | `var(--primitive-spacing-5)` |
| `--spacing-xl`  | 24px | `--spacing-6`  / `mt-6`  | `var(--primitive-spacing-6)` |
| `--spacing-2xl` | 28px | `--spacing-7`  / `mt-7`  | `var(--primitive-spacing-7)` |
| `--spacing-3xl` | 32px | `--spacing-8`  / `mt-8`  | `var(--primitive-spacing-8)` |
| `--spacing-4xl` | 40px | `--spacing-10` / `mt-10` | `var(--primitive-spacing-10)` |
| `--spacing-5xl` | 48px | `--spacing-12` / `mt-12` | `var(--primitive-spacing-12)` |
| `--spacing-6xl` | 56px | `--spacing-14` / `mt-14` | `var(--primitive-spacing-14)` |
| `--spacing-7xl` | 64px | `--spacing-16` / `mt-16` | `var(--primitive-spacing-16)` |
| `--spacing-8xl` | 80px | `--spacing-20` / `mt-20` | `var(--primitive-spacing-20)` |
| `--spacing-9xl` | 96px | `--spacing-24` / `mt-24` | `var(--primitive-spacing-24)` |

Every value is an exact rung — a clean rename-by-alias, no re-scaling. **Devs never touch the right-hand column.**

### The em set is the one wrinkle (do not blind-map it)

`--typography-spacing-{xxs…9xl}` are **em-relative** (`0.25em…6em`), not rem — they do **not** map onto `--spacing-{n}` (rem). Their only known consumer was `format.cjs`, which is **retired** (DECISIONS 2026-07-21; refs already dangling). Probably dead — confirm with a **full repo scan** before dropping. If anything live uses em-relative spacing, that's a separate decision.

---

## The plan (canonical §5, alias variant)

1. **Numbered primitive emits** — ✅ done.
2. **Alias layer emits** — `--spacing-{n}: var(--primitive-spacing-{n})`, authored in Figma for parity, Tailwind spacing extend repointed to `var(--spacing-{n})` and wired into `ldn-theme.cjs`. (User setting up the pipeline; the new thread **verifies** it before step 3.)
3. **Migrate consumers** off `--spacing-{xxs…9xl}` and the t-shirt Tailwind utilities onto `--spacing-{n}` / `mt-{n}` using the table above. Repo work. **Full scan** for every consumer (components, `.cjs`, Storybook, hand-written CSS) — not a sample.
4. **Drop the t-shirt emit + names** — remove the t-shirt tokens from `sd.config.json` / `sd.build.js` and unwire `tw-extend/spacing.cjs` once the scan shows zero references; delete the t-shirt `semantic-spacing` names in Figma; handle the em set per the wrinkle. **Full-scan verify**, then rebaseline.

Tag every action **Figma / spec / repo** as you go.

---

## Constraints & gotchas (do not forget)

- **The alias must reference, never restate.** `--spacing-{n}` is `var(--primitive-spacing-{n})` — a pure reference (colour's `outputReferences` pattern). It touches no values, so it **sidesteps the px-in-graph landmine**: the primitive keeps its px value for `flow` / `grid-spacing` to divide by 16, and the alias just forwards the name.
- **px-in-graph (still the easiest thing to break).** `semantic-flow`, `semantic-spacing`, `grid-spacing` reference `primitive.spacing` and ÷16 expecting **px**. The shared primitive stays **px in the graph**; rem conversion only at emit time. Don't let the alias work perturb this.
- **Tailwind key gotcha.** Spacing *keys* must be bare numbers so classes render `mt-2` — map `{ '2': 'var(--spacing-2)', '4': 'var(--spacing-4)', … }`, **not** the primitive name (keying on `primitive-spacing-2` gives the ugly `mt-primitive-spacing-2` you're avoiding). Point the extend at the **alias**, so compiled output is `var(--spacing-2)`, not `var(--primitive-spacing-2)`.
- **Sub-step dot/dash boundary.** The class is `mt-1.5` (Tailwind's dot) but the var is `--spacing-1-5` (dashes; dots invalid in idents) → `var(--primitive-spacing-1-5)`. Map these explicitly (`'1.5': 'var(--spacing-1-5)'`, `'0.5'`, `'2.5'`, `'3.5'`, `'px'`) or `mt-1.5` silently won't resolve.
- **Rebaseline after intended drops.** `verify-build`'s zero-diff holds only while emitted output is unchanged. Adding the alias and later dropping the t-shirt emit *legitimately* change the output — review, accept, re-baseline. The harness is for catching *unintended* changes.
- **Spec + regen follow-up.** Once the alias emits, update the spec's Spacing Scale section to document the public `--spacing-{n}` layer (+ `mt-{n}`), keep the primitive shown as private, and add/adjust a `regen_spec.py` managed block + `PINNED` entry so `check` covers the alias. Then update `DECISIONS.md` (t-shirt retired).
- **Full scan, not a sample**, for both the consumer inventory (step 3) and pre-drop verification (step 4).

## Working stance (unchanged)

Propose-then-write on destructive/structural edits; read-only recon first; reproduce the build in-sandbox; verify migrations with a full scan; build from ground truth (re-read IDs/artifacts before encoding). Figma file "Design System ver 3.1", Desktop Bridge port 9223 — verify IDs are live before relying on them.
