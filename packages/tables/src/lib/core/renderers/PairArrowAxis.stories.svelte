<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import PairArrowAxis from './PairArrowAxis.svelte';

	/**
	 * The `PairArrowAxis` component renders an axis for the `PairArrowCell` component.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/PairArrow/PairArrowAxis',
		component: PairArrowAxis,
		tags: ['autodocs'],

		args: {
			extent: [0, 1],
			width: 100,
			numTicks: 4
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<PairArrowAxis {...args} />
	{/snippet}
</Story>

<!-- A diverging extent spanning negative and positive values. -->
<Story name="Diverging extent">
	{#snippet template()}
		<PairArrowAxis extent={[-2, 2]} width={100} numTicks={4} />
	{/snippet}
</Story>

<!-- Larger width, more ticks and a bigger text size. -->
<Story name="Custom tick count, width and textSize">
	{#snippet template()}
		<PairArrowAxis extent={[0, 100]} width={300} numTicks={8} textSize={12} />
	{/snippet}
</Story>

<!-- A custom `formatString` controls how the tick labels are formatted. -->
<Story name="Custom formatString">
	{#snippet template()}
		<PairArrowAxis extent={[0, 1]} width={200} numTicks={5} formatString=".0%" />
	{/snippet}
</Story>
