<script lang="ts">
	import { ArrowDownTray, ChartBar, Funnel, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { writable } from 'svelte/store';
	import AppShell from '../../appShell/AppShell.svelte';
	import Button from '../../button/Button.svelte';
	import CheckboxGroup from '../../checkBox/CheckboxGroup.svelte';
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
	import SidebarSectionTitle from '../../sidebar/elements/sidebarSection/sidebarSectionTitle/SidebarSectionTitle.svelte';
	import SidebarTabLabel from '../../sidebar/elements/sidebarTabs/SidebarTabLabel.svelte';
	import SidebarTabList from '../../sidebar/elements/sidebarTabs/SidebarTabList.svelte';
	import Theme from '../../theme/Theme.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';
	import { currentTheme } from '../../theme/themeStore';

	type Item = { label: string; value: number };

	/* Borough Items */
	const boroughItems: Item[] = [
		{ label: 'All London', value: 1 },
		{ label: 'Borough 1', value: 2 },
		{ label: 'Borough 2', value: 3 }
	];

	/* Sector Items */
	const sectorItems: Item[] = [
		{ label: 'All Sectors', value: 1 },
		{ label: 'Sector 1', value: 2 },
		{ label: 'Sector 2', value: 3 }
	];

	$: selectedYear = writable(2022);
</script>

<Theme />
<AppShell
	sidebarPlacement={{ initial: 'left' }}
	sidebarAlwaysOpen={{ initial: 'false', md: 'true' }}
>
	<svelte:fragment slot="main">
		<div class="bg-color-canvas-background-1 h-full p-6 pr-24">
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
		<SidebarHeader title="LEGGI Data Explorer" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					The London Energy and Greenhouse Gas Inventory (LEGGI) monitors the energy used and
					greenhouse gas emissions produced in London every year.
				</p>
			</svelte:fragment>
			<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
		</SidebarHeader>

		<!-- SECTIONS -->
		<svelte:fragment slot="sections">
			<SidebarSection>
				<SidebarSectionTitle>
					Controls
					<svelte:fragment slot="subTitle">
						Use the selections below to explore and filter the data
					</svelte:fragment>
				</SidebarSectionTitle>

				<SidebarGroup>
					<Select items={boroughItems} label="Borough" id="example-input-1" />
					<Select items={sectorItems} label="Sector" id="example-input-2" />
					<InputWrapper label={`Year: ${$selectedYear}`} id="yearSlider">
						<input
							type="range"
							id="yearSlider"
							name="Year"
							min="2005"
							max="2022"
							style="width: 100%;"
							class="form-range"
							bind:value={$selectedYear}
						/>
					</InputWrapper>
				</SidebarGroup>
			</SidebarSection>
			<SidebarSection title="Download Data">
				<span class="text-xs">
					For access to the full LEGGI dataset, and more about our methodology, click below to visit
					the London Datastore.
				</span>
				<SidebarGroup>
					<Button class="w-full">Download Leggi Data</Button>
				</SidebarGroup>
			</SidebarSection>
			<SidebarSection title="Definitions">
				<span class="text-xs">
					For more details on the definitions and terms used in this tool.
				</span>
				<SidebarGroup>
					<Button emphasis="secondary" class="w-full">View definitions</Button>
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
				<div class="flex justify-between">
					<ul class="flex space-x-2">
						<li>View Cookie settings</li>
						<li>Privacy Policy</li>
					</ul>

					<ThemeSwitcher size="xs" />
				</div>
			</svelte:fragment>
		</SidebarFooter>
	</Sidebar>
</AppShell>
