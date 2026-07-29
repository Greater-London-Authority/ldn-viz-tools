<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Title from './Title.svelte';

	/**
	 * The `Title` renders the large, bold heading shown above a chart.
	 *
	 * It is normally used indirectly via the [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Charts/Components/ChartContainer/Title',
		component: Title,
		tags: ['autodocs']
	});
</script>

<!--
	A long title wraps at `max-w-prose` rather than filling the full container width.
-->
<Story name="Long title wrapping">
	{#snippet template(args)}
		<div class="w-[960px] border border-gray-500">
			<Title {...args}>
				This is a deliberately long chart title that demonstrates how the max-w-prose line-length
				cap causes the heading to wrap onto multiple lines instead of stretching across the full
				width of its container
			</Title>
		</div>
	{/snippet}
</Story>
