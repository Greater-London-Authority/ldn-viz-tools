<script lang="ts">
	import type { Snippet } from 'svelte';
	/**
	 * The `<Overlay>` component provides additional explanatory or help text when a user interacts with a trigger.
	 * You can choose whether this is a modal, popover or tooltip, depending on your needs.
	 *
	 * The trigger can either be the built in `<Trigger>` component or a custom trigger provided as a snippet.
	 * @component
	 */

	import Modal from '../modal/Modal.svelte';
	import Popover from '../popover/Popover.svelte';
	import Tooltip from '../tooltip/Tooltip.svelte';

	interface Props {
		overlayType?: 'tooltip' | 'popover' | 'modal';
		hintLabel?: string;
		modalTitle?: string;
		modalDescription?: string;
		modalWidth?:
			| 'sm'
			| 'md'
			| 'lg'
			| 'xs'
			| 'xl'
			| '2xl'
			| '3xl'
			| '4xl'
			| '5xl'
			| '6xl'
			| '7xl'
			| 'full';
		children: Snippet;
		trigger?: Snippet<[Record<string, any>]>;
		open: boolean;
	}

	let {
		children,
		/**
		 * Form in which the help text should be displayed.
		 */
		overlayType = 'tooltip',

		/**
		 * Text to be displayed next to icon in trigger
		 */
		hintLabel = 'More Info',

		/**
		 * Title of modal (if `overlayType` is `'modal'`)
		 */
		modalTitle = undefined,

		/**
		 * Description of modal (if `overlayType` is `'modal'`)
		 */
		modalDescription = undefined,

		/**
		 * Width of modal (if `overlayType` is `'modal'`)
		 */
		modalWidth = undefined,

		open = $bindable(false),

		trigger
	}: Props = $props();
</script>

{#if overlayType === 'tooltip'}
	<Tooltip {trigger} {hintLabel} bind:open>
		<!-- The help message. -->
		{@render children()}
	</Tooltip>
{:else if overlayType === 'popover'}
	<Popover {trigger} {hintLabel} bind:open>
		<!-- The help message. -->
		{@render children()}
	</Popover>
{:else if overlayType === 'modal'}
	<Modal width={modalWidth} {trigger} {hintLabel} bind:open>
		{#snippet title()}
			{modalTitle}
		{/snippet}

		{#snippet description()}
			{modalDescription}
		{/snippet}

		<!-- The modal content (not including description). -->
		{@render children()}
	</Modal>
{/if}
