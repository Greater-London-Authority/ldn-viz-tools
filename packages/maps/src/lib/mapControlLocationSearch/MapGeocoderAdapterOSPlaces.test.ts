import { describe, test, expect, vi } from 'vitest';
import { GREATER_LONDON_BOUNDS_BNG_PADDED } from '../themes/bounds';
import { MapGeocoderAdapterOSPlaces } from './MapGeocoderAdapterOSPlaces';

describe('MapGeocoderAdapterOSPlaces', () => {
	describe('search', () => {
		test('fetches the find URL with query, key, maxresults, dataset, and bbox', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () => Promise.resolve({ results: [] })
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterOSPlaces('my-key', 7);
			await adapter.search('Trafalgar Square');

			const requestedUrl = fetchMock.mock.calls[0][0] as string;
			expect(requestedUrl).toContain('https://api.os.uk/search/places/v1/find');
			expect(requestedUrl).toContain('query=Trafalgar+Square');
			expect(requestedUrl).toContain('key=my-key');
			expect(requestedUrl).toContain('maxresults=7');
			expect(requestedUrl).toContain('dataset=LPI');
			expect(requestedUrl).toContain(
				encodeURIComponent(GREATER_LONDON_BOUNDS_BNG_PADDED.flat().toString())
			);
		});

		test('prefers DPA over LPI when a result has both', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({
						results: [
							{
								DPA: { UPRN: 'dpa-1', ADDRESS: 'DPA Address', LNG: -0.1, LAT: 51.5 },
								LPI: { UPRN: 'lpi-1', ADDRESS: 'LPI Address', LNG: -0.2, LAT: 51.6 }
							}
						]
					})
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterOSPlaces('my-key');
			const result = await adapter.search('x');

			expect(result).toEqual([{ id: 'dpa-1', address: 'DPA Address', center: [-0.1, 51.5] }]);
		});

		test('falls back to LPI when only LPI is present', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({
						results: [
							{
								LPI: { UPRN: 'lpi-1', ADDRESS: 'LPI Address', LNG: -0.2, LAT: 51.6 }
							}
						]
					})
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterOSPlaces('my-key');
			const result = await adapter.search('x');

			expect(result).toEqual([{ id: 'lpi-1', address: 'LPI Address', center: [-0.2, 51.6] }]);
		});

		test('returns an empty array when the response has no results key', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () => Promise.resolve({})
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterOSPlaces('my-key');
			const result = await adapter.search('x');

			expect(result).toEqual([]);
		});
	});

	describe('retrieve', () => {
		test('resolves the matching entry from the previous search() call', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () =>
					Promise.resolve({
						results: [{ DPA: { UPRN: 'dpa-1', ADDRESS: 'DPA Address', LNG: -0.1, LAT: 51.5 } }]
					})
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterOSPlaces('my-key');
			await adapter.search('x');

			const result = await adapter.retrieve('dpa-1');
			expect(result).toEqual({ id: 'dpa-1', address: 'DPA Address', center: [-0.1, 51.5] });
		});

		test('resolves undefined (rather than rejecting) when there is no match', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () => Promise.resolve({ results: [] })
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterOSPlaces('my-key');
			await adapter.search('x');

			await expect(adapter.retrieve('unknown-id')).resolves.toBeUndefined();
		});
	});

	describe('setResultCount', () => {
		test('does not clamp its input, unlike the MapBox adapter', async () => {
			const fetchMock = vi.fn().mockResolvedValue({
				json: () => Promise.resolve({ results: [] })
			});
			vi.stubGlobal('fetch', fetchMock);

			const adapter = new MapGeocoderAdapterOSPlaces('my-key');
			adapter.setResultCount(500);

			await adapter.search('x');
			expect(fetchMock.mock.calls[0][0] as string).toContain('maxresults=500');
		});
	});

	describe('attribution', () => {
		test('returns the fixed OS Places attribution text and link', () => {
			const adapter = new MapGeocoderAdapterOSPlaces('my-key');

			expect(adapter.attribution()).toEqual({
				text: 'OS Places',
				link: 'https://osdatahub.os.uk/docs/places/overview'
			});
		});
	});
});
