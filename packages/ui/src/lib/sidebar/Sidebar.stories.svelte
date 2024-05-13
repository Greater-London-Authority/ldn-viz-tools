<script context="module">
	import { RelativeWrapper } from '../../../../../apps/docs';
	import Sidebar from './Sidebar.svelte';

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

	import SidebarTabLabel from './elements/sidebarTabs/SidebarTabLabel.svelte';
	import SidebarTabList from './elements/sidebarTabs/SidebarTabList.svelte';

	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import SidebarHint from './elements/sidebarHint/SidebarHint.svelte';

	let selectedValue = 'markers';

	// In order for the sidebar to open/ close a writable boolean store must be provided to context.
	// NB. This is provided by AppShell when using
	const isOpen = writable(true);
	setContext('sidebarIsOpen', isOpen);
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
			{#each sections as section}
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
			{#each sections as section}
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
				<div class="text-core-grey-700 dark:text-white">
					Markers is selected, so we'd render a
					<code> &lt;Marker /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'filters'}
				<div class="text-core-grey-700 dark:text-white">
					Filter is selected, so we'd render a
					<code> &lt;Filters /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'analysis'}
				<div class="text-core-grey-700 dark:text-white">
					Analysis is selected, so we'd render a
					<code> &lt;Analysis /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'layers'}
				<div class="text-core-grey-700 dark:text-white">
					Layers is selected, so we'd render a
					<code> &lt;Layer /&gt;</code>
					component
				</div>
			{/if}
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
			{#each sections as section}
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
			{#each sections as section}
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
			{#each sections as section}
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
			{#each sections as section}
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
			{#each sections as section}
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
			{#each sections as section}
				<div class="bg-core-grey-50 p-6 mt-4 h-full space-y-4">
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
			{#each sections as section}
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
