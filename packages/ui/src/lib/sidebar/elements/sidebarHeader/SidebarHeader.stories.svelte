<script context="module">
	import SidebarHeader from './SidebarHeader.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarHeader',
		component: SidebarHeader
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import SidebarHint from '../sidebarHint/SidebarHint.svelte';
</script>

<Template let:args>
	<SidebarHeader {...args} />
</Template>

<Story name="Default" source>
	<SidebarHeader title="Main sidebar title" />
</Story>

<Story name="No Brand" source>
	<SidebarHeader title="Main sidebar title" branded={'false'} />
</Story>

<Story name="With Sub-title" source>
	<SidebarHeader title="Main sidebar title">
		<svelte:fragment slot="subTitle">
			<p>
				Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
				venenatis sapien. Etiam venenatis felis.
			</p>
		</svelte:fragment>
	</SidebarHeader>
</Story>

<Story name="With Hint" source>
	<SidebarHeader title="Main sidebar title">
		<SidebarHint slot="hint" hintType="modal" modalTitle="About" modalWidth="5xl">
			<p class="mb-4">Any content you want can go here</p>
			<p>
				Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
				venenatis sapien. Etiam venenatis felis.
			</p>
		</SidebarHint>
	</SidebarHeader>
</Story>

<Story name="With Long Title" source>
	<SidebarHeader
		title={`Main sidebar title which is<br /> unfortunately very long and so<br /> needs some breaks inserting`}
	></SidebarHeader>
</Story>
