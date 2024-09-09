<script lang="ts">
	import Tile from './Tile.svelte';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';

	// Standard chrome

	/**
	 * Title that is displayed in large text above the plot.
	 */
	export let title = '';

	/**
	 * Subtitle that is displayed below the title, but above the plot.
	 */
	export let subTitle = '';

	/**
	 * Alt-text for the plot.
	 */
	export let alt = '';

	/**
	 * Tailwind width class passed to Chart Container.
	 */
	export let chartWidth = '';

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
	 * Set to false to hide completely.
	 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'
	 *
	 */
	export let dataDownloadButton: true | false | ('CSV' | 'JSON')[] = true;

	/**
	 * Image Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
	 * Set to false to hide completely.
	 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'
	 *
	 */
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[] = true;

	/**
	 * Provides a way to access the DOM node into which the visualization is rendered.
	 */
	export let domNode: any = undefined;

	/**
	 * Object specifying the tile layout.
	 */
	export let layout;

	/**
	 * Array of data entries containing one or more entry per tile. Each tile contains a filtered copy of this, containing only the relevant entries.
	 */
	export let data;

	/**
	 * Contextual data that can be used as a comparison in each tile. Each tile receives this whol object.
	 */
	export let contextData;

	/**
	 * The name of the field in the `layout` object which contains the id of the corresponding geography/area.
	 */
	export let idFieldLayout;

	/**
	 * The name of the field in the entries of the `data` object which contains the id of the corresponding geography/area.
	 */
	export let idFieldData;

	/**
	 * Function which receives `data` (fitlered to only include the entries relevant for particular tile)  and `contextData` as arguments, and returns an Observable Plot spec.
	 */ export let specFn;

	/**
	 * Function that will be called (passing the geography id as an argument) when the user clicks on a tile.
	 */
	export let onClick = (id) => undefined;
</script>

<!-- domNode ???-->

<ChartContainer
	{title}
	{subTitle}
	{alt}
	{chartWidth}
	{source}
	{byline}
	{note}
	{dataDownloadButton}
	{imageDownloadButton}
	chartHeight="h-full"
>
	<div
		class="grid grid-cols w-full h-full"
		style="grid-template-columns: repeat({layout.gridProperties
			.GRID_X}, 1fr); grid-template-rows: repeat({layout.gridProperties.GRID_Y}, auto); );"
	>
		{#each Array.from({ length: layout.gridProperties.GRID_Y }, (e, i) => i) as y}
			{#each Array.from({ length: layout.gridProperties.GRID_X }, (e, i) => i) as x}
				{@const tile = layout.gridItems.find((t) => t.GRID_X === x && t.GRID_Y === y)}
				{#if tile}
					{@const tileData = data.filter((d) => d[idFieldData] === tile[idFieldLayout])}
					<Tile
						data={tileData}
						{contextData}
						layout={tile}
						{specFn}
						label={tile.NAME}
						onClick={() => onClick(tile[idFieldLayout])}
					/>
				{:else}
					<div />
				{/if}
			{/each}
		{/each}
	</div>
</ChartContainer>
