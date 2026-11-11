<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { scaleOrdinal } from 'd3-scale';
	import StackedBar from './StackedBar.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/StackedBar',
		component: StackedBar,
		tags: ['autodocs'],

		args: {
			values: ['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd'],

			color: scaleOrdinal()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'])
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<StackedBar {...args} values={args.values ?? ['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd']} />
	{/snippet}
</Story>

<Story name="With unspecified color scale">
	{#snippet template()}
		<StackedBar values={['a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd']} color={undefined} />
	{/snippet}
</Story>

<!-- An empty input renders an empty chart. -->
<Story name="Empty values">
	{#snippet template()}
		<StackedBar values={[]} />
	{/snippet}
</Story>

<!-- A single distinct value produces one full-width segment. -->
<Story name="Single category">
	{#snippet template()}
		<StackedBar
			values={['a', 'a', 'a', 'a']}
			color={scaleOrdinal<string, string>().domain(['a']).range(['#628dba'])}
		/>
	{/snippet}
</Story>

<!-- Many distinct values crowd the segment labels. -->
<Story name="Many categories">
	{#snippet template()}
		<StackedBar
			values={['a', 'a', 'b', 'b', 'c', 'd', 'e', 'f', 'g']}
			color={scaleOrdinal<string, string>()
				.domain(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c', '#0d2b45', '#061a2b'])}
		/>
	{/snippet}
</Story>
