<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<span class="text-color-text-secondary block text-sm font-medium">
	{@render children?.()}
</span>
