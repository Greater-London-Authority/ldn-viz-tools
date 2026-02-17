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
		class="fixed z-10 border border-color-ui-border-secondary bg-color-container-level-0 p-2 text-sm shadow"
		style="left: {x}px; top: {y}px; transform: translate(calc( -50% + ${x}px), calc(-100% + ${y}px))"
	>
		<div class="tooltip-name mb-1 font-semibold">{category}</div>
		<div class="tooltip-value">{quantity}</div>

		<div
			class="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 border-b border-r border-color-ui-border-secondary bg-color-container-level-0 shadow-sm"
		></div>
	</div>
{/if}
