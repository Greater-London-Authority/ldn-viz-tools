<script lang="ts">
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

	const width = 600;
	const height = 20;
</script>

<div class="flex flex-col items-center gap-2">
	{#if title}<p class="font-semibold">{title}</p>{/if}

	<svg viewBox={`0 0 ${width} ${height + 30}`} class="max-w-3xl">
		{#each scale.domain() as val, i}
			<rect
				x={(width * i) / scale.domain().length}
				width={width / scale.domain().length}
				y={0}
				{height}
				fill={scale(val)}
			/>
			<text
				x={(width * (i + 0.5)) / scale.domain().length}
				y={height + 20}
				text-anchor="middle"
				class="select-none"
				style:font-weight={val === highlightedValue ? 'bold' : 'normal'}
			>
				{val}
			</text>
		{/each}
	</svg>
</div>
