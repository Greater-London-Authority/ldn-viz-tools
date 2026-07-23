import { describe, expect, it } from 'vitest';
import { GeocoderAdapterList } from './GeocoderAdapterList';
import type { GeolocationNamed } from './types';

const locations: GeolocationNamed[] = [
	{ id: '1', name: 'London Bridge', address: '10 Bridge St, SE1', center: [-0.087, 51.507] },
	{ id: '2', name: 'Tower Bridge', address: 'Tower Bridge Rd, SE1', center: [-0.075, 51.505] },
	{ id: '3', name: 'Camden Market', address: 'Camden, NW1', center: [-0.146, 51.541] },
	// A location with no name, only an address.
	{ id: '4', address: 'Somewhere in Soho, W1', center: [-0.132, 51.513] }
];

describe('GeocoderAdapterList', () => {
	it('matches on name (case-insensitively)', async () => {
		const adapter = new GeocoderAdapterList(locations);
		const results = await adapter.search('bridge');
		expect(results.map((r) => r.id)).toEqual(['1', '2']);
	});

	it('matches on address', async () => {
		const adapter = new GeocoderAdapterList(locations);
		const results = await adapter.search('soho');
		expect(results.map((r) => r.id)).toEqual(['4']);
	});

	it('returns an empty array when nothing matches', async () => {
		const adapter = new GeocoderAdapterList(locations);
		const results = await adapter.search('Manchester');
		expect(results).toEqual([]);
	});

	it('handles locations missing a name or address without throwing', async () => {
		const adapter = new GeocoderAdapterList([{ id: 'x', center: [0, 0] } as GeolocationNamed]);
		await expect(adapter.search('anything')).resolves.toEqual([]);
	});

	it('returns all locations for an empty query (substring behaviour)', async () => {
		const adapter = new GeocoderAdapterList(locations);
		const results = await adapter.search('');
		expect(results).toHaveLength(locations.length);
	});

	describe('fluent configuration', () => {
		it('setLocations returns this and updates locations()', () => {
			const adapter = new GeocoderAdapterList();
			const returned = adapter.setLocations(locations);
			expect(returned).toBe(adapter);
			expect(adapter.locations()).toBe(locations);
		});

		it('attribution is undefined until setAttribution is called', () => {
			const adapter = new GeocoderAdapterList(locations);
			expect(adapter.attribution()).toBeUndefined();

			const attribution = { text: 'Ordnance Survey', link: 'https://os.uk' };
			const returned = adapter.setAttribution(attribution);
			expect(returned).toBe(adapter);
			expect(adapter.attribution()).toEqual(attribution);
		});
	});
});
