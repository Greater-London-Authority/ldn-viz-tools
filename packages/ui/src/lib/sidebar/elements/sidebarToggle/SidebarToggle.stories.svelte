<script module>
	import { AdjustmentsHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import SidebarToggle from './SidebarToggle.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarToggle',
		component: SidebarToggle
	});
</script>

<script>
	let isOpen = false;
	let sidebarOpen = writable(isOpen);
	setContext('sidebarIsOpen', sidebarOpen);
</script>

<Story name="Default">
	{#snippet template()}
		<SidebarToggle />
	{/snippet}
</Story>

<Story name="With Custom Icon">
	{#snippet template()}
		<SidebarToggle>
			<svelte:fragment slot="icon">
				<Icon src={AdjustmentsHorizontal} class="p-1" aria-hidden="true" />
			</svelte:fragment>
		</SidebarToggle>
	{/snippet}
</Story>
