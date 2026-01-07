<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<span class="block text-sm text-color-input-label-secondary">
	{@render children?.()}
</span>
