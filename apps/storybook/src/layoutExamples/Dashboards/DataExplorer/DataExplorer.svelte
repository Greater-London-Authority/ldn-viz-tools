<script lang="ts">
	// A multi-page explorer. The header holds the navigation between pages. The
	// sidebar has tabs for filters, reports, downloads and background, and the
	// filters apply to every page. Each page shows a loading state and an empty
	// state.
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { Table } from '@ldn-viz/tables';
	import {
		AppShell,
		Card,
		DashboardTitle,
		Footer,
		Header,
		HeaderItem,
		HeaderRight,
		HeaderTitle,
		NavigationMenu,
		NonIdealState,
		Sidebar
	} from '@ldn-viz/ui';
	import { ArrowDownTray, DocumentText, Funnel } from '@steeze-ui/heroicons';
	import { componentGroups, months, teams } from '../../DemoData/designSystemUsage';
	import { setExplorerState } from './explorerState.svelte';
	import DownloadsTab from './tabs/DownloadsTab.svelte';
	import FiltersTab from './tabs/FiltersTab.svelte';
	import ReportsTab from './tabs/ReportsTab.svelte';

	const explorer = setExplorerState();

	const pages = [
		{ id: 'overview', title: 'Overview', href: '#overview' },
		{ id: 'teams', title: 'Teams', href: '#teams' },
		{ id: 'components', title: 'Components', href: '#components' }
	];
	let page = $state('overview');

	const tabs = [
		{ id: 'filters', label: 'Filters', icon: Funnel, content: FiltersTab },
		{ id: 'reports', label: 'Reports', icon: DocumentText, content: ReportsTab },
		{ id: 'downloads', label: 'Downloads', icon: ArrowDownTray, content: DownloadsTab }
	];
	let selectedTabId = $state('filters');

	// A real app would fetch its data here. The delay stands in for the request,
	// so the example shows the loading state.
	const loading = new Promise((resolve) => setTimeout(resolve, 800));

	const sum = (rows: { renders: number }[]) => rows.reduce((total, d) => total + d.renders, 0);

	let byMonth = $derived(
		months
			.map((month) => ({ month, renders: sum(explorer.rows.filter((d) => d.month === month)) }))
			.filter((d) => d.renders > 0)
	);

	let byTeam = $derived(
		teams
			.map((team) => {
				const rows = explorer.rows.filter((d) => d.team === team);
				return { team, renders: sum(rows), months: new Set(rows.map((d) => d.month)).size };
			})
			.filter((d) => d.renders > 0)
	);

	let byGroup = $derived(
		componentGroups
			.map((group) => ({ group, renders: sum(explorer.rows.filter((d) => d.group === group)) }))
			.filter((d) => d.renders > 0)
	);

	let monthSpec = $derived({
		height: 280,
		marginLeft: 48,
		y: { grid: true, label: null },
		x: { label: null, ticks: '3 months', tickFormat: '%b' },
		marks: [Plot.line(byMonth, { x: 'month', y: 'renders', tip: true }), Plot.ruleY([0])]
	});

	let groupSpec = $derived({
		height: 280,
		marginLeft: 72,
		x: { grid: true, label: null },
		y: { label: null },
		marks: [
			Plot.barX(byGroup, { x: 'renders', y: 'group', sort: { y: '-x' }, tip: true }),
			Plot.ruleX([0])
		]
	});

	const teamTableSpec = {
		showColSummaries: false,
		columns: [
			{ short_label: 'team', label: 'Team', cell: { renderer: 'TextCell' } },
			{
				short_label: 'renders',
				label: 'Renders (thousands)',
				cell: { renderer: 'TextCell', alignText: 'right', formatString: ',.0f' }
			},
			{
				short_label: 'months',
				label: 'Months with renders',
				cell: { renderer: 'TextCell', alignText: 'right', formatString: ',.0f' }
			}
		]
	};
</script>

<div class="flex min-h-dvh flex-col">
	<Header>
		<HeaderTitle>Design system explorer</HeaderTitle>
		<HeaderRight>
			<HeaderItem>
				<!-- Top-level navigation between pages goes in the header. -->
				<NavigationMenu
					ariaLabel="Pages"
					items={pages}
					orientation="horizontal"
					bind:activeMenuItemId={page}
				/>
			</HeaderItem>
		</HeaderRight>
	</Header>

	<AppShell
		heightClass="grow"
		sidebarPlacement={{ initial: 'bottom', md: 'left' }}
		sidebarAlwaysOpen={{ initial: false, md: true }}
	>
		{#snippet main()}
			<div class="container-fluid flow-standard h-full bg-color-canvas-muted py-6">
				{#if page === 'overview'}
					<DashboardTitle title="Overview" subtitle="Component renders by fictional teams, 2026" />
				{:else if page === 'teams'}
					<DashboardTitle title="Teams" subtitle="Component renders for each fictional team" />
				{:else}
					<DashboardTitle
						title="Components"
						subtitle="Component renders for each component group"
					/>
				{/if}

				<div class="mt-flow-section">
					{#await loading}
						<NonIdealState spinner>
							{#snippet title()}Loading data{/snippet}
						</NonIdealState>
					{:then}
						{#if explorer.rows.length === 0}
							<!-- Filters can remove every row. Say so, and say how to get the data back. -->
							<NonIdealState>
								{#snippet title()}No data matches these filters{/snippet}
								Change the filters, or reset them in the Filters tab.
							</NonIdealState>
						{:else if page === 'overview'}
							<div class="gap-flow grid grid-cols-1 xl:grid-cols-2">
								<Card>
									<ObservablePlot
										id="explorer-renders-by-month"
										title="Component renders by month"
										subTitle="Thousands of renders"
										alt="Line chart of component renders by month"
										chartDescription="A line chart of the number of component renders in each month for the filtered data."
										source="Demo data"
										spec={monthSpec}
										data={byMonth}
									/>
								</Card>
								<Card>
									<ObservablePlot
										id="explorer-renders-by-group"
										title="Component renders by group"
										subTitle="Thousands of renders"
										alt="Bar chart of component renders by component group"
										chartDescription="A bar chart of the number of component renders for each component group in the filtered data."
										source="Demo data"
										spec={groupSpec}
										data={byGroup}
									/>
								</Card>
							</div>
						{:else if page === 'teams'}
							<Card title="Renders by team" subtitle="Filtered data" source="Demo data">
								<Table
									data={byTeam}
									tableSpec={teamTableSpec}
									allowSorting
									dataDownloadButton={false}
									imageDownloadButton={false}
								/>
							</Card>
						{:else}
							<Card>
								<ObservablePlot
									id="explorer-components"
									title="Component renders by group"
									subTitle="Thousands of renders"
									alt="Bar chart of component renders by component group"
									chartDescription="A bar chart of the number of component renders for each component group in the filtered data."
									source="Demo data"
									spec={groupSpec}
									data={byGroup}
								/>
							</Card>
						{/if}
					{/await}
				</div>
			</div>
		{/snippet}

		{#snippet sidebar()}
			<Sidebar {tabs} bind:selectedTabId />
		{/snippet}
	</AppShell>

	<Footer showCiuLogo showCookieMenu />
</div>
