<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import Trigger from '../overlay/Trigger.svelte';

	type Props = Tooltip.RootProps & {
		hintLabel?: string;
		trigger?: Snippet<[Record<string, any>]>;
	};

	let { hintLabel = 'Hover for tooltip', trigger, children }: Props = $props();
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
	<Tooltip.Root disableCloseOnTriggerClick disableHoverableContent>
		{@render tooltipTrigger()}

		<Tooltip.Portal>
			<Tooltip.Content
				class="border-color-border-muted bg-color-container z-50 max-w-[200px] border p-2 text-sm shadow-lg"
			>
				{@render children?.()}

				<Tooltip.Arrow class="text-color-border-muted" />
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
