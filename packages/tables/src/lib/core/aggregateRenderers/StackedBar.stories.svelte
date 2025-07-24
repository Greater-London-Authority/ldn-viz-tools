<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { scaleOrdinal } from 'd3-scale';
	import StackedBar from './StackedBar.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/StackedBar',
		component: StackedBar,
		tags: ['autodocs'],

		args: {
			values: ['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd'],

			colorScale: scaleOrdinal()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'])
		}
	});
</script>

{#snippet defaultTemplate({ args })}
	<StackedBar {...args} />
{/snippet}

<Story name="Default" source />
