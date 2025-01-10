<script context="module">
	import AnalyticsAndCookieConsent from './AnalyticsAndCookieConsent.svelte';

	export const meta = {
		title: 'Ui/AnalyticsAndCookieConsent/AnalyticsAndCookieConsent',
		component: AnalyticsAndCookieConsent
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<AnalyticsAndCookieConsent {...args} />
</Template>

<Story name="Default" source />
