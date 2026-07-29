<script lang="ts">
	/**
	 * @deprecated Use `ChromeHeader` (from `@ldn-viz/ui`) with a `title` prop instead.
	 * `ChartContainer` / `TableContainer` now build their header from chrome; this
	 * bare title div is retained only for one release.
	 */
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="chart title">
	{@render children?.()}
</div>
