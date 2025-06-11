<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Button from '../button/Button.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Popover',
		component: Popover,
		tags: ['autodocs']
	});

	let isOpen = $state(false);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Popover {...args}>The contents of the popover...</Popover>
	{/snippet}
</Story>
