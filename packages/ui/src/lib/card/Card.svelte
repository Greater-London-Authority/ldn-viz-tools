<script lang="ts">
	import type { Snippet } from 'svelte';
	import Overlay from '../overlay/Overlay.svelte';

	interface CardProps {
		title?: string;
		label?: string;
		overlayContent?: Snippet;
		children: Snippet;
	}

	let { title, label, overlayContent, children }: CardProps = $props();
</script>

<div
	class="border-color-ui-border-secondary bg-color-container-level-0 relative flex h-full flex-col justify-between border p-4 shadow-sm"
>
	<div class="flex items-center justify-between">
		{#if label}
			<h3 class="product responsive label-md text-color-text-secondary mb-typography-spacing-xs">
				{label}
			</h3>
		{/if}

		{#if title}
			<h3 class="product responsive title-md mb-typography-spacing-xs">{title}</h3>
		{/if}

		<div class="absolute right-1 top-1">
			<Overlay>
				{@render overlayContent?.()}
			</Overlay>
		</div>
	</div>
	{@render children?.()}
</div>
