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

	interface Props {
		config: OAuthConfig;
	}

	let { config }: Props = $props();
</script>

<div class="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
	<div class="mx-2 max-w-md bg-white shadow-lg lg:w-[470px]">
		<div class="bg-color-container-level-1 text-color-text dark relative p-4">
			<p class="text-lg font-medium">{config.app_name}: Log In</p>
		</div>

		<form class="space-y-4 p-3">
			<span>You must be logged-in to access this site.</span>

			{#if $accessToken && !$roles.includes(config.role_name)}
				<Callout status="negative">
					{#snippet title()}
						No access
					{/snippet}

					{#snippet body()}
						You are logged-in as <b>{$userName}</b>, but do not have the required role (<b
							>{config.role_name}</b
						>) to access this site.
					{/snippet}
				</Callout>

				<Button onclick={() => logout(config)}>Log Out</Button>
			{:else}
				{#if $authError}
					<Callout status="negative">
						{#snippet title()}
							Error logging in
						{/snippet}

						{#snippet body()}
							{$authError}
						{/snippet}
					</Callout>
				{/if}

				<Button onclick={() => redirectToAuthorizationEndpoint(config)}>
					Click here to log in.
				</Button>
			{/if}
		</form>
	</div>
</div>
