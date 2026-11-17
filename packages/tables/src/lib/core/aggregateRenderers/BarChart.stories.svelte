<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import BarChart from './BarChart.svelte';

	/**
	 * The `BarChart` component renders a set of values as a bar chart.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/BarChart',
		component: BarChart,
		tags: ['autodocs'],

		args: {
			values: ['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd'],

			color: scaleOrdinal<string, string>()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']),

			posScale: scaleBand().range([0, 1]).domain(['a', 'b', 'c', 'd'])
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BarChart {...args} />
	{/snippet}
</Story>

<!-- Bars are labelled if there are 3 or fewer bars. -->
<Story name="Few labels">
	{#snippet template()}
		<BarChart
			values={['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c']}
			color={scaleOrdinal<string, string>()
				.domain(['a', 'b', 'c'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894'])}
			posScale={scaleBand().range([0, 1]).domain(['a', 'b', 'c'])}
		/>
	{/snippet}
</Story>

<!-- With no posScale, bars fall back to the default band scale, ordered by descending frequency. -->
<Story name="No posScale (default band scale)">
	{#snippet template()}
		<BarChart
			values={['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd']}
			color={scaleOrdinal<string, string>()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'])}
		/>
	{/snippet}
</Story>

<!-- `color` accepts a plain string, applied to every bar. -->
<Story name="Solid color string">
	{#snippet template()}
		<BarChart values={['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c']} color="lightgrey" />
	{/snippet}
</Story>

<!-- With more than 3 distinct categories, labels are suppressed by the `sortedData.length <= 3` guard. -->
<Story name="Many bars">
	{#snippet template()}
		<BarChart
			values={['a', 'a', 'b', 'b', 'b', 'c', 'c', 'd', 'e', 'e', 'f', 'g']}
			color="lightgrey"
		/>
	{/snippet}
</Story>

<!-- Null / missing values are counted as a distinct "null" category. -->
<Story name="Null / missing values">
	{#snippet template()}
		<BarChart values={['a', 'a', null, null, 'b', null]} color="lightgrey" />
	{/snippet}
</Story>

<!-- Labels longer than 7 characters are truncated with an ellipsis by `truncateLabel`. -->
<Story name="Long category labels">
	{#snippet template()}
		<BarChart
			values={['alpha-long', 'alpha-long', 'beta-longer', 'gamma-longest']}
			color="lightgrey"
		/>
	{/snippet}
</Story>

<!-- With no values, nothing is rendered. -->
<Story name="Empty values">
	{#snippet template()}
		<BarChart values={[]} color="lightgrey" />
	{/snippet}
</Story>
