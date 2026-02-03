<script lang="ts">
	import type { Snippet } from 'svelte';

	type DataCellProps = {
		href: (d: any) => string;
		row: any;
		children: Snippet;
	};

	let { href, row, children }: DataCellProps = $props();
</script>

{#if href}
	<a href={href(row)}>
		{@render children?.()}
	</a>
{:else}
	{@render children?.()}
{/if}
