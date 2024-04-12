<script lang="ts">
	import Tooltip from '../../../tooltip/Tooltip.svelte';
	import SidebarHintModal from './SidebarHintModal.svelte';

	export let hintType: string;
	export let hintLabel = 'More Info';

	export let modalTitle: string | undefined = undefined;
	export let modalDescription: string | undefined = undefined;
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
	<Tooltip {hintLabel}>
		<slot />
	</Tooltip>
{:else if hintType === 'popover'}
	<Tooltip {hintLabel}>
		<slot />
	</Tooltip>
{:else if hintType === 'modal'}
	<SidebarHintModal {hintLabel} {modalTitle} {modalDescription} {modalWidth}>
		<slot />
	</SidebarHintModal>
{/if}
