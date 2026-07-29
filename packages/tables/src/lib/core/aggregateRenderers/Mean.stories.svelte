<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Mean from './Mean.svelte';

	/**
	 * The `Mean` component renders the (arithmetic) mean of a set of values.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Mean',
		component: Mean,
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
		<Mean {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>

<!-- With no values nothing is rendered. -->
<Story name="Empty values (undefined mean)">
	{#snippet template()}
		<Mean values={[]} />
	{/snippet}
</Story>

<!-- Without a formatString override, the component default '0.0f' rounds to a whole number. -->
<Story name="Default formatString">
	{#snippet template()}
		<Mean values={[2, 4, 6, 8]} />
	{/snippet}
</Story>

<!-- A dataset averaging to a negative number. -->
<Story name="Negative values">
	{#snippet template()}
		<Mean values={[-10, -20, -5, -15]} formatString="0.1f" />
	{/snippet}
</Story>
