<script context="module">
	import TestSidebar from './TestSidebar.svelte';

	export const meta = {
		title: 'TESTS/Test Sidebar',
		component: TestSidebar
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { SidebarConfig } from './types';

	let sidebar: SidebarConfig = {
		inFrom: 'right',
		startOpen: false
	};

	const isOpen = writable(false);

	setContext('sidebarIsOpen', isOpen);
	setContext('sidebarConfig', sidebar);
</script>

<Template let:args>
	<TestSidebar {...args} />
</Template>

<Story name="Default" source>
	<TestSidebar>I'm The sidebar</TestSidebar>
</Story>

<Story name="left" source>
	<TestSidebar placement="left">I'm The sidebar</TestSidebar>
</Story>
