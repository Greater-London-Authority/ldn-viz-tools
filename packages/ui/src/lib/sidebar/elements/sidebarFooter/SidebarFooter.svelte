<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		menu?: Snippet;
	}

	let { children, menu }: Props = $props();
</script>

<footer class="product mt-auto pt-8">
	<!-- content to display above menu/links - typically a row of logos -->
	{@render children?.()}
	{#if menu}
		<div class="body-sm mt-4 border-t border-color-border pt-2">
			<!-- a menu/list of links -->
			{@render menu()}
		</div>
	{/if}
</footer>
