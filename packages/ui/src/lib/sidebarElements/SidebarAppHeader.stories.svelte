<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import AppShell from '../sidebar/AppShell.svelte';
	import SidebarAppHeader from './SidebarAppHeader.svelte';
</script>

<Meta title="Ui/SidebarElements/SidebarAppHeader" component={SidebarAppHeader} />

<Template let:args>
	<SidebarAppHeader {...args} />
</Template>

<Story name="Title only">
	<AppShell startOpen>
		<Sidebar slot="sidebar">
			<SidebarAppHeader title="Main sidebar title" />
		</Sidebar>
	</AppShell>
</Story>

<Story name="With description">
	<AppShell startOpen>
		<Sidebar slot="sidebar">
			<SidebarAppHeader title="Main sidebar title">
				<span>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</span>
			</SidebarAppHeader>
		</Sidebar>
	</AppShell>
</Story>

<Story name="With description and more info">
	<AppShell startOpen>
		<Sidebar slot="sidebar">
			<SidebarAppHeader title="Main sidebar title">
				<span>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</span>

				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>
			</SidebarAppHeader>
		</Sidebar>
	</AppShell>
</Story>

<Story name="With more info only">
	<AppShell startOpen>
		<Sidebar slot="sidebar">
			<SidebarAppHeader title="Main sidebar title">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>
			</SidebarAppHeader>
		</Sidebar>
	</AppShell>
</Story>
