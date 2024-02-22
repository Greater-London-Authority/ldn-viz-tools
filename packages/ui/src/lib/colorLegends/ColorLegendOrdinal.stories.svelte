<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import { scaleOrdinal } from 'd3-scale';
	import ColorLegendOrdinalOrdinal from './ColorLegendOrdinal.svelte';

	const ordinalScale = scaleOrdinal()
		.domain(['A', 'B', 'C', 'D'])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);
</script>

<Meta title="Ui/Legends/ColorLegendOrdinalOrdinal" component={ColorLegendOrdinalOrdinal} />

<Story name="Categorical color scale">
	<ColorLegendOrdinalOrdinal scale={ordinalScale} title="Current EPC Rating" />
</Story>
