<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import NavigationMenu from './NavigationMenu.svelte';

	/**
	 * Primarily intended to be used in vertical orientation in a sidebar or horizontal in the header,
	 * The `NavigationMenu` component is used to display navigation that can be one or more layers deep.
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

	let activeMenuItemId = $state('layout');
	let activeMenuItemId2 = $state('applications');

	export let subMenu = [
		{ title: 'Accessibility', id: 'accessibility', href: '/accessibility' },
		{ title: 'Brand', id: 'brand', href: '/brand' },
		{ title: 'Color', id: 'color', href: '/color' },
		{ title: 'Typography', id: 'typography', href: '/typography' },
		{ title: 'Spacing', id: 'spacing', href: '/spacing' },
		{ title: 'Design Tokens', id: 'design-tokens', href: '/design-tokens' }
	];

	let subMenuNoLinks = [
		{
			title: 'Accessibility',
			id: 'accessibility-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `a-${i.id}` }))
		},
		{
			title: 'Brand',
			id: 'brand-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `b-${i.id}` }))
		},
		{
			title: 'Color',
			id: 'color-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `c-${i.id}` }))
		},
		{
			title: 'Typography',
			id: 'typography-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `d-${i.id}` }))
		},
		{
			title: 'Spacing',
			id: 'spacing-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `e-${i.id}` }))
		},
		{
			title: 'Design Tokens',
			id: 'tokens-nl',
			href: '',
			children: subMenu.map((i) => ({ ...i, id: `f-${i.id}` }))
		}
	];

	let items = [
		{
			title: 'Foundations',
			id: 'foundations',
			href: '/foundations',
			children: subMenu
		},
		{
			title: 'Applications',
			id: 'applications',
			href: '/applications',
			children: [
				{
					title: 'Layout',
					id: 'layout',
					href: '/layout',
					children: [
						{ title: 'Applications', id: 'layout-applications', href: '/layout-applications' },
						{
							title: 'Maps',
							id: 'layout-maps',
							href: '/layout-maps',
							children: [
								{ title: 'Maps with sidebars', id: 'maps-sidebars', href: '/sidebar-maps' },
								{ title: 'Maps in dashboards', id: 'maps-dashbaords', href: '/dashboard-maps' }
							]
						}
					]
				},
				{ title: 'User Interface', id: 'userInterface', href: '/userInterface' }
			]
		},
		{
			title: 'Data Visualisation',
			id: 'dataVisualisation',
			href: '/dataVisualisation',
			children: [
				{ title: 'Principles', id: 'dv-principles', href: '/dv-principles' },
				{ title: 'Accessibility', id: 'dv-accessibility', href: '/dv-accessibility' },
				{
					title: 'Color',
					id: 'dv-color',
					href: '/dv-color',
					children: [
						{ title: 'Categorical', id: 'dv-categorical', href: '/dv-categorical' },
						{ title: 'Quantitative', id: 'dv-quantitative', href: '/dv-quantitative' },
						{ title: 'Maps', id: 'dv-maps', href: '/dv-maps' }
					]
				},
				{ title: 'Scaling Shapes', id: 'dv-shapes', href: '/dv-shapes' },
				{ title: 'Chart Themes', id: 'dv-chartThemes', href: '/dv-chartThemes' },
				{ title: 'Chart Examples', id: 'dv-chartExamples', href: '/dv-chartExamples' }
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

<!-- The component takes a width prop that can accept Tailwind width classes -->
<Story name="Width by class">
	{#snippet template(args)}
		<NavigationMenu
			{...args}
			ariaLabel="example-menu-with-width"
			width="w-64"
			{items}
			bind:activeMenuItemId
		/>
	{/snippet}
</Story>

<!-- Width defaults to 100% of the parent container. You may wish to use the parent width to control the menu width. -->
<Story name="Width constrained by parent">
	{#snippet template(args)}
		<div class="max-w-96">
			<NavigationMenu {...args} ariaLabel="example-menu" {items} bind:activeMenuItemId />
		</div>
	{/snippet}
</Story>

<!-- Menus that are single level take an array of `items`, which have no children.
 
```
	let subMenu = [
		{ title: 'Accessibility', url: '/' },
		{ title: 'Brand', url: '/' },
		{ title: 'Color', url: '/' },
		{ title: 'Typography', url: '/' },
		{ title: 'Spacing', url: '/' },
		{ title: 'Design Tokens', url: '/' }
	];

 	<NavigationMenu ariaLabel="no children" items={subMenu} />
 ```
  -->
<Story name="No children">
	{#snippet template(args)}
		<NavigationMenu {...args} ariaLabel="no children" items={subMenu} />
	{/snippet}
</Story>

<!-- Menu items with children don't have to be links, but items without children do. In this example, the top level items don't have links. -->
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
			items={[...items, { title: 'No child items', id: 'no-child', href: '/' }]}
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

<Story name="Programmatically change active item">
	{#snippet template(args)}
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap gap-2">
				<span>Select:</span>
				<Button onclick={() => (activeMenuItemId = 'applications')} size="sm">
					Applications (level 1)
				</Button>
				<Button onclick={() => (activeMenuItemId = 'layout')} size="sm">Layout (level 2)</Button>
			</div>

			<div class="flex flex-wrap gap-2">
				<span>Select:</span>

				<Button onclick={() => (activeMenuItemId = 'dataVisualisation')} size="sm">
					DV (level 1)
				</Button>

				<Button onclick={() => (activeMenuItemId = 'dv-color')} size="sm">
					DV Color (level 2)
				</Button>
				<Button onclick={() => (activeMenuItemId = 'dv-maps')} size="sm">DV Maps (level 3)</Button>
			</div>
		</div>

		<div class="text-color-text-muted text-sm">
			Current active ID: <strong>{activeMenuItemId}</strong>
		</div>

		<div class="max-w-96">
			<NavigationMenu
				{...args}
				ariaLabel="programmatic selection menu"
				{items}
				bind:activeMenuItemId
			/>
		</div>
	{/snippet}
</Story>

<Story name="Two menus on page">
	{#snippet template(args)}
		<div class="flex w-full gap-6">
			<div>
				<div class="text-color-text-muted text-sm">
					Current active ID: <strong>{activeMenuItemId}</strong>
				</div>

				<NavigationMenu {...args} ariaLabel="example-menu" {items} bind:activeMenuItemId />
			</div>
			<div>
				<div class="text-color-text-muted text-sm">
					Current active ID: <strong>{activeMenuItemId2}</strong>
				</div>

				<NavigationMenu
					{...args}
					ariaLabel="example-menu"
					{items}
					bind:activeMenuItemId={activeMenuItemId2}
				/>
			</div>
		</div>
	{/snippet}
</Story>
