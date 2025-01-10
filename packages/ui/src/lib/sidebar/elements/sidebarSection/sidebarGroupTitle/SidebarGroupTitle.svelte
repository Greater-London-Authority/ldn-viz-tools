<script lang="ts">
	/**
	 * The `<SidebarGroupTitle>` component is used to display a subtitle to subdivide a `<SidebarSection>`.
	 * @component
	 */
</script>

<div class="flex justify-between items-end text-color-text-primary">
	<h3 class="font-semibold text-sm leading-snug">
		<!-- The title. -->
		<slot />
	</h3>

	{#if $$slots.hint}
		<!-- An optional `<SidebarHint>` component to provide additional explanation. -->
		<slot name="hint" />
	{/if}
</div>
