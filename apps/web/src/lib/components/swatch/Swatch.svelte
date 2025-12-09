<script lang="ts">
	interface ColorChip {
		name: string;
		hex: string;
		value: string;
		type: string;
		description: string;
	}

	let { name, hex, value, type, description }: ColorChip = $props();
</script>

<div
	class="border-color-ui-border-secondary bg-color-container-level-0 flex-col justify-between border p-2 shadow-sm"
>
	<div class="aspect-video" style:background-color={hex}></div>
	<div class="pt-2">
		<p class="text-color-text-secondary text-sm">{name}</p>
		<p class="text-sm">{value}</p>
		{#if description}
			<p class="text-sm">Description: {description}</p>
		{/if}
	</div>
</div>
