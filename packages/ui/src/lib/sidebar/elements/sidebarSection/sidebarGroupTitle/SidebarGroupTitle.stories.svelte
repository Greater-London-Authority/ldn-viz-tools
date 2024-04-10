<script context="module">
	import SidebarGroupTitle from './SidebarGroupTitle.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarSection/Group Title',
		component: SidebarGroupTitle
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<SidebarGroupTitle {...args} />
</Template>

<Story name="Default" source>
	<SidebarGroupTitle>Group Title</SidebarGroupTitle>
</Story>

<Story name="With Hint" source>
	<SidebarGroupTitle hintType="modal">Group Title</SidebarGroupTitle>
</Story>
