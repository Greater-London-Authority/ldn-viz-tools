<script lang="ts">
	import { Popover } from 'bits-ui';
	import Button from '../button/Button.svelte';

	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	type Props = Popover.RootProps & {
		buttonText?: string;
	};

	let { buttonText, children }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button {...props}>{buttonText}</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		class="bg-color-container-level-0 border-color-ui-border-secondary z-50 w-60 border p-4 shadow-lg"
	>
		{@render children?.()}
		<Popover.Close>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="text"
					emphasis="secondary"
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
