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
	import { writable } from 'svelte/store';
	import Button from '../button/Button.svelte';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import SidebarHeader from '../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarHint from '../sidebar/elements/sidebarHint/SidebarHint.svelte';
	import SidebarSection from '../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from '../sidebar/elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';
	import SidebarTabLabel from '../sidebar/elements/sidebarTabs/SidebarTabLabel.svelte';
	import SidebarTabList from '../sidebar/elements/sidebarTabs/SidebarTabList.svelte';

	const isOpen = writable(true);

	let selectedValue = 'markers';
</script>

<Template let:args>
	<AppShell {...args} />
</Template>

<Story name="Default positioning">
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="External opening/closing of sidebar">
	<AppShell {isOpen}>
		<svelte:fragment slot="main">
			<Button on:click={() => ($isOpen = !$isOpen)}>Toggle sidebar</Button>
			Some Content
		</svelte:fragment>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
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
						<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
						Data Markers
					</SidebarTabLabel>
					<SidebarTabLabel tabId="filters">
						<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
						Filters
					</SidebarTabLabel>
					<SidebarTabLabel tabId="analysis">
						<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
						Analysis
					</SidebarTabLabel>
					<SidebarTabLabel tabId="layers">
						<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar Push: right">
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

<Story name="Sidebar Push: left">
	<AppShell sidebarPush sidebarPlacement={{ initial: 'left' }}>
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

<Story name="Sidebar Push: left with tabs">
	<AppShell sidebarPush sidebarPlacement={{ initial: 'left' }}>
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

		<svelte:fragment slot="main">
			<div class="pl-24 py-4">Some Content</div>
		</svelte:fragment>
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
				{#each sections as _section}
					<SidebarSection title="Section Title">
						Section Content
						<div>
							<SidebarGroupTitle>
								Group Title
								<SidebarHint slot="hint" hintType="tooltip">
									<p class="mb-4">Any content you want can go here</p>
									<p>
										Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
										nec venenatis sapien. Etiam venenatis felis.
									</p>
								</SidebarHint>
							</SidebarGroupTitle>
							Grouped content
						</div>
					</SidebarSection>
				{/each}
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Start Open (default)">
	<AppShell startOpen>
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

<Story name="Start Closed">
	<AppShell startOpen={false}>
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

<!--
The sidebar is always open if the window is wider than the `md` breakpoint size.
In the sidebar was closed when the browser window was small, then it will automatically open when
the screen width increases past this threshold.
 -->
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

<Story name="With custom height class">
	<AppShell sidebarPush heightClass="h-[200px]">
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
