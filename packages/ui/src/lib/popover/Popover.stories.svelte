<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Trigger from '../overlay/Trigger.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Cog6Tooth } from '@steeze-ui/heroicons';
	import Button from '../button/Button.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Popover',
		component: Popover,
		tags: ['autodocs']
	});

	let count = $state(0);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Popover>
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...
		</Popover>
	{/snippet}
</Story>

<Story name="No title">
	{#snippet template(args)}
		<Popover>The contents of the popover...</Popover>
	{/snippet}
</Story>

<Story name="Custom hint label">
	{#snippet template(args)}
		<Popover hintLabel="Click for more information!">
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...
		</Popover>
	{/snippet}
</Story>

<Story name="Custom trigger">
	{#snippet template(args)}
		<Popover>
			{#snippet trigger(props)}
				<Button {...props}>
					I have a different trigger component
					<Icon src={Cog6Tooth} theme="mini" class="ml-0.5 h-[18px] w-[18px]" aria-hidden="true" />
				</Button>
			{/snippet}
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...
		</Popover>
	{/snippet}
</Story>

<Story name="Contains clickable element">
	{#snippet template(args)}
		<Popover>
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...

			<Button onclick={() => count++}>You can click me {count}</Button>
		</Popover>
	{/snippet}
</Story>
