<script lang="ts">
	import { ObservablePlotInner, Plot } from '@ldn-viz/charts';

	import AppShell from '../../appShell/AppShell.svelte';
	import Breadcrumbs from '../../breadcrumbs/Breadcrumbs.svelte';
	import Card from '../../card/Card.svelte';
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
	import { Demo1 } from './demoTabs';

	let mainMenu = [
		{ title: 'Design System', id: 'design-system-docs', href: '/design-system' },
		{ title: 'Contact', id: 'contact', href: '/' }
	];

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Dashboards', href: '/' },
		{ label: 'Simple dashboard', href: '/' }
	];

	// Demo data — a single yearly series (2015–2024).
	const yearly = [
		{ year: 2015, value: 42 },
		{ year: 2016, value: 39 },
		{ year: 2017, value: 41 },
		{ year: 2018, value: 35 },
		{ year: 2019, value: 33 },
		{ year: 2020, value: 28 },
		{ year: 2021, value: 31 },
		{ year: 2022, value: 26 },
		{ year: 2023, value: 22 },
		{ year: 2024, value: 20 }
	];

	const years = yearly.map((d) => d.year);
	const yearLabel = (d: number) => `${d}`;

	// 1-up: line chart
	// $derived re-reads the mark defaults, which hold theme colours, when the
	// theme changes.
	let lineSpec = $derived({
		height: 240,
		marginLeft: 48,
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year', ticks: years, tickFormat: yearLabel }),
			Plot.axisY({ label: null }),
			Plot.line(yearly, { x: 'year', y: 'value', tip: true }),
			// baseline last
			Plot.ruleY([0])
		]
	});

	// 2-up left: bar chart
	let barSpec = $derived({
		height: 240,
		marginLeft: 48,
		x: { type: 'band' },
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year', tickFormat: yearLabel }),
			Plot.axisY({ label: null }),
			Plot.barY(yearly, { x: 'year', y: 'value', tip: true }),
			// baseline last
			Plot.ruleY([0])
		]
	});

	// 2-up right: area chart
	let areaSpec = $derived({
		height: 240,
		marginLeft: 48,
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year', ticks: years, tickFormat: yearLabel }),
			Plot.axisY({ label: null }),
			Plot.areaY(yearly, { x: 'year', y: 'value', fillOpacity: 0.15 }),
			Plot.line(yearly, { x: 'year', y: 'value', tip: true }),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<Header>
	<HeaderTitle>Simple Header</HeaderTitle>
	<HeaderRight>
		<HeaderItem>
			<NavigationMenu items={mainMenu} orientation="horizontal" ariaLabel="main menu" />
		</HeaderItem>
	</HeaderRight>
</Header>
<AppShell>
	{#snippet main()}
		<div class="container-fluid flow-standard h-full bg-color-canvas-muted pb-6 pt-2">
			<Breadcrumbs {breadcrumbs} />

			<!-- Page head -->
			<h1 class="dashboard-main-title">Simple dashboard</h1>
			<p class="dashboard-main-subtitle">
				An example layout assembled from the design-system pieces: a breadcrumb, a page head, a
				one-up card and a two-up card row.
			</p>

			<!-- 1-up -->
			<Card
				title="Yearly average, Variable A"
				subtitle="London yearly average estimated value, 2015–2024"
				hint="A single full-width card spanning the whole grid."
			>
				<div class="min-w-0">
					<ObservablePlotInner id="simple-dashboard-line" spec={lineSpec} data={yearly} />
				</div>
			</Card>

			<!-- 2-up -->
			<div class="gap-flow grid grid-cols-1 md:grid-cols-2">
				<Card title="Variable A by year" subtitle="Annual totals">
					<div class="min-w-0">
						<ObservablePlotInner id="simple-dashboard-bar" spec={barSpec} data={yearly} />
					</div>
				</Card>
				<Card title="Variable A over time" subtitle="Cumulative view">
					<div class="min-w-0">
						<ObservablePlotInner id="simple-dashboard-area" spec={areaSpec} data={yearly} />
					</div>
				</Card>
			</div>
		</div>
	{/snippet}

	{#snippet sidebar()}
		<Sidebar>
			<!-- HEADER -->
			{#snippet header()}
				<SidebarHeader title="Main sidebar title">
					{#snippet subTitle()}
						<p>Maecenas ut libero vel nibh maximus feugiat non sed tortor.</p>
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
