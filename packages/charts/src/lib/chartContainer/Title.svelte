<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="font-bold text-xl text-color-text-primary max-w-prose">
	{@render children?.()}
</div>
