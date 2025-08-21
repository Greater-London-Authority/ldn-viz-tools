<script context="module" lang="ts">
	import ListMenu from '../listMenu/ListMenu.svelte';
	import Header from './Header.svelte';
	import HeaderItem from './HeaderItem.svelte';
	import HeaderRight from './HeaderRight.svelte';
	import HeaderTitle from './HeaderTitle.svelte';
	import NavLink from './NavLink.svelte';
	import NavLinks from './NavLinks.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And Themes/Header',
		component: Header,
		subcomponents: { HeaderItem, HeaderRight, HeaderTitle, NavLink, NavLinks },
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let subMenu = [
		{ title: 'Map', id: 'map', url: '#map' },
		{ title: 'Trend', id: 'trend', url: '#trend' }
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
		}
	];
</script>

<Template let:args>
	<Header {...args} />
</Template>

<Story name="Title only">
	<Header>
		<HeaderTitle>An interesting app</HeaderTitle>
	</Header>
</Story>

<Story name="Title and menu-right">
	<Header>
		<HeaderTitle>An interesting app</HeaderTitle>
		<HeaderRight>
			<HeaderItem>
				<ListMenu ariaLabel="no links" items={subMenuNoLinks} orientation="horizontal" />
			</HeaderItem>
		</HeaderRight>
	</Header>
</Story>

<Story name="Title and links to pages">
	<Header>
		<HeaderTitle>EV Charger Dashboard</HeaderTitle>
		<HeaderItem>
			<ListMenu ariaLabel="no links" items={subMenu} orientation="horizontal" />
		</HeaderItem>
	</Header>
</Story>

<Story name="Title, links, and auth section">
	<Header>
		<HeaderTitle>EV Charger Dashboard</HeaderTitle>

		<HeaderItem>
			<ListMenu ariaLabel="no links" items={subMenu} orientation="horizontal" />
		</HeaderItem>

		<HeaderRight>
			<HeaderItem>
				<span class="text-xs">Logged in as <b>Bob Smith</b></span>
			</HeaderItem>

			<HeaderItem>
				<a class="text-xs" href="/#">Log Out</a>
			</HeaderItem>
		</HeaderRight>
	</Header>
</Story>

<Story name="Light Theme (Experimental)">
	<Header theme="light">
		<HeaderTitle>EV Charger Dashboard</HeaderTitle>

		<HeaderRight>
			<HeaderItem>
				<ListMenu ariaLabel="no links" items={subMenuNoLinks} orientation="horizontal" />
			</HeaderItem>
		</HeaderRight>
	</Header>
</Story>
