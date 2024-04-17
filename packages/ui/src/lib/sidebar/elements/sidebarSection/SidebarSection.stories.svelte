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
