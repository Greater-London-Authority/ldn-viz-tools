<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<span class="block text-sm font-medium text-color-text-muted">
	{@render children?.()}
</span>
