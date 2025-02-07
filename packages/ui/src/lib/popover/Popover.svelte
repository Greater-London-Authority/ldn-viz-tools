<script lang="ts">
	/**
	 * The `<Popover>` component provides content near to its trigger element, similar to a tooltip.
	 * However, like a modal, it remains open until it is dismissed by the user.
	 * It can be dismissed by clicking elsewhere on the screen, clicking on the close button, or pressing the Escape key.
	 *
	 * **Alternatives**: to display shorter messages less intrusively, consider using a [Tooltip](./?path=/docs/ui-components-overlays-tooltip--documentation).
	 * To display longer messages centrally on the screen, consider using a [Modal](./?path=/docs/ui-components-overlays-modal--documentation).
	 * @component
	 */

	import { createPopover } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { setContext } from 'svelte';
	import Button from '../button/Button.svelte';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: { placement: 'top' }
	});

	/**
	 * Sets trigger actions and attributes (ARIA) for access by `Trigger` component
	 */
	setContext('triggerFuncs', { action: trigger, actionProps: $trigger });
</script>

<!-- The trigger that opens the popover, usually `Trigger` button but allows customisation -->
<slot name="trigger" />

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="z-50 w-60 bg-color-container-level-1 p-4 shadow"
	>
		<div {...$arrow} use:arrow />

		<div class="text-sm flex flex-col space-y-2 text-color-text-primary">
			{#if $$slots.title}
				<p class="font-medium">
					<!-- Optional title for the popover -->
					<slot name="title" />
				</p>
			{/if}

			<div>
				<!-- Main content of the popover-->
				<slot />
			</div>
		</div>

		<div {...$close} use:close>
			<Button variant="text" emphasis="secondary" size="sm" class="absolute right-1 top-1">
				<span class="sr-only">Close</span>
				<Icon src={XMark} theme="mini" class="w-5 h-5" aria-hidden="true" />
			</Button>
		</div>
	</div>
{/if}
