<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import AppShell from '../sidebar/AppShell.svelte';
	import SidebarGroup from './SidebarGroup.svelte';
</script>

<Meta title="Ui/SidebarElements/SidebarGroup" component={SidebarGroup} />

<Template let:args>
	<SidebarGroup {...args} />
</Template>

<Story name="Title only">
	<AppShell>
		<Sidebar slot="sidebar">
			<SidebarGroup title="Sidebar group title">
				<span>Here is some content inside the group.</span>
			</SidebarGroup>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Title and info">
	<AppShell>
		<Sidebar slot="sidebar">
			<SidebarGroup title="Sidebar group title">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the group.</span>
			</SidebarGroup>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Multiple groups">
	<AppShell>
		<Sidebar slot="sidebar">
			<SidebarGroup title="Sidebar group 1">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the first group.</span>
			</SidebarGroup>

			<SidebarGroup title="Sidebar group 2">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the second group.</span>
			</SidebarGroup>

			<SidebarGroup title="Sidebar group 3">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the third group.</span>
			</SidebarGroup>
		</Sidebar>
	</AppShell>
</Story>
