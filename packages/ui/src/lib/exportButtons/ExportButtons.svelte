<script lang="ts">
	/**
	 * `ExportButtons` renders the download controls in the footer of a `ChartContainer` or
	 * `TableContainer`, or any other container: data as CSV or JSON, and an image as PNG or SVG.
	 *
	 * `variant` sets how the controls are shown:
	 * - `standard` (default): one `DownloadButton` with the text "Download" that opens a menu of every format
	 * - `compact`: one icon-only `DownloadButton`
	 * - `separate`: a data button and an image button, each with its own format menu
	 *
	 * `elementToCapture` is the node saved as the image. It can be any element, such as a chart, a table wrapper or a card body.
	 *
	 * @component
	 */
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import DataDownloadButton from '../downloadButtons/dataDownloadButton/DataDownloadButton.svelte';
	import DownloadButton from '../downloadButtons/downloadButton/DownloadButton.svelte';
	import ImageDownloadButton from '../downloadButtons/imageDownloadButton/ImageDownloadButton.svelte';

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
		 * If set to `false`, data downloads are not offered.
		 */
		dataDownload: true | false | ('CSV' | 'JSON')[];
		/**
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
		 * If set to `false`, image downloads are not offered.
		 */
		imageDownload: true | false | ('PNG' | 'SVG')[];
		/**
		 * The file name to be used for the downloaded data or image file.
		 */
		filename?: string;
		/**
		 * An optional object mapping attribute names in `dataForDownload` to column names in the downloaded file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };
		/**
		 * How the controls are shown: one icon-only button (`compact`), one button with a text label
		 * (`standard`), or a data button and an image button (`separate`).
		 */
		variant?: 'standard' | 'compact' | 'separate' | 'outline';
	}

	let {
		elementToCapture,
		dataForDownload,
		dataDownload,
		imageDownload,
		filename = '',
		columnMapping = undefined,
		variant = 'standard'
	}: Props = $props();

	let dataFormats = $derived(
		!dataDownload || !dataForDownload
			? []
			: dataDownload === true
				? (['CSV', 'JSON'] as ('CSV' | 'JSON')[])
				: dataDownload
	);
	let imageFormats = $derived(
		!imageDownload || !elementToCapture
			? []
			: imageDownload === true
				? (['PNG', 'SVG'] as ('PNG' | 'SVG')[])
				: imageDownload
	);
</script>

{#if variant === 'separate'}
	<div class="mt-2 flex flex-wrap items-end gap-2" data-capture-ignore>
		{#if dataFormats.length > 0}
			<div class="shrink-0">
				<DataDownloadButton
					data={dataForDownload}
					{columnMapping}
					{filename}
					formats={dataFormats}
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

		{#if imageFormats.length > 0 && elementToCapture}
			<div class="shrink-0">
				<ImageDownloadButton
					{filename}
					formats={imageFormats}
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
{:else if dataFormats.length > 0 || imageFormats.length > 0}
	<div class="flex items-end" data-capture-ignore>
		<DownloadButton
			data={dataFormats.length > 0 ? dataForDownload : undefined}
			{columnMapping}
			{dataFormats}
			htmlNode={imageFormats.length > 0 ? elementToCapture : undefined}
			{imageFormats}
			{filename}
			compact={variant === 'compact'}
			outline={variant === 'outline'}
		/>
	</div>
{/if}
