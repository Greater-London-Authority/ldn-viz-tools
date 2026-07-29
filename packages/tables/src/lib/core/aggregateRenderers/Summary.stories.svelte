<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Summary from './Summary.svelte';
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Summary',
		component: Summary,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1],
			formatString: '0.2f'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Summary {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>

<!-- With no values, nothing is rendered. -->
<Story name="Empty values (undefined stats)">
	{#snippet template()}
		<Summary values={[]} />
	{/snippet}
</Story>

<!-- Without a formatString override, the component default '0.0f' rounds to whole numbers. -->
<Story name="Default formatString">
	{#snippet template()}
		<Summary values={[2, 4, 6, 8, 10]} />
	{/snippet}
</Story>

<!-- A wide spread of positive and negative values makes min/max/median/mean visibly differ. -->
<Story name="Negative / large range values">
	{#snippet template()}
		<Summary values={[-50, -10, 0, 5, 20, 100, 500]} formatString="0.1f" />
	{/snippet}
</Story>
