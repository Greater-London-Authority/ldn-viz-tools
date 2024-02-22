<script>
	import AppShell from './AppShell.svelte';
	import Sidebar from './Sidebar.svelte';
	import SidebarHeader from '../sidebarElements/SidebarHeader.svelte';
	import SidebarSection from '../sidebarElements/SidebarSection.svelte';

	/*
		import {
			AppShell,
			Sidebar,
			SidebarHeader,
			SidebarSection
		} from '@ldn-viz/ui'
	*/
</script>

<AppShell startOpen>
	<div slot="content" class="p-6 text-white">
		<slot />
	</div>

	<Sidebar slot="sidebar">
		<SidebarHeader title="Sidebar Overview" infoTitle="More info">
			<p>Introductory paragraph or two.</p>
			<p slot="info">More info content.</p>
		</SidebarHeader>

		<SidebarSection title="Section" infoTitle="More section info">
			<p>Section content.</p>
			<p slot="info">More section info content.</p>
		</SidebarSection>
	</Sidebar>
</AppShell>
