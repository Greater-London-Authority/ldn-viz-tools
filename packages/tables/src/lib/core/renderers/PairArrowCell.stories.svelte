<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import PairArrowCell from './PairArrowCell.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/PairArrowCell',
		component: PairArrowCell,
		tags: ['autodocs'],

		args: {
			value: 0.5,
			contextVals: [0.1]
		}
	});
</script>

{#snippet defaultTemplate({ args })}
	<PairArrowCell {...args} />
{/snippet}

<Story name="Default" source />

<Story name="Multiple - custom colors" source>
	{#snippet template(args)}
		<div class="flex w-36 flex-col">
			<PairArrowCell value={-2} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
			<PairArrowCell value={-1} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
			<PairArrowCell value={+1} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
			<PairArrowCell value={+2} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
		</div>
	{/snippet}
</Story>
