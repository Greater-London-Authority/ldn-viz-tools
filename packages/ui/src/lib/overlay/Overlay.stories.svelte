<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from './Overlay.svelte';
	import Trigger from './Trigger.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Cog6Tooth } from '@steeze-ui/heroicons';
	import Button from '../button/Button.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Overlay',
		component: Overlay,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Overlay>This is a tooltip.</Overlay>
	{/snippet}
</Story>

<Story name="With Tooltip">
	{#snippet template()}
		<Overlay overlayType="tooltip">This is a tooltip.</Overlay>
	{/snippet}
</Story>

<Story name="With Popover">
	{#snippet template()}
		<Overlay overlayType="popover">This is a Popover.</Overlay>
	{/snippet}
</Story>

<Story name="With Modal">
	{#snippet template()}
		<Overlay
			overlayType="modal"
			modalTitle="Modal title"
			modalDescription="This is a modal description"
		>
			This is the modal content
		</Overlay>
	{/snippet}
</Story>

<Story name="With Modal - custom width">
	{#snippet template()}
		<Overlay
			overlayType="modal"
			modalTitle="Modal title"
			modalDescription="This is a modal description"
			modalWidth="3xl"
		>
			This is the modal content
		</Overlay>
	{/snippet}
</Story>

<Story name="Custom hint label">
	{#snippet template()}
		<Overlay overlayType="tooltip" hintLabel="Custom label">This is a tooltip.</Overlay>
	{/snippet}
</Story>

<Story name="Custom variant">
	{#snippet template()}
		<Overlay overlayType="tooltip" hintLabel="Custom label">
			{#snippet trigger(props)}
				<Trigger {...props} variant="solid" slim={false} />
			{/snippet}
			This is a tooltip.
		</Overlay>
	{/snippet}
</Story>

<Story name="Custom size">
	{#snippet template()}
		<Overlay overlayType="tooltip" hintLabel="Custom label">
			{#snippet trigger(props)}
				<Trigger {...props} size="lg" />
			{/snippet}
			This is a tooltip.
		</Overlay>
	{/snippet}
</Story>

<Story name="No icon">
	{#snippet template()}
		<Overlay overlayType="tooltip">
			{#snippet trigger(props)}
				<Trigger {...props}>No icons here</Trigger>
			{/snippet}
			This is a tooltip.
		</Overlay>
	{/snippet}
</Story>

<Story name="With Icon on right">
	{#snippet template()}
		<Overlay overlayType="tooltip">
			{#snippet trigger(props)}
				<Trigger {...props}>
					Icon on right
					<Icon src={Cog6Tooth} theme="mini" class="ml-0.5 h-[18px] w-[18px]" aria-hidden="true" />
				</Trigger>
			{/snippet}
			This is a tooltip.
		</Overlay>
	{/snippet}
</Story>

<Story name="With Icon on left">
	{#snippet template()}
		<Overlay overlayType="tooltip">
			{#snippet trigger(props)}
				<Trigger {...props}>
					<Icon src={Cog6Tooth} theme="mini" class="mr-0.5 h-[18px] w-[18px]" aria-hidden="true" />
					Icon on left
				</Trigger>
			{/snippet}
			This is a tooltip.
		</Overlay>
	{/snippet}
</Story>

<Story name="With custom trigger component">
	{#snippet template()}
		<Overlay overlayType="popover">
			{#snippet trigger(props)}
				<Button {...props}>Custom trigger component (click)</Button>
			{/snippet}
			This is a popover.
		</Overlay>
	{/snippet}
</Story>
