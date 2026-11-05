import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	accessToken,
	authorizedRoleName,
	fetchWithAuth,
	hasAccess,
	logout,
	redirectToAuthorizationEndpoint,
	roles,
	userName,
	type OAuthConfig
} from './auth';

const resetStores = () => {
	accessToken.set('');
	roles.set([]);
	userName.set('');
	// authorizedRoleName is typed as undefined by default; reset to a clean value.
	authorizedRoleName.set(undefined as any);
};

const oauthConfig: OAuthConfig = {
	app_name: 'Test App',
	client_id: 'test-client',
	role_name: 'viewer',
	redirect_uri: 'https://app.example/callback',
	post_login_url: 'https://app.example/',
	requested_scopes: 'openid profile',
	authorization_endpoint: 'https://idp.example/auth',
	token_endpoint: 'https://idp.example/token',
	logout_endpoint: 'https://idp.example/logout'
};

describe('auth stores', () => {
	beforeEach(resetStores);

	describe('hasAccess', () => {
		it('is falsy before any token is set', () => {
			expect(get(hasAccess)).toBeFalsy();
		});

		it('is falsy when a token is set but the role is missing', () => {
			authorizedRoleName.set('viewer' as any);
			accessToken.set('a-token');
			roles.set(['editor']);
			expect(get(hasAccess)).toBeFalsy();
		});

		it('is truthy once a token is set and the authorized role is present', () => {
			authorizedRoleName.set('viewer' as any);
			accessToken.set('a-token');
			roles.set(['viewer', 'editor']);
			expect(get(hasAccess)).toBeTruthy();
		});
	});
});

describe('fetchWithAuth', () => {
	beforeEach(resetStores);
	afterEach(() => vi.unstubAllGlobals());

	it('adds an Authorization header with the current access token', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response('ok'));
		vi.stubGlobal('fetch', fetchMock);
		accessToken.set('secret-token');

		await fetchWithAuth('https://api.example/data', { method: 'GET' });

		expect(fetchMock).toHaveBeenCalledWith('https://api.example/data', {
			method: 'GET',
			headers: { Authorization: 'Bearer secret-token' }
		});
	});

	it('preserves caller-supplied headers', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response('ok'));
		vi.stubGlobal('fetch', fetchMock);
		accessToken.set('secret-token');

		await fetchWithAuth('https://api.example/data', {
			headers: { 'Content-Type': 'application/json' }
		});

		expect(fetchMock).toHaveBeenCalledWith('https://api.example/data', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer secret-token'
			}
		});
	});

	it('works when no options are provided', async () => {
		const fetchMock = vi.fn().mockResolvedValue(new Response('ok'));
		vi.stubGlobal('fetch', fetchMock);
		accessToken.set('secret-token');

		await fetchWithAuth('https://api.example/data', undefined as any);

		expect(fetchMock).toHaveBeenCalledWith('https://api.example/data', {
			headers: { Authorization: 'Bearer secret-token' }
		});
	});
});

describe('logout', () => {
	beforeEach(resetStores);
	afterEach(() => vi.unstubAllGlobals());

	it('clears the auth stores and redirects to the logout endpoint', () => {
		accessToken.set('a-token');
		userName.set('alice');
		roles.set(['viewer']);

		const location = { href: '' };
		vi.stubGlobal('window', { location });

		logout(oauthConfig);

		expect(get(accessToken)).toBe('');
		expect(get(userName)).toBe('');
		expect(get(roles)).toEqual([]);
		expect(location.href).toBe(oauthConfig.logout_endpoint);
	});
});

describe('redirectToAuthorizationEndpoint (PKCE)', () => {
	beforeEach(resetStores);
	afterEach(() => vi.unstubAllGlobals());

	it('stores PKCE state and verifier and redirects with an S256 challenge', async () => {
		const store = new Map<string, string>();
		const localStorageStub = {
			setItem: (k: string, v: string) => store.set(k, v),
			getItem: (k: string) => store.get(k) ?? null
		};
		const location = { href: '' };
		// The module uses window.crypto; delegate to Node's Web Crypto implementation.
		vi.stubGlobal('window', { crypto: globalThis.crypto, location });
		vi.stubGlobal('localStorage', localStorageStub);

		await redirectToAuthorizationEndpoint(oauthConfig);

		expect(store.get('pkce_state')).toBeTruthy();
		expect(store.get('pkce_code_verifier')).toBeTruthy();

		expect(location.href).toContain(oauthConfig.authorization_endpoint);
		expect(location.href).toContain('response_type=code');
		expect(location.href).toContain('code_challenge_method=S256');
		expect(location.href).toContain(`client_id=${oauthConfig.client_id}`);
		expect(location.href).toContain(`state=${store.get('pkce_state')}`);
	});
});
