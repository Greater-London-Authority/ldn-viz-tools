<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { subMenu } from '../navigationMenu/NavigationMenu.stories.svelte';
	import NavigationMenu from '../navigationMenu/NavigationMenu.svelte';
	import Header from './Header.svelte';
	import HeaderItem from './HeaderItem.svelte';
	import HeaderRight from './HeaderRight.svelte';
	import HeaderTitle from './HeaderTitle.svelte';

	/**
	 * The `<Header>` component appears at the top of a page.
	 * It typically includes the app name, links to other pages (if the app has multiple pages), and a login/logout control (if the app requires authentication).
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Header',
		component: Header as any,
		tags: ['autodocs'],
		subcomponents: { HeaderItem, HeaderRight, HeaderTitle, NavigationMenu },
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<script lang="ts">
	import { Home } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
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

<!-- A very long title alongside a horizontal navigation menu. -->
<Story name="Long title overflow">
	{#snippet template()}
		<Header>
			<HeaderTitle>
				A very long application title that keeps going and going to demonstrate overflow behaviour
			</HeaderTitle>
			<HeaderRight>
				<HeaderItem>
					<NavigationMenu ariaLabel="Main menu" items={subMenu} orientation="horizontal" />
				</HeaderItem>
			</HeaderRight>
		</Header>
	{/snippet}
</Story>

<!-- Many navigation links inside `HeaderRight`, to show how the flex row behaves when it
	runs out of horizontal space. -->
<Story name="Overflowing nav items">
	{#snippet template()}
		<Header>
			<HeaderTitle>App title</HeaderTitle>
			<HeaderRight>
				<HeaderItem><a class="text-xs" href="/#">Overview</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Analysis</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Datasets</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Reports</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Dashboards</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Documentation</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Settings</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Notifications</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Help &amp; support</a></HeaderItem>
				<HeaderItem><a class="text-xs" href="/#">Account</a></HeaderItem>
			</HeaderRight>
		</Header>
	{/snippet}
</Story>

<!-- HeaderTitle stories -->

<!-- The `base` prop is prepended to construct the homepage link. Here it is set to `/app`,
	so the title links to `/app` rather than the default `/`. -->
<Story name="Custom base path">
	{#snippet template()}
		<Header>
			<HeaderTitle base="/app">App title</HeaderTitle>
		</Header>
	{/snippet}
</Story>

<!-- The title can include an icon alongside the text. -->
<Story name="Title with icon">
	{#snippet template()}
		<Header>
			<HeaderTitle>
				<span class="inline-flex items-center gap-2">
					<Icon src={Home} theme="mini" class="h-5 w-5" aria-hidden="true" />
					App title
				</span>
			</HeaderTitle>
		</Header>
	{/snippet}
</Story>
