<script lang="ts">
	import AppSidebar from '$lib/components/sidebar/AppSidebar.svelte';
	import { AnalyticsAndCookieConsent, AppShell, Theme } from '@ldn-viz/ui';

	import '../app.postcss';

	let { children } = $props();
</script>

<AnalyticsAndCookieConsent />
<Theme />

<!-- App sidebar is currently set to always open as this shifts map into correct place although does not work well on a mobile-->
<AppShell sidebarPush>
	{#snippet main()}
		{@render children?.()}
	{/snippet}
	{#snippet sidebar()}
		<AppSidebar />
	{/snippet}
</AppShell>
