# Token architecture & naming — canonical reference

_This is the authoritative naming rule for the GLA / ldn-viz design system. Every name here is verified against the live emitted output of the Figma → Style Dictionary → Tailwind-cjs pipeline (build reproduced in-sandbox, deterministic, zero-diff vs shipped `styles/`). Names not in this document are not real. Where a name is marked **(to emit)** it does not ship yet and is specified here as the target._

**Governing rule (unchanged from DECISIONS):** the emitted SD/cjs grammar is authoritative; the spec is remapped to it, never the reverse. Components bind to **semantic roles only** — never primitives, never raw values.

---

## 1 · The three tiers (and the one that was fiction)

Typography, spacing, and colour all resolve through the same shape. The spec previously described a two-tier `primitive → semantic` model for typography using names (`--fs-*`, `--lh-*`) that **do not exist in the pipeline** — font-size and line-height were never primitives; they were resolved literals inside each semantic token. That fiction is retired here. Going forward the model is real and uniform, matching what colour already ships.

| Tier | What it is | Who authors it | Who consumes it |
|---|---|---|---|
| **Primitive** | mode-invariant scales (colour ramp, font-weight, font-size steps, line-height grid, numbered spacing, breakpoints) | Figma | referenced *by semantics only*, never by components |
| **Semantic (emitted)** | per-mode role tokens; the value source | Figma modes → SD | the cjs layer |
| **Consumption (cjs)** | breakpoint-resolved locals + author-facing utilities | cjs | components / authors |

The colour proof that this works in this exact pipeline: `--color-surface: var(--primitive-color-mode-light-base, #ffffff)` — semantic references primitive via `var()`, literal as fallback. Typography and spacing are being brought onto this same pattern (§4, §5).

---

## 2 · Primitives — the real names

### Shipping today

| Name | Value |
|---|---|
| `--primitive-typography-font-family` | `Inter` |
| `--primitive-typography-font-weight-light` | `300` |
| `--primitive-typography-font-weight-regular` | `400` |
| `--primitive-typography-font-weight-medium` | `500` |
| `--primitive-typography-font-weight-semi-bold` | `600` |
| `--primitive-typography-font-weight-bold` | `700` |
| `--primitive-breakpoint-sm` / `-md` / `-lg` / `-xl` / `-2xl` | `640` / `768` / `1024` / `1280` / `1536` |
| `--primitive-color-*` | palette + per-mode colour refs (unchanged) |

Note the exact spellings: **`semi-bold`** is hyphenated; there is no `--primitive-typography-font-weight-semibold`. There is **no** `--fw-*`, **no** `--primitive-typography-font-size-*`, and **no** `--primitive-typography-line-height-*` shipping today.

### Font-size scale — **(to emit)**

Replaces the phantom `--fs-*`. **Named by px value**, not by ordinal — self-documenting and unambiguous. Emit as `:root` custom properties, value in rem (`px / 16`).

```
--primitive-typography-font-size-12  0.75rem     --primitive-typography-font-size-30  1.875rem
--primitive-typography-font-size-14  0.875rem    --primitive-typography-font-size-32  2rem
--primitive-typography-font-size-16  1rem        --primitive-typography-font-size-36  2.25rem
--primitive-typography-font-size-18  1.125rem    --primitive-typography-font-size-40  2.5rem
--primitive-typography-font-size-20  1.25rem     --primitive-typography-font-size-48  3rem
--primitive-typography-font-size-22  1.375rem    --primitive-typography-font-size-56  3.5rem
--primitive-typography-font-size-24  1.5rem      --primitive-typography-font-size-64  4rem
--primitive-typography-font-size-26  1.625rem    --primitive-typography-font-size-76  4.75rem
--primitive-typography-font-size-28  1.75rem
```

`13` (old `--fs-n2`) is **retired** — no role uses it now that caption is 12. Do not emit it.

### Line-height grid — **(to emit, reference only)**

Replaces the phantom `--lh-*`. This grid is a **reference for grid-leading roles only** (§6); it is **not** a CSS-cascade participant, because emitted line-height is a computed unitless ratio, not a `var()` to a px value. Emit for documentation / Figma authoring if desired; semantics do **not** reference it.

```
16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80   (px, 4px-grid)
```

Name (if emitted): `--primitive-typography-line-height-{px}`.

