---
title: Actions and emphasis
description: Choosing and pairing buttons
section: Application design
navLabel: Actions and emphasis
order: 5
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-3.svg
---

<script>
	import { Button } from '@ldn-viz/ui';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars3 } from '@steeze-ui/heroicons';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
	import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte';
	import { base } from '$app/paths';
	// velite reads src and href attributes as file paths, so these are passed by spread
	const menuIcon = { src: Bars3 };
	const gettingStarted = { href: `${base}/design-system/getting-started` };
</script>

<p class="lead text-color-text-muted">A button starts an action or goes to another page. Its variant sets how much weight it has, and its emphasis shows what the action does.</p>

Give each view one main action, and make the actions around it lighter.

## Variants

The variant sets the weight of a button, from the most to the least:

| Variant   | Looks like                                    | Use it for                                                         |
| --------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `solid`   | A filled button                               | The main action in a view                                          |
| `outline` | A border in the emphasis colour, with no fill | A supporting action beside a solid button                          |
| `text`    | Underlined text, with no fill or border       | The action with the least weight, or an action in a line of text   |
| `square`  | A filled square that shows an icon            | An action that an icon can show on its own, such as opening a menu |
| `brand`   | A button with a bar in the GLA brand colour   | Sparingly, never for every action in a view                        |

```svelte
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="text">Text</Button>
<Button variant="square" aria-label="Open menu"><Icon src={Bars3} class="h-5 w-5" /></Button>
<Button variant="brand">Brand</Button>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product flex flex-wrap items-center gap-2">
		<Button variant="solid">Solid</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="text">Text</Button>
		<Button variant="square" aria-label="Open menu"><Icon {...menuIcon} class="h-5 w-5" aria-hidden="true" /></Button>
		<Button variant="brand">Brand</Button>
	</div>
</div>

## Emphasis

The emphasis shows what the action does. `primary` is for the main action and `secondary` for supporting actions. `positive`, `negative` and `caution` show the outcome of an action, such as publishing, deleting or archiving.

```svelte
<Button emphasis="primary">Primary</Button>
<Button emphasis="secondary">Secondary</Button>
<Button emphasis="positive">Publish</Button>
<Button emphasis="negative">Delete</Button>
<Button emphasis="caution">Archive</Button>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product flex flex-wrap items-center gap-2">
		<Button emphasis="primary">Primary</Button>
		<Button emphasis="secondary">Secondary</Button>
		<Button emphasis="positive">Publish</Button>
		<Button emphasis="negative">Delete</Button>
		<Button emphasis="caution">Archive</Button>
	</div>
</div>

Only the main action takes `positive`, `negative` or `caution`. The button beside it keeps a neutral emphasis.

## Pairing buttons

Use one solid primary button in a view. Give a supporting action secondary emphasis or the outline variant, and use a text button for the action with the least weight.

The main action goes on the right, at the end of the reading order. Cancel and Back stay low in emphasis:

```svelte
<Button variant="outline" emphasis="secondary">Cancel</Button>
<Button>Save changes</Button>

<Button variant="text">Back</Button>
<Button>Continue</Button>

<Button variant="outline" emphasis="secondary">Cancel</Button>
<Button emphasis="negative">Delete</Button>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product flex flex-col gap-4">
		<div class="flex justify-end gap-2">
			<Button variant="outline" emphasis="secondary">Cancel</Button>
			<Button>Save changes</Button>
		</div>
		<div class="flex justify-end gap-2">
			<Button variant="text">Back</Button>
			<Button>Continue</Button>
		</div>
		<div class="flex justify-end gap-2">
			<Button variant="outline" emphasis="secondary">Cancel</Button>
			<Button emphasis="negative">Delete</Button>
		</div>
	</div>
</div>

Two primary buttons side by side compete for attention, so demote one to secondary. Two different status emphases side by side, such as Delete and Publish, conflict.

<figure class="width-content-wide">
	<EnhancedImage src="/actions-and-emphasis/anti-patterns.svg" alt="Two examples crossed out: a pair of primary buttons, Delete and Publish, and a negative Delete button beside a positive Publish button" />
</figure>

In a modal, the buttons sit in the footer, aligned right with 8px between them. [Feedback and overlays](/design-system/application-design/feedback-and-overlays) describes modals.

## Links and buttons

A button that goes to another page must be a link, because a screen reader announces a button and a link differently. Give `Button` an `href` and it renders an `<a>` styled as a button:

```svelte
<Button href="/design-system/getting-started">Get started</Button>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product">
		<Button {...gettingStarted}>Get started</Button>
	</div>
</div>

For a link that needs a sentence of description, such as a link to a report, use `PlacardButton`.

## Icon buttons

A square button shows an icon on its own. The sizes are 24, 32, 40 and 64px square.

- Give a square button with no visible label an `aria-label` that names the action.
- Show a label as well when the icon alone may not be understood.
- Don't put a long label in a square button. Its width is fixed, so the label wraps.

## Buttons for particular actions

Some actions have a component of their own:

| Action                                                                  | Component                                          |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| An action that takes time, such as saving                               | `AsyncButton`, which shows a spinner while it runs |
| Copying text                                                            | `CopyButton`                                       |
| Downloading a chart's data or image                                     | `DataDownloadButton` and `ImageDownloadButton`     |
| One action in several versions, such as a download in different formats | `MultipleActionButton`                             |

`MultipleActionButton` has a chevron that opens a menu of versions of its action. Each option must be a version of the same action, because the button runs the one chosen.

## Building your own buttons

<UsageTabs>
{#snippet full()}

Use `Button` and the components above. Their colours, focus ring and label size come from the system.

{/snippet}
{#snippet adapting()}

The interactive colour tokens follow the pattern `--color-interactive-{intent}[-muted][-{state}]`. The intents are `primary`, `secondary`, `positive`, `negative` and `caution`, and the states are `hover` and `active`.

- Text and icons on a filled button use `--color-inverse-text`. The exception is `primary`, whose fill stays dark in both modes, so its text uses `--color-static-white`.
- A text button or link uses `--color-interactive-primary-text`, with its hover and active states.
- A disabled button's text uses `--color-interactive-disabled`, and its fill `--color-interactive-disabled-muted`.
- Set the label with `.button-label`, or `.button-label-sm` on a small button.
- Corners are square.

```css
.my-button {
	background: var(--color-interactive-primary);
	color: var(--color-static-white);
	border-radius: 0;
}
.my-button:hover {
	background: var(--color-interactive-primary-hover);
}
.my-button:focus-visible {
	outline: none;
	box-shadow:
		inset 0 0 0 2px var(--color-interactive-focus),
		inset 0 0 0 4px var(--color-surface);
}
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product">
		<button class="button-label" style="background: var(--color-interactive-primary); color: var(--color-static-white); padding: var(--spacing-1-5) var(--spacing-4);">Your own button</button>
	</div>
</div>

A focused button has a ring inside its edge: 2px of `--color-interactive-focus` at the edge, and 2px of `--color-surface` inside it. [Accessibility](/design-system/foundations/accessibility) describes focus.

{/snippet}
</UsageTabs>

## In Storybook

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools/?path=/docs/ui-components-buttons-button--documentation) has the props and states of `Button` and the other buttons.
