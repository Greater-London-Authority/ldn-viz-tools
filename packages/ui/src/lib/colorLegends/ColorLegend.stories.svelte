<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ColorLegend from './ColorLegend.svelte';

	import { cumsum } from 'd3-array';

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
		scaleThreshold,
		type ScaleSequentialQuantile,
		type ScaleThreshold
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

	import Button from '../button/Button.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Legends/ColorLegend',
		component: ColorLegend,
		tags: ['autodocs', 'no-tests'],

		argTypes: {
			color: {
				control: false
			}
		}
	});

	const bandColorScale = scaleThreshold(
		[22, 35, 51, 72],
		['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']
	);

	let scale: ScaleSequentialQuantile<string, never> | undefined = $state();
	let randomThresholdScale: ScaleThreshold<number, string, never> | undefined = $state();
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-[400px]">
			<ColorLegend
				{...args}
				color={scaleSequential([0, 100], interpolateViridis)}
				title="Temperature (°F)"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Sequential color scale">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend color={scaleSequential([0, 100], interpolateViridis)} title="Temperature (°F)" />
		</div>
	{/snippet}
</Story>

<Story name="Sequential color scale - highlighted value">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleSequential([0, 100], interpolateViridis)}
				title="Temperature (°F)"
				highlightedValue={25}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Sequential color scale with square root">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend color={scaleSequentialSqrt([0, 1], interpolateTurbo)} title="Speed (kts)" />
		</div>
	{/snippet}
</Story>

<Story name="Diverging color scale">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleDiverging([-0.1, 0, 0.1], interpolatePiYG)}
				title="Daily change"
				tickFormat="+%"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Diverging color scale with square root">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleDivergingSqrt([-0.1, 0, 0.1], interpolateRdBu)}
				title="Daily change"
				tickFormat="+%"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Sequential color scale with log">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleSequentialLog([1, 100], interpolateBlues)}
				title="Energy (joules)"
				ticks={10}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Sequential color scale with quantile">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleSequentialQuantile(
					range(100).map(() => Math.random() ** 2),
					interpolateBlues
				)}
				title="Quantile"
				tickFormat=".2f"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Square root color scale">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleSqrt([-100, 0, 100], ['blue', 'white', 'red'])}
				title="Temperature (°C)"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Quantize color scale">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend color={scaleQuantize([1, 10], schemePurples[9])} title="Unemployment rate (%)" />
		</div>
	{/snippet}
</Story>

<Story name="Quantile color scale">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleQuantile(range(1000).map(randomNormal(100, 20)), schemeSpectral[9])}
				title="Height (cm)"
				tickFormat=".0f"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Threshold color scale">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleThreshold([2.5, 3.1, 3.5, 3.9, 6, 7, 8, 9.5], schemeRdBu[9])}
				title="Unemployment rate (%)"
				tickSize={0}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Ordinal color scale">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend
				color={scaleOrdinal(
					['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '≥80'],
					schemeSpectral[10]
				)}
				title="Age (years)"
				tickSize={0}
			/>
		</div>
	{/snippet}
</Story>

<!-- new stories, not in observable notebook -->

<Story name="Color bands">
	{#snippet template()}
		<p>The scale bands are "&lt;22", "22 - 35", "35-51", "51-72", "&gt;72"</p>

		<div class="max-w-[400px]">
			<ColorLegend color={bandColorScale} title="Age (years)" />
		</div>
	{/snippet}
</Story>

<Story name="Left and right labels">
	{#snippet template()}
		<div class="max-w-[400px]">
			<ColorLegend color={bandColorScale} title="Age" leftLabel="Younger" rightLabel="Older" />
		</div>
	{/snippet}
</Story>

<Story name="Flipping scale direction">
	{#snippet template()}
		<div class="max-w-[400px]">
			<p>
				Flipping both the range and domain of the scale affects the direction in which the legend is
				drawn, without affecting the mapping from values to colors.
			</p>

			<div class="flex gap-2">
				<ColorLegend color={scaleSequential(interpolateBlues).domain([0, 10])} title="Original" />

				<ColorLegend
					color={scaleSequential(interpolateBlues).domain([0, 10])}
					title="Flipped"
					reverse
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Updating scale">
	{#snippet template()}
		<Button
			onclick={() =>
				(scale = scaleSequentialQuantile(
					range(100).map(() => Math.random() ** 2),
					interpolateBlues
				))}>Update scale</Button
		>
		{#if scale}
			<div class="max-w-[400px]">
				<ColorLegend color={scale} title="Quantile" tickFormat=".2f" />
			</div>
		{/if}
	{/snippet}
</Story>

<Story name="Updating threshold scale">
	{#snippet template()}
		<Button
			onclick={() =>
				(randomThresholdScale = scaleThreshold(
					cumsum(range(5).map(() => Math.random() ** 2)),
					schemeRdBu[5]
				))}>Update scale</Button
		>
		{#if randomThresholdScale}
			<div class="max-w-[400px]">
				<ColorLegend color={randomThresholdScale} title="Threshold" tickFormat=".2f" />
			</div>
		{/if}
	{/snippet}
</Story>
