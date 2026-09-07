<script lang="ts">
	/**
	 * `Card` — a titled container composing a `ChromeHeader` above the content
	 * and an optional `ChromeFooter` row below. The `children` snippet holds the
	 * content: a single element, or several panels arranged together.
	 *
	 * `Card` and `ChartContainer` share the same chrome pieces (`ChromeHeader` +
	 * `ChromeFooter`) but are distinct components so they can nest — a
	 * `ChartContainer` can sit inside a `Card`.
	 *
	 * Title emphasis follows the primary-slot rule: the card title is `primary`
	 * when it owns the primary slot, and steps down to an eyebrow
	 * (`emphasis="secondary"`) when a titled element inside owns it.
	 *
	 * Surface construction (border, padding, shadow) lives on the card.
	 *
	 * Header and Footer snippets are provided as an escape hatch where fine grained
	 * control is required for adding contols or other novel elements.
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import ChromeFooter from '../chrome/ChromeFooter.svelte';
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
		/** Optional snippet to replace default header. */
		header?: Snippet;
		/** Optional snippet to replace default footer. */
		footer?: Snippet;
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
		class: classes = '',
		header = undefined,
		footer = undefined
	}: Props = $props();

	let hasActions = $derived(!!(actions || byline || source || note));
</script>

<div
	class={classNames(
		'product flex break-inside-avoid flex-col gap-2 border border-color-border-muted bg-color-surface p-4 text-color-text shadow-sm',
		classes
	)}
>
	{#if !header}
		<ChromeHeader {title} {subtitle} {eyebrow} {emphasis} {hint} {hintType} {hintTitle} />
	{:else}
		{@render header()}
	{/if}

	{#if children}
		<div class="min-w-0">{@render children()}</div>
	{/if}

	{#if !footer}
		{#if hasActions}
			<ChromeFooter {byline} {source} {note} {actions} />
		{/if}
	{:else}
		{@render footer()}
	{/if}
</div>
