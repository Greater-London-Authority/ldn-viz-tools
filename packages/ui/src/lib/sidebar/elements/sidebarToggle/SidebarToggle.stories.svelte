<script context="module">
	import { AdjustmentsHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import SidebarToggle from './SidebarToggle.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarToggle',
		component: SidebarToggle
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let isOpen = false;
	let sidebarOpen = writable(isOpen);
	setContext('sidebarIsOpen', sidebarOpen);
</script>

<Template let:args>
	<SidebarToggle bind:isOpen {...args} />
</Template>

<Story name="Default" source>
	<SidebarToggle bind:isOpen />
</Story>

<Story name="With Custom Icon" source>
	<SidebarToggle bind:isOpen>
		<svelte:fragment slot="icon">
			<Icon src={AdjustmentsHorizontal} class="p-1" aria-hidden="true" />
		</svelte:fragment>
	</SidebarToggle>
</Story>
