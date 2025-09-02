<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<span class="text-color-input-label-secondary block text-sm">
	{@render children?.()}
</span>
