<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Footer from './Footer.svelte';

	/**
	 * The `Footer` renders the content that appears below a chart (the `byline`,
	 * `source`, `note`, trigger for a description modal, and image/data download buttons).
	 *
	 * It is normally used only indirectly via the [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Charts/Components/ChartContainer/Footer',
		component: Footer,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import ExportBtns from './ExportBtns.svelte';

	const demoData = [
		{ Month: '2015-01-01', Value: 53623.9 },
		{ Month: '2015-02-01', Value: 61816.0 },
		{ Month: '2015-03-01', Value: 58204.2 }
	];

	// The DOM node captured when downloading an image. Each story binds its own.
	let footnotesNode: HTMLDivElement = $state() as HTMLDivElement;
	let buttonsOnlyNode: HTMLDivElement = $state() as HTMLDivElement;
</script>

{#snippet placeholderChart()}
	<div
		class="text-color-text-muted mb-2 flex h-24 w-full items-center justify-center bg-color-container-level-1"
	>
		Chart would go here.
	</div>
{/snippet}

<Story name="All footnotes + export buttons">
	{#snippet template(args)}
		<div bind:this={footnotesNode}>
			{@render placeholderChart()}
		</div>
		<Footer
			{...args}
			byline="A byline for the chart"
			source="GLA city intelligence"
			note="Be aware that you can provide a note if required"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
		>
			{#snippet exportBtns()}
				<ExportBtns
					chartToCapture={footnotesNode}
					dataForDownload={demoData}
					dataDownloadButton={true}
					imageDownloadButton={true}
				/>
			{/snippet}
		</Footer>
	{/snippet}
</Story>

<Story name="No export buttons">
	{#snippet template(args)}
		<div bind:this={footnotesNode}>
			{@render placeholderChart()}
		</div>
		<Footer
			{...args}
			byline="A byline for the chart"
			source="GLA city intelligence"
			note="Be aware that you can provide a note if required"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
		></Footer>
	{/snippet}
</Story>

<Story name="Export buttons only">
	{#snippet template(args)}
		<div bind:this={buttonsOnlyNode}>
			{@render placeholderChart()}
		</div>
		<Footer {...args}>
			{#snippet exportBtns()}
				<ExportBtns
					chartToCapture={buttonsOnlyNode}
					dataForDownload={demoData}
					dataDownloadButton={true}
					imageDownloadButton={true}
				/>
			{/snippet}
		</Footer>
	{/snippet}
</Story>

<!--
	When a `chartDescription` is provided, the footer renders a "View description" button;
	clicking this opens a modal containing this description. 
-->
<Story name="Description modal">
	{#snippet template(args)}
		<Footer
			{...args}
			byline="A byline for the chart"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
		/>
	{/snippet}
</Story>

<!--
	The byline, source and note are rendered as HTML, so they can contain links.
	Links are styled with an underline; on hover the underline is removed and the link turns blue.
-->
<Story name="HTML links in footnotes">
	{#snippet template(args)}
		<Footer
			{...args}
			byline="A byline for the chart"
			source="<a href='https://www.london.gov.uk/programmes-strategies/research-and-analysis'>GLA city intelligence</a>"
			note="See the <a href='https://www.london.gov.uk'>full methodology</a> for details"
		/>
	{/snippet}
</Story>
