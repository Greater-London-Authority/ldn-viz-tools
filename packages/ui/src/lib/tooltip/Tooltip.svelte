<script lang="ts">
	/**
	 * The `<Tooltip>` component renders a tooltip target, and displays a message in a tooltip when a user focuses it (mouseover and keyboard).
	 *
	 * **Alternatives**: for longer messages, or messages that must persist until being dismissed, consider using a [Modal](./?path=/docs/ui-modal--documentation)
	 * or [Popover](./?path=/docs/ui-popover--documentation).
	 * @component
	 */

	import { createTooltip } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	/**
	 * Options for position of tooltip
	 */
	type PlacementOptions =
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end';

	// TODO: Check whether placement updates responsively
	/**
	 * Determines the placement of the tooltip, relative to Trigger
	 */
	export let placement: PlacementOptions = 'top';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: { placement },
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false
	});

	/**
	 * Sets trigger actions and attributes (ARIA) for access by `Trigger` component
	 */
	setContext('triggerFuncs', { customAction: trigger, actionProps: $trigger });
</script>

<!-- The trigger that opens the tooltip, usually `Trigger` button but allows customisation -->
<slot name="trigger" />

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="absolute max-w-[200px] text-sm p-2 bg-color-container-level-1 shadow z-50"
	>
		<!-- The text that will be displayed in the tooltip -->
		<slot />

		<div {...$arrow} use:arrow />
	</div>
{/if}
