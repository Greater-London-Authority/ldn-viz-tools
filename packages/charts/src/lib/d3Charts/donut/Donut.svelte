<script lang="ts" generics="T">
	import { theme } from '@ldn-viz/ui';
	import { colorWithBestContrast } from '@ldn-viz/utils';
	import { arc, pie, type DefaultArcObject, type PieArcDatum } from 'd3-shape';

	/* =========================
	   Props 
	========================= */

	interface Props<T> {
		data: T[];
		valueAccessor: (d: T) => number;
		labelAccessor: (d: T) => string;
		colorAccessor?: (d: T) => string;
		valueFormatter?: (value: number, total: number) => string;
		width?: number;
		height?: number;
		margin?: number;
		minAngle?: number;
	}

	let {
		data,
		valueAccessor,
		labelAccessor,
		colorAccessor,
		valueFormatter = (v, total) => (total ? ((v / total) * 100).toFixed(1) + '%' : ''),
		width = 300,
		height = 300,
		margin = 0,
		minAngle = 0.5
	}: Props<T> = $props();

	/* =========================
	   Layout
	========================= */

	let outerRadius = $derived(Math.min(width, height) / 2 - margin);
	let innerRadius = $derived(Math.min(width, height) / 4 - margin);

	let total = $derived(data.reduce((sum, d) => sum + valueAccessor(d), 0));

	let pieGen = $derived(
		pie<T>()
			.value((d) => valueAccessor(d))
			.sort(null)
	);

	let arcs: PieArcDatum<T>[] = $derived(pieGen(data));

	let arcPath = $derived(arc<PieArcDatum<T>>().innerRadius(innerRadius).outerRadius(outerRadius));

	const shouldShowLabel = (slice: PieArcDatum<T>) => slice.endAngle - slice.startAngle >= minAngle;

	const formatValue = (value: number) => valueFormatter(value, total);

	let labelArc = arc<DefaultArcObject>()
		.innerRadius((0.9 * height) / 2)
		.outerRadius((0.5 * height) / 2);

	/* =========================
	   Tooltip
	========================= */

	let tooltipVisible = $state(false);
	let tooltipX = $state(0);
	let tooltipY = $state(0);
	let tooltipLabel = $state('');
	let tooltipValue = $state('');

	let svgEl: SVGSVGElement | undefined = $state();

	const onMouseEnter = (slice: PieArcDatum<T>) => {
		const [cx, cy] = labelArc.centroid({
			...slice,
			innerRadius: (0.9 * height) / 2,
			outerRadius: (0.5 * height) / 2
		});

		if (!svgEl) return;

		const rect = svgEl.getBoundingClientRect();
		const scaleX = rect.width / width;
		const scaleY = rect.height / height;

		tooltipX = rect.left + (cx + width / 2) * scaleX;
		tooltipY = rect.top + (cy + height / 2) * scaleY;

		tooltipLabel = labelAccessor(slice.data);
		tooltipValue = formatValue(valueAccessor(slice.data));
		tooltipVisible = true;
	};

	const onMouseLeave = () => {
		tooltipVisible = false;
	};

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
			{#each arcs as slice}
				<path
					d={arcPath(slice)}
					fill={colorAccessor ? colorAccessor(slice.data) : 'steelblue'}
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
						style:fill={textColor(colorAccessor ? colorAccessor(slice.data) : 'steelblue')}
						transform="translate({labelArc.centroid({
							...slice,
							innerRadius: (0.9 * height) / 2,
							outerRadius: (0.5 * height) / 2
						})})"
					>
						{formatValue(valueAccessor(slice.data))}
					</text>
				{/if}
			{/each}
		</svg>

		{#if tooltipVisible}
			<div
				class="pointer-events-none fixed rounded bg-black px-2 py-1 text-xs text-white"
				style="left: {tooltipX}px; top: {tooltipY}px"
			>
				<strong>{tooltipLabel}</strong><br />
				{tooltipValue}
			</div>
		{/if}
	</div>
{:else}
	No data
{/if}
