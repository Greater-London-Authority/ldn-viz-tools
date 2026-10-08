import { Plot } from '../../observablePlotFragments/plot';

import type {
	ChartDataRow,
	ChartOptions,
	ChoroplethAreaType,
	ChoroplethOptions,
	ColorChoice
} from '../chartOptions';
import { enGBLocale } from '../utils';

import rewind from '@turf/rewind';
import { geoMercator } from 'd3-geo';
import { createSubscriber } from 'svelte/reactivity';

import type { RenderFunction } from '@observablehq/plot';
import type { Feature, FeatureCollection } from 'geojson';

const fetchGeoJSON = async (geojsonURL: string) => {
	const response = await fetch(geojsonURL, {
		headers: { Accept: 'application/geo+json' }
	});
	if (!response.ok) {
		throw new Error(
			`Failed to fetch GeoJSON from ${geojsonURL}: ${response.status} ${response.statusText}`
		);
	}

	const geojson = await response.json();
	if (!Array.isArray(geojson?.features)) {
		throw new Error(`Response from ${geojsonURL} is not a GeoJSON FeatureCollection`);
	}
	if (geojson.features.length === 0) {
		throw new Error(`Response from ${geojsonURL} contains no areas`);
	}

	return geojson as { features: unknown[] };
};

/**
 * Builds a choropleth chart generator for areas whose GeoJSON is fetched from `geojsonURL`.
 *
 * The GeoJSON is only requested the first time a chart is drawn, so registering the
 * generator in `chartFns` costs nothing until it is used. Until the request completes
 * the generator returns an empty map; a chart whose spec is computed reactively (e.g. in
 * a `$derived`) then redraws itself once the areas arrive.
 *
 * `joinKey` is the feature property matched against each data row's `xd` field.
 */
export const makeChoroplethFromURL = (geojsonURL: string, joinKey: string) => {
	let loadedGenerator: ReturnType<typeof makeChoropleth> | undefined;
	let request: Promise<void> | undefined;

	const load = () =>
		(request ??= fetchGeoJSON(geojsonURL).then(
			(geojson) => {
				loadedGenerator = makeChoropleth(geojson, joinKey);
			},
			(error) => console.error(error)
		));

	// Lets a reactive caller re-run once the GeoJSON has loaded
	const subscribe = createSubscriber((update) => {
		let subscribed = true;
		load().then(() => {
			if (subscribed) update();
		});
		return () => {
			subscribed = false;
		};
	});

	return (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice, width: number) => {
		if (loadedGenerator) return loadedGenerator(options, data, colorChoice, width);

		subscribe();
		load();
		return { width, height: width, marks: [] };
	};
};

const areaIndexAttribute = 'data-area-index';

// Render transform for a geo mark: records on each path the index of the feature it draws
const tagAreas: RenderFunction = (index, scales, values, dimensions, context, next) => {
	const g = next?.(index, scales, values, dimensions, context) ?? null;
	g?.querySelectorAll('path').forEach((path, i) =>
		path.setAttribute(areaIndexAttribute, String(index[i]))
	);
	return g;
};

/*
 * Render transform for the tip mark: shows the tip for the area under the cursor, pointing at the cursor.
 *
 * Plot.pointer would instead pick the area whose centroid is nearest the cursor, but only within
 * 40px of it, so large areas would show no tip over most of their extent.
 */
const tipForHoveredArea: RenderFunction = (index, scales, values, dimensions, context, next) => {
	const svg = context.ownerSVGElement;

	const render = (hovered?: { i: number; x: number; y: number }) => {
		if (!hovered) return next?.([], scales, values, dimensions, context) ?? null;

		// place the tip at the cursor rather than at the area's centroid
		const x: number[] = [];
		const y: number[] = [];
		x[hovered.i] = hovered.x;
		y[hovered.i] = hovered.y;
		const valuesAtCursor = { ...values, x, y } as typeof values;
		return next?.([hovered.i], scales, valuesAtCursor, dimensions, context) ?? null;
	};

	let g = render();

	const show = (hovered?: { i: number; x: number; y: number }) => {
		const replacement = render(hovered);
		if (g && replacement) g.replaceWith(replacement);
		g = replacement;
	};

	const update = (event: PointerEvent) => {
		const area = (event.target as Element).closest(`[${areaIndexAttribute}]`);
		const ctm = svg.getScreenCTM();
		if (!area || !ctm) return show();

		// convert from page coordinates to the SVG's own (possibly scaled) coordinates
		const { x, y } = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());
		show({ i: Number(area.getAttribute(areaIndexAttribute)), x, y });
	};

	svg.addEventListener('pointermove', update);
	// a tap shows the tip on touch screens, where there is no hover
	svg.addEventListener('pointerdown', update);
	svg.addEventListener('pointerleave', (event) => {
		// a touch "leaves" as soon as the finger lifts, so keep the tapped area's tip visible
		if (event.pointerType !== 'touch') show();
	});

	return g;
};

