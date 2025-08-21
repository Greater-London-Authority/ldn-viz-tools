<script lang="ts">
	/**
	 * The `LoginForm` prompts the user to log in, with a link to the authorization server.
	 */
	import { Button, Callout } from '@ldn-viz/ui';
	import {
		accessToken,
		authError,
		logout,
		type OAuthConfig,
		redirectToAuthorizationEndpoint,
		roles,
		userName
	} from './auth';

	export let config: OAuthConfig;
</script>

<div class="flex flex-col items-center justify-center absolute inset-0 bg-core-grey-50">
	<div class="max-w-md lg:w-[470px] bg-white shadow-lg mx-2">
		<div class="bg-core-grey-600 text-white p-4 relative">
			<p class="text-lg font-medium">{config.app_name}: Log In</p>
		</div>

		<form class="p-3 space-y-4">
			<span>You must be logged-in to access this site.</span>

			{#if $accessToken && !$roles.includes(config.role_name)}
				<Callout status="error">
					<svelte:fragment slot="title">No access</svelte:fragment>

					<svelte:fragment slot="body">
						You are logged-in as <b>{$userName}</b>, but do not have the required role (<b
							>{config.role_name}</b
						>) to access this site.
					</svelte:fragment>
				</Callout>

				<Button on:click={() => logout(config)}>Log Out</Button>
			{:else}
				{#if $authError}
					<Callout status="error">
						<svelte:fragment slot="title">Error logging in</svelte:fragment>

						<svelte:fragment slot="body">
							{$authError}
						</svelte:fragment>
					</Callout>
				{/if}

				<Button on:click={() => redirectToAuthorizationEndpoint(config)}>
					Click here to log in.
				</Button>
			{/if}
		</form>
	</div>
</div>
