<script context="module">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CookieControlSettings from './CookieControlSettings.svelte';
	/**
	 * The `CookieControlSettings` component provides a button which can be clicked on to open the cookie settings modal.
	 * @component
	 * */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Meta, Analytics And Cookies/CookieControlSettings',
		component: CookieControlSettings,
		tags: ['autodocs']
	});

	// hack to make the "View cookie settings" link appear
	window.CookieControl = () => {};
</script>

<!-- The modal doesn't actually open in this story, as the Storybook site isn't using the Civic Cookie Control.-->
<Story name="Default">
	{#snippet template()}
		<CookieControlSettings />
	{/snippet}
</Story>

<Story name="With Button props">
	{#snippet template()}
		<CookieControlSettings variant="solid" slim={false} />
	{/snippet}
</Story>
