<script lang="ts">
	/**
	 * The `LoginLink` component renders a link to log in with the authorization server.
	 *
	 * @component
	 */
	import { Button } from '@ldn-viz/ui';
	import { type OAuthConfig, redirectToAuthorizationEndpoint } from './auth';

	interface Props {
		config: OAuthConfig;
	}

	let { config }: Props = $props();
</script>

<Button variant="text" size="sm" onclick={() => redirectToAuthorizationEndpoint(config)}>
	Log in
</Button>
