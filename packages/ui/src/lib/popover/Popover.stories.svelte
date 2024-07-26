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
	<Popover>
		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>

<Story name="Custom hint text" source>
	<Popover hintLabel="Click for more information!">
		<svelte:fragment slot="title">Metric note</svelte:fragment>

		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>

<Story name="Custom trigger" source>
	<Popover hintLabel="Click for more information!">
		<svelte:fragment slot="hint"
			><Button>Click here to see popover contents</Button></svelte:fragment
		>

		<svelte:fragment slot="title">Metric note</svelte:fragment>

		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>
