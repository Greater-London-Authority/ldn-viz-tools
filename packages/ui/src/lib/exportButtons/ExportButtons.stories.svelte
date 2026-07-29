<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ExportButtons from './ExportButtons.svelte';

	/**
	 * `ExportButtons` renders the data- and image-download buttons used in a container's actions row.
	 *
	 * It composes `DataDownloadButton` and `ImageDownloadButton`, so it is shared across `Card`,
	 * `ChartContainer` and `TableContainer`. It is normally used indirectly via those containers.
	 */
	const { Story } = defineMeta({
		title: 'Ui/ExportButtons',
		component: ExportButtons,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const demoData = [
		{ Month: '2015-01-01', Value: 53623.9 },
		{ Month: '2015-02-01', Value: 61816.0 },
		{ Month: '2015-03-01', Value: 58204.2 }
	];

	// The DOM node captured when downloading an image. Each story binds its own.
	let bothNode: HTMLDivElement = $state() as HTMLDivElement;
	let restrictedNode: HTMLDivElement = $state() as HTMLDivElement;
	let noDataNode: HTMLDivElement = $state() as HTMLDivElement;
</script>

{#snippet placeholderChart()}
	<div class="sr-only">Example image holder - hidden so as not to present misleading layout</div>
{/snippet}

<Story name="Only data download enabled">
	{#snippet template()}
		<div bind:this={bothNode}>
			{@render placeholderChart()}
		</div>
		<ExportButtons
			elementToCapture={bothNode}
			dataForDownload={demoData}
			dataDownloadButton={true}
			imageDownloadButton={false}
		/>
	{/snippet}
</Story>

<Story name="Only image download enabled">
	{#snippet template()}
		<div bind:this={bothNode}>
			{@render placeholderChart()}
		</div>
		<ExportButtons
			elementToCapture={bothNode}
			dataForDownload={demoData}
			dataDownloadButton={false}
			imageDownloadButton={true}
		/>
	{/snippet}
</Story>

<!--
	With both `dataDownloadButton` and `imageDownloadButton` set to `true`, the default format options are
	offered: CSV/JSON for data and PNG/SVG for the image.
-->
<Story name="Both image and data download enabled">
	{#snippet template()}
		<div bind:this={bothNode}>
			{@render placeholderChart()}
		</div>
		<ExportButtons
			elementToCapture={bothNode}
			dataForDownload={demoData}
			dataDownloadButton={true}
			imageDownloadButton={true}
		/>
	{/snippet}
</Story>

<!--
	Here the data format is restricted to CSV and the image	format is restricted to PNG.
	As there is only a single format, the buttons render as a normal button (rather than a [MultipleActionButton](./?path=/docs/docs/ui-components-buttons-multipleactionbutton--documentation)).
-->
<Story name="Restricted choice of formats">
	{#snippet template()}
		<div bind:this={restrictedNode}>
			{@render placeholderChart()}
		</div>
		<ExportButtons
			elementToCapture={restrictedNode}
			dataForDownload={demoData}
			dataDownloadButton={['CSV']}
			imageDownloadButton={['PNG']}
			filename="my-chart-export"
		/>
	{/snippet}
</Story>

<!--
	The data-download button only renders when `dataForDownload` is truthy.
	When `dataForDownload={undefined}`, the data download button is not rendered.
-->
<Story name="Data button hidden when no data">
	{#snippet template()}
		<div bind:this={noDataNode}>
			{@render placeholderChart()}
		</div>
		<ExportButtons
			elementToCapture={noDataNode}
			dataForDownload={undefined}
			dataDownloadButton={true}
			imageDownloadButton={true}
		/>
	{/snippet}
</Story>
