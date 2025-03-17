import { derived, get, writable } from 'svelte/store';

/**
 * Store containing the access token. This is what must be provided in the `Authorization` header of an API request.
 */
export const accessToken = writable('');

/**
 * Store containing the refresh token. This is exchanged for a new `accessToken` before it expire.
 */
export const refreshToken = writable('');

/**
 * Store containing the username of the logged-in user.
 * This is extracted from the access token.
 */
export const userName = writable('');

/**
 * Store containing a list of roles assigned to the logged-in user.
 * This is extracted from the access token.
 */
export const roles = writable<string[]>([]);

/**
 * Store containing error encountered during the process of logging tn.
 */
export const authError = writable('');

/**
 * Store containing name of role that is authorized to access the site.
 * You must set this, as the config object is not accessible here.
 */
export const authorizedRoleName = writable(undefined);
/**
 * Store containing a Boolean value indicating whether a user is logged in, and has the role defined in the OAuth config.
 * This is used to control whether the login form is displayed.
 */
export const hasAccess = derived(
	[accessToken, roles, authorizedRoleName],
	([$accessToken, $roles, $authorizedRoleName]) => {
		return $accessToken && $roles.includes($authorizedRoleName);
	}
);

export type OAuthConfig = {
	/**
	 * Label displayed in the login form.
	 */
	app_name: string;

	/**
	 * Client id. This must exactly match what the OAuth provider is expecting.
	 */
	client_id: string;

	/**
	 * Name of a role which users who have access to the app should have.
	 * This should be assigned to users in the OAuth provider.
	 */
	role_name: string;

	/**
	 * URL that the user will be redirected to from the OAuth provider's site.
	 */
	redirect_uri: string;

	/**
	 * URL that the user will be redirected to after the redirect from the OAUth provider's site has been processed.
	 */
	post_login_url: string;

	/**
	 * The scopes (subsets of user information) to request.
	 */
	requested_scopes: string;

	/* The remaining URLs are obtained from the OAuth provider.
	 * They may be lsited in an admin interface, or in a JOSN file in a well-known diretory such as:
	 * https://<keycloack-hostname>/realms/<realm-name>/.well-known/openid-configuration
	 *  */

	authorization_endpoint: string;
	token_endpoint: string;
	logout_endpoint: string;
};

const generateRandomString = () => {
	const array = new Uint32Array(28);
	window.crypto.getRandomValues(array);
	return Array.from(array, (number) => ('0' + number.toString(16)).slice(-2)).join('');
};

const sha256 = (plain: string) => {
	const encoder = new TextEncoder();
	return window.crypto.subtle.digest('SHA-256', encoder.encode(plain));
};

const base64urlencode = (arrayBuffer: ArrayBuffer) => {
	// const string = String.fromCharCode.apply(null, new Uint8Array(str));
	const string = Array.from(new Uint8Array(arrayBuffer))
		.map((v) => String.fromCharCode(v))
		.join('');

	// base64 encode, then URL encode
	return btoa(string).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

/**
 * Construct a challenge code and state, and redirect to the authorization endpoint.
 * This will typically show a login screen on the OAuth Provider's site, then redirect to the redirect_uri
 * (passing information as URL parameters).
 * The `HandleRedirectComponent` will then extract this information and obtain an access token.
 * @param oauth_config
 */
export const redirectToAuthorizationEndpoint = async (oauth_config: OAuthConfig) => {
	const state = generateRandomString();
	localStorage.setItem('pkce_state', state);

	const code_verifier = generateRandomString();
	localStorage.setItem('pkce_code_verifier', code_verifier);

	const code_challenge = base64urlencode(await sha256(code_verifier));

	window.location.href =
		oauth_config.authorization_endpoint +
		'?response_type=code' +
		'&client_id=' +
		encodeURIComponent(oauth_config.client_id) +
		'&state=' +
		encodeURIComponent(state) +
		'&scope=' +
		encodeURIComponent(oauth_config.requested_scopes) +
		'&redirect_uri=' +
		encodeURIComponent(oauth_config.redirect_uri) +
		'&code_challenge=' +
		encodeURIComponent(code_challenge) +
		'&code_challenge_method=S256';
};

/**
 * fetchWithAuth is a wrapper around the browser's `fetch` function.
 * It adds an Authorization header using the access token contained in the store.
 * @param url
 * @param options
 */
export const fetchWithAuth = (url: string, options: any) => {
	const newOptions = {
		...(options || {}),
		headers: {
			...(options?.headers || {}),
			Authorization: `Bearer ${get(accessToken)}`
		}
	};

	return fetch(url, newOptions);
};

/**
 * The `logout` function clears stores and redirects to the logout form on the OAuth provider.
 */
export const logout = (oauth_config: OAuthConfig) => {
	userName.set('');
	accessToken.set('');
	roles.set([]);
	window.location.href = oauth_config.logout_endpoint;
};
