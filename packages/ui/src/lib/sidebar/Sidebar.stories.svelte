<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Button from '../button/Button.svelte';
	import Sidebar from './Sidebar.svelte';
	import AppShell from './AppShell.svelte';

	import { ChartBar, Funnel, Map as MapIcon, MapPin } from '@steeze-ui/heroicons';
	import SidebarDivider from '../sidebarElements/SidebarDivider.svelte';
	import SidebarGroup from '../sidebarElements/SidebarGroup.svelte';
	import SidebarHeader from '../sidebarElements/SidebarHeader.svelte';
	import SidebarSection from '../sidebarElements/SidebarSection.svelte';
	import SidebarTabsWrapper from '../sidebarTabs/SidebarTabsWrapper.svelte';
	import ExampleOverview from './ExampleOverview.svelte';
	import exampleCode from './ExampleOverview.svelte?raw';

	let isOpen;
	const toggleSidebar = () => isOpen.update((v) => !v);

	let selectedTab: string;
	let tabs = [
		{ id: 'markers', label: 'Data Markers', icon: MapPin },
		{ id: 'filters', label: 'Filters', icon: Funnel },
		{ id: 'analysis', label: 'Analysis', icon: ChartBar },
		{ id: 'layers', label: 'Layers', icon: MapIcon }
	];
</script>

<Meta
	title="Ui/Sidebar"
	component={Sidebar}
	parameters={{
		layout: 'full'
	}}
/>

<Story name="Default">
	<AppShell>
		<Sidebar slot="sidebar" />
	</AppShell>
</Story>

<Story name="Getting Started">
	<ExampleOverview>
		<p class="mb-2 font-bold">This is the code for this story:</p>
		<pre><code>{exampleCode}</code></pre>
	</ExampleOverview>
</Story>

<Story name="Custom Sizing">
	<AppShell sidebarWidth="500px" sidebarHeight="400px">
		<div slot="content" class="p-6 text-white space-y-2">
			<p>Custom sidebar width for desktop and height for mobile:</p>
			<pre><code
					>{[`<AppShell`, `\tsidebarWidth="500px" `, `\tsidebarHeight="400px"`].join('\n')}</code
				></pre>
		</div>
		<Sidebar slot="sidebar" />
	</AppShell>
</Story>

<Story name="Open State Store">
	<AppShell startOpen bind:isOpen>
		<div slot="content" class="p-6 text-white space-y-2">
			<p>
				You can bind on the <i><code>open</code></i> prop to access the writable Svelte store managing
				the sidebar's open/closed state.
			</p>

			<p>
				<Button type="secondary" variant="outline" on:click={toggleSidebar}>
					Is open:&nbsp;<span class="text-core-red-300" class:text-core-green-400={$isOpen}
						>{$isOpen}</span
					>
				</Button>
			</p>

			<pre><code>{`<AppShell startOpen bind:isOpen />`}</code></pre>
		</div>
		<Sidebar slot="sidebar" />
	</AppShell>
</Story>

<Story name="Sidebar Context">
	<AppShell>
		<div slot="content" class="p-6 text-white space-y-2">
			<p>
				Every Svelte component inside the <code>AppShell</code> or one of it's children can access two
				context objects:
			</p>

			<pre><code
					>{[
						`\timport { getContext } from 'svelte'`,
						`\tgetContext('sidebarIsOpen')`,
						`\tgetContext('AppShell')`
					].join('\n')}</code
				></pre>

			<p>
				The first returns the writable open store presented in the previous story. The latter
				returns a derived store holding the sidebar container's layout configuration. It's required
				to layout the <code>Sidebar</code> component.
			</p>

			<p>
				You can query it if the content layout is dependent on the viewing mode (horizontal or
				vertical) and access the containers diemensions. For example:
			</p>

			<pre><code
					>{[
						`\tconst container = getContext('appShell')`,
						`\tconst isDesktop = $container.isAlignedRight()`
					].join('\n')}</code
				></pre>
		</div>
		<Sidebar slot="sidebar" />
	</AppShell>
</Story>

<Story name="Sidebar with tabs">
	<AppShell>
		<div slot="content" class="p-6 text-white space-y-2">
			<span>This is the main content of the page.</span>
		</div>

		<Sidebar slot="sidebar">
			<svelte:fragment slot="unpadded-content">
				<SidebarTabsWrapper {tabs} bind:selectedValue={selectedTab}>
					Selected tab: {selectedTab}

					{#if selectedTab === 'markers'}
						<div class="text-white">
							Markers is selected, so we'd render a
							<code> &lt;Marker /&gt;</code>
							component
						</div>
					{:else if selectedTab === 'filters'}
						<div class="text-white">
							Filter is selected, so we'd render a
							<code> &lt;Filters /&gt;</code>
							component
						</div>
					{:else if selectedTab === 'analysis'}
						<div class="text-white">
							Analysis is selected, so we'd render a
							<code> &lt;Analysis /&gt;</code>
							component
						</div>
					{:else if selectedTab === 'layers'}
						<div class="text-white">
							Layers is selected, so we'd render a
							<code> &lt;Layer /&gt;</code>
							component
						</div>
					{/if}
				</SidebarTabsWrapper>
			</svelte:fragment>
		</Sidebar>
	</AppShell>
</Story>

<Story name="Sidebar with structured content">
	<AppShell>
		<div slot="content" class="p-6 text-white space-y-2">
			<span>This is the main content of the page.</span>
		</div>

		<Sidebar slot="sidebar">
			<SidebarHeader title="Main sidebar title">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</span>
			</SidebarHeader>

			<SidebarSection title="Sidebar section 1">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the first section.</span>

				<SidebarGroup title="Sidebar group 1">
					<span slot="info">
						This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
						clicks on 'more info'.
					</span>

					<span>Here is some content inside the first group.</span>
				</SidebarGroup>

				<SidebarGroup title="Sidebar group 2">
					<span slot="info">
						This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
						clicks on 'more info'.
					</span>

					<span>Here is some content inside the second group.</span>
				</SidebarGroup>
			</SidebarSection>

			<SidebarDivider />

			<SidebarSection title="Sidebar section 2">
				<span slot="info">
					This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
					clicks on 'more info'.
				</span>

				<span>Here is some content inside the second section.</span>

				<SidebarGroup title="Sidebar group 3">
					<span slot="info">
						This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
						clicks on 'more info'.
					</span>

					<span>Here is some content inside the first group.</span>
				</SidebarGroup>

				<SidebarGroup title="Sidebar group 4">
					<span slot="info">
						This is some (hopefully <i>helpful</i>) explanatory text that will appear when the user
						clicks on 'more info'.
					</span>

					<span>Here is some content inside the second group.</span>
				</SidebarGroup>
			</SidebarSection>
		</Sidebar>
	</AppShell>
</Story>
