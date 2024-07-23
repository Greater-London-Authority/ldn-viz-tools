<script context="module">
	import BarChart from './BarChart.svelte';
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	export const meta = {
		title: 'Tables/AggregateEncodings/BarChart',
		component: BarChart,

		args: {
			values: ['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd'],

			colorScale: scaleOrdinal()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']),

			posScale: scaleBand().range([0, 1]).domain(['a', 'b', 'c', 'd'])
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<BarChart {...args} />
</Template>

<Story name="Default" source />

<!-- Bars are labelled if there are 3 or fewer bars. -->
<Story name="Few labels">

	<BarChart
		values={['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c']}
		colorScale={scaleOrdinal()
				.domain(['a', 'b', 'c'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894'])
				}
		posScale={scaleBand().range([0, 1]).domain(['a', 'b', 'c'])}
	/>
</Story>
