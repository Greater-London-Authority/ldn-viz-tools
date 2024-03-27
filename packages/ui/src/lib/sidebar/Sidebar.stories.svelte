<script context="module">
	import Sidebar from './Sidebar.svelte';
	import { RelativeWrapper } from '@ldn-viz/docs';

	export const meta = {
		title: 'Ui/Sidebar',
		component: Sidebar,
		decorators: [() => RelativeWrapper],
		parameters: {
			layout: 'fullscreen'
		},
		argTypes: {
			width: {
				options: ['standard', 'wide'],
				control: { type: 'radio' }
			},
			position: {
				options: ['absolute', 'fixed'],
				control: { type: 'radio' }
			},
			placement: {
				options: ['right', 'left', 'bottom', 'top'],
				control: { type: 'select' }
			}
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import LogoCIU from '../logos/LogoCIU.svelte';
	import LogoMayor from '../logos/LogoMayor.svelte';
	import SidebarFooter from './elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from './elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarSection from './elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from './elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';

	import SidebarTabLabel from './elements/sidebarTabs/SidebarTabLabel.svelte';
	import SidebarTabList from './elements/sidebarTabs/SidebarTabList.svelte';

	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let selectedValue = 'markers';

	// In order for the sidebar to open/ close a writable boolean store must be provided to context.
	// NB. This is provided by AppShell when using
	const isOpen = writable(true);
	setContext('sidebarIsOpen', isOpen);
</script>

<Template let:args>
	<Sidebar {...args} />
</Template>

<Story
	name="Default"
	source
	parameters={{
		options: {
			showPanel: true
		}
	}}
>
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
			{@const sections = [1, 2]}
			{#each sections as section}
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
			{/each}
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
			{@const sections = [1, 2]}
			{#each sections as section}
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
			{/each}
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

<Story name="With long content" source>
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
			{@const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
			{#each sections as section}
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
			{/each}
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

<Story name="With Tabs" source>
	<Sidebar>
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
			{#if selectedValue === 'markers'}
				<div class="text-white">
					Markers is selected, so we'd render a
					<code> &lt;Marker /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'filters'}
				<div class="text-white">
					Filter is selected, so we'd render a
					<code> &lt;Filters /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'analysis'}
				<div class="text-white">
					Analysis is selected, so we'd render a
					<code> &lt;Analysis /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'layers'}
				<div class="text-white">
					Layers is selected, so we'd render a
					<code> &lt;Layer /&gt;</code>
					component
				</div>
			{/if}
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

<Story name="Left Placement" source>
	<Sidebar placement="left">
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>
		<svelte:fragment slot="sections">
			{@const sections = [1, 2]}
			{#each sections as section}
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
			{/each}
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

<Story name="Right Placement" source>
	<Sidebar placement="right">
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>
		<svelte:fragment slot="sections">
			{@const sections = [1, 2]}
			{#each sections as section}
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
			{/each}
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

<Story name="Top Placement" source>
	<Sidebar placement="top">
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>
		<svelte:fragment slot="sections">
			{@const sections = [1, 2]}
			{#each sections as section}
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
			{/each}
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

<Story name="Bottom Placement" source>
	<Sidebar placement="bottom">
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>
		<svelte:fragment slot="sections">
			{@const sections = [1, 2, 3, 4, 5, 6, 7, 8]}
			{#each sections as section}
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
			{/each}
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

<Story name="Position Fixed" source>
	<Sidebar position="fixed">
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>
		<svelte:fragment slot="sections">
			{@const sections = [1, 2]}
			{#each sections as section}
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
			{/each}
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
