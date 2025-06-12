<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Popover',
		component: Popover,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Popover>
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...
		</Popover>
	{/snippet}
</Story>
