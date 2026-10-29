---
title: Accessibility
description: Ensuring our work is useful for everyone
navLabel: Accessibility
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-1.svg
order: 9
---

<script>
	import { Button } from '@ldn-viz/ui';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
</script>

<p class="lead">We are dedicated to creating inclusive and accessible digital experiences for all users. Accessible, inclusive design is closely related to usability, providing varied and flexible ways for users to interact - options which can be useful for everyone</p>

Since September 2018, all public sector bodies have been required by law to ensure our sites and apps can be used by those with disabilities. This means meeting the Web Content Accessibility Guidelines (WCAG). These are a set of internationally recognised, testable guidelines based on four guiding principles of accessibility - digital products must be: Perceivable, Operable, Understandable and Robust.

The system's target is WCAG 2.2 AA, for its components, its documentation and its Figma library.

## Use

<UsageTabs>
{#snippet full()}

The components use the system's focus styles and colour tokens. In your own markup, the system's CSS gives every focusable element a focus outline, so no element needs a focus style of its own. To change the outline for one element, set its custom properties:

```css
.map-marker {
	--outline-offset: 0;
}
```

Use the semantic colours in the pairs they are designed for, such as `--color-text` on `--color-surface`. [Colour](/design-system/foundations/colour) describes each group.

Keep running text inside `typeset-longform`, or set its width with `width-content`, so that a line is no wider than 80 characters.

{/snippet}
{#snippet adapting()}

`system.css`, or `index.css`, sets a focus outline on every focusable element. It uses `--color-interactive-focus`, which has a value for each mode. To use your own focus styles, use the same token:

```css
.my-control:focus-visible {
	outline: 2px solid var(--color-interactive-focus);
	outline-offset: 2px;
}
```

Use the semantic colours in the pairs they are designed for, such as `--color-text` on `--color-surface`.

Set running text no wider than 80 characters. `system.css` sets `--measure-text` to 38 times the body size, which is about 79 characters.

{/snippet}
{#snippet anywhere()}

Check each colour pair with a contrast checker:

| Content                                           | Contrast with its background |
| ------------------------------------------------- | ---------------------------- |
| Text                                              | 4.5:1                        |
| Large text                                        | 3:1                          |
| Controls, and the parts of a chart that show data | 3:1                          |

Set no text smaller than 12px, and keep lines of running text to 80 characters or fewer.

{/snippet}
</UsageTabs>

## How it works

### Principles

- **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive. This includes providing text alternatives for non-text content, creating content that can be presented in different ways without losing information, and making it easier for users to see and hear content.

- **Operable**: User interface components and navigation must be operable. This means ensuring that all functionality is available from a keyboard, giving users enough time to read and use content, and helping users navigate and find content.

- **Understandable**: Information and the operation of the user interface must be understandable. This involves making text readable and understandable, ensuring web pages operate predictably, and helping users avoid and correct mistakes.

- **Robust**: Content must be robust enough that it can be reliably interpreted by a wide variety of user agents, including assistive technologies. As technologies and user agents evolve, content should remain accessible.

### Focus

Focus has one colour, `--color-interactive-focus`, and two forms:

- **By default, an outline on `:focus-visible`.** It is `max(2px, 0.08em)` solid, offset by its own width. An element can change it with `--outline-size`, `--outline-style`, `--outline-color` and `--outline-offset`.
- **On a filled control, an inset ring.** `Button`, `TabLabel`, `CheckboxSolid` and `RadioButtonSolid` turn the outline off and draw two lines inside their edge: 2px of `--color-interactive-focus` at the edge, and 2px of `--color-surface` inside it. The surface line keeps the focus line visible against the control's fill. Because the ring is inside the edge, focus stays visible on the `TabLabel` buttons of a tabbed sidebar.

Press Tab to move focus to the link and the button below. The link shows the outline, and the button shows the inset ring.

```svelte
<a href="#focus">A link</a>
<Button emphasis="primary">A button</Button>
```

<div class="bg-color-canvas-muted p-4 my-4 not-typeset">
	<div class="typeset-product flex flex-wrap items-center gap-6 body-md">
		<a href="#focus" class="text-color-interactive-primary-text underline">A link</a>
		<Button emphasis="primary">A button</Button>
	</div>
</div>

### Contrast

Contrast follows WCAG: 4.5:1 for text, 3:1 for large text, and 3:1 for interface components and the parts of a chart that show data.

Two data colours are exceptions to the 3:1 rule:

- `--color-data-context` is for the series behind a highlighted one. It is always used with `--color-data-primary`, and has no meaning on its own.
- `--color-data-categorical-yellow` is used only for large areas, with an outline or a direct label.

Disabled controls are exempt from these rules, as WCAG exempts inactive components.

In dark mode, `--color-interactive-primary-hover` and `--color-interactive-primary-active` are below 3:1 against `--color-surface` and `--color-surface-muted`. The label on each fill passes 4.5:1.

<div class="my-4 border border-dashed border-color-border p-4 body-sm text-color-text-muted">Placeholder: a table of the main colour pairs and their contrast in each mode, generated from the tokens.</div>

### Text size and width

No text is smaller than 12px. The smallest roles, `label-sm` and `caption-sm`, are 12px.

Running text is no wider than 80 characters. In `typeset-longform`, running text is limited to 38 times the body size, which is about 79 characters. [Typography](/design-system/foundations/typography) describes the content widths.

### Practical steps for compliance

- **Contrast ratios**: Ensure that text and interactive elements have sufficient colour contrast, as set out in [Contrast](#contrast).

- **Keyboard accessibility**: Make sure all functionality is accessible via keyboard. This includes form controls, links, and other interactive elements.

- **Text alternatives**: Provide text alternatives for non-text content, such as images, icons, and multimedia.

- **Responsive design**: Ensure that our designs are responsive and adaptive to various screen sizes and orientations, making them accessible on a wide range of devices.

- **Clear navigation**: Design clear and consistent navigation structures to help users find information and orient themselves within our products.

The full rules for accessibility are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#accessibility).
