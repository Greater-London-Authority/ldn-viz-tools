<script lang="ts">
	/**
	 * The `Title` renders the large, bold heading shown above a chart.
	 *
	 * It is normally used indirectly via the [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation).
	 * @component
	 */

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="text-color-text max-w-prose text-xl font-bold">
	{@render children?.()}
</div>
