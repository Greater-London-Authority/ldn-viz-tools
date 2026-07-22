<script lang="ts">
	/**
	 * The `SubTitle` renders the muted text shown below a chart's title.
	 *
	 * It is normally used indirectly via the [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation).
	 * @component
	 */

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="text-color-text-muted">{@render children?.()}</div>
