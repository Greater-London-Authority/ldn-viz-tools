<script context="module">
	import SidebarSectionTitle from './SidebarSectionTitle.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarSection/Title',
		component: SidebarSectionTitle
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<SidebarSectionTitle {...args} />
</Template>

<Story name="Default" source>
	<SidebarSectionTitle>Section Title</SidebarSectionTitle>
</Story>

<Story name="With Subtitle" source>
	<SidebarSectionTitle>
		Section Title
		<svelte:fragment slot="subTitle">
			<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
		</svelte:fragment>
	</SidebarSectionTitle>
</Story>

<Story name="With Hint" source>
	<SidebarSectionTitle hintType="modal">
		Section Title
		<svelte:fragment slot="hint">Content hint here</svelte:fragment>
	</SidebarSectionTitle>
</Story>
