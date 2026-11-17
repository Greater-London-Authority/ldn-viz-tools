<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<span class="input-hint block text-color-text-muted">
	{@render children?.()}
</span>
