<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AppShell from './AppShell.svelte';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import { tabs } from '../sidebar/Sidebar.stories.svelte';
	import DemoSidebarOpener from './DemoSidebarOpener.svelte';

	let { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/AppShell',
		component: AppShell,
		parameters: {
			layout: 'fullscreen'
		},
		args: {
			sidebar
		}
	});
</script>

{#snippet sidebar()}
	<Sidebar />
{/snippet}

{#snippet sidebarWide()}
	<Sidebar width="wide" />
{/snippet}

{#snippet sidebarWithTabs()}
	<Sidebar {tabs} />
{/snippet}

{#snippet mainWithControl()}
	<DemoSidebarOpener />
{/snippet}

<Story name="default">
	{#snippet template(args)}
		<AppShell {...args}></AppShell>
	{/snippet}
</Story>

<Story name="External opening/closing of sidebar">
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

<Story name="Start Open (default)">
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
