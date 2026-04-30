<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import Trigger from '../overlay/Trigger.svelte';

	type Props = Tooltip.RootProps & {
		hintLabel?: string;
		trigger?: Snippet<[Record<string, any>]>;
		open: boolean;

		/**
		 * Defaults to `true`, which causes the Tooltip to close as the user
		 * moves the cursor from the trigger towards the content.
		 * Setting it to `false` allows the user to mouse-over the tooltip
		 * content (e.g., to click on a link); before doing this, consider
		 * whether it would be better to instead use a Popover component.
		 */
		disableHoverableContent?: boolean;
	};

	let {
		open = $bindable(false),
		hintLabel = 'Hover for tooltip',
		trigger,
		children,
		disableHoverableContent = true
	}: Props = $props();
</script>

{#snippet tooltipTrigger()}
	{#if trigger}
		<Tooltip.Trigger>
			{#snippet child({ props })}
				{@render trigger({ ...props })}
			{/snippet}
		</Tooltip.Trigger>
	{:else}
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Trigger {...props} {hintLabel} />
			{/snippet}
		</Tooltip.Trigger>
	{/if}
{/snippet}

<Tooltip.Provider delayDuration={100}>
	<Tooltip.Root disableCloseOnTriggerClick {disableHoverableContent} bind:open>
		{@render tooltipTrigger()}

		<Tooltip.Portal>
			<Tooltip.Content
				class="z-50 max-w-[200px] border border-color-ui-border-secondary bg-color-container-level-0 p-2 text-sm shadow-lg"
			>
				{@render children?.()}

				<Tooltip.Arrow class="text-color-ui-border-secondary" />
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
