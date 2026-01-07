<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		menu?: Snippet;
	}

	let { children, menu }: Props = $props();
</script>

<footer class="bg-color-container-level-1 text-color-text-primary mt-auto pt-4">
	<!-- content to display above menu/links - typically a row of logos -->
	{@render children?.()}
	{#if menu}
		<div class="border-color-ui-border-primary mt-4 border-t pt-2 text-sm">
			<!-- a menu/list of links -->
			{@render menu()}
		</div>
	{/if}
</footer>
