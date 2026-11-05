<script lang="ts">
	// A dashboard with several sections: a row of metrics, charts of different
	// widths, a card that groups two related charts, and a table. It shows a
	// filter for the whole page in the sidebar beside a filter for one chart.
	import { ChartContainer, ObservablePlot, ObservablePlotInner, Plot } from '@ldn-viz/charts';
	import { Table } from '@ldn-viz/tables';
	import {
		AppShell,
		Callout,
		Card,
		CheckboxGroup,
		DashboardSectionTitle,
		DashboardTitle,
		Footer,
		Header,
		HeaderTitle,
		Metric,
		RadioButtonGroupSolid,
		Select,
		Sidebar,
		SidebarHeader,
		SidebarSection,
		theme
	} from '@ldn-viz/ui';
	import {
		componentGroups,
		componentViews,
		formatMonth,
		months,
		releases,
		teams,
		usage
	} from '../DemoData/designSystemUsage';

	// Page-wide filters, in the sidebar
	const periodOptions = [
		{ id: '6', label: '6 months' },
		{ id: '12', label: '12 months' }
	];
	const groupOptions = componentGroups.map((group) => ({ id: group, label: group }));

	let period = $state('12');
	let groups: string[] = $state([...componentGroups]);

	let shownMonths = $derived(months.slice(-Number(period)));
	let filtered = $derived(
		usage.filter((d) => d.month >= shownMonths[0] && groups.includes(d.group))
	);
	let shownReleases = $derived(releases.filter((d) => d.month >= shownMonths[0]));

	const sum = (rows: { renders: number }[]) => rows.reduce((total, d) => total + d.renders, 0);

	// Metrics compare the latest month with the month before it.
	const latest = months[months.length - 1];
	const previous = months[months.length - 2];
	let rendersLatest = $derived(sum(filtered.filter((d) => d.month === latest)));
	let rendersPrevious = $derived(sum(filtered.filter((d) => d.month === previous)));
	let closedLatest = $derived(releases[releases.length - 1].issuesClosed);
	let closedPrevious = $derived(releases[releases.length - 2].issuesClosed);
	const viewsLatest = componentViews.reduce((total, d) => total + d.views, 0);

	// A filter for one chart goes in that chart's controls slot, not the sidebar.
	const teamOptions = teams.map((team) => ({ value: team, label: team }));
	let highlightedTeam: string = $state(teams[0]);

	let byTeam = $derived(
		teams.flatMap((team) =>
			shownMonths.map((month) => ({
				month,
				team,
				renders: sum(filtered.filter((d) => d.team === team && d.month === month))
			}))
		)
	);

	// One series highlighted against the rest: data.primary for it and
	// data.context for the others. Five teams are too many for separate colours.
	let teamSpec = $derived({
		height: 280,
		marginLeft: 48,
		marginRight: 64,
		y: { grid: true, label: null },
		x: { label: null, ticks: '3 months', tickFormat: '%b' },
		marks: [
			Plot.line(
				byTeam.filter((d) => d.team !== highlightedTeam),
				{ x: 'month', y: 'renders', z: 'team', stroke: theme.tokenNameToValue('data.context') }
			),
			Plot.line(
				byTeam.filter((d) => d.team === highlightedTeam),
				{ x: 'month', y: 'renders', stroke: theme.tokenNameToValue('data.primary'), tip: true }
			),
			Plot.text(
				byTeam.filter((d) => d.team === highlightedTeam && d.month === latest),
				{ x: 'month', y: 'renders', text: 'team', dx: 8, textAnchor: 'start' }
			),
			Plot.ruleY([0])
		]
	});

	let viewsSpec = $derived({
		height: 280,
		marginLeft: 136,
		x: { grid: true, label: null },
		y: { label: null },
		marks: [
			Plot.barX(componentViews, { x: 'views', y: 'component', sort: { y: '-x' }, tip: true }),
			Plot.ruleX([0])
		]
	});

	// The domain keeps releases in order (a band scale sorts strings, so 4.10 would
	// come before 4.2). Every third release is labelled, so the labels fit.
	const releaseTick = (v: string, i: number) => (i % 3 ? '' : v.replace(/\.0$/, ''));

	let closedSpec = $derived({
		height: 200,
		marginLeft: 40,
		x: {
			label: null,
			type: 'band',
			domain: shownReleases.map((d) => d.version),
			tickFormat: releaseTick
		},
		y: { grid: true, label: null },
		marks: [
			Plot.barY(shownReleases, { x: 'version', y: 'issuesClosed', tip: true }),
			Plot.ruleY([0])
		]
	});

	let openedSpec = $derived({
		height: 200,
		marginLeft: 40,
		x: {
			label: null,
			type: 'band',
			domain: shownReleases.map((d) => d.version),
			tickFormat: releaseTick
		},
		y: { grid: true, label: null },
		marks: [
			Plot.barY(shownReleases, { x: 'version', y: 'issuesOpened', tip: true }),
			Plot.ruleY([0])
		]
	});

	let releaseRows = $derived(
		shownReleases.map((d) => ({
			version: d.version,
			month: formatMonth(d.month),
			issuesClosed: d.issuesClosed,
			issuesOpened: d.issuesOpened
		}))
	);

	const tableSpec = {
		showColSummaries: false,
		columns: [
			{ short_label: 'version', label: 'Version', cell: { renderer: 'TextCell' } },
			{ short_label: 'month', label: 'Released', cell: { renderer: 'TextCell' } },
			{
				short_label: 'issuesClosed',
				label: 'Issues closed',
				cell: { renderer: 'TextCell', alignText: 'right', formatString: ',.0f' }
			},
			{
				short_label: 'issuesOpened',
				label: 'Issues opened',
				cell: { renderer: 'TextCell', alignText: 'right', formatString: ',.0f' }
			}
		]
	};