### Numbered spacing scale — **(to emit; supersedes the t-shirt scale, §5)**

Replaces the phantom `--sp-*`. Index × 4px. Name `--primitive-spacing-{n}`, value in rem.

- Whole steps: `0 1 2 3 4 5 6 7 8 9 10 11 12 14 16 20 24 28 32 36 40 44 48 52 56 60 64 72 80 96` → px = `4 × n` (`-4` = 16px = `1rem`).
- Sub-steps (dots are invalid in CSS idents — **lock these spellings**): `--primitive-spacing-px` = 1px, `--primitive-spacing-0-5` = 2px, `--primitive-spacing-1-5` = 6px, `--primitive-spacing-2-5` = 10px, `--primitive-spacing-3-5` = 14px.

---

## 3 · Semantic typography (emitted) — the value layer

Grammar: **`--typography-{mode}-{family}-{role}-{prop}`**

- **mode** — `base` · `sm` · `md` · `lg` · `xl` (Figma variable modes = breakpoints; there is a `base` prefix, not a bare/unprefixed set).
- **family** — `prose` · `product` · `chart` (no cross-mixing; component context prefix dictates family).
- **prop** — `font-family` · `font-size` · `font-weight` · `line-height` · `letter-spacing`, plus `space-before` (prose only). One special case: prose readable width emits as `--typography-{mode}-prose-readable-width` (no prop suffix).

`font-size` emits rem + a `/* px */` comment; `line-height` emits a **unitless ratio** (`lh_px / fs_px`, 4 dp); the rest emit their raw value.

### Roles by family (exact keys)

| Family | Roles |
|---|---|
| `prose` | `display` · `headline` · `subhead` · `title-1` · `title-2` · `title-3` · `title-4` · `subtitle` · `lead` · `body` · `body-sm` · `caption` · `eyebrow` (+ `readable-width`) |
| `product` | `dashboard-head` · `section-head` · `card-panel-title` · `card-panel-subtitle` · `card-panel-eyebrow` · `metric` · `metric-sm` · `body` · `body-sm` · `label` · `label-sm` · `caption` |
| `chart` | `axis-title` · `label` · `tick` · `tick-sm` |

Example (verified): `--typography-base-prose-caption-font-size: 0.75rem; /* 12px */`.

### **(to emit)** — reference the font-size primitive

Turn on `outputReferences` for the typography platform so each role's `font-size` emits as a reference, matching colour:

```
--typography-base-prose-display-font-size: var(--primitive-typography-font-size-40, 2.5rem);
```

Line-height stays computed-unitless (no reference — see §6).

---

## 4 · Consumption layer (cjs) — locals & utilities

The responsive mechanism lives here, **not** in the spec's `@media` block. `responsive.cjs` reads the per-mode SD vars and re-exposes each under a breakpoint-agnostic local; `roles.cjs` / `semantics.cjs` bind those locals to author-facing utilities.

- **Resolved local:** `--{role}-{prop}` — e.g. `--body-font-size`, `--display-line-height`, `--dashboard-head-font-size`, `--label-sm-line-height`. Prose readable width resolves to `--prose-max-width`.
- **Author utility (domain language):** the bare role name — `body`, `caption`, `display`, `title-1`…`title-4`, `subhead`, `subtitle`, `lead`, `eyebrow`, `dashboard-head`, `section-head`, `card-panel-title`, `card-panel-subtitle`, `card-panel-eyebrow`, `metric`, `metric-sm`, `label`, `label-sm`, `axis-title`, `tick`, `tick-sm`.

The role domain-language is canonical at every tier — it is the `{role}` segment of the emitted var, the resolved local, and the utility name. This is the part of the old spec language that was always real and is kept verbatim.

---

## 5 · Spacing — Option B (numbered), aligned to colour

**Decision:** the numbered primitive scale (§2) becomes canonical; the semantic t-shirt scale is retired. This follows the colour pattern and the DECISIONS deprecation direction.

Current shipped reality (being retired): `--spacing-{xxs xs sm md lg xl 2xl 3xl 4xl 5xl 6xl 7xl 8xl 9xl}` and the parallel em set `--typography-spacing-{…}`. These are the **only** spacing vars that emit today; the numbered scale currently emits nothing.

