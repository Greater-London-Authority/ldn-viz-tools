<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from './Overlay.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Overlay',
		component: Overlay,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Overlay hintLabel="Hi There">
			{#snippet trigger()}
				Come on
			{/snippet}
			Trigger Text</Overlay
		>
	{/snippet}
</Story>

<Story name="With Tooltip">
	{#snippet template(args)}
		<Overlay overlayType="tooltip">This is a tooltip.</Overlay>
	{/snippet}
</Story>
