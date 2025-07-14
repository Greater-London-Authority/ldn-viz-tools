<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavigationMenu from './NavigationMenu.svelte';

	/**
	 * Primarily intended to be used in vertical orientation in a sidebar or horizontal in the header,
	 * The `NavigationMenu` component is used to display navigation that can be one to many layers deep.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/NavigationMenu',
		component: NavigationMenu,
		tags: ['autodocs'],
		parameters: {
			sveltekit_experimental: {
				hrefs: {
					'/root.*': {
						callback: (to: string, event: MouseEvent) => {
							console.log(to, event);
						},
						asRegex: true
					}
				}
			}
		}
	});

	let selectedMenuItemId = $state('layout');

	let subMenu = [
		{ title: 'Accessibility', id: 'accessibility', url: '/accessibility' },
		{ title: 'Brand', id: 'brand', url: '/brand' },
		{ title: 'Color', id: 'color', url: '/color' },
		{ title: 'Typography', id: 'typography', url: '/typography' },
		{ title: 'Spacing', id: 'spacing', url: '/spacing' },
		{ title: 'Design Tokens', id: 'design-tokens', url: '/design-tokens' }
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
			url: '/foundations',
			children: subMenu
		},
		{
			title: 'Applications',
			id: 'applications',
			url: '/applications',
			children: [
				{
					title: 'Layout',
					id: 'layout',
					url: '/layout',
					children: [
						{ title: 'Applications', id: 'layout-applications', url: '/layout-applications' },
						{ title: 'Maps', id: 'layout-maps', url: '/layout-maps' }
					]
				},
				{ title: 'User Interface', id: 'userInterface', url: '/userInterface' }
			]
		},
		{
			title: 'Data Visualisation',
			id: 'dataVisualisation',
			url: '/dataVisualisation',
			children: [
				{ title: 'Principles', id: 'dv-principles', url: '/dv-principles' },
				{ title: 'Accessibility', id: 'dv-accessibility', url: '/dv-accessibility' },
				{
					title: 'Color',
					id: 'dv-color',
					url: '/dv-color',
					children: [
						{ title: 'Categorical', id: 'dv-categorical', url: '/dv-categorical' },
						{ title: 'Quantitative', id: 'dv-quantitative', url: '/dv-quantitative' },
						{ title: 'Maps', id: 'dv-maps', url: '/dv-maps' }
					]
				},
				{ title: 'Scaling Shapes', id: 'dv-shapes', url: '/dv-shapes' },
				{ title: 'Chart Themes', id: 'dv-chartThemes', url: '/dv-chartThemes' },
				{ title: 'Chart Examples', id: 'dv-chartExamples', url: '/dv-chartExamples' }
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
