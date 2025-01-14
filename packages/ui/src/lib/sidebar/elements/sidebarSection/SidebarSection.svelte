<script lang="ts">
	/**
	 * The `<SidebarSection>` component is used to group together a 'section' of content within a `<Sidebar>`.
	 * As well as accepting a section title as a prop (which it displays as a `<SidebarSectionTitle>`), it accepts the section content as a slot.
	 * @component
	 */
	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';

	/**
	 * The title of this section. Note that rather than supplying a title, you can supply a `<SidebarSectionTitle>` component in the `title` slot.
	 */
	export let title = '';
</script>

<section>
	<div
		class="border-b border-color-ui-border-secondary space-y-2 pb-2 text-sm bg-color-container-level-1 text-color-text-primary"
	>
		{#if $$slots.title}
			<!-- An optional `<SidebarSectionTitle>` component, which can accept a subtitle. -->
			<slot name="title" />
		{:else}
			<SidebarSectionTitle>{title}</SidebarSectionTitle>
		{/if}
		<!-- The content to be displayed inside this section. -->
		<slot />
	</div>
</section>
