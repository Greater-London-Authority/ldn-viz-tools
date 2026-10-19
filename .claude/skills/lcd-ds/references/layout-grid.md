# Layout grid

The spec has no Layout grid section or ADR yet. This file describes the build: `--grid-*` in `tokens.css`, the Layout section of `system.css`, and `container` in the Tailwind preset.

## Two layouts

| Layout | For | Container padding | Gutter class |
| --- | --- | --- | --- |
| Contained | Document-like pages: articles, docs, forms. Centred, with padding that grows with the viewport | Tailwind `container` (from the preset) | `.grid-gutter` |
| Fluid | Dashboards and app shells. Full width, with constant padding | `.container-fluid` | `.grid-gutter-fluid` |

The grid places blocks horizontally. Vertical space between blocks is [flow](flow.md).

## Values

| Breakpoint | Contained padding | Contained gutter | Fluid padding | Fluid gutter |
| --- | --- | --- | --- | --- |
| `base` | 16 | 16 | 16 | 16 |
| `sm` (640) | 32 | 20 | 16 | 16 |
| `md` (768) | 32 | 24 | 24 | 16 |
| `lg` (1024) | 64 | 24 | 24 | 16 |
| `xl` (1280) | 80 | 32 | 24 | 16 |
| `2xl` (1536) | 96 | 32 | 24 | 16 |

Values in px, from `--grid-{breakpoint}-{contained|fluid}-{container-padding|gutter}`.

There are no column-count tokens. Columns are set with Tailwind's grid utilities.

## Use

- Put the padding on the page container, not on components.
- Space between tiled cards or panels is a gutter class, not a `gap-{n}`. `gap-4` matches the fluid gutter but not the contained one at most breakpoints.
- A component's own padding comes from the [spacing scale](spacing.md), whatever grid it sits in.
