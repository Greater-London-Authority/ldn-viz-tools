<script lang="ts">
	import { Button, CheckboxGroup, Input, Select, SidebarGroup, SidebarSection } from '@ldn-viz/ui';
	import { componentGroups, formatMonth, months, teams } from '../../../DemoData/designSystemUsage';
	import { getExplorerState } from '../explorerState.svelte';

	const explorer = getExplorerState();

	const teamOptions = teams.map((team) => ({ value: team, label: team }));
	const groupOptions = componentGroups.map((group) => ({ id: group, label: group }));
	const monthOptions = months.map((month, i) => ({ value: i, label: formatMonth(month) }));
</script>

<SidebarSection title="Filters">
	<SidebarGroup>
		<Select
			label="Team"
			placeholder="All teams"
			hint="Teams are fictional, and so is their data."
			options={teamOptions}
			bind:value={explorer.team}
			searchable
			clearable
		/>
		<CheckboxGroup
			label="Component groups"
			options={groupOptions}
			bind:selectedOptions={explorer.groups}
		/>
	</SidebarGroup>
	<SidebarGroup>
		<Select
			label="From"
			options={monthOptions}
			bind:value={explorer.fromMonth}
			description="Months before this one are left out."
		/>
		<!-- A slider is for picking a position in a range, not an exact number. -->
		<Input
			type="range"
			label={`Minimum renders: ${explorer.minimumRenders} thousand`}
			description="Hides rows with fewer renders than this."
			min="0"
			max="120"
			bind:value={explorer.minimumRenders}
		/>
	</SidebarGroup>
	<!-- A way back to the full data. -->
	<Button variant="outline" emphasis="secondary" onclick={() => explorer.reset()}>
		Reset filters
	</Button>
</SidebarSection>
