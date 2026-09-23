<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/**
	 * `ClusterLayer` is a Deck.gl `CompositeLayer` that groups nearby points into clusters, using
	 * [supercluster](https://github.com/mapbox/supercluster). Clusters are re-calculated whenever the
	 * map crosses an integer zoom level.
	 *
	 * Clusters and lone points are rendered by the layers returned from the `renderClusters` and
	 * `renderPoints` functions. By default these are `circleClusters()` (a circle sized by the number of
	 * points, labelled with the count) and `circlePoints()` (a small circle per point).
	 *
	 * You can customise this behaviour by supplying an options object, or by replacing these
	 * functions.
	 *
	 * When a lone point is picked, `info.object` is `{ isCluster: false, point }`, where `point` is the
	 * original feature. When a cluster is picked, it is
	 * `{ isCluster: true, clusterId, pointCount, expansionZoom, points }`.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/DeckGL/ClusterLayer',
		tags: ['autodocs'],
		argTypes: {
			clusterRadius: {
				description: 'The radius (in pixels) within which points are grouped into a cluster.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '60' } },
				control: { type: 'range', min: 10, max: 150, step: 5 }
			},
			clusterMaxZoom: {
				description:
					'The maximum zoom level at which points are clustered; above this, every point is shown individually.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '16' } },
				control: { type: 'range', min: 0, max: 20, step: 1 }
			}
		},
		args: {
			clusterRadius: 60,
			clusterMaxZoom: 16
		},
		parameters: {
			layout: 'full'
		}
	});
</script>

<script lang="ts">
	import { theme } from '@ldn-viz/ui';
	import type { Feature, FeatureCollection, Point } from 'geojson';
	import Map from '../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../map/util';
	import MapDeckOverlay from '../../mapDeckOverlay/MapDeckOverlay.svelte';
	import MapDeckTooltips from '../../mapDeckTooltips/MapDeckTooltips.svelte';
	import { onMouseOverTooltipHandler } from '../../mapDeckTooltips/stores';
	import { ClusterLayer } from './clusterLayer';
	import { circleClusters, circlePoints } from './renderers';
	import type { ClusterPickingObject, PointPickingObject } from './types';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const DATA_URL =
		'https://gis.london.gov.uk/arcgis/rest/services/apps/MoL_Community_Weekend_2025/MapServer/0/query?' +
		new URLSearchParams({
			where: 'objectid IS NOT NULL',
			outFields: '*',
			geometry:
				'{xmin: 503568.2000000002, ymin: 155850.80000000075, xmax: 561957.5, ymax: 200933.90000000037}',
			returnGeometry: 'true',
			f: 'geojson'
		});

	type EventFeature = Feature<Point>;

	let events: EventFeature[] = $state([]);

	fetch(DATA_URL)
		.then((response) => response.json())
		.then((collection: FeatureCollection<Point>) => {
			events = collection.features;
		});

	type ClusterArgs = { clusterRadius: number; clusterMaxZoom: number };

	const tooltipText = (
		object: ClusterPickingObject<EventFeature> | PointPickingObject<EventFeature>
	) =>
		object.isCluster
			? `${object.pointCount} events`
			: `${object.point.properties?.event_name} (${object.point.properties?.borough})`;

	const makeDefaultLayer = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: events,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler
		});

	const eventTypeColors: Record<string, string> = {
		'general community': 'data.categorical.blue',
		'arts & culture': 'data.categorical.darkpink',
		environment: 'data.categorical.green',
		sport: 'data.categorical.orange'
	};

	const makeStyledLayer = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: events,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler,
			renderClusters: circleClusters({
				color: theme.colorTokenNameToRGBArray('data.secondary') as [number, number, number],
				strokeColor: [255, 255, 255, 180],
				strokeWidth: 3,
				minRadius: 12,
				radiusScale: 4
			}),
			renderPoints: circlePoints<EventFeature>({
				getColor: (d: EventFeature) =>
					theme.colorTokenNameToRGBArray(
						eventTypeColors[String(d.properties?.event_type).toLowerCase()] ?? 'data.primary'
					) as [number, number, number],
				minRadius: 5,
				maxRadius: 12
			})
		});
</script>

<!--
 With the default renderers.
 -->
<Story name="Default">
	{#snippet template(args)}
		{@const layers = [makeDefaultLayer(args as ClusterArgs)]}

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
				<MapDeckTooltips {layers} spec={{ events: tooltipText }} />
			</Map>
		</div>
	{/snippet}
</Story>

<!--
This example still uses the default  `circleClusters()` and `circlePoints()` rednerer functions, 
but provides options to change their appearance.

Here clusters have a different colour, and the color of each point is now determined by its
 `event_type` using a `getColor` function.
 -->
<Story name="Custom styling">
	{#snippet template(args)}
		{@const layers = [makeStyledLayer(args as ClusterArgs)]}

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
				<MapDeckTooltips {layers} spec={{ events: tooltipText }} />
			</Map>
		</div>
	{/snippet}
</Story>
