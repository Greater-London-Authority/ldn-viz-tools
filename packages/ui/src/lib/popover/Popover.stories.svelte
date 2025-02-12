<script context="module">
	import Popover from './Popover.svelte';

	export const meta = {
		title: 'Ui/Components/Overlays/Popover',
		component: Popover
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Trigger from '../overlay/Trigger.svelte';
</script>

<Template let:args>
	<Popover {...args}>
		<Trigger slot="trigger" />
		<svelte:fragment slot="title">Metric note</svelte:fragment>

		The contents of the popover...
	</Popover>
</Template>

<Story name="Default" source />

<Story name="No title" source>
	<Popover>
		<Trigger slot="trigger" />
		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>

<Story name="Custom hint text" source>
	<Popover>
		<Trigger slot="trigger" hintLabel="Click for more information!" />
		<svelte:fragment slot="title">Metric note</svelte:fragment>

		<p>Some text explaining this metric...</p>
	</Popover>
</Story>

<Story name="Custom trigger" source>
	<Popover>
		<Trigger slot="trigger" emphasis="primary" variant="solid">
			Click here to see popover contents
		</Trigger>

		<svelte:fragment slot="title">Metric note</svelte:fragment>

		<svelte:fragment>Some text explaining this metric...</svelte:fragment>
	</Popover>
</Story>

<!-- When the popover opens with `defaultOpenFocus` set to true, it will focus on the first interactive element in the popover. If the popover starts with an interactive element, set to `true`, else omit. -->
<Story name="Using defaultOpenFocus" source>
	<Popover defaultOpenFocus>
		<Trigger slot="trigger" />
		<div class="space-y-2">
			<Button emphasis="secondary" size="sm" href="/">A button</Button>
			<p>starts this content, so it should receive focus.</p>
		</div>
	</Popover>
</Story>
