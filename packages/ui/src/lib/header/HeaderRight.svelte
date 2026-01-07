<script>
	/** A container for content to be positioned at the right-hand side of a `<Header>`.*/
	let { children } = $props();
</script>

<div class="flex flex-grow items-center justify-end">
	<!-- contents -->
	{@render children?.()}
</div>
