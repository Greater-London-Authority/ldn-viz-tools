<script lang="ts">
	import Tooltip from '../../../tooltip/Tooltip.svelte';
	import SidebarHintModal from './SidebarHintModal.svelte';

	export let hintType: string;
	export let hintLabel = 'More Info';

	export let modalTitle: string | undefined = undefined;
	export let modalDescription: string | undefined = undefined;
</script>

{#if hintType === 'tooltip'}
	<Tooltip {hintLabel}>
		<slot />
	</Tooltip>
{:else if hintType === 'popover'}
	<Tooltip {hintLabel}>
		<slot />
	</Tooltip>
{:else if hintType === 'modal'}
	<SidebarHintModal {hintLabel} {modalTitle} {modalDescription}>
		<slot />
	</SidebarHintModal>
{/if}
