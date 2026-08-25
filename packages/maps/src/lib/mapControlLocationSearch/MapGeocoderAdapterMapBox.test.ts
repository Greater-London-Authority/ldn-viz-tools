import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { GREATER_LONDON_BOUNDS_PADDED } from '../themes/bounds';
import { MapGeocoderAdapterMapBox } from './MapGeocoderAdapterMapBox';

describe('MapGeocoderAdapterMapBox', () => {
	beforeEach(() => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('setResultCount', () => {
		test('clamps values above 10 down to 10 and warns', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () => Promise.resolve({ suggestions: [] })
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterMapBox('token');
			const result = adapter.setResultCount(20);

			expect(result).toBe(adapter);
			expect(console.warn).toHaveBeenCalled();

			await adapter.search('a');
			expect(fetchMock.mock.calls[0][0] as string).toContain('limit=10');
		});

		test('clamps values below 1 up to 1 and warns', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () => Promise.resolve({ suggestions: [] })
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterMapBox('token');
			const result = adapter.setResultCount(0);

			expect(result).toBe(adapter);
			expect(console.warn).toHaveBeenCalled();

			await adapter.search('a');
			expect(fetchMock.mock.calls[0][0] as string).toContain('limit=1');
		});
	});

	describe('search', () => {
		test('fetches the suggest URL with query text, session token, and bbox, and maps the response', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({
						suggestions: [
							{ mapbox_id: 'abc', name: 'Trafalgar Square', place_formatted: 'London, UK' }
						]
					})
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterMapBox('my-token');
			const result = await adapter.search('Trafalgar Sq');

			const requestedUrl = fetchMock.mock.calls[0][0] as string;
			expect(requestedUrl).toContain('https://api.mapbox.com/search/searchbox/v1/suggest');
			expect(requestedUrl).toContain('q=Trafalgar%20Sq');
			expect(requestedUrl).toContain('session_token=');
			expect(requestedUrl).toContain(
				encodeURIComponent(GREATER_LONDON_BOUNDS_PADDED.flat().toString())
			);

			expect(result).toEqual([{ id: 'abc', name: 'Trafalgar Square', address: 'London, UK' }]);
		});
	});

	describe('retrieve', () => {
		test('fetches the retrieve URL for the given id and maps only the first feature', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({
						features: [
							{
								properties: {
									mapbox_id: 'abc',
									name: 'Trafalgar Square',
									place_formatted: 'London, UK'
								},
								geometry: { coordinates: [-0.128, 51.508] }
							},
							{
								properties: { mapbox_id: 'def', name: 'Other', place_formatted: 'Elsewhere' },
								geometry: { coordinates: [0, 0] }
							}
						]
					})
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterMapBox('my-token');
			const result = await adapter.retrieve('abc');

			const requestedUrl = fetchMock.mock.calls[0][0] as string;
			expect(requestedUrl).toContain('https://api.mapbox.com/search/searchbox/v1/retrieve/abc');

			expect(result).toEqual({
				id: 'abc',
				name: 'Trafalgar Square',
				address: 'London, UK',
				center: [-0.128, 51.508]
			});
		});
	});

	describe('attribution', () => {
		test('returns the fixed MapBox attribution text and link', () => {
			const adapter = new MapGeocoderAdapterMapBox('token');

			expect(adapter.attribution()).toEqual({
				text: 'Powered by MapBox',
				link: 'https://docs.mapbox.com/api/search/'
			});
		});
	});

	describe('session token', () => {
		test('two adapters get different session tokens', async () => {
			let counter = 0;
			vi.stubGlobal('crypto', {
				...crypto,
				randomUUID: () => `token-${counter++}`
			});

			const fetchMock = vi.fn().mockResolvedValue({
				json: () => Promise.resolve({ suggestions: [] })
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapterA = new MapGeocoderAdapterMapBox('token');
			const adapterB = new MapGeocoderAdapterMapBox('token');

			await adapterA.search('a');
			await adapterB.search('b');

			const urlA = fetchMock.mock.calls[0][0] as string;
			const urlB = fetchMock.mock.calls[1][0] as string;

			expect(urlA).toContain('session_token=token-0');
			expect(urlB).toContain('session_token=token-1');
		});
	});
});
