<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<span class="product body-sm block text-color-label-muted">
	{@render children?.()}
</span>
