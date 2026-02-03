<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LogoMayor from '../logos/LogoMayor.svelte';
	import Footer from './Footer.svelte';

	/**
	 * The `<Footer>` component appears at the bottom of a page.
	 */

	let { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Footer',
		component: Footer as any,
		tags: ['autodocs'],
		// subcomponents: { HeaderItem, HeaderRight, HeaderTitle, NavigationMenu },
		parameters: {
			layout: 'fullscreen'
		}
	});

	// hack to make the "View cookie settings" link appear
	window.CookieControl = () => {};
</script>

<Story name="Default">
	{#snippet template()}
		<Footer showCiuLogo showCookieMenu><p>Footer Children</p></Footer>
	{/snippet}
</Story>

<Story name="with logo attribution">
	{#snippet template()}
		<Footer showCiuLogo><p>Footer Children</p></Footer>
	{/snippet}
</Story>

{#snippet logos()}
	<LogoMayor class="w-[164px]" />
{/snippet}

<Story name="With Custom logos">
	{#snippet template()}
		<Footer {logos}><p>Footer Children</p></Footer>
	{/snippet}
</Story>

<Story name="Without children">
	{#snippet template()}
		<Footer {logos} />
	{/snippet}
</Story>

<Story name="With Cookie menu">
	{#snippet template()}
		<Footer showCookieMenu><p>Footer Children</p></Footer>
	{/snippet}
</Story>

{#snippet footerCookieMenu()}
	<div class="text-color-text-primary">This would be a custom text or menu</div>
{/snippet}

<Story name="With Custom Cookie menu">
	{#snippet template()}
		<Footer {footerCookieMenu}><p>Footer Children</p></Footer>
	{/snippet}
</Story>

<Story name="Light Theme">
	{#snippet template()}
		<Footer theme="light" showCiuLogo showCookieMenu><p>Footer Children</p></Footer>
	{/snippet}
</Story>
