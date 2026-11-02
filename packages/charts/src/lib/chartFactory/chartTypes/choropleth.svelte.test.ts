import type { PlotOptions } from '@observablehq/plot';
import { flushSync } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ChartDataRow, ChartOptions, ChoroplethOptions } from '../chartOptions';
import { plot } from '../../observablePlotFragments/plot';
import { choropleth, makeChoropleth, makeChoroplethFromURL } from './choropleth';

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
			expect(marks[1].fill).toBe('#ccc');

			// only area B, which has no data, is drawn by the second mark
			const svg = plot(spec as PlotOptions);
			const missingDataPaths = svg
				.querySelectorAll('g[aria-label="geo"]')[1]
				.querySelectorAll('path');
			expect(missingDataPaths).toHaveLength(1);
			expect(missingDataPaths[0].getAttribute('data-area-index')).toBe('1');
		});
	});
});

describe('choropleth tooltip', () => {
	const square = (name: string, x0: number) => ({
		type: 'Feature',
		properties: { name },
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[x0, 0],
					[x0 + 1, 0],
					[x0 + 1, 1],
					[x0, 1],
					[x0, 0]
				]
			]
		}
	});

	// two large areas side by side, so most of each is far (> 40px) from its centroid
	const drawMap = (missingDataColor?: string) => {
		const generator = makeChoropleth({ features: [square('West', 0), square('East', 1)] }, 'name');
		const options = { chartType: 'choropleth', missingDataColor } as unknown as ChartOptions;
		const svg = plot(
			generator(options, [{ xd: 'West', b: '', y: 5 }], colorChoice, 600) as PlotOptions
		);
		document.body.appendChild(svg);
		return svg;
	};

	const pointAt = (svg: Element, name: string, type = 'pointermove', offset = 0) => {
		const area = svg.querySelector(`[data-area-index="${name === 'West' ? 0 : 1}"]`)!;
		const { x, y, width, height } = area.getBoundingClientRect();
		area.dispatchEvent(
			new PointerEvent(type, {
				bubbles: true,
				clientX: x + width / 2 + offset,
				clientY: y + height / 2 + offset
			})
		);
	};

	const tip = (svg: Element) => svg.querySelector('g[aria-label="tip"]');
	const tipText = (svg: Element) =>
		tip(svg)
			?.textContent?.replace(/\u200b/g, ' ')
			.trim();

	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('shows the tip for the area under the cursor', () => {
		const svg = drawMap();
		expect(tipText(svg)).toBe('');

		pointAt(svg, 'West');
		expect(tipText(svg)).toBe('West 5');
	});

	it('shows the tip for an area with no data', () => {
		const svg = drawMap('#ccc');
		pointAt(svg, 'East');
		expect(tipText(svg)).toBe('East No data');
	});

	it('places the tip at the cursor, not at the centroid', () => {
		const svg = drawMap();
		const tipPosition = () => tip(svg)!.querySelector('g')!.getAttribute('transform');

		pointAt(svg, 'West');
		const atCentre = tipPosition();
		pointAt(svg, 'West', 'pointermove', 100);
		expect(tipText(svg)).toBe('West 5');
		expect(tipPosition()).not.toBe(atCentre);
	});

	it('hides the tip when the cursor leaves the map', () => {
		const svg = drawMap();
		pointAt(svg, 'West');
		svg.dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'mouse' }));
		expect(tipText(svg)).toBe('');
	});

	it('shows the tip when an area is tapped, and keeps it after the finger lifts', () => {
		const svg = drawMap('#ccc');
		pointAt(svg, 'East', 'pointerdown');
		svg.dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'touch' }));
		expect(tipText(svg)).toBe('East No data');
	});
});
