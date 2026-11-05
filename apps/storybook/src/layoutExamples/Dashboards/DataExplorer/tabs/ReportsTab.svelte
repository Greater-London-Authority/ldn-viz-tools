<script lang="ts">
	import { NavigationMenu, SidebarSection } from '@ldn-viz/ui';
	import { reports } from '../../../DemoData/designSystemUsage';

	// Links to other pages go in a vertical navigation menu.
	const items = reports.map((report) => ({
		id: report.id,
		title: report.title,
		href: `#${report.id}`
	}));
</script>

<SidebarSection title="Reports">
	<p>Reports written from this data. The reports are fictional.</p>
	<NavigationMenu ariaLabel="Reports" {items} />
</SidebarSection>
