<script lang="ts">
	import { ObservablePlotInner, Plot } from '@ldn-viz/charts';
	import { Map, appendOSKeyToUrl } from '@ldn-viz/maps';
	import { Table } from '@ldn-viz/tables';

	import AppShell from '../../appShell/AppShell.svelte';
	import Breadcrumbs from '../../breadcrumbs/Breadcrumbs.svelte';
	import Card from '../../card/Card.svelte';
	import Footer from '../../footer/Footer.svelte';
	import Header from '../../header/Header.svelte';
	import HeaderItem from '../../header/HeaderItem.svelte';
	import HeaderRight from '../../header/HeaderRight.svelte';
	import HeaderTitle from '../../header/HeaderTitle.svelte';
	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import NavigationMenu from '../../navigationMenu/NavigationMenu.svelte';
	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';
	import { theme } from '../../theme/themeState.svelte';
	import { Demo1 } from './demoTabs';

	// Public OS demo key used across the Map stories.
	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	let mainMenu = [
		{ title: 'Rivers', id: 'rivers', href: '/' },
		{ title: 'About', id: 'about', href: '/' }
	];

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Environment', href: '/' },
		{ label: "London's river health", href: '/' }
	];

	// --- Chart data ---------------------------------------------------------
	const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
	const yearLabel = (d: number) => `${d}`;

	// Two-series river water-quality index over time.
	const trend = years.flatMap((year, i) => [
		{ year, river: 'Thames', value: 58 + i * 3 },
		{ year, river: 'Lea', value: 44 + i * 2 }
	]);

	// Series take the data roles in order (ADR 0008). $derived re-reads them
	// when the theme changes.
	let trendSpec = $derived({
		height: 260,
		marginRight: 18,
		color: {
			legend: true,
			type: 'ordinal',
			range: [theme.tokenNameToValue('data.primary'), theme.tokenNameToValue('data.secondary')]
		},
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year', ticks: years, tickFormat: yearLabel }),
			Plot.axisY({ label: null }),
			Plot.line(trend, { x: 'year', y: 'value', z: 'river', stroke: 'river', tip: true }),
			// baseline last
			Plot.ruleY([0])
		]
	});

	// Reported pollution incidents by monitoring site (horizontal bar).
	const incidents = [
		{ site: 'Brentford', value: 14 },
		{ site: 'Putney', value: 11 },
		{ site: 'Greenwich', value: 9 },
		{ site: 'Richmond', value: 6 },
		{ site: 'Barking', value: 5 },
		{ site: 'Teddington', value: 3 }
	];

	let incidentsSpec = $derived({
		height: 260,
		marginLeft: 90,
		x: { insetLeft: 0, insetRight: 16 },
		y: { type: 'band' },
		marks: [
			Plot.gridX(),
			Plot.axisX({ label: 'Incidents' }),
			Plot.axisY({ label: null, textAnchor: 'end', lineAnchor: 'middle', dx: 0, dy: 0 }),
			Plot.barX(incidents, { x: 'value', y: 'site', insetTop: 5, insetBottom: 5, tip: true }),
			// baseline last
			Plot.ruleX([0])
		]
	});

	// --- Table --------------------------------------------------------------
	const sites = [
		{ site: 'Brentford', river: 'Thames', status: 'Poor', sampled: '2024-06-14' },
		{ site: 'Putney', river: 'Thames', status: 'Moderate', sampled: '2024-06-12' },
		{ site: 'Greenwich', river: 'Thames', status: 'Moderate', sampled: '2024-06-11' },
		{ site: 'Richmond', river: 'Thames', status: 'Good', sampled: '2024-06-09' },
		{ site: 'Barking', river: 'Roding', status: 'Poor', sampled: '2024-06-08' },
		{ site: 'Teddington', river: 'Thames', status: 'Good', sampled: '2024-06-05' }
	];

	const tableSpec = {
		showColSummaries: false,
		columns: [
			{ short_label: 'site', label: 'Site', cell: { renderer: 'TextCell' } },
			{ short_label: 'river', label: 'River', cell: { renderer: 'TextCell' } },
			{ short_label: 'status', label: 'Status', cell: { renderer: 'TextCell' } },
			{ short_label: 'sampled', label: 'Last sampled', cell: { renderer: 'TextCell' } }
		]
	};
