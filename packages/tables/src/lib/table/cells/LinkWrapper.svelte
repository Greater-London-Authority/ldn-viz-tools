<script>
	export let href;
	export let row;
</script>

{#if href}
	<a href={href(row)}>
		<slot />
	</a>
{:else}
	<slot />
{/if}
