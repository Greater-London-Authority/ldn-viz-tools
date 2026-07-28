# Token architecture & naming

Distilled from *token-architecture-and-naming.md*, the spec's *Primitive Scale*,
*Generative Logic*, *Line Height Scale*, and *Extending the System*. The naming
doc is the canonical reference for exact keys.

## Two tiers (the third was fiction)

**Primitive → Semantic.** Components bind to **semantic only** — never primitives,
never raw hex. The primitive layer is the closed, finite part (17 font-size steps,
4 weights, one spacing scale, the palette); the semantic layer above is open-ended
and meant to grow.

## Build pipeline

Style Dictionary builds emitted output from token source:
`packages/themes/tokens/design-tokens.tokens.json` + `sd.config.json` + `sd.build.js`
→ `packages/themes/styles/*.css`, `styles/js/color-tokens.js`, `styles/tw-extend/*.cjs`.
`outputReferences: true` is on for typography, so aliases emit as `var(...)`
references rather than restated values. The Tailwind plugin in
`tailwind-custom/typography/*.cjs` consumes the emitted primitives to build role
utilities and contexts.

## Primitive font-size scale (17 steps, step 0 = 16px)

Two-region: a doubling-chain upper half (12→24→48, 14→28→56, 16→32→64, 18→36,
20→40) + a dense near-constant-ratio lower half (12→14→16→18→20→22→24→26→28→30→32).
Hand-placed exceptions: 22, 26, 30, 76. Steps −2…14 = 12,14,16,18,20,22,24,26,28,
30,32,36,40,48,56,64,76.

## Line-height — two policies by role

- **Grid leading** (most roles): rounded to the 4px grid. A *reference for
  authoring*, not a cascade participant — emitted line-height is a computed
  **unitless ratio**, never a `var()` to a px value.
- **Reading leading** (prose body only): `prose body` 16→26 (1.625),
  `prose body-sm` 14→22 (1.571). Product `body`/`body-sm` keep grid leading
  (24/20) for denser UI. The three aliased chart object roles reference their
  product source for line-height too.

## Weights (Inter, 4 weights, named not numeric)

`--primitive-typography-font-weight-{regular|medium|semi-bold|bold}` = 400/500/600/700.
Note the emitted spelling **`semi-bold`** (hyphenated) — there is no `-semibold`.
Identity weight is bundled into a role; emphasis weight rides on top
(`.text-strong`/`.text-soft`). See `references/typography.md`.

## Semantic typography keys

Roles are keyed by **context family** — `Product/*`, `Prose/*`, `Chart/*` — with
no cross-mixing (the context prefix dictates the family). Exact role keys live in
the naming doc §"Roles by family". Object-tier chart roles alias product roles
(`chart/title` → `product/title`) — the only semantic→semantic aliasing; everything
else aliases primitives.

## Runtime resolution — `tokenNameToValue`

`packages/utils/src/colors/tokenNameToValue.ts`. Walks a dotted path (`chart.surface`,
`data.primary`) against a theme tree, with a `.default` fallback per segment:

```
for part of name.split('.'):
  if val[part]            -> descend
  else if val.default?.[part] -> descend via default
  else                    -> console.error + return undefined   // guarded; does NOT throw
```

Exposed as `theme.tokenNameToValue(name)` and `theme.currentTheme`
(`packages/ui/src/lib/theme/themeState.svelte.ts`), where `currentTheme` is
`color-tokens.js`'s `mode[light|dark]`. **Validate a path** against
`packages/themes/styles/js/color-tokens.js` → `mode.light`.

> History: it previously threw on a missing `.default`, which blanked whole charts.
> Now it degrades. Don't rely on the throw; a missing token = wrong/absent value
> + a console error.

## Extending the system (work in order before adding anything)

1. Assume it's a **naming** problem, not a missing token — check the UI→role mapping.
2. Decide **size gap vs axis gap** — most gaps are an existing role at a different
   weight/colour, not a new size.
3. If genuinely a new size, the 17 steps already contain it — assign a role.
4. A new role must earn a **one-sentence job** ("the h3 depth in prose"). "Like
   Body but bigger" is emphasis/context, not a role.
5. Add at the **semantic layer, once, centrally** — never a new primitive step for
   a single-surface need.
6. Name in the context's register: product roles are **structural/generic**
   (`Title`, not `CardTitle`); chart roles are **anatomical/specific** (`Chart Tick`).
   A new *family* needs both divergent values AND standalone consumption (chart passes; most don't).

To change the spec itself, follow `design-system-specification/SPEC-CHANGE-PROTOCOL.md`
(and log rulings in `DECISIONS.md`).
