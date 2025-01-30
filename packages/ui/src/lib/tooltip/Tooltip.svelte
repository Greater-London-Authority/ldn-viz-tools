<script lang="ts">
	/**
	 * The `<Tooltip>` component renders a tooltip target, and displays a message in a tooltip when a user mouses-over it.
	 *
	 * **Alternatives**: for longer messages, or messages that must persist until being dismissed, consider using a [Modal](./?path=/docs/ui-modal--documentation)
	 * or [Popover](./?path=/docs/ui-popover--documentation).
	 * @component
	 */

	import type { ButtonProps } from '$lib/button/Button.svelte';
	import type { PlacementOptions } from '$lib/utils/placementOptions';
	import { createTooltip } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import Trigger from '../trigger/Trigger.svelte';

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'more info';

	/**
	 * text size for the tooltip target
	 */
	export let hintSize: 'sm' | 'md' | 'lg' | undefined = undefined;

	/**
	 * Allows you to set custom styling on Trigger button, e.g. '!p-0' to remove all padding for an inline text button.
	 */
	export let triggerClass: string = '';

	/**
	 * Selects which family of styles should be applied to the Trigger button.
	 */
	export let triggerVariant: ButtonProps['variant'] = 'text';

	/**
	 * Determines how much visual emphasis is placed on the Trigger button.
	 */
	export let triggerEmphasis: ButtonProps['emphasis'] = 'secondary';

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
</script>

<Trigger
	{hintSize}
	{hintLabel}
	class={triggerClass}
	variant={triggerVariant}
	emphasis={triggerEmphasis}
	customAction={trigger}
	actionProps={$trigger}
>
	{#if $$slots.hint}
		<slot name="hint">{$$slots.hint}</slot>
	{/if}
</Trigger>

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="absolute max-w-[200px] text-sm p-2 bg-color-container-level-1 shadow z-50"
	>
		<!-- the text that will be displayed in the tooltip -->
		<slot />

		<div {...$arrow} use:arrow />
	</div>
{/if}
