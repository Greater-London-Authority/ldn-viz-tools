<script module lang="ts">
	import { Cog6Tooth } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Popover from './Popover.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Popover',
		component: Popover,
		tags: ['autodocs']
	});

	let count = $state(0);
	let open = $state(false);
</script>

<Story name="Default">
	{#snippet template()}
		<Popover>
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...
		</Popover>
	{/snippet}
</Story>

<Story name="No title">
	{#snippet template()}
		<Popover>The contents of the popover...</Popover>
	{/snippet}
</Story>

<Story name="Custom hint label">
	{#snippet template()}
		<Popover hintLabel="Click for more information!">
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...
		</Popover>
	{/snippet}
</Story>

<Story name="Custom trigger">
	{#snippet template()}
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
	{#snippet template()}
		<Popover>
			{#snippet title()}
				Account settings
			{/snippet}
			The contents of the popover...

			<Button onclick={() => count++}>You can click me {count}</Button>
		</Popover>
	{/snippet}
</Story>

<Story name="Controlled open state">
	{#snippet template()}
		<div class="flex flex-col gap-2">
			<span>Popover is currently {open ? 'Open' : 'Closed'}</span>
			<div class="flex gap-2">
				<Button onclick={() => (open = true)}>Open</Button>
				<Button emphasis="secondary" onclick={() => (open = false)}>Close</Button>
			</div>

			<Popover bind:open>
				{#snippet title()}
					Account settings
				{/snippet}
				This popover's open state is controlled externally.
			</Popover>
		</div>
	{/snippet}
</Story>

<Story name="Long / overflowing content">
	{#snippet template()}
		<Popover>
			{#snippet title()}
				A popover with a lot of content
			{/snippet}
			The contents of the popover can be quite long. This checks that the text wraps within the fixed
			width and that the absolutely-positioned close button in the top-right corner does not collide with
			the title or the body text as it flows over multiple lines.
		</Popover>
	{/snippet}
</Story>
