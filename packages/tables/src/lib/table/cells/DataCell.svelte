<script lang="ts">
	import type { DataRow } from '$lib/core/lib/types';
	import type { Snippet } from 'svelte';

	type DataCellProps = {
		href?: (row: DataRow) => string;
		row: DataRow;
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
