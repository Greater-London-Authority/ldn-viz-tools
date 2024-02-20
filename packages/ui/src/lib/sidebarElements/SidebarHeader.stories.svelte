<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import SidebarContainer from '../sidebar/SidebarContainer.svelte';
	import SidebarHeader from './SidebarHeader.svelte';
</script>

<Meta title="Ui/Sidebars/SidebarHeader" component={SidebarHeader} />

<Template let:args>
	<SidebarHeader {...args} />
</Template>

<Story name="Title only">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title" />
		</Sidebar>
	</SidebarContainer>
</Story>

<Story name="With description">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title">
				<span>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</span>
			</SidebarHeader>
		</Sidebar>
	</SidebarContainer>
</Story>

<Story name="With description and more info">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title">
				<span>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</span>

				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>
			</SidebarHeader>
		</Sidebar>
	</SidebarContainer>
</Story>

<Story name="With more info only">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>
			</SidebarHeader>
		</Sidebar>
	</SidebarContainer>
</Story>
