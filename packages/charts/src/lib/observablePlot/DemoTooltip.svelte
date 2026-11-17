<script>
	import { getContext } from 'svelte';
	const tooltipData = getContext('tooltipData');
</script>

{#if $tooltipData}
	<div class="flex flex-col">
		<p class="label-lg">Custom</p>
		<div>Value from Data: {$tooltipData.Value}</div>
	</div>
{/if}
