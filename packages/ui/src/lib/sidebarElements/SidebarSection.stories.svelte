<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import SidebarContainer from '../sidebar/SidebarContainer.svelte';
	import SidebarHeader from './SidebarHeader.svelte';
	import SidebarSection from './SidebarSection.svelte';
</script>

<Meta title="Ui/Sidebars/SidebarSection" component={SidebarSection} />

<Template let:args>
	<SidebarSection {...args} />
</Template>

<Story name="Title only">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarSection title="Sidebar section title">
				<span>Here is some content inside the section.</span>
			</SidebarSection>
		</Sidebar>
	</SidebarContainer>
</Story>

<Story name="Title and info">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarSection title="Sidebar section title">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the section.</span>
			</SidebarSection>
		</Sidebar>
	</SidebarContainer>
</Story>

<Story name="Multiple sections">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarSection title="Sidebar section 1">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the first section.</span>
			</SidebarSection>

			<SidebarSection title="Sidebar section 2">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the second section.</span>
			</SidebarSection>

			<SidebarSection title="Sidebar section 3">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the third section.</span>
			</SidebarSection>
		</Sidebar>
	</SidebarContainer>
</Story>
