<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="text-color-text max-w-prose text-xl font-bold">
	{@render children?.()}
</div>
