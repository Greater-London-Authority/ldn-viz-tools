<script context="module">
	import AppShell from './AppShell.svelte';

	export const meta = {
		title: 'App/AppShell',
		component: AppShell,
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script lang="ts">
	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Sidebar from '../sidebar/Sidebar.svelte';
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

<Story name="default">
	<AppShell>
		<svelte:fragment slot="main">Some Content</svelte:fragment>
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
				{@const sections = [1, 2]}
				{#each sections as section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Placement Right">
	<AppShell sidebarPlacement={{ initial: 'right' }}>
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
				{@const sections = [1, 2]}
				{#each sections as section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Placement Left">
	<AppShell sidebarPlacement={{ initial: 'left' }}>
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
				{@const sections = [1, 2]}
				{#each sections as section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Placement Bottom">
	<AppShell sidebarPlacement={{ initial: 'bottom' }}>
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
				{@const sections = [1, 2]}
				{#each sections as section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Placement Top">
	<AppShell sidebarPlacement={{ initial: 'top' }}>
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
				{@const sections = [1, 2, 3, 4, 5]}
				{#each sections as section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Placement Breakpoints Top/bottom/left/right">
	<AppShell sidebarPlacement={{ xl: 'right', initial: 'top', lg: 'left', md: 'bottom' }}>
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
				{@const sections = [1, 2, 3, 4, 5]}
				{#each sections as section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Placement Breakpoints with tabs Top/bottom/left/right">
	<AppShell sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}>
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
				{@const sections = [1, 2, 3, 4, 5]}
				{#each sections as section, i}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Wide Sidebar">
	<AppShell>
		<Sidebar slot="sidebar" width="wide">
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
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Push">
	<AppShell sidebarPush>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Wide Sidebar Push">
	<AppShell sidebarPush>
		<Sidebar slot="sidebar" width="wide">
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Push Position Breakpoints Top/bottom/left/right">
	<AppShell
		sidebarPush
		sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}
	>
		<!-- <svelte:fragment slot="main">
			<div class="pl-10">Some Content</div>
		</svelte:fragment> -->
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
				{@const sections = [1, 2, 3, 4, 5, 6]}
				{#each sections as section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle hintType="modal" hintLabel="why">
								Pay Attention to this group
								<svelte:fragment slot="hint">Because it's Awesome!</svelte:fragment>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Always Open">
	<AppShell sidebarAlwaysOpen={{ initial: 'true' }}>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Always Open Responsive changes">
	<AppShell sidebarAlwaysOpen={{ initial: 'false', md: 'true' }}>
		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title" slot="header">
				<svelte:fragment slot="subTitle">
					<p>
						Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
						venenatis sapien. Etiam venenatis felis.
					</p>
				</svelte:fragment>
			</SidebarHeader>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Always Open With Tabs">
	<AppShell sidebarAlwaysOpen={{ initial: 'true' }}>
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
		</Sidebar>
	</AppShell>
</Story>
