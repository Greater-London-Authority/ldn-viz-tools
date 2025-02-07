<script context="module" lang="ts">
	import Header from './Header.svelte';
	import HeaderItem from './HeaderItem.svelte';
	import HeaderRight from './HeaderRight.svelte';
	import HeaderTitle from './HeaderTitle.svelte';
	import NavLink from './NavLink.svelte';
	import NavLinks from './NavLinks.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And ThemesHeader',
		component: Header,
		subcomponents: { HeaderItem, HeaderRight, HeaderTitle, NavLink, NavLinks }
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Header {...args} />
</Template>

<Story
	name="NavBar - title only"
	parameters={{
		layout: 'fullscreen'
	}}
>
	<Header>
		<HeaderTitle>An interesting app</HeaderTitle>
	</Header>
</Story>

<Story name="A NavBar - title and links to pages">
	<Header>
		<HeaderTitle>EV Charger Dashboard</HeaderTitle>

		<NavLinks>
			<NavLink target="map">Map</NavLink>

			<NavLink target="trends">Trends</NavLink>
		</NavLinks>
	</Header>
</Story>

<Story name="A NavBar - title, links, and auth section">
	<Header>
		<HeaderTitle>EV Charger Dashboard</HeaderTitle>

		<NavLinks>
			<NavLink target="map">Map</NavLink>

			<NavLink target="trends">Trends</NavLink>
		</NavLinks>

		<HeaderRight>
			<HeaderItem>
				<span>Logged in as <b>Bob Smith</b></span>
			</HeaderItem>

			<HeaderItem>
				<a href="/#">Log Out</a>
			</HeaderItem>
		</HeaderRight>
	</Header>
</Story>

<Story name="Light Theme (Experimental)">
	<Header theme="light">
		<HeaderTitle>EV Charger Dashboard</HeaderTitle>

		<NavLinks>
			<NavLink target="map">Map</NavLink>

			<NavLink target="trends">Trends</NavLink>
		</NavLinks>
	</Header>
</Story>
