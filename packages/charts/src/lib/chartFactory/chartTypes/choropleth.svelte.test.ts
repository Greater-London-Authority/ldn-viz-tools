import { flushSync } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ChartDataRow, ChartOptions, ChoroplethOptions } from '../chartOptions';
import { choropleth, makeChoroplethFromURL } from './choropleth';

const geojson = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { name: 'A' },
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[0, 0],
						[0, 1],
						[1, 1],
						[0, 0]
					]
				]
			}
		}
	]
};

const options = { chartType: 'choropleth' } as unknown as ChartOptions;
const data: ChartDataRow[] = [{ xd: 'A', b: '', y: 1 }];
const colorChoice = { domain: [0], range: ['red'] };

const stubFetch = (response: Partial<Response>) => {
	const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => response as Response);
	vi.stubGlobal('fetch', fetchMock);
	return fetchMock;
};

const okResponse = (body: unknown) => ({ ok: true, json: async () => body });

// resolve pending promises (the mocked fetch and the .then callbacks chained on it)
const settle = () => new Promise((resolve) => setTimeout(resolve));

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe('makeChoroplethFromURL', () => {
	it('does not fetch until a chart is drawn', () => {
		const fetchMock = stubFetch(okResponse(geojson));
		makeChoroplethFromURL('/areas.geojson', 'name');
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('returns an empty map while loading, then the choropleth', async () => {
		const fetchMock = stubFetch(okResponse(geojson));
		const generator = makeChoroplethFromURL('/areas.geojson', 'name');

		expect(generator(options, data, colorChoice, 300)).toEqual({
			width: 300,
			height: 300,
			marks: []
		});

		await settle();

		const spec = generator(options, data, colorChoice, 300);
		expect(spec.marks).toHaveLength(2);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith('/areas.geojson', {
			headers: { Accept: 'application/geo+json' }
		});
	});

	it('re-runs a reactive caller once the GeoJSON has loaded', async () => {
		stubFetch(okResponse(geojson));
		const generator = makeChoroplethFromURL('/areas.geojson', 'name');

		const markCounts: number[] = [];
		const cleanup = $effect.root(() => {
			const spec = $derived(generator(options, data, colorChoice, 300));
			$effect(() => {
				markCounts.push(spec.marks?.length ?? 0);
			});
		});

		flushSync();
		expect(markCounts).toEqual([0]);

		await settle();
		flushSync();
		expect(markCounts).toEqual([0, 2]);

		cleanup();
	});

	it('logs an error and keeps the empty map when the request fails', async () => {
		const fetchMock = stubFetch({ ok: false, status: 404, statusText: 'Not Found' });
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		const generator = makeChoroplethFromURL('/missing.geojson', 'name');

		generator(options, data, colorChoice, 300);
		await settle();

		expect(consoleError).toHaveBeenCalledOnce();
		expect(generator(options, data, colorChoice, 300).marks).toEqual([]);
		// a failed request is not retried on every redraw
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it('rejects a response that is not a FeatureCollection', async () => {
		stubFetch(okResponse({ type: 'Feature' }));
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		const generator = makeChoroplethFromURL('/feature.geojson', 'name');

		generator(options, data, colorChoice, 300);
		await settle();

		expect(consoleError.mock.calls[0][0].message).toMatch(/not a GeoJSON FeatureCollection/);
	});

	it('rejects a FeatureCollection with no areas', async () => {
		stubFetch(okResponse({ type: 'FeatureCollection', features: [] }));
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		const generator = makeChoroplethFromURL('/empty.geojson', 'name');

		generator(options, data, colorChoice, 300);
		await settle();

		expect(consoleError.mock.calls[0][0].message).toMatch(/contains no areas/);
	});
});

// `choropleth` caches its generators for the lifetime of the module, so each test uses
// a different area type to start from an empty cache.
describe('choropleth', () => {
	const choroplethOptions = (extra: Partial<ChoroplethOptions>) =>
		({ chartType: 'choropleth', ...extra }) as ChoroplethOptions;

	it('fetches the boundaries for options.areaType, once', async () => {
		const fetchMock = stubFetch(okResponse(geojson));
		const opts = choroplethOptions({ areaType: 'borough' });

		choropleth(opts, data, colorChoice, 300);
		await settle();
		const spec = choropleth(opts, data, colorChoice, 300);

		expect(spec.marks).toHaveLength(2);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(
			'https://apps.london.gov.uk/api/tables/geographies/areas_simplified?type=eq.borough',
			{ headers: { Accept: 'application/geo+json' } }
		);
	});

	it('fetches separately for each area type', async () => {
		const fetchMock = stubFetch(okResponse(geojson));

		choropleth(choroplethOptions({ areaType: 'lsoa-2021' }), data, colorChoice, 300);
		choropleth(choroplethOptions({ areaType: 'msoa-2021' }), data, colorChoice, 300);
		await settle();

		expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
			'https://apps.london.gov.uk/api/tables/geographies/areas_simplified?type=eq.lsoa-2021',
			'https://apps.london.gov.uk/api/tables/geographies/areas_simplified?type=eq.msoa-2021'
		]);
	});

	it('joins on options.joinKey', async () => {
		const withId = {
			...geojson,
			features: geojson.features.map((f) => ({
				...f,
				properties: { ...f.properties, id: 'E05000001' }
			}))
		};
		stubFetch(okResponse(withId));
		const opts = choroplethOptions({ areaType: 'ward-2022', joinKey: 'id' });

		choropleth(opts, [{ xd: 'E05000001', b: '', y: 7 }], colorChoice, 300);
		await settle();
		const spec = choropleth(opts, [{ xd: 'E05000001', b: '', y: 7 }], colorChoice, 300);

		// the first mark is the Plot.geo mark, whose data are the joined features
		const features = (spec.marks?.[0] as unknown as { data: { properties: { value: number } }[] })
			.data;
		expect(features[0].properties.value).toBe(7);
	});

	describe('missingDataColor', () => {
		const twoAreas = {
			...geojson,
			features: [geojson.features[0], { ...geojson.features[0], properties: { name: 'B' } }]
		};

		type GeoMark = { data: { properties: { name: string } }[]; fill?: unknown };
		const geoMarks = (spec: { marks?: unknown[] }) =>
			(spec.marks ?? []).filter(
				(m) => (m as { ariaLabel?: string }).ariaLabel === 'geo'
			) as GeoMark[];

		it('does not draw areas with no data when not set', async () => {
			stubFetch(okResponse(twoAreas));
			const opts = choroplethOptions({ areaType: 'lsoa-2011' });

			choropleth(opts, data, colorChoice, 300);
			await settle();
			const spec = choropleth(opts, data, colorChoice, 300);

			expect(geoMarks(spec)).toHaveLength(1);
		});

		it('fills areas with no data with missingDataColor', async () => {
			stubFetch(okResponse(twoAreas));
			const opts = choroplethOptions({ areaType: 'oa-2021', missingDataColor: '#ccc' });

			choropleth(opts, data, colorChoice, 300);
			await settle();
			const spec = choropleth(opts, data, colorChoice, 300);

			const marks = geoMarks(spec);
			expect(marks).toHaveLength(2);
			expect(marks[1].data.map((d) => d.properties.name)).toEqual(['B']);
			expect(marks[1].fill).toBe('#ccc');
		});
	});
});
