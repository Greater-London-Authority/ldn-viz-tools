<script context="module">
	import SidebarSection from './SidebarSection.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarSection',
		component: SidebarSection
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import SidebarGroupTitle from './sidebarGroupTitle/SidebarGroupTitle.svelte';
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
			<SidebarGroupTitle hintType="modal" hintLabel="why">
				Pay Attention to this group
				<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
			</SidebarGroupTitle>
			Grouped content
		</div>
	</SidebarSection>
</Story>
