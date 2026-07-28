<script lang="ts">
	/**
	 * `ChromeActions` — the actions/footnotes row shared by `Card` and
	 * `ChartContainer`. Footnotes (byline / source / note, plus an optional
	 * `description` snippet, e.g. a "View description" trigger) sit on the left; an
	 * `actions` snippet (e.g. download buttons) sits on the right, justified apart
	 * and bottom-aligned. Renders nothing when it has neither footnotes nor actions.
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames.js';

	interface Props {
		byline?: string;
		source?: string;
		note?: string;
		/** Extra footnote content, appended to the footnotes list (e.g. a description trigger). */
		description?: Snippet;
		/** Right-aligned actions (e.g. download buttons). */
		actions?: Snippet;
		class?: string;
	}

	let {
		byline = '',
		source = '',
		note = '',
		description,
		actions,
		class: klass = ''
	}: Props = $props();

	let hasFootnotes = $derived(!!(byline || source || note || description));
</script>

{#if hasFootnotes || actions}
	<div class={classNames('flex w-full flex-wrap items-end justify-between gap-2', klass)}>
		{#if hasFootnotes}
			<!-- eslint-disable svelte/no-at-html-tags -->
			<ul
				class="product mr-4 flex min-w-40 max-w-xl flex-col gap-1 caption text-color-text-muted [&_a:hover]:text-color-interactive-primary-hover [&_a:hover]:no-underline [&_a]:underline"
			>
				{#if byline}<li>{@html byline}</li>{/if}
				{#if source}<li><span class="mr-1 font-bold">Source:</span>{@html source}</li>{/if}
				{#if note}<li><span class="mr-1 font-bold">Note:</span>{@html note}</li>{/if}
				{@render description?.()}
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