</script>

<div class="flex min-h-dvh flex-col">
	<Header>
		<HeaderTitle>London's River Health</HeaderTitle>
		<HeaderRight>
			<HeaderItem>
				<NavigationMenu items={mainMenu} orientation="horizontal" ariaLabel="main menu" />
			</HeaderItem>
		</HeaderRight>
	</Header>

	<AppShell
		heightClass="grow"
		sidebarPush
		sidebarPlacement={{ initial: 'right' }}
		sidebarAlwaysOpen={{ initial: false, md: true }}
	>
		{#snippet main()}
			<div class="container-fluid flow-standard h-full bg-color-canvas-muted pb-6 pt-2">
				<Breadcrumbs {breadcrumbs} />

				<!-- Page head -->
				<h1 class="dashboard-main-title">London's river health</h1>
				<p class="dashboard-main-subtitle">
					Water quality monitoring across the capital's rivers, 2018–2024.
				</p>

				<!-- 1-up map -->
				<Card
					title="Monitoring locations"
					subtitle="Active water-quality sampling sites"
					hint="Sites are shown on the Greater London basemap."
				>
					<div class="h-96 w-full">
						<Map options={{ transformRequest: appendOSKeyToUrl(OS_KEY) }} />
					</div>
				</Card>

				<!-- Section head -->
				<h2 class="dashboard-section-title">Water quality trends</h2>
				<p class="dashboard-section-subtitle">
					Comparing long-term index scores and reported incidents.
				</p>

				<!-- 2-up charts -->
				<div class="gap-flow grid grid-cols-1 md:grid-cols-2">
					<Card title="Water quality index" subtitle="By river, 2018–2024">
						<div class="min-w-0">
							<ObservablePlotInner id="river-trend" spec={trendSpec} data={trend} />
						</div>
					</Card>
					<Card title="Pollution incidents" subtitle="By monitoring site, 2024">
						<div class="min-w-0">
							<ObservablePlotInner id="river-incidents" spec={incidentsSpec} data={incidents} />
						</div>
					</Card>
				</div>

				<!-- 1-up table -->
				<Card title="Monitoring sites" subtitle="Latest sampling status">
					<Table
						data={sites}
						{tableSpec}
						allowSorting
						dataDownloadButton={false}
						imageDownloadButton={false}
					/>
				</Card>
			</div>
		{/snippet}

		{#snippet sidebar()}
			<Sidebar>
				<!-- HEADER -->
				{#snippet header()}
					<SidebarHeader title="Filter rivers">
						{#snippet subTitle()}
							<p>Refine the monitoring data shown across the dashboard.</p>
						{/snippet}
					</SidebarHeader>
				{/snippet}

				<!-- SECTIONS -->
				{#snippet sections()}
					<Demo1 />
				{/snippet}

				<!-- FOOTER -->
				{#snippet footer()}
					<SidebarFooter>
						<div class="flex justify-between">
							<div class="w-[165px]"><LogoMayor /></div>
							<div class="w-[165px]"><LogoCIU /></div>
						</div>
						{#snippet menu()}
							<div class="flex justify-between">
								<ul class="flex space-x-2">
									<li>View Cookie settings</li>
									<li>Privacy Policy</li>
								</ul>

								<ThemeSwitcher size="xs" />
							</div>
						{/snippet}
					</SidebarFooter>
				{/snippet}
			</Sidebar>
		{/snippet}
	</AppShell>

	<Footer showCiuLogo>
		<div class="flex flex-col gap-1">
			<p class="label-md">London's river health</p>
			<p class="body-sm text-color-text-muted">
				An example layout from the London City Data design system.
			</p>
		</div>
	</Footer>
</div>
