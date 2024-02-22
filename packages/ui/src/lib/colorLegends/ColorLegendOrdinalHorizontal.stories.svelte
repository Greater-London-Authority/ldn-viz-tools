<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import { scaleOrdinal } from 'd3-scale';
	import ColorLegendOrdinalHorizontal from './ColorLegendOrdinalHorizontal.svelte';

	const ordinalScale = scaleOrdinal()
		.domain(['A', 'B', 'C', 'D'])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);
</script>

<Meta title="Ui/Legends/ColorLegendOrdinalHorizontal" component={ColorLegendOrdinalHorizontal} />

<Story name="Categorical color scale">
	<div class="w-[400px]">
		<ColorLegendOrdinalHorizontal scale={ordinalScale} title="Current EPC Rating" />
	</div>
</Story>
