<script context="module">
	import Overlay from '../../../../overlay/Overlay.svelte';
	import SidebarSectionTitle from './SidebarSectionTitle.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarSection/Section Title',
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
	<SidebarSectionTitle>
		Section Title
		<Overlay slot="hint">
			<p class="mb-4">Any content you want can go here</p>
			<p>
				Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
				venenatis sapien. Etiam venenatis felis.
			</p>
		</Overlay>
	</SidebarSectionTitle>
</Story>
