<script lang="ts">
	/**
	 * The `<SidebarSection>` component is used to group together a 'section' of content within a `<Sidebar>`.
	 * As well as accepting a section title as a prop (which it displays as a `<SidebarSectionTitle>`), it accepts the section content as a slot.
	 * @component
	 */
	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';

	/**
	 * The title of this section.
	 */
	export let title = '';
</script>

<section>
	<div
		class="border-b border-core-grey-600 space-y-2 pb-2 text-sm bg-color-container-background-level-1 text-color-text-primary"
	>
		<SidebarSectionTitle>{title}</SidebarSectionTitle>
		<!-- The content to be displayed inside this section. -->
		<slot />
	</div>
</section>
