# Layout grid

Rules: [0017](../../../../design-system-specification/decisions/0017-layout-grid.md). Build: `--grid-*` in `tokens.css` and the Layout section of `system.css`. The spec's Layout grid section has the generated table of values.

## Two layouts

| Layout | For | Container |
| --- | --- | --- |
| Contained | Document-like pages: articles, docs, forms. Centred, with padding that grows with the viewport | `.container` |
| Fluid | Dashboards and app shells. Full width, with constant padding | `.container-fluid` |

The space between tiled blocks, such as cards, is the default [flow](flow.md) step of the context: put `gap-flow` on the grid. A row of cards and a stack of cards are then spaced alike, and both follow the context's density. There are no gutter classes or tokens.

## Values

| Breakpoint | Contained padding | Fluid padding |
| --- | --- | --- |
| `base` | 16 | 16 |
| `sm` (640) | 32 | 16 |
| `md` (768) | 32 | 24 |
| `lg` (1024) | 64 | 24 |
| `xl` (1280) | 80 | 24 |
| `2xl` (1536) | 96 | 24 |

Values in px, from `--grid-{breakpoint}-{contained|fluid}-container-padding`.

There are no column-count tokens. Columns are set with Tailwind's grid utilities.

## Use

- Put the padding on the page container, not on components.
- Space between tiled cards or panels is `gap-flow`, not a `gap-{n}`, so it follows the context.
- A component's own padding comes from the [spacing scale](spacing.md), whatever grid it sits in.
