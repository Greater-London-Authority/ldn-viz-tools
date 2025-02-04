<script context="module" lang="ts">
	import Overlay from './Overlay.svelte';

	// possible names: overlay? contextual? info? - ContextualInformation?

	export const meta = {
		title: 'Ui/Overlay',
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

<!-- 
Trigger appearance cases:

default icons, default text
default icon, no text
default icon, custom text

no icon, default text
no icon, custom text

custom icon, default text
custom icon, no text
custom icon, custom text

(and both orders of icon and text)
(and with button emphasis, size, and variant - and customClass overrides (all the props of a button))
-->

<Story name="Default" source />

<Story name="With Tooltip">
	<Overlay overlayType="tooltip">This is a tooltip.</Overlay>
</Story>

<!-- <Story name="With Popover" source>
	<Overlay overlayType="popover">This is a popover.</Overlay>
</Story>

<Story name="With Modal" source>
	<Overlay overlayType="modal">This is a modal.</Overlay>
</Story> -->

<!-- -->

<Story name="With Tooltip - custom trigger contents">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger">All the button stuff</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - custom variant">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger" variant="solid">All the button stuff</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - custom emphasis">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger" emphasis="primary">All the button stuff</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - custom size">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger" size="lg">All the button stuff</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - with Icon on right">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger">
			All the button stuff

			<Icon src={ArrowDownTray} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
		</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="With Tooltip - with Icon on left ">
	<Overlay overlayType="tooltip">
		<Trigger slot="trigger">
			<Icon src={ArrowDownTray} theme="mini" class="mr-2 w-5 h-5" aria-hidden="true" />

			All the button stuff
		</Trigger>

		This is a tooltip.
	</Overlay>
</Story>

<Story name="Custom hint label, without Trigger component">
	<Overlay overlayType="tooltip" hintLabel="foo">This is a tooltip.</Overlay>
</Story>
