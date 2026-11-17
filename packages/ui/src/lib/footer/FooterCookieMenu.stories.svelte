<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FooterCookieMenu from './FooterCookieMenu.svelte';

	/**
	 * The `FooterCookieMenu` component
	 * should be used within the [Footer](./?path=/docs/ui-components-layout-and-themes-footer--documentation).
	 *
	 * It combines the
	 * [CookieControlSettings](./?path=/docs/ui-components-layout-and-themes-meta-analytics-and-cookies-cookiecontrolsettings--documentation),
	 *  [PrivacyPolicyLink](./?path=/docs/ui-components-layout-and-themes-meta-analytics-and-cookies-privacypolicylink--documentation) and
	 * [ThemeSwitcher](./?path=/docs/ui-components-layout-and-themes-theme-switcher--documentation)
	 * controls used within the `<Footer>`.
	 *
	 * Note, if `<AnalyticsAndCookieConsent />` is not in your app or configured incorrectly,
	 * 'Cookie Settings' will not appear even when otherwise expected.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Footer/FooterCookieMenu',
		component: FooterCookieMenu,
		tags: ['autodocs']
	});

	// hack to make the "View cookie settings" link appear
	window.CookieControl = () => {};
</script>

<Story name="Default">
	{#snippet template()}
		<FooterCookieMenu />
	{/snippet}
</Story>
