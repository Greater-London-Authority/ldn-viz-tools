<script lang="ts">
	import { Button, SidebarGroup, SidebarSection } from '@ldn-viz/ui';
	import { usage } from '../../../DemoData/designSystemUsage';
	import { getExplorerState } from '../explorerState.svelte';

	const explorer = getExplorerState();

	const toCsv = (rows: typeof usage) =>
		[
			'month,team,group,renders',
			...rows.map((d) => `${d.month.toISOString().slice(0, 7)},${d.team},${d.group},${d.renders}`)
		].join('\n');

	const download = (rows: typeof usage, filename: string) => {
		const url = URL.createObjectURL(new Blob([toCsv(rows)], { type: 'text/csv' }));
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	};
</script>

<SidebarSection title="Downloads">
	<p>Download the data as a CSV file.</p>
	<!-- The main action is primary. The second one is secondary, so the reader
	can tell which download most people want. -->
	<SidebarGroup>
		<Button class="w-full" onclick={() => download(explorer.rows, 'filtered-usage.csv')}>
			Download filtered data ({explorer.rows.length} rows)
		</Button>
		<Button
			class="w-full"
			variant="outline"
			emphasis="secondary"
			onclick={() => download(usage, 'all-usage.csv')}
		>
			Download all data
		</Button>
	</SidebarGroup>
</SidebarSection>
