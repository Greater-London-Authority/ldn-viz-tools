<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import { scaleSequential, scaleThreshold } from 'd3-scale';
	import { interpolateBlues } from 'd3-scale-chromatic';

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
		['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'].reverse()
	);
</script>

<Meta title="Ui/Legends/ColorLegendBand" component={ColorLegendContinuous} />

<Story name="Continuous color scale">
	<div class="w-[400px]">
		<p>
			Setting minVal and maxVal extends the scale - useful if some colors correspond to values &gt;
			or &lt; a threshold.
		</p>

		<p>The scale bands are "&lt;22", "22 - 35", "35-51", "51-72", "&gt;72"</p>
		<ColorLegendBands
			scale={bandColorScale}
			title="Index of Multiple Deprivation"
			minVal={10}
			maxVal={100}
			leftLabel="Less deprived"
			rightLabel="More deprived"
		/>
	</div>
</Story>

<Story name="Continuous color scale - min and max not specified">
	<div class="w-[400px]">
		<p>In this example, min and max values aren't set.</p>

		<p>
			The scale bands are "&lt;22", "22 - 35", "35-51", "51-72", "&gt;72" - but as no min or max
			values are set, the bars for "&lt;22" and "&gt;72" have zero width.
		</p>
		<ColorLegendBands
			scale={bandColorScale}
			title="Index of Multiple Deprivation"
			leftLabel="Less deprived"
			rightLabel="More deprived"
		/>
	</div>
</Story>
