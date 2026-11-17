<script lang="ts">
	// The smallest complete dashboard: a header, a sidebar of page-wide filters, a
	// canvas with a title and two charts, and a footer.
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import {
		AppShell,
		Card,
		CheckboxGroup,
		DashboardTitle,
		Footer,
		Header,
		HeaderTitle,
		RadioButtonGroupSolid,
		Select,
		Sidebar,
		SidebarHeader,
		SidebarSection
	} from '@ldn-viz/ui';
	import { componentGroups, months, teams, usage } from '../DemoData/designSystemUsage';

	// Filters
	const periodOptions = [
		{ id: '3', label: '3 months' },
		{ id: '6', label: '6 months' },
		{ id: '12', label: '12 months' }
	];
	const teamOptions = teams.map((team) => ({ value: team, label: team }));
	const groupOptions = componentGroups.map((group) => ({ id: group, label: group }));

	let period = $state('12');
	let team: string | undefined = $state();
	let groups: string[] = $state([...componentGroups]);

	// The sidebar filters apply to every chart on the canvas, so the data is
	// filtered once and each chart reads the result.
	let filtered = $derived(
		usage.filter(
			(d) =>
				d.month >= months[months.length - Number(period)] &&
				(!team || d.team === team) &&
				groups.includes(d.group)
		)
	);

	let byMonth = $derived(
		months
			.filter((month) => month >= months[months.length - Number(period)])
			.map((month) => ({
				month,
				renders: filtered.filter((d) => d.month === month).reduce((sum, d) => sum + d.renders, 0)
			}))
	);

	let byGroup = $derived(
		groups.map((group) => ({
			group,
			renders: filtered.filter((d) => d.group === group).reduce((sum, d) => sum + d.renders, 0)
		}))
	);

	// $derived re-reads the mark defaults, which hold theme colours, when the
	// theme changes.
	let lineSpec = $derived({
		height: 260,
		marginLeft: 48,
		y: { grid: true, label: null },
		x: { label: null, ticks: '3 months', tickFormat: '%b' },
		marks: [Plot.line(byMonth, { x: 'month', y: 'renders', tip: true }), Plot.ruleY([0])]
	});

	let barSpec = $derived({
		height: 260,
		marginLeft: 72,
		x: { grid: true, label: null },
		y: { label: null },
		marks: [
			Plot.barX(byGroup, { x: 'renders', y: 'group', sort: { y: '-x' }, tip: true }),
			Plot.ruleX([0])
		]
	});

	let scope = $derived(`${team ?? 'All teams'}, last ${period} months of 2026`);
</script>

<div class="flex min-h-dvh flex-col">
	<Header>
		<HeaderTitle>Design system usage</HeaderTitle>
	</Header>

	<!-- The sidebar sits below the canvas on small screens and beside it from md. -->
	<AppShell
		heightClass="grow"
		sidebarPlacement={{ initial: 'bottom', md: 'left' }}
		sidebarAlwaysOpen={{ initial: false, md: true }}
	>
		{#snippet main()}
			<!-- container-fluid sets the padding at the page edge. flow-standard sets the space
			between the blocks inside it, and gap-flow uses the same step between cards. -->
			<div class="container-fluid flow-standard h-full bg-color-canvas-muted py-6">
				<DashboardTitle
					title="Design system usage"
					subtitle="How often fictional teams render design system components"
				/>

				<div class="mt-flow-section gap-flow grid grid-cols-1 lg:grid-cols-2">
					<Card>
						<ObservablePlot
							id="starter-renders-by-month"
							title="Component renders by month"
							subTitle={`Thousands of renders. ${scope}`}
							alt="Line chart of component renders by month"
							chartDescription="A line chart of the number of component renders in each month for the selected teams and component groups."
							source="Demo data"
							spec={lineSpec}
							data={byMonth}
						/>
					</Card>
					<Card>
						<ObservablePlot
							id="starter-renders-by-group"
							title="Component renders by group"
							subTitle={`Thousands of renders. ${scope}`}
							alt="Bar chart of component renders by component group"
							chartDescription="A bar chart of the number of component renders for each selected component group."
							source="Demo data"
							spec={barSpec}
							data={byGroup}
						/>
					</Card>
				</div>
			</div>
		{/snippet}

		{#snippet sidebar()}
			<Sidebar>
				{#snippet header()}
					<SidebarHeader title="Filters">
						{#snippet subTitle()}
							<p>These filters apply to every chart on the page.</p>
						{/snippet}
					</SidebarHeader>
				{/snippet}

				{#snippet sections()}
					<SidebarSection>
						<RadioButtonGroupSolid
							label="Period"
							options={periodOptions}
							bind:selectedId={period}
						/>
						<Select
							label="Team"
							placeholder="All teams"
							options={teamOptions}
							bind:value={team}
							searchable
							clearable
						/>
						<CheckboxGroup
							label="Component groups"
							options={groupOptions}
							bind:selectedOptions={groups}
						/>
					</SidebarSection>
				{/snippet}
			</Sidebar>
		{/snippet}
	</AppShell>

	<Footer showCiuLogo showCookieMenu />
</div>
