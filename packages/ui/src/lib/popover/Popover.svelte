<script lang="ts">
	import { Popover, type PopoverTriggerProps } from 'bits-ui';
	import Button from '../button/Button.svelte';

	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';

	type Props = Popover.RootProps & {
		buttonText?: string;
		title?: Snippet;
		trigger?: Snippet;
	};

	let { buttonText = 'Click for popover', title, trigger, children }: Props = $props();
</script>

<Popover.Root>
	{#if trigger}
		{@render trigger()}
	{:else}
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button {...props}>{buttonText}</Button>
			{/snippet}
		</Popover.Trigger>
	{/if}

	<Popover.Content
		class="bg-color-container-level-0 border-color-ui-border-secondary z-50 w-60 border p-2 text-sm shadow-lg"
	>
		{#if title}
			<p class="font-medium">
				<!-- Optional title for the popover -->
				{@render title()}
			</p>
		{/if}

		{@render children?.()}

		<Popover.Close>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="text"
					emphasis="secondary"
					slim
					size="sm"
					class="absolute top-1 right-1"
				>
					<span class="sr-only">Close</span>
					<Icon src={XMark} theme="mini" class="h-5 w-5" aria-hidden="true" />
				</Button>
			{/snippet}
		</Popover.Close>
		<Popover.Arrow class="text-color-ui-border-secondary" />
	</Popover.Content>
</Popover.Root>
