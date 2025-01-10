<script lang="ts">
	/**
	 * The `<sidebarHint>` component provides additional explanatory or help text when a user interacts with a trigger.
	 * @component
	 */

	import Modal from '../../../modal/Modal.svelte';
  import Popover from '../../../popover/Popover.svelte';
	import Tooltip from '../../../tooltip/Tooltip.svelte';

	/**
	 * Form in which the help text should be displayed.
	 */
	export let hintType = 'tooltip';

	/**
	 * Text to be displayed next to icon in trigger
	 */
	export let hintLabel = 'More Info';

	/**
	 * Title of modal (if `hintType` is `'modal'`)
	 */
	export let modalTitle: string | undefined = undefined;

	/**
	 * Description of modal (if `hintType` is `'modal'`)
	 */
	export let modalDescription: string | undefined = undefined;

	/**
	 * Width of modal (if `hintType` is `'modal'`)
	 */
	export let modalWidth:
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
		| 'full'
		| undefined = undefined;
</script>

{#if hintType === 'tooltip'}
	<Tooltip {hintLabel} hintSize="sm">
		<!-- The help message. -->
		<slot />
	</Tooltip>
{:else if hintType === 'popover'}
	<Popover {hintLabel}>
		<!-- The help message. -->
		<slot />
	</Popover>
{:else if hintType === 'modal'}
	<Modal title={modalTitle || ''} description={modalDescription} width={modalWidth} showTrigger>
		<svelte:fragment slot="hintText">
			{hintLabel}
		</svelte:fragment>

		<!-- The help message. -->
		<slot />
	</Modal>
{/if}
