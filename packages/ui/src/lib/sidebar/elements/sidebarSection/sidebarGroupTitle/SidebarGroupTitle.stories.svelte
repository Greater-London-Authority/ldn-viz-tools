<script context="module">
	import SidebarHint from '../../sidebarHint/SidebarHint.svelte';
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
	<SidebarGroupTitle>
		Group Title
		<SidebarHint slot="hint" hintType="tooltip">
			<p class="mb-4">Any content you want can go here</p>
			<p>
				Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
				venenatis sapien. Etiam venenatis felis.
			</p>
		</SidebarHint>
	</SidebarGroupTitle>
</Story>
