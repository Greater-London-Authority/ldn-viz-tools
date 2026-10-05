import { Plot } from '@ldn-viz/charts';
import type { ChartDataRow, ChartOptions, ColorChoice } from '../chartOptions';

import rewind from '@turf/rewind';
import { format } from 'd3-format';
import { geoMercator } from 'd3-geo';

import type { Feature, FeatureCollection } from 'geojson';

  import wards from "./wards_simplified.json" with { type: "json" };
import { theme } from '@ldn-viz/ui';

export const wardChoropleth = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice,
	width: number
) => {
	const areaNameField = 'xd';
	const valueField = 'y';

	// We need to cast "{ reverse: true} as any" because an error in the type says that 'reversed' is expected instead of 'reverse'
	const geoData: FeatureCollection = {
		...wards,
		type: 'FeatureCollection' as const,
		features: wards.features.map(
			(feature) => rewind(feature as any, { reverse: true } as any) as Feature
		)
	};

	let joinedData = {};

	if (geoData && data.length > 0) {
		const joinedFeatures = [];

		for (const feature of geoData.features) {
			const d = data.find((d: any) => d[areaNameField] === feature.properties?.gss_code);
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

	let f = format(options.tooltipFormatValue ?? options.ytickformat ?? '.0f');

	return {
		projection: geoMercator().fitExtent(
			[
				[0, 0],
				[viewbox.width, viewbox.height]
			],
			geoData
		),
		color: {
			domain: options.colorScale?.domain ?? [0],
			range: theme.currentMode === 'light' ? 
				( options.colorScaleLight?.range ?? options.colorScale?.range  ?? [0]) :
				( options.colorScaleDark?.range ?? options.colorScale?.range  ?? [0]) ,
			type: 'threshold',
			legend: true,
			label: '',
			tickFormat: options.ytickformat,
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
						title: (d) => `${d.properties.name}\n${f(+d.properties.value)}`
					})
				)
			)
		]
	};
};
