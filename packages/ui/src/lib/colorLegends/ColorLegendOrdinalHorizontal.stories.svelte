<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import ColorLegendOrdinalHorizontal from './ColorLegendOrdinalHorizontal.svelte';

	export const meta = {
		title: 'Ui/Legends/ColorLegendOrdinalHorizontal',
		component: ColorLegendOrdinalHorizontal
	};
</script>

<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';

	const ordinalScale = scaleOrdinal()
		.domain(['A', 'B', 'C', 'D'])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);
</script>

<Story name="Categorical color scale">
	<div class="w-[400px]">
		<ColorLegendOrdinalHorizontal scale={ordinalScale} title="Current EPC Rating" />
	</div>
</Story>

<Story name="Categorical color scale - highlighted value">
	<div class="w-[400px]">
		<ColorLegendOrdinalHorizontal
			scale={ordinalScale}
			title="Current EPC Rating"
			highlightedValue="B"
		/>
	</div>
</Story>
