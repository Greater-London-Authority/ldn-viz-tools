<script context="module">
	export const meta = {
		title: 'Ui/Examples/Dashboards',
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { writable } from 'svelte/store';
	import AppShell from '../appShell/AppShell.svelte';
	import Overlay from '../overlay/Overlay.svelte';
	import Sidebar from '../sidebar/Sidebar.svelte';
	import SidebarHeader from '../sidebar/elements/sidebarHeader/SidebarHeader.svelte';
	import SidebarSection from '../sidebar/elements/sidebarSection/SidebarSection.svelte';
	import SidebarGroupTitle from '../sidebar/elements/sidebarSection/sidebarGroupTitle/SidebarGroupTitle.svelte';

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
		</Sidebar>
	</AppShell>
</Story>
