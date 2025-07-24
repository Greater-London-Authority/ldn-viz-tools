<script>
	/** `<HeaderItem>` is a container for content that appears in a `<Header>` but isn't a `NavLink` or `HeaderTitle`. */
	let { children } = $props();
</script>

<div class="flex flex-col px-4 py-2">
	<!-- contents -->
	{@render children?.()}
</div>
