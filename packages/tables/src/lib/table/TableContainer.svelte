<script lang="ts">
	/**
	 * The `TableContainer` is a wrapper around a table that adds additional information such as a title, subtitle, and description.
	 * It also provides controls such as data/image download buttons.
	 *
	 * **Note** Similar in structure and functionality to the ChartContainer in @ldn-viz/charts.
	 * 	@component
	 */

	import { ExportBtns, Footer, SubTitle, Title } from '@ldn-viz/charts';
	import { classNames } from '@ldn-viz/ui';

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
		subTitle?: string;
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
		numRowsControlSlot?: import('svelte').Snippet;
		beforeTable?: import('svelte').Snippet;
		table?: import('svelte').Snippet<[any]>;
		paginationControls?: import('svelte').Snippet;
	}

	let {
		title = '',
		subTitle = '',
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

	// For save as image
	let tableToCapture: HTMLDivElement | undefined = $state();
</script>

{@render numRowsControlSlot?.()}

<div class={`table-container ${tableWidth}`} bind:this={tableToCapture} id="captureElement">
	{#if title || subTitle}
		<div class="mb-4">
			{#if title}
				<Title>{title}</Title>
			{/if}
			{#if subTitle}
				<SubTitle>{subTitle}</SubTitle>
			{/if}
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
		<Footer {source} {byline} {note}>
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
		</Footer>
	{/if}
</div>

<style lang="postcss">
	.table-container {
		@apply flex flex-col;
	}
</style>
