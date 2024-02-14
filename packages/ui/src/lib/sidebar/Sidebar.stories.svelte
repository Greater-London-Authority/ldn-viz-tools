<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import SidebarContainer from './SidebarContainer.svelte';
	import Sidebar from './Sidebar.svelte';
	import Button from '../button/Button.svelte';

	import ExampleOverview from './ExampleOverview.svelte';
	import exampleCode from './ExampleOverview.svelte?raw';

	let isOpen;
	const toggleSidebar = () => isOpen.update((v) => !v);
</script>

<Meta
	title="Ui/Sidebar"
	component={Sidebar}
	parameters={{
		layout: 'full'
	}}
/>

<Story name="Default">
	<SidebarContainer>
		<Sidebar slot="sidebar" />
	</SidebarContainer>
</Story>

<Story name="Getting Started">
	<ExampleOverview>
		<p class="mb-2 font-bold">This is the code for this story:</p>
		<pre><code>{exampleCode}</code></pre>
	</ExampleOverview>
</Story>

<Story name="Custom Sizing">
	<SidebarContainer sidebarWidth="500px" sidebarHeight="400px">
		<div slot="content" class="p-6 text-white space-y-2">
			<p>Custom sidebar width for desktop and height for mobile:</p>
			<pre><code
					>{[`<SidebarContainer`, `\tsidebarWidth="500px" `, `\tsidebarHeight="400px"`].join(
						'\n'
					)}</code
				></pre>
		</div>
		<Sidebar slot="sidebar" />
	</SidebarContainer>
</Story>

<Story name="Open State Store">
	<SidebarContainer startOpen bind:isOpen>
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

			<pre><code>{`<SidebarContainer startOpen bind:isOpen />`}</code></pre>
		</div>
		<Sidebar slot="sidebar" />
	</SidebarContainer>
</Story>

<Story name="Sidebar Context">
	<SidebarContainer>
		<div slot="content" class="p-6 text-white space-y-2">
			<p>
				Every Svelte component inside the <code>SidebarContainer</code> or one of it's children can access
				two context objects:
			</p>

			<pre><code
					>{[
						`\timport { getContext } from 'svelte'`,
						`\tgetContext('sidebarIsOpen')`,
						`\tgetContext('sidebarContainer')`
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
						`\tconst container = getContext('sidebarContainer')`,
						`\tconst isDesktop = $container.isAlignedRight()`
					].join('\n')}</code
				></pre>
		</div>
		<Sidebar slot="sidebar" />
	</SidebarContainer>
</Story>
