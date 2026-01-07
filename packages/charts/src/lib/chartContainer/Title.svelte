<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="max-w-prose text-xl font-bold text-color-text-primary">
	{@render children?.()}
</div>
