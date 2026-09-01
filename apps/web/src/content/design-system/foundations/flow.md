---
title: Flow
description: Vertical rhythm between stacked blocks
section: Foundations
navLabel: Flow
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-3.svg
---

## Principles

Flow defines the vertical relationship between one block and the next allowing a reader to see at a glance which things belong together and where one part of the page ends and another begins.

### Space and sequence

The space between two blocks results from the sequence they are part of, and the context that the sequence appears in. A container declares which kind of surface it is, and the spacing within it follows from that.

For example a second-level heading needs more space above it when used in a long article than when used in a card on a dashboard.

### Four relationships

There are four **relationships** governing the space between blocks.

| Step        | The relationship it describes                                                                |
| ----------- | -------------------------------------------------------------------------------------------- |
| **Tight**   | Two things that belong together — a caption and its image, a heading and its supporting line |
| **Default** | The ordinary gap between one block and the next, as between two paragraphs                   |
| **Loose**   | Deliberate breathing room, as around a figure, a table or a chart                            |
| **Section** | A major break, as above the heading that begins a new part of the page                       |

### Three contexts

There are three **contexts** corresponding to different types of surface.
The context dictates the spacing values allotted to the four relationships.

| Context     | Intended for                                                      | Tight | Default | Loose | Section |
| ----------- | ----------------------------------------------------------------- | ----- | ------- | ----- | ------- |
| **Prose**   | Long passages of reading — articles, guidance, documentation      | 4px   | 16px    | 24px  | 40px    |
| **Product** | Applications and dashboards, where information is condensed       | 4px   | 8px     | 16px  | 24px    |
| **Compact** | Small self-contained surfaces — toasts, tooltips, alerts, dialogs | 4px   | 4px     | 8px   | 8px     |

Prose is the most generous, because a reading column benefits from air and the page is not competing for space. Product is roughly half as open, because a dashboard is dense.

Compact deliberately collapses the ramp: tight and default are the same, and so are loose and section. This is because the total range is too small (4px - 8px) to enable 4 visually distinct levels.

### Contexts behave differently

A section of prose contains a significant amount of semantic markup (headings, figures, paragraphs, etc.) from which the correct spacing is inferred, so it is not necessary for the document author to specify spacing manually.

In contrast, an application often includes many elements that fulfil different roles, and it is therefore necessary to specify the appropriate relationship to obtain the correct spacing.

### What flow does not govern

Not every gap on a page belongs to flow. Three things determine space:

- **Flow** determines the vertical gaps between blocks that sit one above another.
- **The grid** determines the horizontal gaps between objects — cards in a row, panels side by side. These are set responsively by the [layout grid](/design-system/application-design/layout).
- **The component** determines the space inside its own box: padding, the indent of a list, the space around a border. These come from the [spacing scale](/design-system/foundations/design-tokens).

Sibling blocks are spaced by flow. A card's own padding belongs to the card, and stays the same wherever the card is placed.

If the children of a container are a stack of blocks, their spacing is flow. If they are a structure — the cells of a table, the parts of a button — it is construction, and spacing belongs to the component.

---

## Practice

**This guidance applies to projects using `@ldn-viz/themes` in a project using Tailwind.**

### Setting a context

A context is applied as a class on a containing element.

```html
<article class="flow-prose">…</article>
<section class="flow-product">…</section>
<div class="flow-compact">…</div>
```

The class provides values to the four relationships, setting the appropriate spacing to the elements children.

Contexts can be nested, and the innermost one applies. A toast inside a dashboard can declare `flow-compact` and will space its contents accordingly, regardless of the context of it's ancestors. A component whose spacing must be the same wherever it is placed should declare its own context.

A surface will usually require a type set as well as a flow context. The two are separate systems that share the words _product_ and _prose_:

```html
<section class="flow-product product">…</section>
```

### Reading content spaces itself

Inside `flow-prose`, the spacing follows from the markup. These are the relationships the system recognises:

| Where                                                                   | Relationship |
| ----------------------------------------------------------------------- | ------------ |
| Between any two blocks, as a general rule                               | Default      |
| Above and below a figure, image, table, code block, blockquote or chart | Loose        |
| Above a first- or second-level heading                                  | Section      |
| Above a third- or fourth-level heading                                  | Loose        |
| Between two headings that follow one another                            | Tight        |
| Between a heading and a subtitle or subhead directly beneath it         | Tight        |
| Between an eyebrow and the heading directly below it                    | Tight        |
| Above an eyebrow that introduces a heading                              | Section      |
| Between an image and its caption                                        | Tight        |
| Between list items, and around a nested list                            | Tight        |
| Between a term and its definition in a description list                 | Tight        |
| Between one term-and-definition pair and the next                       | Default      |

<!-- The last entry in the heading group is worth drawing out. When an eyebrow introduces a heading, the major break moves above the eyebrow rather than sitting between them, because the eyebrow is the top of that titling group rather than a stray line before it. -->

An article needs no spacing classes at all:

```html
<article class="flow-prose prose">
	<h2>Air quality</h2>
	<p class="subtitle">Rolling 24-hour mean across twelve sites</p>
	<p>Concentrations fell across every monitored borough during the period…</p>

	<figure>
		<img src="/no2-trend.svg" alt="Nitrogen dioxide concentration, 2019 to 2024" />
		<figcaption>Source: London Atmospheric Emissions Inventory</figcaption>
	</figure>

	<h3>Method</h3>
	<p>Readings are taken hourly and averaged…</p>
</article>
```

### Type roles and spacing

