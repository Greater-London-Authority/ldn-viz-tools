<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Footer from '../footer/Footer.svelte';
	import Header from '../header/Header.svelte';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import AppShell from './AppShell.svelte';
	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { First, Fourth, Second, Third } from '../sidebar/elements/sidebarTabs/demoSections';
	import DemoSidebarOpener from './DemoSidebarOpener.svelte';

	let tabs = [
		{ id: 'markers', label: 'Markers', icon: ChartBar, content: First },
		{ id: 'filters', label: 'Filters', icon: Funnel, content: Second },
		{ id: 'analysis', label: 'Analysis', icon: Map, content: Third },
		{ id: 'layers', label: 'Layers', icon: MapPin, content: Fourth }
	];

	/**
	 * The `<AppShell>` is responsible for positioning and orchestrating page content.
	 * It currently mainly coordinate the [Sidebar](./?path=/docs/ui-components-layout-and-themes-sidebar--documentation) and the other page content.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/AppShell',
		component: AppShell,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen'
		},
		args: {
			sidebar
		}
	});

	let state = $state({ isOpen: true });
	let selectedTabId = $state('markers');
</script>

{#snippet sidebar()}
	<Sidebar />
{/snippet}

{#snippet boundSidebar()}
	<!-- So bound state doesn't effect other stories -->
	<Sidebar bind:state />
{/snippet}

{#snippet sidebarSlim()}
	<Sidebar width="slim" />
{/snippet}

{#snippet sidebarWide()}
	<Sidebar width="wide" />
{/snippet}

{#snippet sidebarWithTabs()}
	<Sidebar {tabs} {selectedTabId} />
{/snippet}

{#snippet mainWithControl()}
	<DemoSidebarOpener />
{/snippet}

{#snippet longContent()}
	<div class="typeset-product flow-standard p-4">
		<h1 class="headline-sm">A long page</h1>
		{#each Array.from({ length: 30 }, (_, i) => i + 1) as n (n)}
			<p>Paragraph {n} of the page content.</p>
		{/each}
	</div>
{/snippet}

{#snippet mainContent()}
	<div class="p-4">
		<h1 class="headline-sm">Main content</h1>
		<p>
			This story passes a real <code>main</code> snippet, so the <code>{`{@render main()}`}</code>
			branch is exercised instead of the placeholder text.
		</p>
	</div>
{/snippet}

<Story name="default">
	{#snippet template(args)}
		<AppShell {...args}></AppShell>
	{/snippet}
</Story>

<Story name="Component outside context opening/closing of sidebar">
	{#snippet template(args)}
		<div class="w-96">
			<Button onclick={() => (state.isOpen = !state.isOpen)}>Click</Button>
		</div>
		<AppShell {...args} sidebar={boundSidebar}></AppShell>
	{/snippet}
</Story>

<Story name="Component within context opening/closing of sidebar">
	{#snippet template(args)}
		<AppShell {...args} main={mainWithControl}></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Placement Right">
	{#snippet template(args)}
		<AppShell {...args} sidebarPlacement={{ initial: 'right' }}></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Placement Left">
	{#snippet template(args)}
		<AppShell {...args} sidebarPlacement={{ initial: 'left' }}></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Placement Bottom">
	{#snippet template(args)}
		<AppShell {...args} sidebarPlacement={{ initial: 'bottom' }}></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Placement Top">
	{#snippet template(args)}
		<AppShell {...args} sidebarPlacement={{ initial: 'top' }}></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Placement Breakpoints Top/bottom/left/right">
	{#snippet template(args)}
		<AppShell {...args} sidebarPlacement={{ xl: 'right', initial: 'top', lg: 'left', md: 'bottom' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Placement Breakpoints with tabs Top/bottom/left/right">
	{#snippet template(args)}
		<AppShell
			{...args}
			sidebar={sidebarWithTabs}
			sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Slim sidebar">
	{#snippet template(args)}
		<AppShell
			{...args}
			sidebar={sidebarSlim}
			sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Wide sidebar">
	{#snippet template(args)}
		<AppShell
			{...args}
			sidebar={sidebarWide}
			sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Push: right">
	{#snippet template(args)}
		<AppShell {...args} sidebarPush></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Push: left">
	{#snippet template(args)}
		<AppShell {...args} sidebarPush sidebarPlacement={{ initial: 'left' }}></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Push: left with tabs">
	{#snippet template(args)}
		<AppShell {...args} sidebar={sidebarWithTabs} sidebarPush sidebarPlacement={{ initial: 'left' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Slim sidebar push">
	{#snippet template(args)}
		<AppShell
			{...args}
			sidebarPush
			sidebar={sidebarSlim}
			sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Wide sidebar push">
	{#snippet template(args)}
		<AppShell
			{...args}
			sidebarPush
			sidebar={sidebarWide}
			sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Sidebar Push Placement Breakpoints with tabs Top/bottom/left/right">
	{#snippet template(args)}
		<AppShell
			{...args}
			sidebarPush
			sidebar={sidebarWithTabs}
			sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left', xl: 'right' }}
		></AppShell>
	{/snippet}
</Story>

<Story name="Start Open">
	{#snippet template(args)}
		<AppShell {...args} startOpen></AppShell>
	{/snippet}
</Story>

<Story name="Start Closed (default)">
	{#snippet template(args)}
		<AppShell {...args} startOpen={false}></AppShell>
	{/snippet}
</Story>

<Story name="Always Open">
	{#snippet template(args)}
		<AppShell {...args} sidebarAlwaysOpen={{ initial: true }}></AppShell>
	{/snippet}
</Story>

<!--
The sidebar is always open if the window is wider than the `md` breakpoint size.
In the sidebar was closed when the browser window was small, then it will automatically open when
the screen width increases past this threshold.
 -->
<Story name="Always Open Responsive changes">
	{#snippet template(args)}
		<AppShell {...args} sidebarAlwaysOpen={{ initial: false, md: true }} />
	{/snippet}
</Story>

<Story name="Always Open With Tabs">
	{#snippet template(args)}
		<AppShell {...args} sidebar={sidebarWithTabs} sidebarAlwaysOpen={{ initial: true }} />
	{/snippet}
</Story>

<Story name="With custom height class">
	{#snippet template(args)}
		<AppShell {...args} heightClass="h-[200px]" />
	{/snippet}
</Story>

<!--
This story provides the `main` snippet, to show that it is rendered in place of the placeholder
when it is provided.
-->
<Story name="With main snippet provided">
	{#snippet template(args)}
		<AppShell {...args} main={mainContent}></AppShell>
	{/snippet}
</Story>

<!-- A top or bottom sidebar sticks to the edge of the viewport. Scroll down: the tab bar stays at the bottom of the screen until the footer pushes it up. -->
<Story name="Sticky bottom tabs on a long page">
	{#snippet template(args)}
		<div class="flex min-h-dvh flex-col">
			<AppShell
				{...args}
				heightClass="grow"
				main={longContent}
				sidebar={sidebarWithTabs}
				sidebarPlacement={{ initial: 'bottom', md: 'left' }}
				startOpen={false}
			></AppShell>
			<Footer showCiuLogo showCookieMenu />
		</div>
	{/snippet}
</Story>

<!-- A left or right sidebar sticks to the top of the viewport, so it stays in view while the content scrolls. The header scrolls away, and the footer pushes the sidebar up. The Close button stays at the bottom of the screen while the header is in view. -->
<Story name="Sticky left tabs on a long page">
	{#snippet template(args)}
		<div class="flex min-h-dvh flex-col">
			<Header>header that scrolls away</Header>
			<AppShell
				{...args}
				heightClass="grow"
				main={longContent}
				sidebar={sidebarWithTabs}
				sidebarPlacement={{ initial: 'left' }}
				sidebarPush
			></AppShell>
			<Footer showCiuLogo showCookieMenu />
		</div>
	{/snippet}
</Story>
