<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColorLegendOrdinalHorizontalAlt from './ColorLegendOrdinalHorizontalAlt.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Legends/ColorLegendOrdinalHorizontalAlt',
		component: ColorLegendOrdinalHorizontalAlt,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';

	const ordinalScale = scaleOrdinal()
		.domain(['A', 'B', 'C', 'D'])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);
</script>

<Story name="Default">
	{#snippet template({ args })}
		<ColorLegendOrdinalHorizontalAlt scale={ordinalScale} title="Current EPC Rating" {...args} />
	{/snippet}
</Story>

<Story name="Categorical color scale">
	{#snippet template()}
		<div class="w-[400px]">
			<ColorLegendOrdinalHorizontalAlt scale={ordinalScale} title="Current EPC Rating" />
		</div>
	{/snippet}
</Story>

<Story name="Categorical color scale - highlighted value">
	{#snippet template()}
		<div class="w-[400px]">
			<ColorLegendOrdinalHorizontalAlt
				scale={ordinalScale}
				title="Current EPC Rating"
				highlightedValue="B"
			/>
		</div>
	{/snippet}
</Story>
