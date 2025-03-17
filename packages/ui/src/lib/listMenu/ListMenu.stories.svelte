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
		{ title: 'Accessibility', url: '#accessibility', children: [] },
		{ title: 'Brand', url: '/', children: [] },
		{ title: 'Color', url: '/', children: [] },
		{ title: 'Typography', url: '/', children: [] },
		{ title: 'Spacing', url: '/', children: [] },
		{ title: 'Design Tokens', url: '/', children: [] }
	];

	let subMenuNoLinks = [
		{ title: 'Accessibility', url: '', children: subMenu },
		{ title: 'Brand', url: '', children: subMenu },
		{ title: 'Color', url: '', children: subMenu },
		{ title: 'Typography', url: '', children: subMenu },
		{ title: 'Spacing', url: '', children: subMenu },
		{ title: 'Design Tokens', url: '', children: subMenu }
	];

	let items: Item[] = [
		{
			title: 'Foundations',
			url: '/',
			children: subMenu
		},
		{
			title: 'Applications',
			url: '/',
			children: [
				{
					title: 'Layout',
					url: '/',
					children: [
						{ title: 'Applications', url: '/', children: [] },
						{ title: 'Maps', url: '/', children: [] }
					]
				},
				{ title: 'User Interface', url: '/', children: [] }
			]
		},
		{
			title: 'Data Visualisation',
			url: '/',
			children: [
				{ title: 'Principles', url: '/', children: [] },
				{ title: 'Accessibility', url: '/', children: [] },
				{
					title: 'Color',
					url: '/',
					children: [
						{ title: 'Categorical', url: '/', children: [] },
						{ title: 'Quantitative', url: '/', children: [] },
						{ title: 'Maps', url: '/', children: [] }
					]
				},
				{ title: 'Scaling Shapes', url: '/', children: [] },
				{ title: 'Chart Themes', url: '/', children: [] },
				{ title: 'Chart Examples', url: '/', children: [] }
			]
		}
	];
</script>

<Template let:args>
	<ListMenu {...args} />
</Template>

<Story name="Default">
	<div class="flex">
		<ListMenu ariaLabel="example-menu" {items} />
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
