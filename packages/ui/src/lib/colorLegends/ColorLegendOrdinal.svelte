<script lang="ts">
	import type { ScaleOrdinal } from 'd3-scale';

	export let title = '';
	export let scale: ScaleOrdinal<number | string, number>;
</script>

<div class="flex flex-col">
	{#if title}
		<span class="font-bold">{title}</span>
	{/if}

	{#each scale.domain() as d}
		<div class="flex items-center">
			<div class="flex-none w-4 h-4 mr-1" style:background-color={scale(d)} />
			<div class="w-0 flex-auto overflow-hidden truncate items-center">{d}</div>
		</div>
	{/each}
</div>
