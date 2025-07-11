<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavigationMenu from './NavigationMenu.svelte';

	/**
	 * The `NavigationMenu` component is used to display a short message in a coloured banner.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/NavigationMenu',
		component: NavigationMenu,
		tags: ['autodocs']
	});

	let selectedMenuItemId = $state('layout');

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

	let items = [
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

<Story name="Default">
	{#snippet template(args)}
		<NavigationMenu {...args} {items} />
	{/snippet}
</Story>

<Story name="Horizontal">
	{#snippet template(args)}
		<NavigationMenu {...args} {items} orientation="horizontal" />
	{/snippet}
</Story>

<!-- The component takes a width prop that can accept tailwind width classes -->
<Story name="Width by class">
	{#snippet template(args)}
		<NavigationMenu
			{...args}
			ariaLabel="example-menu-with-width"
			width="w-64"
			{items}
			bind:selectedMenuItemId
		/>
	{/snippet}
</Story>

<!-- Width defaults to 100% of the parent container. You may wish to use the parent width to control the menu width -->
<Story name="Width constrained by parent">
	{#snippet template(args)}
		<div class="max-w-96">
			<NavigationMenu {...args} ariaLabel="example-menu" {items} bind:selectedMenuItemId />
		</div>
	{/snippet}
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

 	<NavigationMenu ariaLabel="no children" items={subMenu} />
 ```
  -->
<Story name="No children">
	{#snippet template(args)}
		<NavigationMenu {...args} ariaLabel="no children" items={subMenu} />
	{/snippet}
</Story>

<!-- Menu items with children don't have to be links. But items without children do. In this example, the top level items don't have links. -->
<Story name="NoLinks">
	{#snippet template(args)}
		<NavigationMenu {...args} ariaLabel="no links" items={subMenuNoLinks} />
	{/snippet}
</Story>

<!-- For menus that should always show all of the list items, you can set `isAlwaysExpanded` to true. -->
<Story name="Always expanded">
	{#snippet template(args)}
		<NavigationMenu
			{...args}
			ariaLabel="always expanded menu"
			{items}
			isAlwaysExpanded
			width="w-96"
		/>
	{/snippet}
</Story>

<Story name="Horizontal orientation">
	{#snippet template(args)}
		<NavigationMenu
			{...args}
			ariaLabel="horizontally oriented menu"
			items={[...items, { title: 'No child items', id: 'no-child', url: '/' }]}
			orientation="horizontal"
		/>
	{/snippet}
</Story>

<Story name="Horizontal no children">
	{#snippet template(args)}
		<NavigationMenu
			{...args}
			ariaLabel="horizontally oriented menu no children"
			items={subMenu}
			orientation="horizontal"
		/>
	{/snippet}
</Story>
