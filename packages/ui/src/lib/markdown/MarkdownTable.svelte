<script lang="ts">
	/**
	 * `MarkdownTable` is rendered instead of the `<table>` HTML element in markdown processed by mdsvex.
	 * It wraps the table in a `<figure>` that scrolls horizontally when the table is wider than its container.
	 *
	 * @component
	 */

	import type { Snippet } from 'svelte';

	let { children, ...restProps }: { children: Snippet } & Record<string, any> = $props();
</script>

<!-- The figure is a block object, so the table keeps its flow step and wide measure, and scrolls inside it when wider than the screen -->
<figure class="overflow-x-auto">
	<table {...restProps}>{@render children?.()}</table>
</figure>
