<script lang="ts">
	/**
	 * The `AuthMenu` component is intended to be used in a Header.
	 * Depending on whether the user is already logged-in, it displays either a login link,
	 * or the current username and a log-out button.
	 * @component
	 */
	import { Button } from '@ldn-viz/ui';
	import LoginLink from './LoginLink.svelte';
	import { accessToken, logout, type OAuthConfig, userName } from './auth';

	export let config: OAuthConfig;
</script>

<div class="flex items-center dark">
	{#if $accessToken}
		<span>Logged in as: <span class="font-bold">{$userName}</span></span>
		<Button variant="text" size="sm" on:click={() => logout(config)}>Log Out</Button>
	{:else}
		<LoginLink {config} />
	{/if}
</div>
