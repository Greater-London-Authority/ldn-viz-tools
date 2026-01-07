<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import BarCell from './BarCell.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/BarCell',
		component: BarCell,
		tags: ['autodocs'],

		args: {
			value: 0.5
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BarCell {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>
