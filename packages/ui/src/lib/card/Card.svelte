<script lang="ts">
	/**
	 * `Card` — a titled container composing a `ChromeHeader` above a content slot
	 * and an optional `ChromeActions` row below. The slot holds content: a single
	 * element, or several panels arranged together.
	 *
	 * `Card` and `ChartContainer` share the same chrome pieces (`ChromeHeader` +
	 * `ChromeActions`) but are distinct components so they can nest — a
	 * `ChartContainer` can sit inside a `Card`.
	 *
	 * Title emphasis follows the primary-slot rule: the card title is `primary`
	 * when it owns the primary slot, and steps down to an eyebrow
	 * (`emphasis="secondary"`) when a titled element inside owns it.
	 *
	 * Surface construction (border, padding, shadow) lives on the card. Corner
	 * radius matches the design source (square) and can be overridden via `class`.
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import ChromeActions from '../chrome/ChromeActions.svelte';
	import ChromeHeader from '../chrome/ChromeHeader.svelte';
	import { classNames } from '../utils/classNames.js';

	interface Props {
		title?: string;
		subtitle?: string;
		eyebrow?: string;
		emphasis?: 'primary' | 'secondary';
		/** Hint affordance in the header (string → info icon opening an `Overlay`, or a snippet). */
		hint?: string | Snippet;
		/** Overlay form used when `hint` is a string. */
		hintType?: 'tooltip' | 'popover' | 'modal';
		/** Modal heading when `hintType="modal"`. */
		hintTitle?: string;
		/** Footnotes shown in the actions row. */
		byline?: string;
		source?: string;
		note?: string;
		/** Right-aligned actions in the actions row (e.g. buttons). */
		actions?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		title = '',
		subtitle = '',
		eyebrow = '',
		emphasis = 'primary',
		hint,
		hintType = 'tooltip',
		hintTitle = undefined,
		byline = '',
		source = '',
		note = '',
		actions,
		children,
		class: classes = ''
	}: Props = $props();

	let hasActions = $derived(!!(actions || byline || source || note));
</script>

<div
	class={classNames(
		'product flex flex-col gap-2 border border-color-border-muted bg-color-surface p-4 text-color-text shadow-sm',
		classes
	)}
>
	<ChromeHeader {title} {subtitle} {eyebrow} {emphasis} {hint} {hintType} {hintTitle} />
	{#if children}
		<div class="min-w-0">{@render children()}</div>
	{/if}
	{#if hasActions}
		<ChromeActions {byline} {source} {note} {actions} />
	{/if}
</div>
