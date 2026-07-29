<script lang="ts">
	/**
	 * `ChromeFooter` — the footer row shared by `Card`, `ChartContainer` and
	 * `TableContainer`; the positional counterpart to `ChromeHeader`. Footnotes
	 * (byline / source / note, plus an optional `footnoteExtra` snippet — e.g. a
	 * "View description" trigger) sit on the left; an `actions` snippet (e.g. export
	 * buttons) sits on the right, justified apart and bottom-aligned. Renders nothing
	 * when it has neither footnotes nor actions.
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames.js';

	interface Props {
		byline?: string;
		source?: string;
		note?: string;
		/** Extra footnote content, appended to the footnotes list (e.g. a "View description" trigger). */
		footnoteExtra?: Snippet;
		/** @deprecated Renamed to `footnoteExtra`. Retained as an alias for one release. */
		description?: Snippet;
		/** Right-aligned actions (e.g. download buttons). */
		actions?: Snippet;
		class?: string;
	}

	let {
		byline = '',
		source = '',
		note = '',
		footnoteExtra,
		description,
		actions,
		class: classes = ''
	}: Props = $props();

	// `footnoteExtra` is the current name; `description` is a deprecated alias.
	let extra = $derived(footnoteExtra ?? description);
	let hasFootnotes = $derived(!!(byline || source || note || extra));
</script>

{#if hasFootnotes || actions}
	<div class={classNames('flex w-full flex-wrap items-end justify-between gap-2', classes)}>
		{#if hasFootnotes}
			<!-- eslint-disable svelte/no-at-html-tags -->
			<ul
				class="product caption mr-4 flex min-w-40 max-w-xl flex-col gap-1 text-color-text-muted [&_a:hover]:text-color-interactive-primary-hover [&_a:hover]:no-underline [&_a]:underline"
			>
				{#if byline}<li>{@html byline}</li>{/if}
				{#if source}<li><span class="mr-1 font-bold">Source:</span>{@html source}</li>{/if}
				{#if note}<li><span class="mr-1 font-bold">Note:</span>{@html note}</li>{/if}
				{@render extra?.()}
			</ul>
			<!-- eslint-enable svelte/no-at-html-tags -->
		{/if}
		{#if actions}
			<div class={hasFootnotes ? '' : 'ml-auto'}>
				{@render actions()}
			</div>
		{/if}
	</div>
{/if}
