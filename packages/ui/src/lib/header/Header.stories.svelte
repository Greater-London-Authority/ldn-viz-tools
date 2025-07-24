<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { subMenu } from '../navigationMenu/NavigationMenu.stories.svelte';
	import NavigationMenu from '../navigationMenu/NavigationMenu.svelte';
	import Header from './Header.svelte';
	import HeaderItem from './HeaderItem.svelte';
	import HeaderRight from './HeaderRight.svelte';
	import HeaderTitle from './HeaderTitle.svelte';

	let { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Header',
		component: Header as any,
		subcomponents: { HeaderItem, HeaderRight, HeaderTitle, NavigationMenu },
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Header></Header>
	{/snippet}
</Story>

<Story name="Title only">
	{#snippet template()}
		<Header>
			<HeaderTitle>App title</HeaderTitle>
		</Header>
	{/snippet}
</Story>

<Story name="Title and menu-right">
	{#snippet template()}
		<Header>
			<HeaderTitle>App title</HeaderTitle>
			<HeaderRight>
				<HeaderItem>
					<NavigationMenu ariaLabel="Main menu" items={subMenu} orientation="horizontal" />
				</HeaderItem>
			</HeaderRight>
		</Header>
	{/snippet}
</Story>

<Story name="Title, links, and auth section">
	{#snippet template()}
		<Header>
			<HeaderTitle>App title</HeaderTitle>

			<HeaderItem>
				<NavigationMenu ariaLabel="Main menu" items={subMenu} orientation="horizontal" />
			</HeaderItem>

			<HeaderRight>
				<!-- This would come from your auth menu Component in your app -->
				<HeaderItem>
					<span class="text-xs">Logged in as <b>Bob Smith</b></span>
				</HeaderItem>

				<HeaderItem>
					<a class="text-xs" href="/#">Log Out</a>
				</HeaderItem>
			</HeaderRight>
		</Header>
	{/snippet}
</Story>

<Story name="Light Theme">
	{#snippet template()}
		<Header theme="light">
			<HeaderTitle>App title</HeaderTitle>
			<HeaderRight>
				<HeaderItem>
					<NavigationMenu ariaLabel="Main menu" items={subMenu} orientation="horizontal" />
				</HeaderItem>
			</HeaderRight>
		</Header>
	{/snippet}
</Story>
