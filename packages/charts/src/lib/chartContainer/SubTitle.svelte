<script lang="ts">
	/**
	 * @deprecated Use `ChromeHeader` (from `@ldn-viz/ui`) with a `subtitle` prop instead.
	 * Retained only for one release.
	 */
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="chart subtitle text-color-text-muted">{@render children?.()}</div>
