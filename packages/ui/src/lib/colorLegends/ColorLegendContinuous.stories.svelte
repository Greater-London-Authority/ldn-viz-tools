<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import { scaleSequential } from 'd3-scale';
	import { interpolateBlues } from 'd3-scale-chromatic';

	import ColorLegendContinuous from './ColorLegendContinuous.svelte';

	// const continuousColorScale = scaleSequential(interpolateMorelandPositive).domain([0, +maxVal]);

	const continuousColorScale = scaleSequential(interpolateBlues).domain([0, 10]);

	const continuousColorScaleFlipped = scaleSequential((d: number) =>
		interpolateBlues(1 - d)
	).domain([0, 10].reverse());
</script>

<Meta title="Ui/Legends/ColorLegendContinuous" component={ColorLegendContinuous} />

<Story name="Continuous color scale">
	<div class="w-[400px]">
		<ColorLegendContinuous scale={continuousColorScale} title="Unemployment/%" />
	</div>
</Story>

<Story name="Continuous color scale - flipped">
	<div class="w-[400px]">
		<p>
			Flipping both the range and the domain doesn't affect the mapping from values to colors, but
			does change the direction the scale is drawn in.
		</p>
		<ColorLegendContinuous scale={continuousColorScaleFlipped} title="Unemployment/%" />
	</div>
</Story>
