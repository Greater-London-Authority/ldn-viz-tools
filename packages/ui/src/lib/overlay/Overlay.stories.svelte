<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from './Overlay.svelte';
	import Button from '../button/Button.svelte';
	import { Tooltip } from 'bits-ui';

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
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button {...props}>Custom Text</Button>
					{/snippet}
				</Tooltip.Trigger>
			{/snippet}
			Trigger Text
		</Overlay>
	{/snippet}
</Story>

<Story name="With Tooltip">
	{#snippet template(args)}
		<Overlay overlayType="tooltip">This is a tooltip.</Overlay>
	{/snippet}
</Story>
