<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		hint?: import('svelte').Snippet;
		subTitle?: import('svelte').Snippet;
	}

	let { children, hint, subTitle }: Props = $props();
	/**
	 * The `<SidebarGroupTitle>` component is used to display a subtitle to subdivide a `<SidebarSection>`.
	 * @component
	 */
</script>

<div class=" text-color-text-primary">
	<div class="flex items-end justify-between">
		<h3 class="text-sm font-semibold leading-snug">
			<!-- The title. -->
			{@render children?.()}
		</h3>

		{#if hint}
			<!-- An optional `<Overlay>` component to provide additional explanation. -->
			{@render hint?.()}
		{/if}
	</div>

	{#if subTitle}
		<div class="my-1 text-xs">
			<!-- Optional longer subtitle to display below the main title. -->
			{@render subTitle?.()}
		</div>
	{/if}
</div>
