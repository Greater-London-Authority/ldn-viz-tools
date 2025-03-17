<script lang="ts">
	/**
	 * The `<SidebarGroupTitle>` component is used to display a subtitle to subdivide a `<SidebarSection>`.
	 * @component
	 */
</script>

<div class=" text-color-text-primary">
	<div class="flex justify-between items-end">
		<h3 class="font-semibold text-sm leading-snug">
			<!-- The title. -->
			<slot />
		</h3>

		{#if $$slots.hint}
			<!-- An optional `<Overlay>` component to provide additional explanation. -->
			<slot name="hint" />
		{/if}
	</div>

	{#if $$slots.subTitle}
		<div class="text-xs my-1">
			<!-- Optional longer subtitle to display below the main title. -->
			<slot name="subTitle" />
		</div>
	{/if}
</div>