</script>

<div class="flex min-h-dvh flex-col">
	<Header>
		<HeaderTitle>Design system overview</HeaderTitle>
	</Header>

	<AppShell
		heightClass="grow"
		sidebarPlacement={{ initial: 'bottom', md: 'left' }}
		sidebarAlwaysOpen={{ initial: false, md: true }}
	>
		{#snippet main()}
			<div class="container-fluid flow-standard h-full bg-color-canvas-muted py-6">
				<DashboardTitle
					title="Design system overview"
					subtitle="Usage, documentation and releases for fictional teams"
				/>

				<!-- Callout has no class prop, so the wrapper takes the flow step. -->
				<div class="mt-flow-section">
					<Callout status="notice">
						{#snippet title()}Provisional figures{/snippet}
						{#snippet body()}Figures for the latest month may change as late usage reports arrive.{/snippet}
					</Callout>
				</div>

				<!-- Section: metrics. Four cards across from lg, two across below it. -->
				<DashboardSectionTitle
					title="This month"
					subtitle={`${formatMonth(latest)}, compared with ${formatMonth(previous)}`}
					class="mt-flow-section"
				/>
				<div class="gap-flow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					<Card>
						<Metric
							label="Component renders (thousands)"
							value={rendersLatest}
							comparisonValue={rendersPrevious}
							showChangeAs="percentage"
						/>
					</Card>
					<Card><Metric label="Teams using the system" value={teams.length} /></Card>
					<Card>
						<Metric label="Issues closed" value={closedLatest} comparisonValue={closedPrevious} />
					</Card>
					<Card><Metric label="Storybook page views" value={viewsLatest} /></Card>
				</div>

				<!-- Section: usage. Two cards across from lg, then two thirds and one third from 2xl,
				where the narrow card is wide enough for its bar labels. -->
				<DashboardSectionTitle
					title="Usage"
					subtitle="Component renders by team, and the most viewed Storybook pages"
					class="mt-flow-section"
				/>
				<div class="gap-flow grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
					<Card class="2xl:col-span-2">
						<ObservablePlot
							id="overview-renders-by-team"
							title="Component renders by team"
							subTitle={`Thousands of renders, last ${period} months of 2026`}
							alt="Line chart of component renders by team, with one team highlighted"
							chartDescription="A line chart with one line for each team. The selected team is highlighted and the other teams are shown in grey."
							source="Demo data"
							spec={teamSpec}
							data={byTeam}
						>
							{#snippet controls()}
								<div class="max-w-xs">
									<Select
										label="Highlight team"
										options={teamOptions}
										bind:value={highlightedTeam}
									/>
								</div>
							{/snippet}
						</ObservablePlot>
					</Card>
					<Card>
						<ObservablePlot
							id="overview-storybook-views"
							title="Most viewed components"
							subTitle="Storybook page views, latest month"
							alt="Bar chart of Storybook page views by component"
							chartDescription="A bar chart of Storybook page views for the eight most viewed components."
							source="Demo data"
							spec={viewsSpec}
							data={componentViews}
						/>
					</Card>
				</div>

				<!-- Section: releases. The card's title group is dominant, so the two charts
				inside it take emphasis="secondary" and show their titles as eyebrows. -->
				<DashboardSectionTitle
					title="Releases"
					subtitle="Issues closed and opened in each release"
					class="mt-flow-section"
				/>
				<div class="gap-flow grid grid-cols-1 lg:grid-cols-2">
					<Card
						title="Issues by release"
						subtitle={`Last ${period} months`}
						source="Demo data"
						hint="Each release closes the issues fixed since the release before it."
					>
						<div class="gap-flow grid grid-cols-1 sm:grid-cols-2">
							<ChartContainer
								id="overview-issues-closed"
								title="Issues closed"
								emphasis="secondary"
								alt="Bar chart of issues closed in each release"
								dataDownloadButton={false}
								imageDownloadButton={false}
							>
								<ObservablePlotInner
									id="overview-issues-closed-plot"
									spec={closedSpec}
									data={shownReleases}
								/>
							</ChartContainer>
							<ChartContainer
								id="overview-issues-opened"
								title="Issues opened"
								emphasis="secondary"
								alt="Bar chart of issues opened in each release"
								dataDownloadButton={false}
								imageDownloadButton={false}
							>
								<ObservablePlotInner
									id="overview-issues-opened-plot"
									spec={openedSpec}
									data={shownReleases}
								/>
							</ChartContainer>
						</div>
					</Card>
					<Card title="Releases" subtitle={`Last ${period} months`} source="Demo data">
						<Table
							data={releaseRows}
							{tableSpec}
							allowSorting
							dataDownloadButton={false}
							imageDownloadButton={false}
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
							<p>These filters apply to every section of the page.</p>
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
