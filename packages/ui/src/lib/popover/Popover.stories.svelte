<script context="module">
	import Button from '../button/Button.svelte';
	import Popover from './Popover.svelte';

	export const meta = {
		title: 'Ui/Popover',
		component: Popover
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Popover {...args}>
		<svelte:fragment slot="title">Metric note</svelte:fragment>

		The contents of the popover...
	</Popover>
</Template>

<Story name="Default" source />

<Story name="No title" source>
	<Popover triggerClass="!p-0">
		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>

<Story name="Custom hint text" source>
	<Popover triggerClass="!p-0" hintLabel="Click for more information!">
		<svelte:fragment slot="title">Metric note</svelte:fragment>

		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>

<Story name="Custom trigger" source>
	<Popover triggerVariant="solid" triggerEmphasis="primary">
		<svelte:fragment slot="hint">Click here to see popover contents</svelte:fragment>

		<svelte:fragment slot="title">Metric note</svelte:fragment>

		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>

<Story name="With body text" source>
	<div class="inline-flex">
		<p>You can find&nbsp;</p>
		<Popover triggerClass="!p-0">
			<svelte:fragment slot="title">Metric note</svelte:fragment>
			<svelte:fragment>Some text explaining this metric...</svelte:fragment>
		</Popover>
	</div>
</Story>
