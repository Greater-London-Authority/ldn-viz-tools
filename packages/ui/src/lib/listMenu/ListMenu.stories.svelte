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
	import type { ListMenuEntry } from './ListMenuItem.svelte';

	$: selectedMenuItemId = 'layout';

	let subMenu = [
		{ title: 'Accessibility', id: 'accessibility', url: '#accessibility' },
		{ title: 'Brand', id: 'brand', url: '/' },
		{ title: 'Color', id: 'color', url: '/' },
		{ title: 'Typography', id: 'typography', url: '/' },
		{ title: 'Spacing', id: 'spacing', url: '/' },
		{ title: 'Design Tokens', id: 'design-tokens', url: '/' }
	];

	let subMenuNoLinks = [
		{
			title: 'Accessibility',
			id: 'accessibility-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `a-${i.id}` }))
		},
		{
			title: 'Brand',
			id: 'brand-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `b-${i.id}` }))
		},
		{
			title: 'Color',
			id: 'color-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `c-${i.id}` }))
		},
		{
			title: 'Typography',
			id: 'typography-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `d-${i.id}` }))
		},
		{
			title: 'Spacing',
			id: 'spacing-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `e-${i.id}` }))
		},
		{
			title: 'Design Tokens',
			id: 'tokens-nl',
			url: '',
			children: subMenu.map((i) => ({ ...i, id: `f-${i.id}` }))
		}
	];

	let items: ListMenuEntry[] = [
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
						{ title: 'Applications', id: 'layout-applications', url: '/' },
						{ title: 'Maps', id: 'layout-maps', url: '/' }
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
				{ title: 'Principles', id: 'dv-principles', url: '/' },
				{ title: 'Accessibility', id: 'dv-accessibility', url: '/' },
				{
					title: 'Color',
					id: 'dv-color',
					url: '/',
					children: [
						{ title: 'Categorical', id: 'dv-categorical', url: '/' },
						{ title: 'Quantitative', id: 'dv-quantitative', url: '/' },
						{ title: 'Maps', id: 'dv-maps', url: '/' }
					]
				},
				{ title: 'Scaling Shapes', id: 'dv-shapes', url: '/' },
				{ title: 'Chart Themes', id: 'dv-chartThemes', url: '/' },
				{ title: 'Chart Examples', id: 'dv-chartExamples', url: '/' }
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
<Story name="NoLinks">
	<ListMenu ariaLabel="no links" items={subMenuNoLinks} />
</Story>

<!-- For menus that should always show all of the list items, you can set `isAlwaysExpanded` to true. -->
<Story name="Always expanded">
	<ListMenu ariaLabel="always expanded menu" {items} isAlwaysExpanded />
</Story>

<Story name="Horizontal orientation">
	<ListMenu
		ariaLabel="horizontally oriented menu"
		items={[...items, { title: 'No child items', id: 'no-child', url: '/' }]}
		orientation="horizontal"
	/>
</Story>
