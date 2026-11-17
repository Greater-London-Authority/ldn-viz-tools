<script lang="ts">
	interface Props {
		x: number;
		y: number;
		category: string;
		quantity: string;
		visible: boolean;
	}

	let { x, y, category, quantity, visible }: Props = $props();
</script>

{#if visible}
	<div
		class="typeset-product chart-label elevation-2 pointer-events-none absolute z-10 w-max max-w-[200px] bg-color-surface p-2"
		style="left: {x}px; top: {y - 10}px; transform: translate(-50%, -100%)"
	>
		<div class="tooltip-name mb-1">{category}</div>
		<div class="tooltip-value">{quantity}</div>

		<div
			class="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 bg-color-surface"
		></div>
	</div>
{/if}
