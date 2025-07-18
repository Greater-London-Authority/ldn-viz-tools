<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '../../../overlay/Overlay.svelte';
	import SidebarGroupTitle from './sidebarGroupTitle/SidebarGroupTitle.svelte';
	import SidebarSection from './SidebarSection.svelte';
	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';

	/**
	 * The `<SidebarSection>` component is used to group together a 'section' of content within a `<Sidebar>`.
	 * As well as accepting a section title as a prop (which it displays as a `<SidebarSectionTitle>`), it accepts the section content as a slot.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarSection',
		component: SidebarSection,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<SidebarSection title="Section Title">Section</SidebarSection>
	{/snippet}
</Story>

<Story name="With Titled Group">
	{#snippet template()}
		<SidebarSection title="Section Title">
			Section Content
			<div>
				<SidebarGroupTitle>
					Pay Attention to this group
					{#snippet hint()}
						<Overlay hintLabel="why">Beacuse it's Awesome!</Overlay>
					{/snippet}
				</SidebarGroupTitle>
				Grouped content
			</div>
		</SidebarSection>
	{/snippet}
</Story>

<!-- You can add a subtitle or hint text by providing a `<SidebarSectionTitle>` as the title snippet. You can either pass a string or a snippet - not both. -->
<Story name="With SidebarSectionTitle component">
	{#snippet template()}
		<SidebarSection>
			{#snippet title()}
				<SidebarSectionTitle>
					The title of this section

					{#snippet subTitle()}The sub-title of ths section.{/snippet}

					{#snippet hint()}<Overlay hintLabel="About">
							This popover should provide some additional explanation about this section.
						</Overlay>
					{/snippet}
				</SidebarSectionTitle>
			{/snippet}

			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

			<div>
				<SidebarGroupTitle>
					Pay Attention to this group
					{#snippet hint()}<Overlay hintLabel="why">Beacuse it's Awesome!</Overlay>{/snippet}
				</SidebarGroupTitle>
				Grouped content
			</div>
		</SidebarSection>
	{/snippet}
</Story>
