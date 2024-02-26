<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import {
		scaleDiverging,
		scaleDivergingSqrt,
		scaleOrdinal,
		scaleQuantile,
		scaleQuantize,
		scaleSequential,
		scaleSequentialLog,
		scaleSequentialQuantile,
		scaleSequentialSqrt,
		scaleSqrt,
		scaleThreshold
	} from 'd3-scale';

	import {
		interpolateBlues,
		interpolatePiYG,
		interpolateRdBu,
		interpolateTurbo,
		interpolateViridis,
		schemePurples,
		schemeRdBu,
		schemeSpectral
	} from 'd3-scale-chromatic';

	import { randomNormal } from 'd3-random';

	import { range } from 'd3-array';

	import ColorLegend from './ColorLegend.svelte';
	import ColorLegendBands from './ColorLegendBands.svelte';
	import ColorLegendContinuous from './ColorLegendContinuous.svelte';

	const continuousColorScale = scaleSequential(interpolateBlues).domain([0, 10]);

	const continuousColorScaleFlipped = scaleSequential((d: number) =>
		interpolateBlues(1 - d)
	).domain([0, 10].reverse());

	const bandColorScale = scaleThreshold(
		[22, 35, 51, 72],
		['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']
	);

	const bandColorScaleFlipped = scaleThreshold(
		[22, 35, 51, 72].reverse(),
		[22, 35, 51, 72].reverse(), 
		['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'].reverse()
	);
</script>

<Meta title="Ui/Legends/ColorLegend" component={ColorLegend} />

<Story name="Sequential color scale">
	<ColorLegend color={scaleSequential([0, 100], interpolateViridis)} title="Temperature (°F)" />
</Story>

<Story name="Sequential color scale - highlighted value">
	<ColorLegend
		color={scaleSequential([0, 100], interpolateViridis)}
		title="Temperature (°F)"
		highlightedValue={25}
	/>
</Story>

<Story name="Sequential color scale with square root">
	<ColorLegend color={scaleSequentialSqrt([0, 1], interpolateTurbo)} title="Speed (kts)" />
</Story>

<Story name="Diverging color scale">
	<ColorLegend
		color={scaleDiverging([-0.1, 0, 0.1], interpolatePiYG)}
		title="Daily change"
		tickFormat="+%"
	/>
</Story>

<Story name="Diverging color scale with square root">
	<ColorLegend
		color={scaleDivergingSqrt([-0.1, 0, 0.1], interpolateRdBu)}
		title="Daily change"
		tickFormat="+%"
	/>
</Story>

<Story name="Sequential color scale with log">
	<ColorLegend
		color={scaleSequentialLog([1, 100], interpolateBlues)}
		title="Energy (joules)"
		ticks={10}
	/>
</Story>

<Story name="Sequential color scale with quantile">
	<ColorLegend
		color={scaleSequentialQuantile(
			range(100).map(() => Math.random() ** 2),
			interpolateBlues
		)}
		title="Quantile"
		tickFormat=".2f"
	/>
</Story>

<Story name="Square root color scale">
	<ColorLegend
		color={scaleSqrt([-100, 0, 100], ['blue', 'white', 'red'])}
		title="Temperature (°C)"
	/>
</Story>

<Story name="Quantize color scale">
	<ColorLegend color={scaleQuantize([1, 10], schemePurples[9])} title="Unemployment rate (%)" />
</Story>

<Story name="Quantile color scale">
	<ColorLegend
		color={scaleQuantile(range(1000).map(randomNormal(100, 20)), schemeSpectral[9])}
		title="Height (cm)"
		tickFormat=".0f"
	/>
</Story>

<Story name="Threshold color scale">
	<ColorLegend
		color={scaleThreshold([2.5, 3.1, 3.5, 3.9, 6, 7, 8, 9.5], schemeRdBu[9])}
		title="Unemployment rate (%)"
		tickSize={0}
	/>
</Story>

<Story name="Ordinal color scale">
	<ColorLegend
		color={scaleOrdinal(
			['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '≥80'],
			schemeSpectral[10]
		)}
		title="Age (years)"
		tickSize={0}
	/>
</Story>
