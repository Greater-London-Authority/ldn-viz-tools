<script lang="ts">
	/**
	 * The `<SidebarGroupTitle>` component is used to display a subtitle to sub-divide a `<SidebarSection>`.
	 * @component
	 */
</script>

<div class="flex justify-between items-end text-color-text-primary">
	<h3 class="font-bold text-sm">
		<!-- The title. -->
		<slot />
	</h3>

	{#if $$slots.hint}
		<!-- An optional `<SidebarHint>` component to provide additional explanation. -->
		<slot name="hint" />
	{/if}
</div>
