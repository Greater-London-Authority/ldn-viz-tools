<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="chart subtitle text-color-text-muted">{@render children?.()}</div>
