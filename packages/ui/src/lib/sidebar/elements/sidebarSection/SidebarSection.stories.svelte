<script context="module">
	import SidebarSection from './SidebarSection.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarSection',
		component: SidebarSection
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import SidebarHint from '../sidebarHint/SidebarHint.svelte';
	import SidebarGroupTitle from './sidebarGroupTitle/SidebarGroupTitle.svelte';
	import SidebarSectionTitle from './sidebarSectionTitle/SidebarSectionTitle.svelte';
</script>

<Template let:args>
	<SidebarSection {...args} />
</Template>

<Story name="Default" source>
	<SidebarSection title="Section Title">Section</SidebarSection>
</Story>

<Story name="With Titled Group" source>
	<SidebarSection title="Section Title">
		Section Content
		<div>
			<SidebarGroupTitle>
				Pay Attention to this group
				<SidebarHint slot="hint" hintType="modal" hintLabel="why">
					Beacuse it's Awesome!
				</SidebarHint>
			</SidebarGroupTitle>
			Grouped content
		</div>
	</SidebarSection>
</Story>

<!-- You can add a subtitle or hint text by providing a `<SidebarSection>` component within the `title` slot. -->
<Story name="With SidebarSectionTitle component" source>
	<SidebarSection title="Section Title">
		<svelte:fragment slot="title">
			<SidebarSectionTitle>
				<svelte:fragment>The title of this section</svelte:fragment>

				<svelte:fragment slot="subTitle">The sub-title of ths section.</svelte:fragment>

				<SidebarHint slot="hint" hintLabel="About">
					This popover should provide some additional explanation about this section.
				</SidebarHint>
			</SidebarSectionTitle>
		</svelte:fragment>

		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
		voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

		<div>
			<SidebarGroupTitle>
				Pay Attention to this group
				<SidebarHint slot="hint" hintType="modal" hintLabel="why">
					Beacuse it's Awesome!
				</SidebarHint>
			</SidebarGroupTitle>
			Grouped content
		</div>
	</SidebarSection>
</Story>
