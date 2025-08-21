<script lang="ts">
	/**
	 * The `HandleRedirectComponent` is a headless component, which should be included in the `layout.svelte` file.
	 * It recognises when the user has been redirected from the authorization server
	 * (the initial redirect from the app to the OAuth provider is triggered by `redirectToAuthorizationEndpoint()`).
	 * It exchanges an Authorization code for an Access Token and Refresh Token, which are stored in Svelte stores.
	 *
	 * @component
	 */

	import { goto } from '$app/navigation';
	import { accessToken, authError, type OAuthConfig, refreshToken, roles, userName } from './auth';
	import { onMount } from 'svelte';

	const refreshAccessToken = async (oauth_config: OAuthConfig): Promise<void> => {
		fetch(oauth_config.token_endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: $refreshToken,
				client_id: oauth_config.client_id
			})
		})
			.then((response) => response.json())
			.then((data) => {
				$accessToken = data.access_token;
				$refreshToken = data.refresh_token;

				// schedule to re-run
				// Store the new access token in local storage or session storage

				setTimeout(() => refreshAccessToken(oauth_config), data.expires_in * 1000 * 0.8);
			})
			.catch((error) => {
				console.error('Error refreshing access token:', error);
			});
	};

	const getAccessToken = (oauth_config: OAuthConfig) => {
		const params = new URL(window.location.href).searchParams;
		const error = params.get('error');
		const code = params.get('code');

		$authError = '';

		if (params.get('error')) {
			// TODO: display the error and error_description in a Callout component instead
			$authError = 'Error returned from authorization server: ' + error;
		} else if (!code) {
			return;
		} else if (localStorage.getItem('pkce_state') != params.get('state')) {
			// State returned by authorization server doesn't match what we initially provided
			$authError = 'Invalid state';
		} else {
			// Exchange the authorization code for an access token
			fetch(oauth_config.token_endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					code: code,
					client_id: oauth_config.client_id,
					redirect_uri: oauth_config.redirect_uri,
					code_verifier: localStorage.getItem('pkce_code_verifier') ?? ''
				})
			})
				.then((response) => response.json())
				.then((data) => {
					// save token in a store
					accessToken.set(data.access_token);
					refreshToken.set(data.refresh_token);

					setTimeout(() => refreshAccessToken(oauth_config), data.expires_in * 1000 * 0.8);

					const tokenObj = parseJwt(data.access_token);
					userName.set(tokenObj.preferred_username);
					roles.set(tokenObj.realm_access.roles);

					// Replace the history entry to remove the auth code from the browser address bar
					// TODO: use basepath
					// replaceState('/', {});
					goto(oauth_config.post_login_url, { replaceState: true });
				})
				.catch((error) => {
					// This could be an error response from the OAuth server, or an error because the
					// request failed such as if the OAuth server doesn't allow CORS requests
					// Store the error to be displayed in a Callout
					$authError = error;
				});
		}

		// Clean these up since we don't need them anymore
		localStorage.removeItem('pkce_state');
		localStorage.removeItem('pkce_code_verifier');
	};

	const parseJwt = (token: string) => {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);

		return JSON.parse(jsonPayload);
	};

	export let config: OAuthConfig;
	onMount(() => getAccessToken(config));
</script>
