<script lang="ts" module>
	export type DonutSize = 'sm' | 'md' | 'lg';

	/**
	 * Each size's ring diameter, and the narrowest container it is drawn in.
	 * A container narrower than `minWidth` steps the donut down a size.
	 */
	export const donutSizes: Record<DonutSize, { diameter: number; minWidth: number }> = {
		sm: { diameter: 80, minWidth: 0 },
		md: { diameter: 160, minWidth: 200 },
		lg: { diameter: 300, minWidth: 320 }
	};

	const sizeOrder: DonutSize[] = ['sm', 'md', 'lg'];
</script>

<script lang="ts" generics="T extends Record<string, any>">
	/**
	 * The `Donut` is a D3 chart component that displays categorical data as slices (or arcs) within a ring, representing proportions of a total (100%).
	 *
	 * 	@component
	 */

	import { ColorLegendOrdinalChips, theme } from '@ldn-viz/ui';
	import { colorWithBestContrast } from '@ldn-viz/utils';
	import { sum } from 'd3-array';
	import { scaleOrdinal } from 'd3-scale';
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
		colorMapping: Record<string, string>;
		/**
		 * The largest size to draw. A narrower container steps the donut down a size.
		 * `sm` is a ring with no labels, legend or tooltip, to sit beside a metric.
		 * `md` has a legend below the ring. `lg` adds labels on the ring where they fit.
		 */
		size?: DonutSize;
		/**
		 * Tooltips on donut segment, defaults to true.
		 */
		hideTooltip?: boolean;
		/**
		 * If `true`, then the table of values is hidden.
		 */
		hideTable?: boolean;
	}

	let {
		data,
		colorMapping,
		labelField = 'label',
		countField = 'value',
		size = 'lg',
		hideTooltip = false,
		hideTable = false
	}: Props<T> = $props();

	/**
	 * Size: the smaller of the `size` prop and the largest size the container fits
	 */

	let containerWidth: number | undefined = $state();

	let drawnSize = $derived.by(() => {
		if (containerWidth === undefined) return size;
		const fits = sizeOrder.filter((s) => donutSizes[s].minWidth <= containerWidth!);
		const largestFit = fits[fits.length - 1] ?? 'sm';
		return sizeOrder[Math.min(sizeOrder.indexOf(size), sizeOrder.indexOf(largestFit))];
	});

	let diameter = $derived(Math.min(donutSizes[drawnSize].diameter, containerWidth ?? Infinity));

	let showLabels = $derived(drawnSize === 'lg');
	let showLegend = $derived(drawnSize !== 'sm');
	let showTooltip = $derived(!hideTooltip);

	/**
	 * Donut segments
	 */

	let total = $derived(sum(data.map((d) => Number(d[countField]))));

	const minRingWidth = 12;
	// Gap between slices in px, the same width at every size and radius.
	const separatorWidth = 2;

	let outerRadius = $derived(diameter / 2);
	let innerRadius = $derived(Math.min(outerRadius / 2, outerRadius - minRingWidth));
	let labelRadius = $derived((innerRadius + outerRadius) / 2);

	let pieGenerator = $derived(
		pie<T>()
			.value((d) => d[countField])
			.sort(null)
			.padAngle(separatorWidth / outerRadius)
	);

	let pieData: PieArcDatum<T>[] = $derived(pieGenerator(data));

	let arcPath = $derived(
		arc<PieArcDatum<T>>().innerRadius(innerRadius).outerRadius(outerRadius).padRadius(outerRadius)
	);

	let labelArc = $derived(arc<PieArcDatum<T>>().innerRadius(labelRadius).outerRadius(labelRadius));

	const formatPercent = (val: number, total: number) => ((val / total) * 100).toFixed(1) + '%';

	/**
	 * Labels on donut - shown when the label fits along the slice's arc and across the ring.
	 * Text width is estimated from the label-md size.
	 */

	const labelCharWidth = 8;
	const labelHeight = 16;
	const labelPadding = 8;

	const shouldShowLabel = (slice: PieArcDatum<T>) => {
		const textWidth = formatPercent(slice.data[countField], total).length * labelCharWidth;
		const arcLength = (slice.endAngle - slice.startAngle) * labelRadius;
		return (
			arcLength >= textWidth + labelPadding &&
			outerRadius - innerRadius >= labelHeight + labelPadding
		);
	};

	let ariaLabel = $derived(
		pieData
			.map((slice) => `${slice.data[labelField]} ${formatPercent(slice.data[countField], total)}`)
			.join(', ')
	);

	/**
	 * Donut tooltips
	 */

	let tooltipVisible = $state(false);
	let tooltipX = $state(0);
	let tooltipY = $state(0);
	let tooltipLabel = $state('');
	let tooltipValue = $state('');

	const onMouseEnter = (slice: PieArcDatum<T>) => {
		if (!showTooltip) return;

		// Anchor above the slice's label, or at the slice's centre when it has none
		const [x, y] = labelArc.centroid(slice);
		const labelOffset = showLabels && shouldShowLabel(slice) ? labelHeight / 2 : 0;
		tooltipX = x + outerRadius;
		tooltipY = y + outerRadius - labelOffset;

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
			theme.tokenNameToValue('text'),
			theme.tokenNameToValue('inverse.text')
		);
	};
</script>

{#if data?.length}
	<div
		class="typeset-product mt-flow-tight flex flex-col gap-2"
		class:w-fit={size === 'sm'}
		bind:clientWidth={containerWidth}
		data-size={drawnSize}
	>
		{#if showLegend && hideTable}
			<ColorLegendOrdinalChips
				scale={scaleOrdinal(Object.keys(colorMapping), Object.values(colorMapping))}
			/>
		{/if}

		<div
			class={drawnSize === 'lg'
				? 'flex flex-wrap items-start gap-4'
				: 'flex flex-col items-start gap-4'}
		>
			<div class="relative shrink-0">
				<svg
					width={diameter}
					height={diameter}
					viewBox="{-outerRadius} {-outerRadius} {diameter} {diameter}"
					role="img"
					aria-label={ariaLabel}
				>
					{#each pieData as slice (slice.data[labelField])}
						<!-- The tooltip repeats the legend and the svg's label, so hover alone is enough. -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<path
							d={arcPath(slice)}
							fill={colorMapping[slice.data[labelField]]}
							cursor={showTooltip ? 'pointer' : undefined}
							onmouseenter={() => onMouseEnter(slice)}
							onmouseleave={onMouseLeave}
						/>

						{#if showLabels && shouldShowLabel(slice)}
							<text
								class="chart-label"
								text-anchor="middle"
								dominant-baseline="central"
								pointer-events="none"
								aria-hidden="true"
								style:fill={textColor(colorMapping[slice.data[labelField]])}
								transform="translate({labelArc.centroid(slice)})"
							>
								{formatPercent(slice.data[countField], total)}
							</text>
						{/if}
					{/each}
				</svg>

				{#if showTooltip}
					<DonutTooltip
						x={tooltipX}
						y={tooltipY}
						category={tooltipLabel}
						quantity={tooltipValue}
						visible={tooltipVisible}
					/>
				{/if}
			</div>

			{#if showLegend && !hideTable}
				<DonutLegend {data} {labelField} {countField} {colorMapping} />
			{/if}
		</div>
	</div>
{:else}
	No data
{/if}
