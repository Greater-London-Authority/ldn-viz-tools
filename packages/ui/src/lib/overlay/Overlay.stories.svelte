<script context="module" lang="ts">
	import Overlay from './Overlay.svelte';

	// possible names: overlay? contextual? info? - ContextualInformation?

	export const meta = {
		title: 'Ui/Overlays/Overlay',
		component: Overlay
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Trigger from './Trigger.svelte';

	import { ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<Template let:args>
	<Overlay {...args}></Overlay>
</Template>

<Story name="Default" source />

<Story name="With Tooltip">
	<Overlay overlayType="tooltip">This is a tooltip.</Overlay>
</Story>

<Story name="With Popover" source>
	<Overlay overlayType="popover">
		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>

<Story name="With Modal" source>
	<Overlay overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
</Story>

<Story name="With Modal - custom width" source>
	<Overlay overlayType="modal" modalTitle="Modal Title" modalWidth="3xl">
		This is a very wide modal.
	</Overlay>
</Story>

<Story name="With Tooltip - custom trigger label">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger" hintLabel="All the button stuff" />

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - custom variant">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger" variant="solid" />

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - custom emphasis">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger" emphasis="primary" />

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - custom size">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger" size="lg" />

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - no icon">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger">More Info</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - with Icon on right">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger">
			More Info
			<Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - with Icon on left ">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger">
			<Icon src={ArrowDownTray} theme="mini" class="mr-2 w-5 h-5" aria-hidden="true" />
			More Info
		</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - custom hint label, without Trigger component">
	<Overlay overlayType="tooltip" hintLabel="foo">This is a tooltip.</Overlay>
</Story>

<Story name="With Popover - no title">
	<Overlay overlayType="popover">
		<Trigger slot="trigger" />
		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - custom trigger label">
	<Overlay overlayType="popover">
		<Trigger slot="trigger" hintLabel="All the button stuff" />
		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - custom variant">
	<Overlay overlayType="popover">
		<Trigger slot="trigger" variant="solid" />

		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - custom emphasis">
	<Overlay overlayType="popover">
		<Trigger slot="trigger" emphasis="primary" />

		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - custom size">
	<Overlay overlayType="popover">
		<Trigger slot="trigger" size="lg" />

		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - no icon">
	<Overlay overlayType="popover">
		<Trigger slot="trigger">More Info</Trigger>

		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - with Icon on right">
	<Overlay overlayType="popover">
		<Trigger slot="trigger">
			More Info

			<Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</Trigger>

		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - with Icon on left ">
	<Overlay overlayType="popover">
		<Trigger slot="trigger">
			<Icon src={ArrowDownTray} theme="mini" class="mr-2 w-5 h-5" aria-hidden="true" />

			More Info
		</Trigger>

		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>

<Story name="With Popover - custom hint label, without Trigger component">
	<Overlay overlayType="popover" hintLabel="foo">
		<svelte:fragment slot="title">Popover Title</svelte:fragment>
		This is a popover.
	</Overlay>
</Story>
