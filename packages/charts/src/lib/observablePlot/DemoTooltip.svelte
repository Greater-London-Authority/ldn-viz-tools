<script>
	import { getContext } from 'svelte';
	const tooltipData = getContext('tooltipData');
</script>

{#if $tooltipData}
	<div class="flex flex-col">
		<div>Sex: {$tooltipData.sex}</div>
		<div>Culmen length: {$tooltipData.culmen_length_mm}mm</div>
		<div>Culmen depth: {$tooltipData.culmen_depth_mm}mm</div>
	</div>
{/if}
