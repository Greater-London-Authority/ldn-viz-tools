<script context="module" lang="ts">
	import MultiLevelListMenu from './MultiLevelListMenu.svelte';
	import MultiLevelListMenuItem from './MultiLevelListMenuItem.svelte';

	export const meta = {
		title: 'Ui/Components/MultiLevelListMenu',
		component: MultiLevelListMenu,
		subcomponents: MultiLevelListMenuItem,

		argTypes: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { writable } from 'svelte/store';
	// import MultiLevelListItem from './MultiLevelListItem.svelte';

	const subItems = [
		{ title: 'Sub One', id: 'sub-one' },
		{ title: 'Sub Two', id: 'sub-two', children: [{ title: 'SubSub', id: 'subsub' }] },
		{ title: 'Sub Three', id: 'sub-three' }
	];

	const items = [
		{ title: 'One', id: 'one' },
		{ title: 'Two', id: 'two', children: subItems },
		{ title: 'Three', id: 'three' }
	];

	$: selectedMenuItemId = writable('subsub');
</script>

<Template let:args>
	<MultiLevelListMenu {...args} />
</Template>

<Story name="Default">
	<MultiLevelListMenu {items} bind:selectedMenuItemId />
</Story>
