<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ColorLegendOrdinalChips from './ColorLegendOrdinalChips.svelte';

	export const meta = {
		title: 'Ui/Legends/ColorLegendOrdinalChips',
		component: ColorLegendOrdinalChips,
		argTypes: {
			orientation: {
				options: ['horizontal', 'vertical'],
				control: { type: 'radio' }
			}
		}
	};
</script>

<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';

	const ordinalScale = scaleOrdinal()
		.domain(['A', 'B', 'C', 'D'])
		.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);
</script>

<Template let:args>
	<ColorLegendOrdinalChips scale={ordinalScale} title="Current EPC Rating" {...args} />
</Template>

<Story name="Default" />

<Story name="Categorical color scale">
	<div class="w-[400px]">
		<ColorLegendOrdinalChips scale={ordinalScale} title="Current EPC Rating" />
	</div>
</Story>

<Story name="Categorical color scale - highlighted value">
	<div class="w-[400px]">
		<ColorLegendOrdinalChips scale={ordinalScale} title="Current EPC Rating" highlightedValue="B" />
	</div>
</Story>

<!-- If there are a large number of color options to include in the legend, it may be necessarily to spread them out vertically rather than horizontally. -->
<Story name="Categorical color scale - vertical">
	<div class="w-[400px]">
		<ColorLegendOrdinalChips
			scale={ordinalScale}
			title="Current EPC Rating"
			orientation="vertical"
		/>
	</div>
</Story>
