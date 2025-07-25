<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ColorLegendOrdinalChips from './ColorLegendOrdinalChips.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Legends/ColorLegendOrdinalChips',
		component: ColorLegendOrdinalChips,
		tags: ['autodocs'],

		argTypes: {
			orientation: {
				options: ['horizontal', 'vertical'],
				control: { type: 'radio' }
			}
		}
	});
</script>

<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';

	const ordinalScale = scaleOrdinal()
		.domain(['A', 'B', 'C', 'D'])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);

	const ordinalScaleLong = scaleOrdinal()
		.domain([
			'A quite long category',
			'Another quite long category',
			'An even longer category name',
			'The length of this category name seems somewhat excessive'
		])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColorLegendOrdinalChips scale={ordinalScale} title="Current EPC Rating" {...args} />
	{/snippet}
</Story>

<Story name="Categorical color scale">
	{#snippet template()}
		<div class="w-[400px]">
			<ColorLegendOrdinalChips scale={ordinalScale} title="Current EPC Rating" />
		</div>
	{/snippet}
</Story>

<Story name="Categorical color scale - highlighted value">
	{#snippet template()}
		<div class="w-[400px]">
			<ColorLegendOrdinalChips
				scale={ordinalScale}
				title="Current EPC Rating"
				highlightedValue="B"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Categorical color scale - wrapping">
	{#snippet template()}
		<div class="w-[600px] border border-gray-200">
			<ColorLegendOrdinalChips scale={ordinalScaleLong} />
		</div>
	{/snippet}
</Story>

<!-- If there are a large number of color options to include in the legend, it may be necessarily to spread them out vertically rather than horizontally. -->
<Story name="Categorical color scale - vertical">
	{#snippet template()}
		<div class="w-[400px]">
			<ColorLegendOrdinalChips
				scale={ordinalScale}
				title="Current EPC Rating"
				orientation="vertical"
			/>
		</div>
	{/snippet}
</Story>
