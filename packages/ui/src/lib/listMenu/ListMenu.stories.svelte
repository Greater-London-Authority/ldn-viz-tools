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

	$: selectedMenuItemId = writable('layout');

	let subMenu = [
		{ title: 'Accessibility', id: 'accessibility', url: '#accessibility' },
		{ title: 'Brand', id: 'brand', url: '/' },
		{ title: 'Color', id: 'color2', url: '/' },
		{ title: 'Typography', id: 'typography', url: '/' },
		{ title: 'Spacing', id: 'spacing', url: '/' },
		{ title: 'Design Tokens', id: 'design-tokens', url: '/' }
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
						{ title: 'Applications', id: 'applications-child', url: '/' },
						{ title: 'Maps', id: 'maps', url: '/' }
					]
				},
				{ title: 'User Interface', id: 'userInterface', url: '/' }
			]
		},
		{
			title: 'Data Visualisation',
			id: 'dataVisualisation',
			url: '/',
			children: [
				{ title: 'Principles', id: 'principles', url: '/' },
				{ title: 'Accessibility', id: 'accessibility2', url: '/' },
				{
					title: 'Color',
					id: 'color',
					url: '/',
					children: [
						{ title: 'Categorical', id: 'categorical', url: '/' },
						{ title: 'Quantitative', id: 'quantitative', url: '/' },
						{ title: 'Maps', id: 'maps-child', url: '/' }
					]
				},
				{ title: 'Scaling Shapes', id: 'shapes', url: '/' },
				{ title: 'Chart Themes', id: 'chartThemes', url: '/' },
				{ title: 'Chart Examples', id: 'chartExamples', url: '/' }
			]
		}
	];
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
		{ title: 'Accessibility', url: '/',  },
		{ title: 'Brand', url: '/',  },
		{ title: 'Color', url: '/',  },
		{ title: 'Typography', url: '/',  },
		{ title: 'Spacing', url: '/',  },
		{ title: 'Design Tokens', url: '/',  }
	];

 	<ListMenu ariaLabel="no children" items={subMenu} />
 ```
  -->
<Story name="No children">
	<ListMenu ariaLabel="no children" items={subMenu} />
</Story>

<!-- Menu items with children don't have to be links. But items without children do. In this example, the top level items don't have links. -->
<Story name="No Links">
	<ListMenu ariaLabel="no links" items={subMenuNoLinks} />
</Story>

<!-- For menus that should always show all of the list items, you can set `isAlwaysExpanded` to true. -->
<Story name="Always expanded">
	<ListMenu ariaLabel="always expanded menu" {items} isAlwaysExpanded />
</Story>

<Story name="Horizontal orientation">
	<ListMenu ariaLabel="horizontally oriented menu" {items} orientation="horizontal" />
</Story>
