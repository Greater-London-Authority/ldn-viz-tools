<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		hint?: import('svelte').Snippet;
		subTitle?: import('svelte').Snippet;
	}

	let { children, hint, subTitle }: Props = $props();
</script>

<header class="text-color-text">
	<div class="flex items-end justify-between">
		<h2 class="label-md">
			<!-- The title of the section. -->
			{@render children?.()}
		</h2>

		{#if hint}
			<!-- An optional `<Overlay>` component to provide additional explanation. -->
			{@render hint?.()}
		{/if}
	</div>

	{#if subTitle}
		<div class="caption-sm my-1">
			<!-- Optional longer subtitle to display below the main title. -->
			{@render subTitle?.()}
		</div>
	{/if}
</header>
