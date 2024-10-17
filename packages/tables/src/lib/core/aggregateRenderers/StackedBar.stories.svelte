<script context="module">
	import { scaleOrdinal } from 'd3-scale';
	import StackedBar from './StackedBar.svelte';
	export const meta = {
		title: 'Tables/AggregateRenderers/StackedBar',
		component: StackedBar,

		args: {
			values: ['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd'],

			colorScale: scaleOrdinal()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'])
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<StackedBar {...args} />
</Template>

<Story name="Default" source />