/**
 * Builds a choropleth chart generator for a set of areas.
 *
 * `joinKey` is the feature property matched against each data row's `xd` field.
 */
export const makeChoropleth = (geojson: { features: unknown[] }, joinKey: string) => {
	// We need to cast "{ reverse: true} as any" because an error in the type says that 'reversed' is expected instead of 'reverse'
	const geoData: FeatureCollection = {
		...geojson,
		type: 'FeatureCollection' as const,
		features: geojson.features.map(
			(feature) => rewind(feature as any, { reverse: true } as any) as Feature
		)
	};

	return (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice, width: number) => {
		const areaNameField = 'xd';
		const valueField = 'y';

		let joinedData: FeatureCollection = geoData;

		if (geoData && data.length > 0) {
			// Keep the first row for each area
			const rowsByArea = new Map<unknown, ChartDataRow>();
			for (const row of data) {
				const area = row[areaNameField];
				if (!rowsByArea.has(area)) rowsByArea.set(area, row);
			}

			const joinedFeatures = [];

			for (const feature of geoData.features) {
				const d = rowsByArea.get(feature.properties?.[joinKey]);
				joinedFeatures.push({
					...feature,
					properties: {
						...feature.properties,
						value: d ? d[valueField] : undefined
					}
				});
			}

			joinedData = { ...geoData, features: joinedFeatures };
		}

		const viewbox = {
			width,
			height: width
		};

		const f = enGBLocale.format(options.tooltipFormatValue ?? options.ytickformat ?? '.0f');

		const features = joinedData?.features ?? [];

		// Plot skips features whose fill value is missing, so draw them separately
		const { missingDataColor } = options as ChoroplethOptions;
		const hasMissingValue = (d: Feature) =>
			d.properties?.value == null || Number.isNaN(+d.properties.value);
		const showMissingData = !!missingDataColor && features.some(hasMissingValue);

		return {
			projection: geoMercator().fitExtent(
				[
					[0, 0],
					[viewbox.width, viewbox.height]
				],
				geoData
			),
			color: {
				domain: colorChoice.domain ?? [0],
				range: colorChoice.range ?? [0],
				type: 'threshold',
				legend: false,
				label: '',
				tickFormat: options.ytickformat ? enGBLocale.format(options.ytickformat) : undefined,
				tickRotate: 45
			},
			width: viewbox.width,
			height: viewbox.height,
			marks: [
				Plot.geo(features, {
					fill: 'value',
					stroke: 'white',
					strokeWidth: 1,
					render: tagAreas
				}),
				...(showMissingData
					? [
							Plot.geo(features, {
								filter: hasMissingValue,
								fill: missingDataColor,
								stroke: 'white',
								strokeWidth: 1,
								render: tagAreas
							})
						]
					: []),
				Plot.tip(
					features,
					Plot.geoCentroid({
						title: (d: Feature) =>
							`${d.properties?.name}\n${d.properties?.value == null ? 'No data' : f(+d.properties.value)}`,
						// so the tip never sits between the cursor and the area beneath it
						pointerEvents: 'none',
						render: tipForHoveredArea
					})
				)
			]
		};
	};
};

const geographiesURL = 'https://apps.london.gov.uk/api/tables/geographies/areas_simplified';

// One generator per area type and join key, so each set of boundaries is fetched at most once
const generators = new Map<string, ReturnType<typeof makeChoroplethFromURL>>();

const generatorFor = (areaType: ChoroplethAreaType, joinKey: 'name' | 'id') => {
	const cacheKey = `${areaType}|${joinKey}`;
	let generator = generators.get(cacheKey);
	if (!generator) {
		const url = `${geographiesURL}?type=eq.${encodeURIComponent(areaType)}`;
		generator = makeChoroplethFromURL(url, joinKey);
		generators.set(cacheKey, generator);
	}
	return generator;
};

/**
 * Choropleth of London areas.
 *
 * `options.areaType` determines which set of boundaries to load,
 * and `options.joinKey` determiens which field on each area is joined
 * against the `xd` field of the rows of data.
 */
export const choropleth = (
	options: ChoroplethOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice,
	width: number
) => generatorFor(options.areaType, options.joinKey ?? 'name')(options, data, colorChoice, width);
