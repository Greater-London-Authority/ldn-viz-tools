---
title: Feedback and overlays
description: Messages, tooltips, popovers and modals
navLabel: Feedback and overlays
order: 6
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-4.svg
---

<script>
	import {
		Button,
		Callout,
		LoadingIndicator,
		Modal,
		NonIdealState,
		Popover,
		Toaster,
		ToastType,
		Tooltip,
		newToastMessage
	} from '@ldn-viz/ui';

	const saved = newToastMessage('The view was saved.', { type: ToastType.Success, closeButton: true });
	let deleting = $state(false);
</script>

<Toaster />

<p class="lead">Feedback tells the reader what has happened or what is happening. An overlay shows extra content over the page when the reader uses a trigger.</p>

Choose a message by how long it needs to stay and how much of the page it's about. Choose an overlay by how much attention its content needs.

## Messages

| The message                                                     | Component             |
| --------------------------------------------------------------- | --------------------- |
| Stays on the page, beside the content it's about                | `Callout`             |
| Confirms an action, or says it failed, for a few seconds        | Toast, from `Toaster` |
| Is about the whole page, such as a beta release                 | `Flag`                |
| Takes the place of content that is loading, empty or has failed | `NonIdealState`       |

### Callout

A callout is a coloured banner for a short message that the reader should notice before going on. Its `status` is `notice`, `positive`, `caution` or `negative`.

```svelte
<Callout status="caution">
	{#snippet title()}Provisional figures{/snippet}
	{#snippet body()}The latest quarter will be revised next month.{/snippet}
</Callout>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product flex flex-col gap-4">
		<Callout status="notice">{#snippet title()}Notice{/snippet}{#snippet body()}Figures are for each financial year.{/snippet}</Callout>
		<Callout status="positive">{#snippet title()}Up to date{/snippet}{#snippet body()}This data was updated today.{/snippet}</Callout>
		<Callout status="caution">{#snippet title()}Provisional figures{/snippet}{#snippet body()}The latest quarter will be revised next month.{/snippet}</Callout>
		<Callout status="negative">{#snippet title()}Data missing{/snippet}{#snippet body()}Two boroughs haven't reported this quarter.{/snippet}</Callout>
	</div>
</div>

Say the status in the title. The colour alone doesn't tell every reader what kind of message it is.

### Toast

A toast appears for a few seconds after an action, five by default. Use it to confirm that an action worked or to say that it failed. Place one `Toaster` in the app's layout, then post a message:

```js
import { newToastMessage, ToastType } from '@ldn-viz/ui';

newToastMessage('The view was saved.', { type: ToastType.Success, closeButton: true }).post();
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product">
		<Button variant="outline" emphasis="secondary" onclick={() => saved.post()}>Save view</Button>
	</div>
</div>

The toast's title is its type, such as Success, so write a message that makes sense on its own.

- Don't put a link or a choice in a toast. It can disappear before a keyboard user reaches it.
- Don't post a toast for every small change. A screen reader announces each one as an alert.

### Flag

A flag is a strip across the top of a page with a status, such as Alpha preview, and an optional link for feedback. A message about one part of a page belongs in a callout beside it.

## Loading, empty and failed

When content isn't ready, show the reader that something is happening:

- **`LoadingIndicator`** shows a spinner, or a clock icon when the reader prefers reduced motion. Use it rather than `Spinner` on its own.
- **`NonIdealState`** fills the space the content will take, with an icon or a spinner, a title and some text. The layout doesn't move when the content arrives.
- **`AsyncButton`** shows a spinner in a button while its action runs.

```svelte
<NonIdealState spinner>
	{#snippet title()}Loading the map{/snippet}
</NonIdealState>

<NonIdealState>
	{#snippet title()}This chart couldn't load{/snippet}
	Refresh the page to try again.
</NonIdealState>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product grid gap-4 sm:grid-cols-2">
		<div class="h-48"><NonIdealState spinner>{#snippet title()}Loading the map{/snippet}</NonIdealState></div>
		<div class="h-48"><NonIdealState>{#snippet title()}This chart couldn't load{/snippet}Refresh the page to try again.</NonIdealState></div>
	</div>
</div>

Without a title, `NonIdealState` reads "Nothing to display". On an error, replace it with what failed and what to do next.

Where no text says what is loading, a spinner needs a title for screen readers. `LoadingIndicator` sets it to "Loading".

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product"><LoadingIndicator class="h-8 w-8" /></div>
</div>

## Overlays

An overlay opens from a trigger. The three kinds differ in how they open and how much attention they ask for:

| Overlay   | Opens                                     | Use it for                                                 | Elevation |
| --------- | ----------------------------------------- | ---------------------------------------------------------- | --------- |
| `Tooltip` | While the trigger is hovered or focused   | A short hint that needs no interaction                     | 4         |
| `Popover` | On a click, and stays open until closed   | Help to read at the reader's own pace, or to interact with | 4         |
| `Modal`   | On a click, and blocks the page behind it | A task or message that needs full attention                | 5         |

`Overlay` renders any of the three, chosen by its `overlayType`. Each has a default trigger: a small text button with an information icon, labelled by `hintLabel`. A `trigger` snippet replaces it with your own element.

```svelte
<Tooltip hintLabel="What is a completion?">
	A home counts as complete when it's ready to live in.
</Tooltip>

<Popover hintLabel="About this data">
	{#snippet title()}About this data{/snippet}
	Figures come from borough returns. <a href="#">Read the method</a>.
</Popover>

<Modal bind:open>
	{#snippet trigger(props)}
		<Button {...props}>Delete view</Button>
	{/snippet}
	{#snippet title()}Delete this view?{/snippet}
	{#snippet description()}The view and its filters will be removed.{/snippet}
	{#snippet buttons()}
		<Button variant="outline" emphasis="secondary" onclick={() => (open = false)}>Cancel</Button>
		<Button emphasis="negative" onclick={() => (open = false)}>Delete</Button>
	{/snippet}
</Modal>
```

<div class="border border-color-border-wash p-4 my-4">
	<div class="typeset-product flex flex-wrap items-center gap-6">
		<Tooltip hintLabel="What is a completion?">A home counts as complete when it's ready to live in.</Tooltip>
		<Popover hintLabel="About this data">{#snippet title()}About this data{/snippet}Figures come from borough returns. <a href="#overlays">Read the method</a>.</Popover>
		<Modal bind:open={deleting}>{#snippet trigger(props)}<Button {...props}>Delete view</Button>{/snippet}{#snippet title()}Delete this view?{/snippet}{#snippet description()}The view and its filters will be removed.{/snippet}{#snippet buttons()}<Button variant="outline" emphasis="secondary" onclick={() => (deleting = false)}>Cancel</Button><Button emphasis="negative" onclick={() => (deleting = false)}>Delete</Button>{/snippet}</Modal>
	</div>
</div>

Some content suits one overlay and not another:

- Don't put a link or a button in a tooltip. It closes as the pointer moves towards it, so nobody can reach the link. Use a popover.
- Don't use a popover for something the reader must answer before going on. A modal blocks the page behind it.
- Give a modal a title. A screen reader uses it as the dialog's name.

A modal keeps focus inside it until it closes, and Escape or the close button closes it. The page behind is dimmed and doesn't scroll.

## In Storybook

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools) has the props and states of each component, under Ui, Components.
