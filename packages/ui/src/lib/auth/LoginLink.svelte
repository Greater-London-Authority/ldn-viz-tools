<script lang="ts">
	/**
	 * The `LoginLink` component renders a link to log in with the authorization server.
	 *
	 * @component
	 */
	import { type OAuthConfig, redirectToAuthorizationEndpoint } from './auth';
	import { Button } from '@ldn-viz/ui';

	export let config: OAuthConfig;
</script>

<Button variant="text" size="sm" on:click={() => redirectToAuthorizationEndpoint(config)}>
	Log in
</Button>
