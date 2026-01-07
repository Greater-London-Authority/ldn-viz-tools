<script>
	let { href, row, children } = $props();
</script>

{#if href}
	<a href={href(row)}>
		{@render children?.()}
	</a>
{:else}
	{@render children?.()}
{/if}
