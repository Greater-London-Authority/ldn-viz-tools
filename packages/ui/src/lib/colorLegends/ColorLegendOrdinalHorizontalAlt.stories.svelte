<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColorLegendOrdinalHorizontalAlt from './ColorLegendOrdinalHorizontalAlt.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Legends/ColorLegendOrdinalHorizontalAlt',
		component: ColorLegendOrdinalHorizontalAlt,
		tags: ['autodocs', 'no-tests']
	});
</script>

<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';

	const ordinalScale = scaleOrdinal()
		.domain(['A', 'B', 'C', 'D'])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);

	const longLabelScale = scaleOrdinal()
		.domain([
			'Very low deprivation',
			'Low deprivation',
			'Medium deprivation',
			'High deprivation',
			'Very high deprivation'
		])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColorLegendOrdinalHorizontalAlt {...args} scale={ordinalScale} title="Current EPC Rating" />
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

<!--
If the labels are too long they will overlap - consider using the 
 [ColorLegendOrdinalChips](./?path=/docs/ui-components-legends-colorlegendordinalchips--documentation)
 component instead.
 -->
<Story name="Long category labels">
	{#snippet template()}
		<div class="w-[600px]">
			<ColorLegendOrdinalHorizontalAlt
				scale={longLabelScale}
				title="Index of Multiple Deprivation"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Without title">
	{#snippet template()}
		<div class="w-[400px]">
			<ColorLegendOrdinalHorizontalAlt scale={ordinalScale} />
		</div>
	{/snippet}
</Story>
