<script context="module" lang="ts">
	import ListMenu from './ListMenu.svelte';
	import ListMenuItem from './ListMenuItem.svelte';

	export const meta = {
		title: 'Ui/Components/ListMenu',
		component: ListMenu,
		subcomponents: ListMenuItem,

		argTypes: {}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { writable } from 'svelte/store';
	import type { ListMenuItem as Item } from './ListMenuItem.svelte';

	$: selectedMenuItemId = writable('foundations');

	let subMenu = [
		{ title: 'Accessibility', id: 'accessibility', url: '#accessibility', children: [] },
		{ title: 'Brand', id: 'brand', url: '/', children: [] },
		{ title: 'Color', id: 'color2', url: '/', children: [] },
		{ title: 'Typography', id: 'typography', url: '/', children: [] },
		{ title: 'Spacing', id: 'spacing', url: '/', children: [] },
		{ title: 'Design Tokens', id: 'design-tokens', url: '/', children: [] }
	];

	let subMenuNoLinks = [
		{ title: 'Accessibility', id: 'accessibility', url: '', children: subMenu },
		{ title: 'Brand', id: 'brand', url: '', children: subMenu },
		{ title: 'Color', id: 'color', url: '', children: subMenu },
		{ title: 'Typography', id: 'typography', url: '', children: subMenu },
		{ title: 'Spacing', id: 'spacing', url: '', children: subMenu },
		{ title: 'Design Tokens', id: 'tokens', url: '', children: subMenu }
	];

	let items: Item[] = [
		{
			title: 'Foundations',
			id: 'foundations',
			url: '/',
			children: subMenu
		},
		{
			title: 'Applications',
			id: 'applications',
			url: '/',
			children: [
				{
					title: 'Layout',
					id: 'layout',
					url: '/',
					children: [
						{ title: 'Applications', id: 'applications-child', url: '/', children: [] },
						{ title: 'Maps', id: 'maps', url: '/', children: [] }
					]
				},
				{ title: 'User Interface', id: 'userInterface', url: '/', children: [] }
			]
		},
		{
			title: 'Data Visualisation',
			id: 'dataVisualisation',
			url: '/',
			children: [
				{ title: 'Principles', id: 'principles', url: '/', children: [] },
				{ title: 'Accessibility', id: 'accessibility2', url: '/', children: [] },
				{
					title: 'Color',
					id: 'color',
					url: '/',
					children: [
						{ title: 'Categorical', id: 'categorical', url: '/', children: [] },
						{ title: 'Quantitative', id: 'quantitative', url: '/', children: [] },
						{ title: 'Maps', id: 'maps-child', url: '/', children: [] }
					]
				},
				{ title: 'Scaling Shapes', id: 'shapes', url: '/', children: [] },
				{ title: 'Chart Themes', id: 'chartThemes', url: '/', children: [] },
				{ title: 'Chart Examples', id: 'chartExamples', url: '/', children: [] }
			]
		}
	];

	// $: console.log($selectedMenuItemId);
</script>

<Template let:args>
	<ListMenu {...args} />
</Template>

<Story name="Default">
	<div class="flex">
		<ListMenu ariaLabel="example-menu" {items} bind:selectedMenuItemId />
	</div>
</Story>

<!-- Menus that are single level take an array of `items`, which have no children.
 
```
	let subMenu = [
		{ title: 'Accessibility', url: '/', children: [] },
		{ title: 'Brand', url: '/', children: [] },
		{ title: 'Color', url: '/', children: [] },
		{ title: 'Typography', url: '/', children: [] },
		{ title: 'Spacing', url: '/', children: [] },
		{ title: 'Design Tokens', url: '/', children: [] }
	];

 	<ListMenu ariaLabel="no children" items={subMenu} />
 ```
  -->
<Story name="No children">
	<ListMenu ariaLabel="no children" items={subMenu} />
</Story>

<Story name="No Links">
	<ListMenu ariaLabel="no links" items={subMenuNoLinks} />
</Story>
<!-- Expandable headings not links -->
<!-- Expandable headings links -->
<!-- Expandable headings vertically -->
<!-- Expandable headings horizontally -->

<!-- For menus that should always show all of the list items, you can set `isAlwaysExpanded` to true. -->
<Story name="Always expanded">
	<ListMenu ariaLabel="always expanded menu" {items} isAlwaysExpanded />
</Story>

<Story name="Horizontal orientation">
	<ListMenu ariaLabel="horizontally oriented menu" {items} orientation="horizontal" />
</Story>
