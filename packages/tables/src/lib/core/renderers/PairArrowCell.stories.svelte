<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
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

<Story name="Default">
	{#snippet template(args)}
		<PairArrowCell {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<Story name="Multiple - custom colors">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<PairArrowCell
				value={-2}
				extent={[-2, +2]}
				positiveColor={theme.tokenNameToValue('data.secondary')}
				negativeColor={theme.tokenNameToValue('data.primary')}
			/>
			<PairArrowCell
				value={-1}
				extent={[-2, +2]}
				negativeColor={theme.tokenNameToValue('data.secondary')}
				positiveColor={theme.tokenNameToValue('data.primary')}
			/>
			<PairArrowCell
				value={+1}
				extent={[-2, +2]}
				negativeColor={theme.tokenNameToValue('data.secondary')}
				positiveColor={theme.tokenNameToValue('data.primary')}
			/>
			<PairArrowCell
				value={+2}
				extent={[-2, +2]}
				negativeColor={theme.tokenNameToValue('data.secondary')}
				positiveColor={theme.tokenNameToValue('data.primary')}
			/>
		</div>
	{/snippet}
</Story>
