<script context="module">
	import CategoricalTick from './CategoricalTick.svelte';
	import { scaleBand, scaleOrdinal } from 'd3-scale';

	export const meta = {
		title: 'Tables/Encodings/CategoricalTick',
		component: CategoricalTick,

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			colorScale: scaleOrdinal()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']),

			extent: [0, 1],

			posScale: scaleBand().range([0, 1]).domain(['a', 'b', 'c', 'd'])
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<CategoricalTick {...args} />
</Template>

<Story name="Default" source />

<Story name="Multiple" source let:args>
	<div class="w-36 flex flex-col">
		<CategoricalTick {...args} value="a" />
		<CategoricalTick {...args} value="b" />
		<CategoricalTick {...args} value="c" />
		<CategoricalTick {...args} value="d" />
	</div>
</Story>
