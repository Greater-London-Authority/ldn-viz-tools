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

	let items: Item[] = [
		{
			label: 'Foundations',
			link: '',
			children: [
				{ label: 'Accessibility', link: '', children: [] },
				{ label: 'Brand', link: '', children: [] },
				{ label: 'Color', link: '', children: [] },
				{ label: 'Typography', link: '', children: [] },
				{ label: 'Spacing', link: '', children: [] },
				{ label: 'Design Tokens', link: '', children: [] }
			]
		},
		{
			label: 'Applications',
			link: '',
			children: [
				{
					label: 'Layout',
					link: '',
					children: [
						{ label: 'Applications', link: '', children: [] },
						{ label: 'Maps', link: '', children: [] }
					]
				},
				{ label: 'User Interface', link: '', children: [] }
			]
		},
		{
			label: 'Data Visualisation',
			link: '',
			children: [
				{ label: 'Principles', link: '', children: [] },
				{ label: 'Accessibility', link: '', children: [] },
				{
					label: 'Color',
					link: '',
					children: [
						{ label: 'Categorical', link: '', children: [] },
						{ label: 'Quantitative', link: '', children: [] },
						{ label: 'Maps', link: '', children: [] }
					]
				},
				{ label: 'Scaling Shapes', link: '', children: [] },
				{ label: 'Chart Themes', link: '', children: [] },
				{ label: 'Chart Examples', link: '', children: [] }
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
