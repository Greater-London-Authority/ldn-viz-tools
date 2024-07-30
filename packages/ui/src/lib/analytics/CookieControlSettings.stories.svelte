<script context="module">
	import CookieControlSettings from './CookieControlSettings.svelte';
	export const meta = {
		title: 'Ui/AnalyticsAndCookieConsent/CookieControlSettings',
		component: CookieControlSettings
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { writable } from 'svelte/store';

	// hack to make the "View cookie settings" link appear
	window.CookieControl = writable(true);
</script>

<Template let:args>
	<CookieControlSettings {...args} />
</Template>

<!-- The modal doesn't actually open in this story, as the Storybook site isn't using the Civic Cookie Control.-->
<Story name="Default" source />
