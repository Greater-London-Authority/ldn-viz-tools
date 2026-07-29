<script lang="ts">
	/**
	 * `TableContainer` wraps a table with the shared chrome primitives: a `ChromeHeader`
	 * (title / subtitle / optional hint) above the table, and a `ChromeActions` row
	 * (source / byline / note + data/image download buttons) below it — the same pieces
	 * used by `Card` and `ChartContainer`, so the three read and construct identically.
	 *
	 * It has **no surface of its own** — no border, padding or shadow. When a surface is
	 * wanted, compose it inside a `Card`, which supplies those. This is what lets several
	 * tables share one `Card`: the Card title takes `emphasis="secondary"` (an eyebrow
	 * labelling the group) while each `TableContainer` keeps its own dominant title — the
	 * primary-slot rule.
	 *
	 * The table is supplied via the `table` snippet; `beforeTable`, `numRowsControlSlot`
	 * and `paginationControls` snippets remain for content and pagination controls.
	 *
	 * **Note** Mirrors [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation)
	 * in @ldn-viz/charts.
	 * 	@component
	 */

	import { ExportBtns } from '@ldn-viz/charts';
	import { ChromeActions, ChromeHeader, classNames } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';

	// export let title: string | null = null;

	// export let subTitle: string | null = null;

	// export let alt: string | null = null;

	interface Props {
		/**
		 * Title that is displayed in large text above the table.
		 */
		title?: string;
		/**
		 * Subtitle that is displayed below the title, but above the table.
		 */
		subtitle?: string;
		/**
		 * @deprecated Use `subtitle` (lowercase) instead. Retained as an alias for one release.
		 */
		subTitle?: string;
		/**
		 * Optional help affordance shown beside the title. A string opens an `Overlay`
		 * (`hintType` selects tooltip / popover / modal).
		 */
		hint?: string;
		/** Overlay form used when `hint` is a string. */
		hintType?: 'tooltip' | 'popover' | 'modal';
		/** Modal heading when `hintType="modal"`. */
		hintTitle?: string;
		/**
		 * Alt-text for the plot.
		 */
		alt?: string;
		/**
		 * What appears in the footer:
		 *
		 * * `byline` (string) - statement of who created the visualization
		 * * `source` (string) - statement of where the data came from
		 * * `note` (string) - any additional footnotes
		 */
		source?: string;
		byline?: string;
		note?: string;
		/**
		 * Data Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'.
		 * If set to `false`, then the button is hidden.
		 *
		 */
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];
		/**
		 * The Data passed to the data Download Button(s) in the footer
		 */
		data?: { [key: string]: any }[] | undefined;
		/**
		 * Image Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
		 * If set to `false`, then the button is hidden.
		 *
		 */
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
		filename?: string;
		/**
		 * Tailwind class to set table area height
		 */
		tableHeight?: string;
		overrideClass?: string;
		/**
		 * Tailwind class to set overall table width
		 */
		tableWidth?: string;
		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };
		numRowsControlSlot?: Snippet;
		beforeTable?: Snippet;
		table?: Snippet<[any]>;
		paginationControls?: Snippet;
	}

	let {
		title = '',
		subtitle = '',
		subTitle = '',
		hint = undefined,
		hintType = 'tooltip',
		hintTitle = undefined,
		alt = '',
		source = '',
		byline = '',
		note = '',
		dataDownloadButton = true,
		data = undefined,
		imageDownloadButton = ['PNG'],
		filename = '',
		tableHeight = 'h-auto',
		overrideClass = '',
		tableWidth = 'w-full',
		columnMapping = undefined,
		numRowsControlSlot,
		beforeTable,
		table,
		paginationControls
	}: Props = $props();

	let tableClass = $derived(classNames('relative', tableHeight, overrideClass));

	// `subtitle` is the current name; `subTitle` is a deprecated alias kept for one release.
	let resolvedSubtitle = $derived(subtitle || subTitle);

	// For save as image
	let tableToCapture: HTMLDivElement | undefined = $state();
</script>

{@render numRowsControlSlot?.()}

<div
	class={`table-container not-prose product ${tableWidth}`}
	bind:this={tableToCapture}
	id="captureElement"
>
	{#if title || resolvedSubtitle || hint}
		<div class="mb-2">
			<ChromeHeader {title} subtitle={resolvedSubtitle} {hint} {hintType} {hintTitle} />
		</div>
	{/if}

	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}

	{#if beforeTable}
		<!-- Content to be inserted below the title and subtitle, but above the table itself. -->
		{@render beforeTable?.()}
	{/if}

	<!-- Viz element goes here -->
	<div class={tableClass}>
		{@render table?.({ data })}
	</div>

	{@render paginationControls?.()}

	{#if source || byline || note || dataDownloadButton || imageDownloadButton}
		<div class="mt-2">
			<ChromeActions {source} {byline} {note} actions={exportBtns} />
		</div>
	{/if}
</div>

{#snippet exportBtns()}
	{#if tableToCapture}
		<ExportBtns
			chartToCapture={tableToCapture}
			{columnMapping}
			dataForDownload={data}
			{dataDownloadButton}
			{imageDownloadButton}
			{filename}
		/>
	{/if}
{/snippet}

<style lang="postcss">
	.table-container {
		@apply flex flex-col;
	}
</style>
