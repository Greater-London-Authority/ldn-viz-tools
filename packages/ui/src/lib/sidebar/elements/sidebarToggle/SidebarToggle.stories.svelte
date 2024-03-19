<script context="module">
	import SidebarToggle from './sidebarToggle.svelte';
	import { AdjustmentsHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarToggle',
		component: SidebarToggle
	};

	let isOpen = false;
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<SidebarToggle bind:isOpen />
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
