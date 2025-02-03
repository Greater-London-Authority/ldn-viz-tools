<script lang="ts">
	/**
	 * The `<Popover>` component provides content near to its trigger element, similar to a tooltip.
	 * However, like a modal, it remains open until it is dismissed by the user.
	 * It can be dismissed by clicking elsewhere on the screen, clicking on the close button, or pressing the Escape key.
	 *
	 * **Alternatives**: to display shorter messages less intrusively, consider using a [Tooltip](./?path=/docs/ui-tooltip--documentation).
	 * To display longer messages centrally on the screen, consider using a [Modal](./?path=/docs/ui-modal--documentation).
	 * @component
	 */

	import { createPopover } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import { InformationCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { Writable } from 'svelte/store';
	import Button from '../button/Button.svelte';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: { placement: 'top' }
	});

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'more info';

	/**
	 * text size for the tooltip target
	 */
	export let hintSize: 'sm' | 'md' | 'lg' | undefined = undefined;

	/**
	 * Store controlling whether popover is open.
	 */
	export let openStore: Writable<boolean> | undefined = undefined;
	$: openStore = open;
</script>

<!-- TODO: as this button wraps the hint slot any slotted item inherits button styles (color etc) This should be refactored to be more generic -->
<Button variant="text" size={hintSize} class="!p-0" emphasis="secondary">
	<span {...$trigger} use:trigger class="inline-flex items-center">
		{#if $$slots.hint}
			<!-- if present, replaces the default `hintLabel` and icon  -->
			<slot name="hint" />
		{:else}
			{hintLabel}

			<Icon
				src={InformationCircle}
				theme="mini"
				class="w-[18px] h-[18px] ml-0.5"
				aria-hidden="true"
			/>
		{/if}
	</span>
</Button>

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
