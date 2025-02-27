<script context="module">
	import { RelativeWrapper } from '../../../../../apps/docs';
	import Sidebar from './Sidebar.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And Themes/Sidebar',
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

	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import Overlay from '../overlay/Overlay.svelte';

	import ThemeSwitcher from '../theme/ThemeSwitcher.svelte';

	import Select from '../select/Select.svelte';
	import { First, Fourth, Second, Third } from './elements/sidebarTabs/demoSections';

	$: selectedValue = 'markers';

	// In order for the sidebar to open/ close a writable boolean store must be provided to context.
	// NB. This is provided by AppShell when using
	const isOpen = writable(true);
	setContext('sidebarIsOpen', isOpen);

	let tabs = [
		{ id: 'markers', label: 'Markers', icon: ChartBar, content: First },
		{ id: 'filters', label: 'Filters', icon: Funnel, content: Second },
		{ id: 'analysis', label: 'Analysis', icon: Map, content: Third },
		{ id: 'layers', label: 'Layers', icon: MapPin, content: Fourth }
	];
</script>

<Template let:args>
	<Sidebar {...args}>
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
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
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
</Template>

<Story
	name="Default"
	source
	parameters={{
		options: {
			showPanel: true
		}
	}}
></Story>

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
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
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
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
	</Sidebar>
</Story>

<Story name="With Tabs" source>
	<Sidebar {tabs}>
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>

		<SidebarFooter slot="footer">
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
	</Sidebar>
</Story>

<Story name="Externally controlling the open tabs" source>
	<div class="w-96">
		<Select
			items={['markers', 'filters', 'analysis', 'layers'].map((d) => ({ value: d, label: d }))}
			bind:justValue={selectedValue}
		/>
	</div>

	<Sidebar {tabs}>
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>

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
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
	</Sidebar>
</Story>

<Story name="Light Theme (Experimental)" source>
	<Sidebar theme="light">
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
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
	</Sidebar>
</Story>

<Story name="Dark Theme with white panel (unstyledContent)" source>
	<Sidebar>
		<SidebarHeader title="Main sidebar title" slot="header">
			<svelte:fragment slot="subTitle">
				<p>
					Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui, nec
					venenatis sapien. Etiam venenatis felis.
				</p>
			</svelte:fragment>
		</SidebarHeader>
		<svelte:fragment slot="unstyledContent">
			{@const sections = [1]}
			{#each sections as _section}
				<div class="bg-color-palette-grey-100 p-6 mt-4 h-full space-y-4">
					<p>
						This is totally unstyled content and so needs to have extra classes to ensure correct
						padding etc. Use with extreme caution!
					</p>
					<p>
						Using the "unstyledContent" slot also means you need to adjust to footer to compensate
						by adding padding
					</p>
				</div>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
			<div class="flex justify-between px-6">
				<div class="w-[165px]"><LogoMayor /></div>
				<div class="w-[165px]"><LogoCIU /></div>
			</div>
			<svelte:fragment slot="menu">
				<ul class="flex space-x-2 px-6">
					<li>View Cookie settings</li>
					<li>Privacy Policy</li>
				</ul>
			</svelte:fragment>
		</SidebarFooter>
	</Sidebar>
</Story>

<Story name="With no header" source>
	<Sidebar>
		<svelte:fragment slot="sections">
			{@const sections = [1, 2]}
			{#each sections as _section}
				<SidebarSection title="Section Title">
					Section Content
					<div>
						<SidebarGroupTitle>
							Group Title
							<Overlay slot="hint">
								<p class="mb-4">Any content you want can go here</p>
								<p>
									Maecenas ut libero vel nibh maximus feugiat non sed tortor. Sed in lacinia dui,
									nec venenatis sapien. Etiam venenatis felis.
								</p>
							</Overlay>
						</SidebarGroupTitle>
						Grouped content
					</div>
				</SidebarSection>
			{/each}
		</svelte:fragment>
		<SidebarFooter slot="footer">
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
	</Sidebar>
</Story>
