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
	import type { ListMenuItem as Item } from './ListMenuItem.svelte';

	let subMenu = [
		{ label: 'Accessibility', link: '#accessibility', children: [] },
		{ label: 'Brand', link: '/', children: [] },
		{ label: 'Color', link: '/', children: [] },
		{ label: 'Typography', link: '/', children: [] },
		{ label: 'Spacing', link: '/', children: [] },
		{ label: 'Design Tokens', link: '/', children: [] }
	];

	let subMenuNoLinks = [
		{ label: 'Accessibility', link: '', children: subMenu },
		{ label: 'Brand', link: '', children: subMenu },
		{ label: 'Color', link: '', children: subMenu },
		{ label: 'Typography', link: '', children: subMenu },
		{ label: 'Spacing', link: '', children: subMenu },
		{ label: 'Design Tokens', link: '', children: subMenu }
	];

	let items: Item[] = [
		{
			label: 'Foundations',
			link: '/',
			children: subMenu
		},
		{
			label: 'Applications',
			link: '/',
			children: [
				{
					label: 'Layout',
					link: '/',
					children: [
						{ label: 'Applications', link: '/', children: [] },
						{ label: 'Maps', link: '/', children: [] }
					]
				},
				{ label: 'User Interface', link: '/', children: [] }
			]
		},
		{
			label: 'Data Visualisation',
			link: '/',
			children: [
				{ label: 'Principles', link: '/', children: [] },
				{ label: 'Accessibility', link: '/', children: [] },
				{
					label: 'Color',
					link: '/',
					children: [
						{ label: 'Categorical', link: '/', children: [] },
						{ label: 'Quantitative', link: '/', children: [] },
						{ label: 'Maps', link: '/', children: [] }
					]
				},
				{ label: 'Scaling Shapes', link: '/', children: [] },
				{ label: 'Chart Themes', link: '/', children: [] },
				{ label: 'Chart Examples', link: '/', children: [] }
			]
		}
	];
</script>

<Template let:args>
	<ListMenu {...args} />
</Template>

<Story name="Default">
	<ListMenu ariaLabel="example-menu" {items} />
</Story>

<!-- Menus that are single level take an array of `items`, which have no children.
 
```
	let subMenu = [
		{ label: 'Accessibility', link: '/', children: [] },
		{ label: 'Brand', link: '/', children: [] },
		{ label: 'Color', link: '/', children: [] },
		{ label: 'Typography', link: '/', children: [] },
		{ label: 'Spacing', link: '/', children: [] },
		{ label: 'Design Tokens', link: '/', children: [] }
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
