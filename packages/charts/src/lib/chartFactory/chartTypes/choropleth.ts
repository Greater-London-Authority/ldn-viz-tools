import { Plot } from '../../observablePlotFragments/plot';

import type { ChartDataRow, ChartOptions, ColorChoice } from '../chartOptions';
import { enGBLocale } from '../utils';

import rewind from '@turf/rewind';
import { geoMercator } from 'd3-geo';

import type { Feature, FeatureCollection } from 'geojson';

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

		let f = enGBLocale.format(options.tooltipFormatValue ?? options.ytickformat ?? '.0f');

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
				legend: true,
				label: '',
				tickFormat: options.ytickformat ? enGBLocale.format(options.ytickformat) : undefined,
				tickRotate: 45
			},
			width: viewbox.width,
			height: viewbox.height,
			marks: [
				Plot.geo(joinedData?.features ?? [], {
					fill: 'value',
					stroke: 'white',
					strokeWidth: 1
				}),
				Plot.tip(
					joinedData?.features ?? [],
					Plot.pointer(
						Plot.geoCentroid({
							title: (d) =>
								`${d.properties.name}\n${d.properties.value == null ? 'No data' : f(+d.properties.value)}`
						})
					)
				)
			]
		};
	};
};
