<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Button from '../button/Button.svelte';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import SidebarContainer from '../sidebar/SidebarContainer.svelte';

	import { ChartBar, Funnel, Map as MapIcon, MapPin } from '@steeze-ui/heroicons';
	import SidebarHeader from './SidebarHeader.svelte';
</script>

<Meta
	title="Ui/SidebarElements"
	component={Sidebar}
	parameters={{
		layout: 'full'
	}}
/>

<Story name="Default">
	<SidebarContainer>
		<Sidebar slot="sidebar">
			<SidebarHeader />
		</Sidebar>
	</SidebarContainer>
</Story>
