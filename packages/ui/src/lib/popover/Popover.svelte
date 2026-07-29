<script lang="ts">
	/**
	 * The `Popover` component displays additional content in an overlay anchored to a trigger element, opened by clicking the trigger, built on top of the `bits-ui` `Popover` primitive.
	 * It supports an optional `title` and includes a close button.
	 *
	 * **Alternatives**: for short hint text that only needs to appear whilst the trigger is being hovered over, use a [Tooltip](./?path=/docs/ui-components-overlays-tooltip--documentation) instead.
	 * To display content in a dialog that overlays the rest of the page, use a [Modal](./?path=/docs/ui-components-overlays-modal--documentation) instead
	 * @component
	 */
	import { Popover } from 'bits-ui';
	import Button from '../button/Button.svelte';

	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';
	import Trigger from '../overlay/Trigger.svelte';

	type Props = Popover.RootProps & {
		hintLabel?: string;
		title?: Snippet;
		trigger?: Snippet<[Record<string, any>]>;
		open?: boolean;
	};

	let {
		hintLabel = 'Click for popover',
		title,
		trigger,
		children,
		open = $bindable(false)
	}: Props = $props();
</script>

{#snippet popoverTrigger()}
	{#if trigger}
		<Popover.Trigger>
			{#snippet child({ props })}
				{@render trigger({ ...props })}
			{/snippet}
		</Popover.Trigger>
	{:else}
		<Popover.Trigger>
			{#snippet child({ props })}
				<Trigger {...props} {hintLabel} />
			{/snippet}
		</Popover.Trigger>
	{/if}
{/snippet}

<Popover.Root bind:open>
	{@render popoverTrigger()}

	<Popover.Content
		class="z-50 w-60 border border-color-border-muted bg-color-container p-2 text-sm shadow-lg"
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
					class="absolute right-1 top-1"
				>
					<span class="sr-only">Close</span>
					<Icon src={XMark} theme="mini" class="h-5 w-5" aria-hidden="true" />
				</Button>
			{/snippet}
		</Popover.Close>
		<Popover.Arrow class="text-color-border-muted" />
	</Popover.Content>
</Popover.Root>
