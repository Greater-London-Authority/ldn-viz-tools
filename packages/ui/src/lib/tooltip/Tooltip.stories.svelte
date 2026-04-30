<script module lang="ts">
	import { Cog6Tooth } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Trigger from '../overlay/Trigger.svelte';
	import Tooltip from './Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Tooltip',
		component: Tooltip,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Tooltip {...args}>The contents of the Tooltip...</Tooltip>
	{/snippet}
</Story>

<Story name="Custom size">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger(props)}
				<Trigger {...props} size="lg" />
			{/snippet}
			The contents of the Tooltip...
		</Tooltip>
	{/snippet}
</Story>

<Story name="Custom hint label">
	{#snippet template(args)}
		<Tooltip {...args} hintLabel="I'm a little tooltip">The contents of the Tooltip...</Tooltip>
	{/snippet}
</Story>

<Story name="Custom hint icon">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger(props)}
				<Trigger {...props}>
					I have a different icon
					<Icon src={Cog6Tooth} theme="mini" class="ml-0.5 h-[18px] w-[18px]" aria-hidden="true" />
				</Trigger>
			{/snippet}
			The contents of the Tooltip...
		</Tooltip>
	{/snippet}
</Story>

<Story name="Custom trigger">
	{#snippet template(args)}
		<Tooltip {...args}>
			{#snippet trigger(props)}
				<Button {...props}>
					I have a different trigger component
					<Icon src={Cog6Tooth} theme="mini" class="ml-0.5 h-[18px] w-[18px]" aria-hidden="true" />
				</Button>
			{/snippet}
			The contents of the Tooltip...
		</Tooltip>
	{/snippet}
</Story>

<!--
Setting the `disableHoverableContent` prop to `false` allows the user to move
the cursor from the tooltip trigger to its content with it closing.
-->
<Story name="Enabling hovering over tooltip contents">
	{#snippet template(args)}
		<Tooltip {...args} disableHoverableContent={false}>The contents of the Tooltip...</Tooltip>
	{/snippet}
</Story>
