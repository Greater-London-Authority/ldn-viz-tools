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
</script>

<div {...$trigger} use:trigger class="w-fit h-fit inline-flex items-center">
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
</div>

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="z-10 w-60 bg-color-container-level-1 p-4 shadow"
	>
		<div {...$arrow} use:arrow />

		<div class="text-sm flex flex-col space-y-2 text-color-text-primary">
			{#if $$slots.title}
				<p class="font-bold">
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
			<Button variant="square" emphasis="secondary" size="sm" class="absolute right-1.5 top-1.5">
				<span class="sr-only">Close</span>
				<Icon src={XMark} theme="mini" class="w-6 h-6" aria-hidden="true" />
			</Button>
		</div>
	</div>
{/if}
