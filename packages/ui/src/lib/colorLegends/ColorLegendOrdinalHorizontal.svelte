<script lang="ts">
	/**
	 * The `<ColorLegendOrdinalHorizontal>` component draws a legend for an ordinal D3 color scale.
	 *
	 * **Alternatives**: [ColorLegend](./?path=/docs/ui-legends-colorlegend--documentation) can draw a legend for an ordinal scale, but with a different appearance.
	 * @component
	 */
	import { type ScaleLinear } from 'd3-scale';

	/**
	 * An ordinal d3 color scale.
	 */
	export let scale: ScaleLinear<number | string, string>;

	/**
	 * Title to display above the legend.
	 */
	export let title = '';

	/**
	 * Value to highlight.
	 */
	export let highlightedValue: number | string | undefined = undefined;
</script>

<div class="flex flex-col">
	{#if title}
		<span class="font-bold">{title}</span>
	{/if}

	<div class="flex gap-2">
		{#each scale.domain() as d}
			<div class="flex items-center">
				<div class="flex-none w-4 h-4 mr-1" style:background-color={scale(d)} />
				<span class=" items-center" style:font-weight={d === highlightedValue ? 'bold' : 'normal'}>
					{d}
				</span>
			</div>
		{/each}
	</div>
</div>
