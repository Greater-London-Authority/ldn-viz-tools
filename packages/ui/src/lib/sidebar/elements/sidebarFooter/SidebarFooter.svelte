<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		menu?: Snippet;
	}

	let { children, menu }: Props = $props();
</script>

<footer class="mt-auto bg-color-container-level-1 pt-4 text-color-text-primary">
	<!-- content to display above menu/links - typically a row of logos -->
	{@render children?.()}
	{#if menu}
		<div class="mt-4 border-t border-color-ui-border-primary pt-2 text-sm">
			<!-- a menu/list of links -->
			{@render menu()}
		</div>
	{/if}
</footer>
