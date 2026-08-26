<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		hint?: import('svelte').Snippet;
		subTitle?: import('svelte').Snippet;
	}

	let { children, hint, subTitle }: Props = $props();
</script>

<div class="product mt-flow-default flex flex-col gap-flow-tight">
	<div class="flex items-end justify-between">
		<h3 class="label-sm text-color-text-muted">
			<!-- The title. -->
			{@render children?.()}
		</h3>

		{#if hint}
			<!-- An optional `<Overlay>` component to provide additional explanation. -->
			{@render hint?.()}
		{/if}
	</div>

	{#if subTitle}
		<div class="caption">
			<!-- Optional longer subtitle to display below the main title. -->
			{@render subTitle?.()}
		</div>
	{/if}
</div>
