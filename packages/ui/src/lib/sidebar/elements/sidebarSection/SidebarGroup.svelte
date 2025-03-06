<script lang="ts">
	/**
	 * The `<SidebarGroup>` component is used to group together a 'section' of content within a `<Sidebar>`.
	 * As well as accepting a section title as a prop (which it displays as a `<SidebarGroupTitle>`), it accepts the section content as a slot.
	 * @component
	 */
	import SidebarGroupTitle from './sidebarGroupTitle/SidebarGroupTitle.svelte';

	/**
	 * The title of this section. Note that rather than supplying a title, you can supply a `<SidebarGroupTitle>` component in the `title` slot.
	 */
	export let title = '';
</script>

<section>
	<div
		class="space-y-2 pb-2 last-of-type:pb-0 text-sm bg-color-container-level-1 text-color-text-primary"
	>
		{#if $$slots.title}
			<!-- An optional `<SidebarGroupTitle>` component, which can accept a subtitle. -->
			<slot name="title" />
		{:else if title}
			<SidebarGroupTitle>{title}</SidebarGroupTitle>
		{/if}
		<!-- The content to be displayed inside this section. -->
		<slot />
	</div>
</section>
