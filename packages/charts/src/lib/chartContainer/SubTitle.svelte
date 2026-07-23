<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="product card-panel-subtitle text-color-text-muted">{@render children?.()}</div>
