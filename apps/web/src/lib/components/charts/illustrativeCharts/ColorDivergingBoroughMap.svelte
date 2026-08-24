<script lang="ts">
	import ldnTopo from '$lib/data/boroughs-simplified-topo.json';
	import demoBoroughCount from '$lib/data/demoBoroughCountDiverging.json';
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
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
	let mapHeight = $derived(containerWidth / 2);

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// create a feature collection
	const features = topojson.feature(ldnTopo, ldnTopo.objects.boroughs);
	// collection of internal borders
	const featuresMesh = topojson.mesh(ldnTopo, ldnTopo.objects.boroughs, (a, b) => a !== b);

	// Spec and data for multi-line example
	let mapData = new Map(demoBoroughCount.map((d) => [d.GSS_CODE, +d.Count]));

	let negColorRamp = $derived(
		getColorRamp({
			colors: [
				theme.tokenNameToValue('palette.red.800'),
				theme.tokenNameToValue('palette.red.500'),
				theme.tokenNameToValue('palette.red.300')
			],
			count: 5,
			even: true
		})
	);

	let posColorRamp = $derived(
		[theme.tokenNameToValue('data.empty')].concat(
			getColorRamp({
				colors: [
					theme.tokenNameToValue('palette.blue.300'),
					theme.tokenNameToValue('palette.blue.500'),
					theme.tokenNameToValue('palette.blue.800')
				],
				count: 5,
				even: true
			})
		)
	);

	let mapColorRamp = $derived(negColorRamp.concat(posColorRamp));

	let mapSpec = $derived({
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

		color: {
			label: 'Count of something',
			Count: true,
			tickFormat: (d) => format('.0f')(d),
			legend: true,
			type: 'quantile', // linear / quantize / quantile etc
			domain: [-100, -80, -60, -40, -20, -0.01, 0.01, 20, 40, 60, 80, 100],
			range: mapColorRamp,
			width: 260 // adjust to suit ticks
			// scheme: "Viridis",
			// n: 10 // breaks (if quantize)
		},
		height: containerWidth / 2,
		marks: [
			Plot.geo(
				features,
				Plot.centroid({
					fill: (d) => mapData.get(d.properties.gss_code)
					// fill: '#f00'
					// tip: true,
					// channels: {
					// 	Borough: (d) => d.properties.name
					// 	// GSS_CODE: (d) => d.properties.gss_code
					// }
				})
			),
			Plot.geo(featuresMesh, { stroke: theme.tokenNameToValue('surface') }),
			// styled tooltip
			Plot.tip(
				features,
				Plot.pointer(
					Plot.geoCentroid({
						title: (d) => d.properties.name + '\n' + mapData.get(d.properties.gss_code)
					})
				)
			)
		]
	});
</script>

<ObservablePlot
	spec={mapSpec}
	data={demoBoroughCount}
	title="Example"
	imageDownloadButton={false}
	dataDownloadButton={false}
	alt="Choropleth map of London boroughs and their variable values"
	chartDescription="The diverging choropleth map of London shows the change in count of something at a borough level. The lowest value is -96 in Tower Hamlets. The highest value is 97 in Hounslow. The mean value is 20. Three Boroughs have values of 0. Haringey, Waltham Forest, and Bexley."
/>
