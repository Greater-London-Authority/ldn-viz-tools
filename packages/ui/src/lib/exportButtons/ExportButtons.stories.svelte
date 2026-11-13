<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ExportButtons from './ExportButtons.svelte';

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
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/ExportButtons',
		component: ExportButtons,
		tags: ['autodocs'],
		argTypes: {
			variant: { options: ['compact', 'standard', 'separate'], control: { type: 'radio' } }
		}
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
	let variantsNode: HTMLDivElement = $state() as HTMLDivElement;
</script>

{#snippet placeholderChart()}
	<div class="sr-only">Example image holder - hidden so as not to present misleading layout</div>
{/snippet}

<!-- The three variants, from most to least compact. -->
<Story name="Variants">
	{#snippet template()}
		<div bind:this={variantsNode}>
			{@render placeholderChart()}
		</div>
		<div class="flex flex-col items-start gap-4">
			{#each ['compact', 'standard', 'outline', 'separate'] as const as variant (variant)}
				<ExportButtons
					{variant}
					elementToCapture={variantsNode}
					dataForDownload={demoData}
					dataDownload={true}
					imageDownload={true}
				/>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Only data download enabled">
	{#snippet template()}
		<div bind:this={bothNode}>
			{@render placeholderChart()}
		</div>
		<ExportButtons
			elementToCapture={bothNode}
			dataForDownload={demoData}
			dataDownload={true}
			imageDownload={false}
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
			dataDownload={false}
			imageDownload={true}
		/>
	{/snippet}
</Story>

<!--
	With both `dataDownload` and `imageDownload` set to `true`, the default format options are
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
			dataDownload={true}
			imageDownload={true}
		/>
	{/snippet}
</Story>

<!--
	Here the data format is restricted to CSV and the image	format is restricted to PNG.
	With `variant="separate"`, each button has a single format, so it renders as a normal button (rather than a [MultipleActionButton](./?path=/docs/docs/ui-components-buttons-multipleactionbutton--documentation)).
-->
<Story name="Restricted choice of formats">
	{#snippet template()}
		<div bind:this={restrictedNode}>
			{@render placeholderChart()}
		</div>
		<ExportButtons
			elementToCapture={restrictedNode}
			dataForDownload={demoData}
			dataDownload={['CSV']}
			imageDownload={['PNG']}
			filename="my-chart-export"
		/>
		<ExportButtons
			variant="separate"
			elementToCapture={restrictedNode}
			dataForDownload={demoData}
			dataDownload={['CSV']}
			imageDownload={['PNG']}
			filename="my-chart-export"
		/>
	{/snippet}
</Story>

<!--
	Data downloads are only offered when `dataForDownload` is truthy.
	When `dataForDownload={undefined}`, the Download menu has no Data group (open it to see), and with `variant="separate"` the data download button is not rendered.
-->
<Story name="Data downloads hidden when no data">
	{#snippet template()}
		<div bind:this={noDataNode}>
			{@render placeholderChart()}
		</div>
		<div class="flex flex-col items-start gap-4">
			<ExportButtons
				elementToCapture={noDataNode}
				dataForDownload={undefined}
				dataDownload={true}
				imageDownload={true}
			/>
			<ExportButtons
				variant="separate"
				elementToCapture={noDataNode}
				dataForDownload={undefined}
				dataDownload={true}
				imageDownload={true}
			/>
		</div>
	{/snippet}
</Story>
