<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import HandleRedirectFromAuth from './HandleRedirectFromAuth.svelte';

	/**
	 * The `HandleRedirectComponent` is a headless component, which should be included in the `layout.svelte` file.
	 * It recognises when the user has been redirected from the authorization server
	 * (the initial redirect from the app to the OAuth provider is triggered by `redirectToAuthorizationEndpoint()`).
	 * It exchanges an Authorization code for an Access Token and Refresh Token, which are stored in Svelte stores.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Auth/HandleRedirectFromAuth',
		component: HandleRedirectFromAuth,
		tags: ['autodocs']
	});
</script>

<!-- This story is empty, as we don't actually want to redirect from Storybook. -->
<Story name="Default" source />
