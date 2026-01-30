<script module lang="ts">
	import { SidebarLeftContext } from '../../../../../../../apps/docs/src/lib';

	import { AdjustmentsHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SidebarToggle from './SidebarToggle.svelte';

	/**
	 * The `<SidebarToggle>` component is the button that can be clicked on to open or close the `<Sidebar>`.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarToggle',
		component: SidebarToggle,
		decorators: [() => SidebarLeftContext as any]
	});
</script>

<Story name="Default">
	{#snippet template()}
		<SidebarToggle />
	{/snippet}
</Story>

<Story name="With Custom Icon">
	{#snippet template()}
		<SidebarToggle>
			{#snippet icon()}
				<Icon src={AdjustmentsHorizontal} class="p-1" aria-hidden="true" />
			{/snippet}
		</SidebarToggle>
	{/snippet}
</Story>
