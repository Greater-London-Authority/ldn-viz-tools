<script lang="ts">
	/**
	 * `ExportButtons` — a trailing group of download controls: a data-download button
	 * (CSV / JSON) and an image-download button (PNG / SVG). It composes the shared
	 * `DataDownloadButton` and `ImageDownloadButton`, so any titled container (`Card`,
	 * `ChartContainer`, `TableContainer`) can offer the same export affordance.
	 *
	 * Pass the DOM node to capture for the image via `elementToCapture` — it works for
	 * any element (a chart's SVG, a table wrapper, a card body), not only charts.
	 *
	 * @component
	 */
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import DataDownloadButton from '../dataDownloadButton/DataDownloadButton.svelte';
	import ImageDownloadButton from '../imageDownloadButton/ImageDownloadButton.svelte';

	interface Props {
		/**
		 * The element to be converted to an image (chart SVG, table wrapper, card body…).
		 */
		elementToCapture?: HTMLElement;
		/**
		 * The data to be exported. An array of objects: each entry becomes a row in the generated
		 * CSV/JSON file, and each attribute of the objects becomes a column.
		 */
		dataForDownload: { [key: string]: any }[] | undefined;
		/**
		 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'.
		 * If set to `false`, then the button is hidden.
		 */
		dataDownloadButton: true | false | ('CSV' | 'JSON')[];
		/**
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
		 * If set to `false`, then the button is hidden.
		 */
		imageDownloadButton: true | false | ('PNG' | 'SVG')[];
		/**
		 * The file name to be used for the downloaded data or image file.
		 */
		filename?: string;
		/**
		 * An optional object mapping attribute names in `dataForDownload` to column names in the downloaded file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };
	}

	let {
		elementToCapture,
		dataForDownload,
		dataDownloadButton,
		imageDownloadButton,
		filename = '',
		columnMapping = undefined
	}: Props = $props();

</script>

<div class="mt-2 flex flex-wrap items-end space-y-2" data-capture-ignore>
	{#if dataDownloadButton && dataForDownload}
		<div class="mr-2 shrink-0">
			<DataDownloadButton
				data={dataForDownload}
				{columnMapping}
				{filename}
				formats={dataDownloadButton === true ? ['CSV', 'JSON'] : dataDownloadButton}
				variant="outline"
				emphasis="secondary"
				size="sm"
			>
				{#snippet afterLabel()}
					<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</DataDownloadButton>
		</div>
	{/if}

	{#if imageDownloadButton && elementToCapture}
		<div class="shrink-0">
			<ImageDownloadButton
				{filename}
				formats={imageDownloadButton === true ? ['PNG', 'SVG'] : imageDownloadButton}
				htmlNode={elementToCapture}
				variant="outline"
				emphasis="secondary"
				size="sm"
			>
				{#snippet afterLabel()}
					<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
				{/snippet}
			</ImageDownloadButton>
		</div>
	{/if}
</div>
