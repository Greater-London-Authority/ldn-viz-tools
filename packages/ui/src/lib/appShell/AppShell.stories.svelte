<script context="module">
	import AppShell from './AppShell.svelte';

	export const meta = {
		title: 'App/AppShell',
		component: AppShell
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Sidebar from '../sidebar/Sidebar.svelte';

	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import LogoCIU from '../logos/LogoCIU.svelte';
	import LogoMayor from '../logos/LogoMayor.svelte';
	import SidebarFooter from '../sidebar/elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from '../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarSection from '../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from '../sidebar/elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';
	import SidebarTabLabel from '../sidebar/elements/sidebarTabs/SidebarTabLabel.svelte';
	import SidebarTabList from '../sidebar/elements/sidebarTabs/SidebarTabList.svelte';

	let selectedValue = 'markers';
</script>

<Template let:args>
	<AppShell {...args} />
</Template>

<Story name="Default">
	<AppShell>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
			<svelte:fragment slot="sections">
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			</svelte:fragment>
			<SidebarFooter slot="footer">
				<SidebarFooter>
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
			</SidebarFooter>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar on left">
	<AppShell sidebar={{ inFrom: 'left' }}>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
			<svelte:fragment slot="sections">
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			</svelte:fragment>
			<SidebarFooter slot="footer">
				<SidebarFooter>
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
			</SidebarFooter>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Push">
	<AppShell sidebar={{ inFrom: 'left', push: true }}>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
			<svelte:fragment slot="sections">
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			</svelte:fragment>
			<SidebarFooter slot="footer">
				<SidebarFooter>
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
			</SidebarFooter>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar with Tabs">
	<AppShell>
		<Sidebar slot="sidebar">
			<svelte:fragment slot="tabs">
				<SidebarTabList bind:selectedValue>
					<SidebarTabLabel tabId="markers">
						<Icon src={MapPin} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Data Markers
					</SidebarTabLabel>
					<SidebarTabLabel tabId="filters">
						<Icon src={Funnel} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Filters
					</SidebarTabLabel>
					<SidebarTabLabel tabId="analysis">
						<Icon src={ChartBar} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Analysis
					</SidebarTabLabel>
					<SidebarTabLabel tabId="layers">
						<Icon src={Map} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Layers
					</SidebarTabLabel>
				</SidebarTabList>
			</svelte:fragment>
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
			<svelte:fragment slot="sections">
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			</svelte:fragment>
			<SidebarFooter slot="footer">
				<SidebarFooter>
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
			</SidebarFooter>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar on left with Tabs">
	<AppShell sidebar={{ inFrom: 'left' }}>
		<Sidebar slot="sidebar">
			<svelte:fragment slot="tabs">
				<SidebarTabList bind:selectedValue>
					<SidebarTabLabel tabId="markers">
						<Icon src={MapPin} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Data Markers
					</SidebarTabLabel>
					<SidebarTabLabel tabId="filters">
						<Icon src={Funnel} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Filters
					</SidebarTabLabel>
					<SidebarTabLabel tabId="analysis">
						<Icon src={ChartBar} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Analysis
					</SidebarTabLabel>
					<SidebarTabLabel tabId="layers">
						<Icon src={Map} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
						Layers
					</SidebarTabLabel>
				</SidebarTabList>
			</svelte:fragment>

			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
			<svelte:fragment slot="sections">
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle hintType="modal" hintLabel="why">
							Pay Attention to this group
							<svelte:fragment slot="hint">Beacuse it's Awesome!</svelte:fragment>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			</svelte:fragment>
			<SidebarFooter slot="footer">
				<SidebarFooter>
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
			</SidebarFooter>
		</Sidebar>
	</AppShell>
</Story>
