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

	/**
	 * Value for this section, used to link to `SidebarTabLabel` with `aria-controls`. Required.
	 */
	export let id;

	/**
	 * Allows keyboard users to tab into the contents of the section when the first element is not interactive. In cases where the first element is interactive, set this to -1.
	 */
	export let tabIndex = 0;
</script>

<section {id} role="tabpanel" tabindex={tabIndex}>
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
