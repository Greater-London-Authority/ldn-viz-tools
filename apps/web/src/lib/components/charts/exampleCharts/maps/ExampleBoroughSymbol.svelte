<script lang="ts">
	import ldnTopo from '$lib/data/boroughs-simplified-topo.json';
	import demoBoroughPercent from '$lib/data/demoBoroughPercent.json';
	import { getDefaultPlotStyles, ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { getColorRamp } from '@ldn-viz/utils';
	import * as d3 from 'd3';
	import { format } from 'd3';
	import * as topojson from 'topojson-client';

	interface Props {
		containerWidth?: number;
		containerHeight?: number;
	}

	let { containerWidth = 2, containerHeight = 1 }: Props = $props();

	let mapWidth = $derived(containerWidth);
	let mapHeight = $derived(containerWidth * 0.75);

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// create a feature collection
	const features = topojson.feature(ldnTopo, ldnTopo.objects.boroughs);
	// collection of internal borders
	const featuresMesh = topojson.mesh(ldnTopo, ldnTopo.objects.boroughs, (a, b) => a !== b);

	// Spec and data for multi-line example
	let mapData = new Map(demoBoroughPercent.map((d) => [d.GSS_CODE, +d.Percent]));

	let mapColorRamp = $derived(
		getColorRamp({
			colors: [
				theme.tokenNameToValue('palette.blue.200'),
				theme.tokenNameToValue('palette.blue.500'),
				theme.tokenNameToValue('palette.blue.900')
			],
			count: 5,
			even: true
		})
	);

	let mapSpec = $derived({
		r: {
			range: [0, 15]
		},
		projection: d3
			.geoMercator()
			.center([-0.09, 51.49])
			.fitExtent(
				[
					[0, 0],
					[mapWidth, mapHeight]
				],
				features
			)
			.translate([mapWidth / 2, mapHeight / 2]),

		height: containerWidth * 0.75,
		marks: [
			Plot.geo(
				features,
				Plot.centroid({
					fill: theme.tokenNameToValue('data.empty')
				})
			),
			Plot.geo(featuresMesh, { stroke: theme.tokenNameToValue('surface') }),

			Plot.dot(
				features,
				Plot.centroid({
					// fill: theme.tokenNameToValue('data.primary'),
					fillOpacity: 0.8,
					stroke: theme.tokenNameToValue('surface'),
					strokeWidth: 1,
					r: (d) => mapData.get(d.properties.gss_code)
				})
			),

			// styled tooltip
			Plot.tip(
				features,
				Plot.pointer(
					Plot.geoCentroid({
						title: (d) =>
							d.properties.name + '\n' + d3.format('.0%')(mapData.get(d.properties.gss_code))
					})
				)
			),

			// static annotation(s)
			Plot.tip(
				features.features.filter(
					(d) => d.properties.name == 'Hounslow' || d.properties.name == 'Merton'
				),

				Plot.geoCentroid({
					...getDefaultPlotStyles().defaultAnnotationTip,
					title: (d) =>
						d.properties.name + '\n' + d3.format('.0%')(mapData.get(d.properties.gss_code))
				})
			)
		]
	});
</script>

<ObservablePlot
	spec={mapSpec}
	data={demoBoroughPercent}
	title="Hounslow has the highest rate of something in London"
	subTitle="Rates of something by London borough, 2026"
	alt="Symbol map of London boroughs and their variable values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The symbol map of London shows the rate of something at a borough level. The lowest value is 9% in Merton. The highest value is 97% in Hounslow. The mean value is 50%."
/>
