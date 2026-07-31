# Migrating a package to the new system

How to sweep a package (e.g. `apps/web`, a component library) off retired classes
and renamed tokens onto the current lcd-ds. Records the mappings AND the footguns
learned doing it — several are not obvious.

## 1. Retired spacing classes → numbered scale

`--typography-spacing-*` and the t-shirt `--spacing-{xxs…9xl}` are **not emitted**.
Rename-by-alias (exact rungs, no re-scaling), preserving the utility prefix:

```
xxs→1  xs→2  sm→3  md→4  lg→5  xl→6  2xl→7  3xl→8  4xl→10  5xl→12  6xl→14  7xl→16  8xl→20  9xl→24
```

`{prefix}-typography-spacing-{size}` → `{prefix}-{n}`. E.g. `!my-typography-spacing-sm`
→ `!my-3`; `pt-typography-spacing-4xl` → `pt-10`.

## 2. Retired typography role classes → new roles

Old t-shirt roles are gone (defined in 0 theme files). Size-rank mapping preserves
the visual hierarchy:

| Old        | New       |     | Old                     | New        |
| ---------- | --------- | --- | ----------------------- | ---------- |
| `title-lg` | `title-1` |     | `body-lg`               | `lead`     |
| `title-md` | `title-2` |     | `body-md`               | `body`     |
| `title-sm` | `title-3` |     | `body-xs`               | `caption`  |
| `title-xs` | `title-4` |     | `label-lg` / `label-md` | `label`    |
|            |           |     | `label-xs`              | `label-sm` |

`body-sm` / `label-sm` are valid new roles — leave them. Dead helpers: **`format`**
(undefined) and **`.responsive`** (no-op — scaling is automatic) should be removed.

## 3. Renamed tokens

- **`chart.background` → `chart.surface`** — token path AND CSS var
  (`--color-chart-background` → `--color-chart-surface`). Update
  `theme.tokenNameToValue('chart.background')` calls and any `--color-chart-background`.
- **`data.categorical.grey` is gone** — the categorical palette dropped grey
  (now blue, darkpink, pink, red, yellow, green, purple, orange, turquoise). For a
  neutral/no-data swatch use **`data.empty`**.
- Always validate a path against `packages/themes/styles/js/color-tokens.js` → `mode.light`.

## 4. The context-wrapper catch (biggest gotcha)

Renaming role classes is **not sufficient on its own**. Role utilities only size
inside a `.prose`/`.product`/`.chart` **ancestor** (selector `.{context} .{role}`).
`flow-prose`/`flow-product` provide rhythm, NOT the type vars. A package with no
context wrapper (e.g. `apps/web` today) needs `.prose` around article/markdown
content and `.product` around chrome (ToC, banners, cards) for any role class —
old or new — to resolve. Treat renames-without-wrappers as a staging step, not a
working state, and say so.

## 5. Tooling footguns (verified the hard way)

- **BSD/macOS `sed` has no `\b`.** Use `perl` for word-boundary substitutions.
- **Never word-remove a common token globally.** Stripping `format` repo-wide
  broke `import { format } from 'd3-format'` and prose ("non web format"). Scope
  class edits to attributes only:
  ```
  perl -0777 -i -pe 's{class="([^"]*)"}{ "class=\"" . join(" ",
    grep { $_ ne "format" && $_ ne "responsive" && length } split(/\s+/, $1)) . "\"" }ge' <files>
  ```
  Role/spacing renames are safe global (hyphenated tokens don't collide with JS/prose).
- **`find | while read` breaks on spaces in paths** (e.g. `SwatchGrid copy.svelte`).
  Use `find -print0 | xargs -0 …` or `-print0 | while IFS= read -r -d ''`.
- **`.postcss`/`.css` `@apply` of a retired class is a hard build error**; the same
  class in plain markup only renders dead (no error). The build flags the former.
- **`.md`/`.svelte` template-literal classes** (`class={`…`}`) and specimen data
  values (`class: 'title-sm'`) need handling too, not just `class="…"`.

## 6. Rebuild what's consumed via dist

After editing source in `@ldn-viz/{charts,ui,utils}`, rebuild it
(`npm run build -w @ldn-viz/<pkg>`; `utils` before `charts`/`ui`) so consumers see
it. The `themes` Tailwind plugin is source-consumed but needs a **dev-server
restart** (Tailwind reads config at load). Then verify: build the app
(`npm run build -w @ldn-viz/<app>`) and grep that no retired class/token remains.

## 7. Verify

```
grep -rnE "typography-spacing-|\b(title|body|label)-(xs|md|lg)\b" src   # → none
grep -rnoE 'class="[^"]*\b(format|responsive)\b' src                     # → none
# validate every tokenNameToValue path resolves against color-tokens.js mode.light
```
