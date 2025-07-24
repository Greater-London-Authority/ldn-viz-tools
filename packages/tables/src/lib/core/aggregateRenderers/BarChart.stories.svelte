<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import BarChart from './BarChart.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/BarChart',
		component: BarChart,
		tags: ['autodocs'],

		args: {
			values: ['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd'],

			colorScale: scaleOrdinal()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']),

			posScale: scaleBand().range([0, 1]).domain(['a', 'b', 'c', 'd'])
		}
	});
</script>

<Story name="Default" source>
	{#snippet template(args)}
		<BarChart {...args} />
	{/snippet}
</Story>

<!-- Bars are labelled if there are 3 or fewer bars. -->
<Story name="Few labels">
	{#snippet template()}
		<BarChart
			values={['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c']}
			colorScale={scaleOrdinal()
				.domain(['a', 'b', 'c'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894'])}
			posScale={scaleBand().range([0, 1]).domain(['a', 'b', 'c'])}
		/>
	{/snippet}
</Story>
