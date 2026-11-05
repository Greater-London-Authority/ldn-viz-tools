<script lang="ts">
	import { SidebarSection } from '@ldn-viz/ui';
	import { reports } from '../../../DemoData/designSystemUsage';
</script>

<SidebarSection title="Reports">
	<p>Reports written from this data. The reports are fictional.</p>
	<ul class="flex flex-col gap-4">
		{#each reports as report (report.id)}
			<li class="flex flex-col gap-1">
				<a href={`#${report.id}`} class="label-md text-color-interactive-primary-text underline">
					{report.title}
				</a>
				<p class="caption-sm text-color-text-muted">{report.published}</p>
				<p class="body-sm">{report.summary}</p>
			</li>
		{/each}
	</ul>
</SidebarSection>
