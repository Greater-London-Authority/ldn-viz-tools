<script context="module">
	import CookieControlSettings from './CookieControlSettings.svelte';
	export const meta = {
		title: 'Ui/Components - Layout And Themes/Meta, Analytics And Cookies/CookieControlSettings',
		component: CookieControlSettings
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import AnalyticsAndCookieConsent from './AnalyticsAndCookieConsent.svelte';
</script>

<Template let:args>
	<AnalyticsAndCookieConsent />
	<CookieControlSettings {...args} />
</Template>

<!-- The modal doesn't actually open in this story, as the Storybook site isn't using the Civic Cookie Control.-->
<Story name="Default" source />
