<script lang="ts">
	import { ArrowDownTray, ChartBar, Funnel, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { writable } from 'svelte/store';
	import AppShell from '../../appShell/AppShell.svelte';
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
	import SidebarTabLabel from '../../sidebar/elements/sidebarTabs/SidebarTabLabel.svelte';
	import SidebarTabList from '../../sidebar/elements/sidebarTabs/SidebarTabList.svelte';
	import Theme from '../../theme/Theme.svelte';
	import ThemeSwitcher from '../../theme/ThemeSwitcher.svelte';
	import { currentTheme } from '../../theme/themeStore';

	const selectedSewerLayer = writable(['sewer-combined']);
	const selectedSewerOverflowLayer = writable(['sewer_overflows_48hrs_yes']);
	$: selectedTab = 'sewers';

	// Color the checkboxes based on theme
	$: theme = $currentTheme;

	$: sewerGroup = [
		{
			id: 'sewer-combined',
			label: 'Combined Sewer',
			color: theme.color.data.categorical.orange
		},
		{
			id: 'sewer-separate',
			label: 'Separate Sewer',
			color: theme.color.data.secondary
		}
	];

	$: sewerOverflowGroup = [
		{
			id: 'sewer_overflows_48hrs_yes',
			label: 'Yes (In past 48 hours)',
			color: theme.color.data.categorical.red
		},
		{
			id: 'sewer_overflows_48hrs_no',
			label: 'No (In past 48 hours)',
			color: theme.color.data.categorical.green
		},
		{
			id: 'sewer_overflows_offline',
			label: 'Offline',
			color: theme.color.data.categorical.grey
		}
	];
</script>

<Theme />
<AppShell
	sidebarPlacement={{ initial: 'right' }}
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
		<SidebarHeader title="London's River Health" slot="header">
			<svelte:fragment slot="subTitle">
				<p>How healthy is your local river?</p>
			</svelte:fragment>
			<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">This is a modal.</Overlay>
		</SidebarHeader>

		<!-- TABS -->
		<svelte:fragment slot="tabs">
			<SidebarTabList bind:selectedValue={selectedTab}>
				<SidebarTabLabel tabId="sewers">
					<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-2" aria-hidden="true" />
					Sewers
				</SidebarTabLabel>
				<SidebarTabLabel tabId="monitoring">
					<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-2" aria-hidden="true" />
					Monitoring
				</SidebarTabLabel>
				<SidebarTabLabel tabId="swimming">
					<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-2" aria-hidden="true" />
					Swimming
				</SidebarTabLabel>
				<SidebarTabLabel tabId="context">
					<Icon src={ArrowDownTray} theme="mini" class="h-5 w-5 mb-2" aria-hidden="true" />
					Context
				</SidebarTabLabel>
			</SidebarTabList>
		</svelte:fragment>

		<!-- SECTIONS -->
		<svelte:fragment slot="sections">
			<SidebarSection title="This is the sewer section title">
				Some further instructions
				<SidebarGroup>
					<SidebarGroupTitle>
						Sewer Type group title
						<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">
							This is a modal.
						</Overlay>
					</SidebarGroupTitle>

					<CheckboxGroup options={sewerGroup} bind:selectedOptions={$selectedSewerLayer} />
				</SidebarGroup>
			</SidebarSection>
			<SidebarSection>
				<SidebarGroup>
					<SidebarGroupTitle>
						Sewer Overflows
						<Overlay slot="hint" overlayType="modal" modalTitle="Modal Title">
							This is a modal.
						</Overlay>
					</SidebarGroupTitle>
					<CheckboxGroup
						options={sewerOverflowGroup}
						bind:selectedOptions={$selectedSewerOverflowLayer}
					/>
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
