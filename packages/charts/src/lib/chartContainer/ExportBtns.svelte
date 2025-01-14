<script lang="ts">
	import { DataDownloadButton, ImageDownloadButton } from '@ldn-viz/ui';
	import { ArrowDownTray, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	/**
	 * Reference to the HTML Element to be converted to an image.
	 */
	export let chartToCapture: HTMLDivElement;

	/**
	 * The data to be exported. This is an array of objects: each entry becomes a row in the generated
	 * CSV file, and each attribute of the objects becomes a column.
	 */
	export let dataForDownload: { [key: string]: any }[] | undefined;

	/**
	 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
	 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'.
	 * If set to `false`, then the button is hidden.
	 *
	 */

	export let dataDownloadButton: true | false | ('CSV' | 'JSON')[];

	/**
	 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
	 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
	 * If set to `false`, then the button is hidden.
	 *
	 */
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[];

	/**
	 * Image Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
	 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
	 * If set to `false`, then the button is hidden.
	 *
	 */
	export let filename = '';

	/**
	 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the generated file.
	 */
	export let columnMapping: undefined | { [oldName: string]: string } = undefined;
</script>

<div class="flex flex-wrap mt-2 space-y-2 items-end" data-capture-ignore>
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
				<svelte:fragment slot="afterLabel">
					<Icon src={ArrowDownTray} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
				</svelte:fragment>
			</DataDownloadButton>
		</div>
	{/if}

	{#if imageDownloadButton}
		<div class="shrink-0">
			<ImageDownloadButton
				{filename}
				formats={imageDownloadButton === true ? ['PNG', 'SVG'] : imageDownloadButton}
				htmlNode={chartToCapture}
				variant="outline"
				emphasis="secondary"
				size="sm"
			>
				<svelte:fragment slot="afterLabel">
					<Icon src={Camera} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
				</svelte:fragment>
			</ImageDownloadButton>
		</div>
	{/if}
</div>
