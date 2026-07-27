<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<span class="product block body-sm text-color-label-muted">
	{@render children?.()}
</span>
