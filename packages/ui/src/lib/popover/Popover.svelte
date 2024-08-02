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

	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import CloseIcon from './CloseIcon.svelte';

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
	export let hintLabel = 'what is this?';
</script>

<div {...$trigger} use:trigger class="w-fit h-fit">
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
		class="z-10 w-60 bg-core-grey-50 p-4 shadow"
	>
		<div {...$arrow} use:arrow />

		<div class="text-sm flex flex-col space-y-2 text-core-grey-800">
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

		<button class="close" {...$close} use:close>
			<CloseIcon class="w-8 h-8" />
		</button>
	</div>
{/if}

<style>
	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center;
		@apply text-white transition-colors hover:bg-core-grey-100 hover:text-core-grey-800;
		@apply focus-visible:ring focus-visible:ring-core-blue-600 focus-visible:ring-offset-2;
		@apply bg-core-grey-800 p-0 text-sm font-medium;
	}
</style>
