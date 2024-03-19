<script>
	import Tooltip from '../../../tooltip/Tooltip.svelte';

	export let hintType;
	export let hintLabel = 'More Info';
</script>

{#if (hintType = 'tooltip')}
	<Tooltip {hintLabel}>
		<slot />
	</Tooltip>
{:else if (hintType = 'popover')}
	<Tooltip {hintLabel}>
		<slot />
	</Tooltip>
{:else if (hintType = 'modal')}
	<Tooltip {hintLabel}>
		<slot />
	</Tooltip>
{/if}
