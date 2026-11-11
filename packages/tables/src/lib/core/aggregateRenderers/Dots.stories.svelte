<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Dots from './Dots.svelte';

	/**
	 * The `Dots` component renders a set of values as something like a beeswarm plot or jittered Cleveland dot plot.
	 * Different plots in the same column have a consistent x-axis based on computed extent of column.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Dots',
		component: Dots,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Dots {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>

<!-- With no values, nothing is rendered. -->
<Story name="Empty values">
	{#snippet template()}
		<Dots values={[]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- With many points the vertical jitter (dodge) spreads them out to reduce overlap. -->
<Story name="Large N (dense)">
	{#snippet template()}
		<Dots values={Array.from({ length: 300 }, () => Math.random())} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- A differing extent rescales the horizontal position of the points. -->
<Story name="Custom extent">
	{#snippet template()}
		<Dots values={[10, 20, 25, 30, 40, 55, 70]} extent={[0, 100]} />
	{/snippet}
</Story>

<!-- Points at exactly the extent bounds (and beyond) sit at / past the edges. -->
<Story name="Values at extent bounds">
	{#snippet template()}
		<Dots values={[0, 0, 0.5, 1, 1, 1.2]} extent={[0, 1]} />
	{/snippet}
</Story>
