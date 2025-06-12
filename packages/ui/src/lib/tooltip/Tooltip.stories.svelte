<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';
	import Button from '../button/Button.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Tooltip',
		component: Tooltip,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger()}
				<Button>TOOLTIP</Button>
			{/snippet}
			The contents of the Tooltip...
		</Tooltip>
	{/snippet}
</Story>
