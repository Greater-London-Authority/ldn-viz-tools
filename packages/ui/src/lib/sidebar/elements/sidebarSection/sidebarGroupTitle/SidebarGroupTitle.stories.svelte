<script context="module">
	import SidebarGroupTitle from './SidebarGroupTitle.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarSection/Group Title',
		component: SidebarGroupTitle
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Overlay from '../../../../overlay/Overlay.svelte';
</script>

<Template let:args>
	<SidebarGroupTitle {...args} />
</Template>

<Story name="Default" source>
	<SidebarGroupTitle>Group Title</SidebarGroupTitle>
</Story>

<Story name="With Subtitle" source>
	<SidebarGroupTitle>
		Section Title
		<svelte:fragment slot="subTitle">
			<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
		</svelte:fragment>
	</SidebarGroupTitle>
</Story>

<Story name="With Hint" source>
	<SidebarGroupTitle>
		Group Title
		<Overlay slot="hint">
			<p class="mb-4">Any content you want can go here</p>
			<p>
				Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
				venenatis sapien. Etiam venenatis felis.
			</p>
		</Overlay>
	</SidebarGroupTitle>
</Story>
