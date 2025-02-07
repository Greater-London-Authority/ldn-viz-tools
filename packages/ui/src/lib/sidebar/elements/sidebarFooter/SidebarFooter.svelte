<footer class="mt-auto pt-4 bg-color-container-level-1 text-color-text-primary">
	<!-- content to display above menu/links - typically a row of logos -->
	<slot />
	{#if $$slots.menu}
		<div class="border-t border-color-ui-border-primary pt-2 mt-4 text-sm">
			<!-- a menu/list of links -->
			<slot name="menu" />
		</div>
	{/if}
</footer>
