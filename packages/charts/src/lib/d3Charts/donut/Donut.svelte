<script lang="ts" generics="T extends Record<string, any>">
	/**
	 * The `Donut` is a D3 chart component that displays categorical data as slices (or arcs) within a ring, representing proportions of a total (100%).
	 *
	 * 	@component
	 */

	import { theme } from '@ldn-viz/ui';
	import { colorWithBestContrast } from '@ldn-viz/utils';
	import { sum } from 'd3-array';
	import { arc, pie, type PieArcDatum } from 'd3-shape';
	import DonutLegend from './DonutLegend.svelte';
	import DonutTooltip from './DonutTooltip.svelte';

	interface Props<T extends Record<string, any>> {
		/**
		 * Data being displayed in the donut chart.
		 */
		data: T[];
		/**
		 * Field used for labels. Defaults to 'label'.
		 */
		labelField?: keyof T;
		/**
		 * Field used for numeric value. Defaults to 'value'.
		 */
		countField?: keyof T;
		/**
		 * Define catergorical colours and which category they should be associated with
		 */
		colorMapping: any;
		/**
		 * Width of donut
		 */
		width?: number;
		/**
		 * Height of donut
		 */
		height?: number;
		/**
		 * Margin of donut
		 */
		margin?: number;
		/**
		 * Minimum angle to dipslay label in chart segment
		 */
		minAngle?: number;
		/**
		 * Tooltips on donut segment, defaults to true.
		 */
		hideTooltip?: boolean;
		/**
		 * Tooltips on donut segment, defaults to true.
		 */
		hideLegend?: boolean;
	}

	let {
		data,
		colorMapping,
		labelField = 'label',
		countField = 'value',
		width = 300,
		height = 300,
		margin = 0,
		minAngle = 0.5,
		hideTooltip = false,
		hideLegend = false
	}: Props<T> = $props();

	/**
	 * Donut segments
	 */

	let total = $derived(sum(data.map((d) => Number(d[countField]))));

	let outerRadius = $derived(Math.min(width, height) / 2 - margin);
	let innerRadius = $derived(Math.min(width, height) / 4 - margin);

	let pieGenerator = $derived(
		pie<T>()
			.value((d) => d[countField])
			.sort(null)
			.padAngle(0.005)
	);

	let pieData: PieArcDatum<T>[] = $derived(pieGenerator(data));

	let arcPath = $derived(arc<PieArcDatum<T>>().innerRadius(innerRadius).outerRadius(outerRadius));

	const shouldShowLabel = (slice: PieArcDatum<T>) => slice.endAngle - slice.startAngle >= minAngle;

	const formatPercent = (val: number, total: number) => ((val / total) * 100).toFixed(1) + '%';

	let labelArc = arc<PieArcDatum<T>>()
		.innerRadius((0.9 * height) / 2)
		.outerRadius((0.5 * height) / 2);

	/**
	 * Donut tooltips
	 */

	let tooltipVisible = $state(false);
	let tooltipX = $state(0);
	let tooltipY = $state(0);
	let tooltipLabel = $state('');
	let tooltipValue = $state('');

	let svgEl: SVGSVGElement | undefined = $state();

	const onMouseEnter = (slice: PieArcDatum<T>) => {
		if (!svgEl) return;

		tooltipX = labelArc.centroid(slice)[0] + width / 2;
		tooltipY = labelArc.centroid(slice)[1] + height / 2;

		tooltipLabel = String(slice.data[labelField]);
		tooltipValue = formatPercent(slice.data[countField], total);
		tooltipVisible = true;
	};

	const onMouseLeave = () => {
		tooltipVisible = false;
	};

	/**
	 * Labels on donut - change text color depending on color of segment
	 */

	let textColor = (color: any) => {
		return colorWithBestContrast(
			color,
			theme.tokenNameToValue('text.primary'),
			theme.tokenNameToValue('text.inverse.primary')
		);
	};
</script>

{#if data?.length}
	<div class="flex w-full">
		<svg
			bind:this={svgEl}
			{width}
			{height}
			viewBox="{-width / 2} {-height / 2} {width} {height}"
			style:max-width="100%"
			style:height="auto"
		>
			{#each pieData as slice}
				<path
					d={arcPath(slice)}
					fill={colorMapping[slice.data[labelField]]}
					stroke={theme.currentTheme.color.chart.background}
					role="listitem"
					cursor="pointer"
					onmouseenter={() => onMouseEnter(slice)}
					onmouseleave={onMouseLeave}
				/>

				{#if shouldShowLabel(slice)}
					<text
						text-anchor="middle"
						font-size="0.8em"
						font-weight="500"
						pointer-events="none"
						style:fill={textColor(colorMapping[slice.data[labelField]])}
						transform="translate({labelArc.centroid({
							...slice
						})})"
					>
						{formatPercent(slice.data[countField], total)}
					</text>
				{/if}
			{/each}
		</svg>

		{#if !hideTooltip}
			<DonutTooltip
				x={tooltipX}
				y={tooltipY}
				category={tooltipLabel}
				quantity={tooltipValue}
				visible={tooltipVisible}
			/>
		{/if}

		{#if !hideLegend}
			<DonutLegend {data} {labelField} {countField} {colorMapping} />
		{/if}
	</div>
{:else}
	No data
{/if}
