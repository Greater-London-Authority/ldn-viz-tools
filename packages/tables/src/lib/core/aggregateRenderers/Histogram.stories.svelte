<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Histogram from './Histogram.svelte';

	/**
	 * The `Histogram` component renders a set of values as a histogram.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Histogram',
		component: Histogram,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Histogram {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>

<!-- The default bar color can be overridden with any CSS color. -->
<Story name="Custom color">
	{#snippet template()}
		<Histogram values={[0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} extent={[0, 1]} color="tomato" />
	{/snippet}
</Story>

<!-- A wider extent than the default [0, 1] rescales the horizontal axis. -->
<Story name="Custom extent">
	{#snippet template()}
		<Histogram values={[10, 20, 25, 30, 40, 55, 70]} extent={[0, 100]} />
	{/snippet}
</Story>

<!-- A larger, more spread out dataset produces more bins. -->
<Story name="Larger dataset / more bins">
	{#snippet template()}
		<Histogram values={Array.from({ length: 200 }, () => Math.random())} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- With no values, nothing is rendered. -->
<Story name="Empty values">
	{#snippet template()}
		<Histogram values={[]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- Multi-digit max values make the axis labels wide (see the label-truncation TODO in the component). -->
<Story name="Values with wide range">
	{#snippet template()}
		<Histogram values={[100, 250, 400, 550, 700, 850, 1000]} extent={[0, 1000]} />
	{/snippet}
</Story>