Sequenced migration (phased; the emit/migrate steps are repo work):

1. **Figma (top of pipeline):** author `primitive/spacing/{n}` as real variables (they exist as values but must be exposed for emit).
2. **SD:** widen the primitive filter — it currently excludes `type: 'spacing'` — to emit `--primitive-spacing-{n}` (§2 spellings). Emit alongside, not instead of, the t-shirt scale during the window.
3. **Components:** migrate bindings from `--spacing-{tshirt}` to `--primitive-spacing-{n}` (or a thin semantic alias if a semantic spacing layer is wanted; if so it must reference the numbered primitive via `var()`, never restate values).
4. **Drop** the t-shirt emit once no consumer references it. Full-scan verify before removal.

Until step 4, treat `--primitive-spacing-{n}` as **canonical** and `--spacing-{tshirt}` as **deprecated-but-live**. The spec documents the numbered scale as the scale; it must not present `--sp-*`.

Unaffected: `--grid-spacing-{mode}-{contained|fluid}-{container-padding|gutter}` (layout grid) and `.flow-{context}` (§7) are separate systems and keep their names.

---

## 6 · Line-height — two-policy model (the rule)

Line-height is **not** a single generated scale. Two policies, assigned by role:

**Grid leading** — 4px-aligned, drawn from the line-height grid (§2). Applies to structural roles that stack against grid-aligned neighbours: all prose headings (`display`, `headline`, `subhead`, `title-1…4`, `subtitle`), `caption` (both families), all `product` roles (including `product/body` 1.5 and `product/body-sm` 1.429), and `chart/axis-title` + `chart/label`. Tight (`1.0`) is the grid-leading endpoint for single-line roles: `chart/tick`, `chart/tick-sm`, and the tight-label variants.

**Reading leading** — a small set of unitless ratios for prose text that flows in a column and wants font-relative comfort the 4px grid can't express. Applies to **exactly two roles**, prose-context only:

| Role | fs | lh | ratio |
|---|---|---|---|
| `prose/body` | 16 | 26 | **1.625** |
| `prose/body-sm` | 14 | 22 | **1.571** |

`prose/lead` (22 → 32) is reading-tier by intent but its line-height lands on the grid at 32, so no off-grid value is needed. Product body/body-sm deliberately use grid leading (denser UI), which is why the nudge is described as prose-only.

Rationale for keeping these off the grid rather than snapping to 28/24: 16→28 is 1.75 (too airy for body), and the grid has no 26 (1.625) step between 24 and 28 — a 4px-quantised grid structurally cannot express ~1.6 reading leading on a 16px body. Naming reading-leading as its own ratio policy removes the "outlier" framing: these roles are on the reading scale, not off the grid. Emitted line-height remains unitless for all roles, so this needs no new machinery.

---

## 7 · Other systems (names unchanged, listed for completeness)

- **Flow:** `.flow-prose` / `.flow-product` / `.flow-compact`, each defining `--flow-tight` · `--flow-default` · `--flow-loose` · `--flow-section`. Vertical rhythm consolidates on flow (the retired `format` mechanism is gone).
- **Grid spacing:** `--grid-spacing-{base|sm|md|lg|xl|2xl}-{contained|fluid}-{container-padding|gutter}`.
- **Colour semantic groups:** `--color-{text|label|surface|container|canvas|border|inverse|static|data|chart|geo|interactive|palette}-*`. Semantics reference `--primitive-color-*` via `var()` — the model §1–§4 brings typography and spacing onto.

---

## 8 · Work split

| Change | Owner | Session |
|---|---|---|
| Author `primitive/font-size/{px}`, `primitive/line-height/{px}` (reference), numbered `primitive/spacing/{n}`; repoint semantic roles to alias fs per mode; author lh per the two policies | Figma (you) | now |
| Widen SD primitive filter to emit fs + spacing primitives; `outputReferences` on typography; migrate components off t-shirt spacing; then drop t-shirt emit | repo / Claude Code | deferred (no repo access this session) |
| Purge phantom names from the spec; document primitives as the real generative source; two lh policies; generated CSS appendix | spec | this session |

Nothing here changes a shipped value. The only value decisions already made and verified live: caption 12, eyebrow tracking 0 (casing on hold), prose body/body-sm reading leading 26/22, chart tick/tick-sm default density 14/12.
