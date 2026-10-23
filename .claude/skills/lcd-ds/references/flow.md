# Flow

Spec section: Flow. ADRs: [0005](../../../../design-system-specification/decisions/0005-flow.md), [0016](../../../../design-system-specification/decisions/0016-flow-in-system-css.md).

Code: `flow` and `flowRoles` in `packages/themes/sd/system.config.js`. Output: the Flow contexts, Flow rules and Flow utilities sections of `system.css`.

## Contexts and steps

Flow is the vertical space between blocks. A flow context sets a value for each of four steps:

| Step | Utility | `flow-spacious` | `flow-standard` | `flow-compact` |
| --- | --- | --- | --- | --- |
| `tight` | `.mt-flow-tight` | 4 | 4 | 4 |
| `default` | `.mt-flow` | 16 | 8 | 4 |
| `loose` | `.mt-flow-loose` | 24 | 16 | 8 |
| `section` | `.mt-flow-section` | 40 | 24 | 8 |

Values in px. A step names how closely two blocks are related, and the context sets the distance.

`typeset-longform` sets `flow-spacious`, and `typeset-product--formatted` sets `flow-standard`. `typeset-product` sets no flow. Outside any context, the steps take the standard values from `:root`.

In `flow-compact`, `tight` and `default` are equal, and so are `loose` and `section`. That is intended.

## Which step each child gets

A context spaces only its direct children. It sets their vertical margins to zero, then sets a top margin on each child after the first:

| Child | Step above it |
| --- | --- |
| Any child | `default` |
| `figure`, `img`, `table`, `pre`, `blockquote`, `.chart`, and the child after one | `loose` |
| `h1`, `h2`, `display-*`, `headline-*`, `.dashboard-main-title`, `.dashboard-section-title` | `section` |
| `h3` to `h5`, `title-*`, and the title aliases (`.card-title`, `.chart-title`, `.table-title`, `.header-title`, `.sidebar-title`) | `loose` |
| A heading straight after another heading | none |
| A `subhead-*`, `subtitle-*` or subtitle alias straight after a heading | none |
| A heading straight after an `.eyebrow` | none |
| An `.eyebrow` before a headline or display | `section` |
| A `caption-*` class or `.chart-note` straight after a block object | `tight` |

Inside those children, list items, nested lists, `figcaption` in a `figure` and `dd` get `tight`. In a typeset with content styles, a table `caption` is `tight` above its table. A `dt` gets `default`, except the first.

The rules match role classes and elements. A muted `body-sm` under a heading looks like a subtitle but gets `default`. Use `subtitle-*` and it sits directly under the heading, as the parts of a title group do.

`.sr-only`, `[hidden]` and `template` children are skipped, and nothing is spaced from them.

## Utilities

`mt-flow-{step}` sets the space above one element and replaces the step the rules gave it. It works by exclusion: every rule skips an element with an `mt-flow` class.

`gap-flow-{step}` sets the gap between children of a flex or grid container.

Both resolve against the nearest context, and their names don't include the context.

## Things to avoid

- A wrapper `div` between the context and the blocks. Flow spaces direct children only, so the blocks inside the wrapper get no space.
- `mt-flow-*` on a first child. There is nothing above it to space from, and its margin can collapse through the parent.
- A flow context and `gap-flow-*` on the same element. The margin and the gap add together.

## Components

Flow spaces only direct children, so outer flow spaces a component's root and goes no further. No class is needed to seal a component. A component declares its own context only to set the density of its own children, and then keeps that density wherever it is placed.