Relationships are determined by a type element's role class. Applying the right typography role produces the right spacing, applying a generic approximation does not.

```html
<!-- Recognised as a heading and its supporting line, and closed up accordingly -->
<h2 class="section-head">Rough sleeping</h2>
<p class="subtitle">Quarterly</p>

<!-- Looks almost identical, but is not recognised, and takes the ordinary gap -->
<h2 class="section-head">Rough sleeping</h2>
<p class="body-sm text-color-text-muted">Quarterly</p>
```

The roles taken into account are the heading elements, the four Title roles, Display, Headline, Page head, Section head, Subtitle, Subhead and Eyebrow.

### In an application, name the relationship

Where nothing can be inferred, say which relationship applies. Four utilities are available, matching the four relationship names.

The `mt-` form goes on the element that needs space above it.

```
mt-flow-tight     mt-flow-default     mt-flow-loose     mt-flow-section
```

```html
<section class="flow-product product">
	<h2 class="section-head">Monitoring sites</h2>
	<p class="subtitle">Twelve active sensors</p>

	<div class="mt-flow-section">
		<!-- a further part of the section, deliberately set apart -->
	</div>
</section>
```

The `gap-` form goes on a flex or grid container to space its children, and should be used on a container that is not itself a flow context — a context already spaces its children, so doing both produces twice the gap.

```
gap-flow-tight    gap-flow-default    gap-flow-loose    gap-flow-section
```

```html
<section class="flow-product product">
	<h2 class="section-head">Monitoring sites</h2>
	<p class="subtitle">Twelve active sensors</p>

	<div class="mt-flow-section flex flex-col gap-flow-tight">
		<!-- a further part of the section, deliberately set apart with a tight flow-->
	</div>
</section>
```

A relationship named by the author always takes precedence over one the system would have inferred. There is no need to raise specificity or use `!important` to override the automatic spacing.

**Note** `mt-flow-section` produces a different gap in a prose context than in a product one: the element keeps its relationship to what precedes it, and the surface decides how far that is.

If a gap needs to be a fixed size regardless of surroundings, it is not flow — it is construction.

### Space inside a component

Padding, border widths, list indents and cell padding come from the numbered spacing scale, where the number is the multiplier of a four-pixel unit — `p-4` is sixteen pixels. These are described under [design tokens](/design-system/foundations/design-tokens).

In practice most interior spacing settles on five values:

| Class | Value | Typical use                                |
| ----- | ----- | ------------------------------------------ |
| `1`   | 4px   | Fine separation within a control           |
| `2`   | 8px   | Compact interior padding, dense components |
| `4`   | 16px  | The ordinary padding of a card or panel    |
| `6`   | 24px  | More generous interior padding             |
| `8`   | 32px  | Large surfaces and page-level insets       |

### A worked example

A section of a dashboard: a heading, a supporting line, a row of chart cards, and a source note.

Written by hand, it might look like this:

```html
<div class="flex flex-col gap-6">
	<div>
		<h2 class="section-head mb-1">Rough sleeping</h2>
		<p class="body-sm text-color-text-muted">Quarterly</p>
	</div>
	<div class="grid grid-cols-3 gap-4">
		<!-- cards -->
	</div>
	<p class="caption mt-2">Source: CHAIN</p>
</div>
```

There are four chosen numbers here, none of which is wrong exactly, and none of which will follow if the system is adjusted.

The wrapper exists only to hold a margin. The trailing margin adds to the parent's gap rather than replacing it, so the actual space beneath the grid is the sum of two decisions made separately. And the heading and its supporting line are joined by a margin rather than being recognised as a pair.

Using the system:

```html
<section class="flow-product product">
	<h2 class="section-head">Rough sleeping</h2>
	<p class="subtitle">Quarterly</p>

	<div class="grid-gutter-fluid mt-flow-section grid grid-cols-3">
		<!-- cards -->
	</div>

	<p class="caption">Source: CHAIN</p>
</section>
```

The wrapper has gone. The subtitle is recognised as a supporting line and closes up to its heading. The gap beneath the grid is the ordinary one. The gutter between cards comes from the layout grid and adjusts with the viewport. One relationship is stated explicitly, for the one gap nothing could infer.

### Things to watch for

**A wrapping element interrupts the spacing.** The relationships apply between elements that are direct children of the container that declares the context. A `div` wrapped around two of them takes their place in the sequence, and their spacing is removed from the flow. This is the most common reason flow appears not to work. Remove the wrapper unless it is a genuine unit, such as a figure and its caption.

**Space above a first element has nothing to sit between.** Applying a relationship to the first child of a container has no visible effect, and may push the whole container down rather than its contents. Apply space to the element that needs it above.

**A context class and a gap utility on the same element will double the space.** The context already separates that element's children. Use one or the other.

**Use the `mt-` and `gap-` forms.** Other margin directions are generated by the theme's configuration but are not part of the system, and horizontal space is not flow's to give.

**There are no padding utilities for the four relationships.** Padding is a component's own space, and comes from the spacing scale.

**`product` and `flow-product` are different classes.** The first sets the type set; the second sets the spacing. Most application surfaces want both.

**A chart is both a typography context and a set-apart block.** The `chart` class names a type set, and it also marks an element that should be given room above and below it in a flow. A chart in an article legitimately wants both. This is intentional rather than a conflict.

**Figures beside metrics look closer than they are.** Metrics use a tightened line height so that numerals align with their labels, so the visible gap beneath a metric is smaller than beneath a paragraph at the same setting. The spacing is correct; the line box is smaller.
