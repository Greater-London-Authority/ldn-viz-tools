<script context="module">
	import LogoCIU from '../logos/LogoCIU.svelte';
	import LogoMayor from '../logos/LogoMayor.svelte';
	import Sidebar from './Sidebar.svelte';
	import SidebarFooter from './elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from './elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarSection from './elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from './elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';

	import TabLabel from '../tabs/TabLabel.svelte';
	import TabList from '../tabs/TabList.svelte';

	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let selectedValue = 'aggregates';

	export const meta = {
		title: 'Ui/Sidebar',
		component: Sidebar
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Sidebar {...args} />
</Template>

<Story name="Default" source>
	<Sidebar>
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
</Story>

<Story name="Wide" source>
	<Sidebar width="wide">
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
</Story>

<Story name="Tabbed Sidebar" source>
	<Sidebar>
		<svelte:fragment slot="tabs">
			<TabList bind:selectedValue orientation="vertical">
				<TabLabel tabId="markers">
					<Icon src={MapPin} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
					Data Markers
				</TabLabel>
				<TabLabel tabId="filters">
					<Icon src={Funnel} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
					Filters
				</TabLabel>
				<TabLabel tabId="analysis">
					<Icon src={ChartBar} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
					Analysis
				</TabLabel>
				<TabLabel tabId="layers">
					<Icon src={Map} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
					Layers
				</TabLabel>
			</TabList>
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
</Story>
