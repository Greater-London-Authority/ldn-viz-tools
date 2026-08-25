<script lang="ts">
	import CookieControlSettings from '../analytics/CookieControlSettings.svelte';
	import PrivacyPolicyLink from '../analytics/PrivacyPolicyLink.svelte';
	import ThemeSwitcher from '../theme/ThemeSwitcher.svelte';
</script>

<div class="flex justify-between">
	<ul class="flex space-x-2 leading-none">
		<li><CookieControlSettings size="xs" /></li>
		<li><PrivacyPolicyLink size="xs" /></li>
	</ul>
	<ThemeSwitcher size="xs" />
</div>
