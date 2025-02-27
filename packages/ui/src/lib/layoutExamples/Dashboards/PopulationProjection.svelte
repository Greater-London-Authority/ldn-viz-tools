<script lang="ts">
	import { ArrowDownTray, ChartBar, Funnel, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { writable } from 'svelte/store';
	import AppShell from '../../appShell/AppShell.svelte';
	import InputWrapper from '../../input/InputWrapper.svelte';
	import LogoCIU from '../../logos/LogoCIU.svelte';
	import LogoMayor from '../../logos/LogoMayor.svelte';
	import Overlay from '../../overlay/Overlay.svelte';
	import RadioButtonGroupSolid from '../../radioButtonSolid/RadioButtonGroupSolid.svelte';
	import Select from '../../select/Select.svelte';
	import Sidebar from '../../sidebar/Sidebar.svelte';
	import SidebarFooter from '../../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarGroup from '../../sidebar/elements/sidebarSection/SidebarGroup.svelte';
	import SidebarSection from '../../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from '../../sidebar/elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';
	import SidebarTabLabel from '../../sidebar/elements/sidebarTabs/SidebarTabLabel.svelte';
	import SidebarTabList from '../../sidebar/elements/sidebarTabs/SidebarTabList.svelte';

	/* Projection Component Items */
	type Item = { label: string; value: number };
	const componentItems: Item[] = [
		{ label: 'Population', value: 1 },
		{ label: 'Births', value: 2 },
		{ label: 'Deaths', value: 3 },
		{ label: 'Net Flow', value: 4 }
	];

	/* Projection Component Items */
	const projectionItems: Item[] = [
		{ label: '5 Year (2022 - based)', value: 1 },
		{ label: '10 Year (2022 - based)', value: 2 },
		{ label: '15 Year (2022 - based)', value: 3 }
	];

	/* Borough Items */
	const boroughItems: Item[] = [
		{ label: 'All London', value: 1 },
		{ label: 'Borough 1', value: 2 },
		{ label: 'Borough 2', value: 3 }
	];

	/* Ward Items */
	const wardItems: Item[] = [
		{ label: 'Ward 0', value: 1 },
		{ label: 'Ward 1', value: 2 },
		{ label: 'Ward 2', value: 3 }
	];

	$: selectedYear = writable(2024);
	$: selectedTab = 'projection';
</script>

<AppShell
	sidebarPlacement={{ initial: 'left' }}
	sidebarAlwaysOpen={{ initial: 'false', md: 'true' }}
>
	<svelte:fragment slot="main">
		<div class="bg-color-canvas-background-1 h-full p-6 pl-24">
			<div class="mb-4">
				<h1 class="text-2xl text-color-text-primary font-bold">This is the main content area</h1>
				<h2 class="text-xl text-color-text-secondary">
					Maecenas ut libero vel nibh maximus feugiat non sed tortor.
				</h2>
			</div>
		</div>
	</svelte:fragment>
	<Sidebar slot="sidebar">
		<!-- HEADER -->
		<SidebarHeader title="London's Population" slot="header">
			<svelte:fragment slot="subTitle">
				<p>London's 2022-based housing-led population projections, produced by GLA demography.</p>
			</svelte:fragment>
			<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
		</SidebarHeader>

		<!-- TABS -->
		<svelte:fragment slot="tabs">
			<SidebarTabList bind:selectedValue={selectedTab}>
				<SidebarTabLabel tabId="projection">
					<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-2" aria-hidden="true" />
					Projections
				</SidebarTabLabel>
				<SidebarTabLabel tabId="filters">
					<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-2" aria-hidden="true" />
					Filters
				</SidebarTabLabel>
				<SidebarTabLabel tabId="download">
					<Icon src={ArrowDownTray} theme="mini" class="h-5 w-5 mb-2" aria-hidden="true" />
					Downloads
				</SidebarTabLabel>
			</SidebarTabList>
		</svelte:fragment>

		<!-- SECTIONS -->
		<svelte:fragment slot="sections">
			<SidebarSection>
				<SidebarGroup title="Projections">
					Some text here what does this look like
					<Select items={componentItems} label="Component" id="example-input-1" />
					<Select items={projectionItems} label="Projection" id="example-input-2" />
				</SidebarGroup>
				<SidebarGroup title="Projection Area">
					<Select items={boroughItems} label="Borough" id="example-input-1" />
					<Select items={wardItems} label="Ward" id="example-input-2" disabled />
				</SidebarGroup>

				<SidebarGroup title="Year">
					<InputWrapper label={`${$selectedYear}`} id="yearSlider">
						<input
							type="range"
							id="yearSlider"
							name="Year"
							min="2011"
							max="2050"
							style="width: 100%;"
							class="form-range"
							bind:value={$selectedYear}
						/>
					</InputWrapper>
				</SidebarGroup>
			</SidebarSection>
		</svelte:fragment>

		<!-- FOOTER -->
		<SidebarFooter slot="footer">
			<div class="flex justify-between">
				<div class="w-[165px]"><LogoMayor /></div>
				<div class="w-[165px]"><LogoCIU /></div>
			</div>
			<svelte:fragment slot="menu">
				<ul class="flex space-x-2">
					<li>View Cookie settings</li>
					<li>Privacy Policy</li>
				</ul>
			</svelte:fragment>
		</SidebarFooter>
	</Sidebar>
</AppShell>
