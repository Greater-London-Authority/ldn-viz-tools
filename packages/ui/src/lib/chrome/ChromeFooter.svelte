<script lang="ts">
	/**
	 * `ChromeFooter` — renders the footer row at the bototm of a `Card`, `ChartContainer` and
	 * `TableContainer` (the byline / source / note, and download buttons).
	 *
	 * The optional `footnoteExtra` snippet (e.g. a "View description" trigger) renders on the left;
	 * an optional `actions` snippet (e.g. alternative export buttons) renders on the right.
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames.js';

	interface Props {
		/**
		 * Statement of who created the visualization.
		 *
		 * **Warning**: this is rendered as raw HTML and is not sanitized, so it must never be set
		 * from unsanitized user input, as doing so would create an XSS vulnerability.
		 */
		byline?: string;

		/**
		 * Statement of where the data came from.
		 *
		 * **Warning**: this is rendered as raw HTML and is not sanitized, so it must never be set
		 * from unsanitized user input, as doing so would create an XSS vulnerability.
		 */
		source?: string;

		/**
		 * Any additional footnotes.
		 *
		 * **Warning**: this is rendered as raw HTML and is not sanitized, so it must never be set
		 * from unsanitized user input, as doing so would create an XSS vulnerability.
		 */
		note?: string;

		/** Extra footnote content, appended to the footnotes list (e.g. a "View description" trigger). */
		footnoteExtra?: Snippet;

		/** Right-aligned actions (e.g. download buttons). */
		actions?: Snippet;

		class?: string;
	}

	let {
		byline = '',
		source = '',
		note = '',
		footnoteExtra,
		actions,
		class: classes = ''
	}: Props = $props();

	let hasFootnotes = $derived(!!(byline || source || note || footnoteExtra));
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
				{@render footnoteExtra?.()}
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
