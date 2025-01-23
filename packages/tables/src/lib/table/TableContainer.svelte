<script lang="ts">
	/**
	 * The `TableContainer` is a wrapper around a table that adds additional information such as a title, subtitle, and description.
	 * It also provides controls such as data/image download buttons.
	 *
	 * **Note** Similar in structure and functionality to the 'table Container'
	 * 	@component
	 */

	import { ExportBtns, Footer, SubTitle, Title } from '@ldn-viz/charts';
	import { classNames } from '@ldn-viz/ui';

	/**
	 * Title that is displayed in large text above the plot.
	 */
	export let title = '';
	// export let title: string | null = null;

	/**
	 * Subtitle that is displayed below the title, but above the plot.
	 */
	export let subTitle = '';
	// export let subTitle: string | null = null;

	/**
	 * Alt-text for the plot.
	 */
	export let alt = '';
	// export let alt: string | null = null;

	/**
	 * What appears in the footer:
	 *
	 * * `byline` (string) - statement of who created the visualization
	 * * `source` (string) - statement of where the data came from
	 * * `note` (string) - any additional footnotes
	 */
	export let source = '';

	export let byline = '';

	export let note = '';

	/**
	 * Data Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
	 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'.
	 * If set to `false`, then the button is hidden.
	 *
	 */
	export let dataDownloadButton: true | false | ('CSV' | 'JSON')[] = true;

	/**
	 * The Data passed to the data Download Button(s) in the footer
	 */
	export let data: { [key: string]: any }[] | undefined = undefined;

	/**
	 * Image Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
	 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
	 * If set to `false`, then the button is hidden.
	 *
	 */
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[] = ['PNG'];

	export let filename = '';

	/**
	 * Tailwind class to set table area height
	 */
	export let tableHeight = 'h-auto';

	export let overrideClass = '';
	let tableClass = classNames('relative', tableHeight, overrideClass);

	/**
	 * Tailwind class to set overall table width
	 */
	export let tableWidth = 'w-full';

	/**
	 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
	 */
	export let columnMapping: undefined | { [oldName: string]: string } = undefined;

	// For save as image
	let tableToCapture: HTMLDivElement;
</script>

<slot name="numRowsControlSlot" />

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

	{#if $$slots.beforeTable}
		<!-- Content to be inserted below the title and subtitle, but above the table itself. -->
		<slot name="beforeTable" />
	{/if}

	<!-- Viz element goes here -->
	<div class={tableClass}>
		<slot name="table" {data} />
	</div>

	<slot name="paginationControls" />

	{#if source || byline || note || dataDownloadButton || imageDownloadButton}
		<Footer {source} {byline} {note}>
			<ExportBtns
				chartToCapture={tableToCapture}
				{columnMapping}
				dataForDownload={data}
				{dataDownloadButton}
				{imageDownloadButton}
				{filename}
				slot="exportBtns"
			/>
		</Footer>
	{/if}
</div>

<style lang="postcss">
	.table-container {
		@apply flex flex-col;
	}
</style>
