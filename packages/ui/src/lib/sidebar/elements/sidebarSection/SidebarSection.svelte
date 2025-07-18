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

<section class="border-b border-color-ui-border-secondary last-of-type:border-0">
	<div class="space-y-4 pb-4 text-sm bg-color-container-level-1 text-color-text-primary">
		{#if $$slots.title}
			<!-- An optional `<SidebarSectionTitle>` component, which can accept a subtitle. -->
			<slot name="title" />
		{:else if title}
			<SidebarSectionTitle>{title}</SidebarSectionTitle>
		{/if}
		<!-- The content to be displayed inside this section. -->
		<slot />
	</div>
</section>
