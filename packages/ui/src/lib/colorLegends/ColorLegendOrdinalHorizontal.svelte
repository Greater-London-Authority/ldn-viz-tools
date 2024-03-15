<script lang="ts">
	import { scaleLinear, type ScaleLinear } from 'd3-scale';

	export let scale: ScaleLinear<number | string, string>;
	export let title = '';
	export let highlightedValue: number | string | undefined = undefined;
</script>

<div class="flex flex-col">
	{#if title}
		<span class="font-bold">{title}</span>
	{/if}

	<div class="flex gap-2">
		{#each scale.domain() as d}
			<div class="flex items-center">
				<div class="flex-none w-4 h-4 mr-1" style:background-color={scale(d)} />
				<span class=" items-center" style:font-weight={d === highlightedValue ? 'bold' : 'normal'}>
					{d}
				</span>
			</div>
		{/each}
	</div>
</div>
