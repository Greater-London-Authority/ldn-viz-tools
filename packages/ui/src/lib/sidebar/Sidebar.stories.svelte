<script module lang="ts">
	import { AdjustmentsHorizontal, ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { SidebarLeftContext } from '../../../../../apps/docs/src/lib';
	import LogoCIU from '../logos/LogoCIU.svelte';
	import LogoMayor from '../logos/LogoMayor.svelte';
	import Overlay from '../overlay/Overlay.svelte';
	import Select from '../select/Select.svelte';
	import ThemeSwitcher from '../theme/ThemeSwitcher.svelte';
	import Sidebar from './Sidebar.svelte';
	import SidebarFooter from './elements/sidebarFooter/SidebarFooter.svelte';
	import SidebarHeader from './elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarSection from './elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from './elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';
	import { First, Fourth, Second, Third } from './elements/sidebarTabs/demoSections';
	import type { SidebarProps } from './types';

	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../button/Button.svelte';
	import { subMenu } from '../navigationMenu/NavigationMenu.stories.svelte';
	import NavigationMenu from '../navigationMenu/NavigationMenu.svelte';

	export let tabs = [
		{ id: 'markers', label: 'Markers', icon: ChartBar, content: First },
		{ id: 'filters', label: 'Filters', icon: Funnel, content: Second },
		{ id: 'analysis', label: 'Analysis', icon: Map, content: Third },
		{ id: 'layers', label: 'Layers', icon: MapPin, content: Fourth }
	];

	/**
	 * The `<Sidebar>` component renders a sidebar that is typically used to display controls and textual explanation.
	 *
	 * It should generally be used inside an [AppShell](.//?path=/docs/app-appshell--documentation).
	 *
	 * Note that when the sidebar is collapsed, it is removed by the `AppShell` (rather than merely being hidden).
	 * Any state that should be restored when it is re-opened should be persisted in a Svelte Store.
	 *
	 */
	let { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar',
		component: Sidebar,
		tags: ['autodocs'],
		decorators: [() => SidebarLeftContext as any],
		render: defaultTemplate,
		parameters: {
			layout: 'fullscreen',
			sveltekit_experimental: {
				hrefs: {
					'/root.*': {
						callback: (to: string, event: MouseEvent) => {
							console.log(to, event);
						},
						asRegex: true
					}
				}
			}
		},
		argTypes: {
			width: {
				options: ['standard', 'wide'],
				control: { type: 'radio' }
			},
			theme: {
				options: ['light', 'dark'],
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
		},
		args: {
			header,
			sections,
			footer
		}
	});

	let selectedTabId = $state('markers');

	let setOpenState = $state();

	let state = $state();

	// Snippets for stories. Defaults defined as args, overridden per story as needed
</script>

<!-- The sidebar component relies on context from setSidebarState()
	This is usually defined in a parent appShell, so you dont need to worry about setting it manually.
	If you ARE using a sidebar outside an appShell then you need to include setSidebarState() in you layout or page (higest level) -->
{#snippet header()}
	<SidebarHeader title="Main sidebar title">
		{#snippet subTitle()}
			<p>
				Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
				venenatis sapien. Etiam venenatis felis.
			</p>
		{/snippet}
	</SidebarHeader>
{/snippet}

{#snippet sections()}
	{@const sections = [1, 2]}
	{#each sections as _section}
		<SidebarSection title="Section Title">
			Section Content
			<div>
				<SidebarGroupTitle>
					Group Title
					{#snippet hint()}
						<Overlay>
							<p class="mb-4">Any content you want can go here</p>
							<p>
								Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
								venenatis sapien. Etiam venenatis felis.
							</p>
						</Overlay>
					{/snippet}
				</SidebarGroupTitle>
				Grouped content
			</div>
		</SidebarSection>
	{/each}
{/snippet}

{#snippet footer()}
	<SidebarFooter>
		<div class="flex justify-between">
			<div class="w-[165px]"><LogoMayor /></div>
			<div class="w-[165px]"><LogoCIU /></div>
		</div>
		{#snippet menu()}
			<div class="flex justify-between">
				<ul class="flex space-x-2">
					<li>View Cookie settings</li>
					<li>Privacy Policy</li>
				</ul>
				<ThemeSwitcher size="xs" />
			</div>
		{/snippet}
	</SidebarFooter>
{/snippet}

{#snippet defaultTemplate(args: SidebarProps)}
	<Sidebar {...args}></Sidebar>
{/snippet}

<Story name="Default" />

<Story name="Wide" args={{ width: 'wide' }} />

{#snippet longcontent()}
	{@const sections = [1, 2, 3, 4]}
	{#each sections as _section}
		<SidebarSection title="Section Title">
			Section Content
			<div>
				<SidebarGroupTitle>
					Group Title
					{#snippet hint()}
						<Overlay>
							<p class="mb-4">Any content you want can go here</p>
							<p>
								Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
								venenatis sapien. Etiam venenatis felis.
							</p>
						</Overlay>
					{/snippet}
				</SidebarGroupTitle>
				Grouped content
			</div>
		</SidebarSection>
	{/each}
{/snippet}

<Story name="With long content" args={{ sections: longcontent }} />

<Story name="With tabs" args={{ tabs }} />

<Story name="Externally Controlled">
	{#snippet template(args: SidebarProps)}
		<div class="w-96">
			<Button onclick={() => (state.isOpen = true)}>Open</Button>
			<Button onclick={() => (state.isOpen = false)}>Close</Button>
		</div>

		<Sidebar {...args} bind:state></Sidebar>
	{/snippet}
</Story>

<Story name="Externally controlling the open tabs">
	{#snippet template(args: SidebarProps)}
		<div class="w-96">
			<Select
				options={['markers', 'filters', 'analysis', 'layers'].map((d) => ({ value: d, label: d }))}
				bind:value={selectedTabId}
			/>
		</div>

		<Sidebar {...args} {tabs} bind:selectedTabId></Sidebar>
	{/snippet}
</Story>

<Story name="Left placement" args={{ placement: 'left' }} />

<Story name="Right placement" args={{ placement: 'right' }} />

<Story name="Top placement" args={{ placement: 'top' }} />

<Story name="Bottom placement" args={{ placement: 'bottom' }} />

<Story name="Left placement with tabs" args={{ placement: 'left', tabs }} />

<Story name="Top placement with tabs" args={{ placement: 'top', tabs }} />

<Story name="Bottom placement with tabs" args={{ placement: 'bottom', tabs }} />

<Story name="Position Fixed" args={{ position: 'fixed' }} />

<Story name="Light Theme" args={{ theme: 'light' }} />

<Story name="Light Theme with Tabs" args={{ theme: 'light', tabs }} />

{#snippet unstyledContent()}
	<div class="bg-color-ui-background-notice text-color-text-primary p-4">
		<p class="text-bold mb-2 text-xl">Unstyled Content</p>
		<p class="mb-2">
			This content does not inherit styles directly from the sidebar. Though it will be affected by
			the .dark class modifier...
		</p>
		<p class="mb-2">
			...the side bar is rendered without padding so any snippets passed for header and footer will
			need to have padding added to compensate.
		</p>
	</div>
{/snippet}

<Story name="With unstyled content" args={{ unstyledContent }} />

<Story name="With no header" args={{ header: undefined }} />

{#snippet navigation()}
	<NavigationMenu items={subMenu} ariaLabel="Main Menu" />
{/snippet}

<Story name="As navigation" args={{ header: undefined, footer: undefined, sections: navigation }} />

{#snippet icon()}
	<Icon src={AdjustmentsHorizontal} class="p-1" aria-hidden="true" />
{/snippet}

<Story name="With custom trigger icon" args={{ icon }} />

<Story name="With custom classes" args={{ class: '[&_*]:!bg-color-ui-primary !pb-0' }} />
