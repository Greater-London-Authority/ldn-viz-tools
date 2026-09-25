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
	 * `{ isCluster: true, clusterId, pointCount, expansionZoom, position, points }`. With
	 * `splitClusters`, it also has `key`: the category of the circle that was picked.
	 *
	 * If `clickToZoom` is `true`, clicking a cluster zooms the map in on it, to the zoom level at which
	 * it splits apart (its `expansionZoom`).
	 *
	 * **Alternatives**: If you want to split the data into groups and cluster tha separately, use the
	 * [MultiClusterLayer](./?path=/docs/maps-components-deckgl-layers-multiclusterlayer--documentation).
	 *
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/DeckGL Layers/ClusterLayer',
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
			},
			clickToZoom: {
				description:
					'If `true`, clicking a cluster zooms the map in on it, to the zoom level at which it splits apart.',
				table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
				control: { type: 'boolean' }
			}
		},
		args: {
			clusterRadius: 60,
			clusterMaxZoom: 16,
			clickToZoom: true
		},
		parameters: {
			layout: 'full'
		}
	});
</script>

<script lang="ts">
	import type { PickingInfo } from '@deck.gl/core';
	import { theme } from '@ldn-viz/ui';
	import type { Feature, Point } from 'geojson';
	import Map from '../../map/Map.svelte';
	import MapControlGroup from '../../mapControlGroup/MapControlGroup.svelte';
	import { appendOSKeyToUrl } from '../../map/util';
	import MapDeckOverlay from '../../mapDeckOverlay/MapDeckOverlay.svelte';
	import MapDeckTooltips from '../../mapDeckTooltips/MapDeckTooltips.svelte';
	import { onMouseOverTooltipHandler } from '../../mapDeckTooltips/stores';
	import { ClusterLayer } from './clusterLayer';
	import { circleClusters, circlePoints } from './renderers/defaultRenderers';
	import { donutClusters } from './renderers/donutClusters';
	import { splitClusters } from './renderers/splitClusters';
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

	type ClusterArgs = { clusterRadius: number; clusterMaxZoom: number; clickToZoom: boolean };

	const tooltipText = (
		object: ClusterPickingObject<EventFeature> | PointPickingObject<EventFeature>
	) =>
		object.isCluster
			? `${object.pointCount} events`
			: `${object.point.properties?.event_name} (${object.point.properties?.borough})`;

	/**************************************************************************/
	// For default example

	const makeDefaultLayer = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: DATA_URL,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			clickToZoom: args.clickToZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler
		});

	/**************************************************************************/
	// For example of providing an onClick handler

	let clickedCluster: ClusterPickingObject<EventFeature> | null = $state(null);

	const onClusterClick = (info: PickingInfo) => {
		const object = info.object as
			| ClusterPickingObject<EventFeature>
			| PointPickingObject<EventFeature>
			| undefined;

		if (!object?.isCluster) {
			clickedCluster = null;
			return false;
		}

		clickedCluster = object;

		// Returning `false` leaves the event unhandled, so `clickToZoom` still zooms in on the
		// cluster; returning `true` would stop it.
		return false;
	};

	const makeClickableLayer = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: DATA_URL,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			clickToZoom: args.clickToZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler,
			onClick: onClusterClick
		});

	/**************************************************************************/
	// For example of customizing default renderers
	const eventTypeColors: Record<string, string> = {
		'general community': 'data.categorical.blue',
		'arts & culture': 'data.categorical.darkpink',
		environment: 'data.categorical.green',
		sport: 'data.categorical.orange'
	};

	const makeStyledLayer = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: DATA_URL,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			clickToZoom: args.clickToZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler,
			renderClusters: circleClusters({
				getFillColor: theme.colorTokenNameToRGBArray('data.secondary') as [number, number, number],
				getLineColor: [...theme.colorTokenNameToRGBArray('geo.inverse.feature.default'), 180] as [
					number,
					number,
					number,
					number
				],
				getLineWidth: 3,
				radiusMinPixels: 12,
				radiusScale: 4
			}),
			renderPoints: circlePoints<EventFeature>({
				getFillColor: (d: EventFeature) =>
					theme.colorTokenNameToRGBArray(
						eventTypeColors[String(d.properties?.event_type).toLowerCase()] ?? 'data.primary'
					) as [number, number, number],
				radiusMinPixels: 5,
				radiusMaxPixels: 12
			})
		});

	/**************************************************************************/
	// For example of using a custom renderer (donut renderer)
	const eventTypeOf = (d: EventFeature) => String(d.properties?.event_type).toLowerCase();

	const eventTypeRGB = (eventType: string) =>
		theme.colorTokenNameToRGBArray(eventTypeColors[eventType] ?? 'data.primary') as [
			number,
			number,
			number
		];

	const breakdownTooltipText = (
		object: ClusterPickingObject<EventFeature> | PointPickingObject<EventFeature>
	) => {
		if (!object.isCluster) return tooltipText(object);

		const counts: Record<string, number> = {};
		for (const p of object.points) counts[eventTypeOf(p)] = (counts[eventTypeOf(p)] ?? 0) + 1;
		const breakdown = Object.entries(counts)
			.sort(([, a], [, b]) => b - a)
			.map(([type, n]) => `${n} ${type}`)
			.join(', ');
		return `${object.pointCount} events: ${breakdown}`;
	};

	const eventTypeColorsRGB = Object.fromEntries(
		Object.keys(eventTypeColors).map((type) => [type, eventTypeRGB(type)])
	);

	const makeDonutLayer = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: DATA_URL,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			clickToZoom: args.clickToZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler,
			renderClusters: donutClusters<EventFeature>({
				getKey: eventTypeOf,
				colors: eventTypeColorsRGB,
				order: Object.keys(eventTypeColors)
			}),
			renderPoints: circlePoints<EventFeature>({
				getFillColor: (d: EventFeature) => eventTypeRGB(eventTypeOf(d)),
				radiusMinPixels: 5,
				radiusMaxPixels: 12
			})
		});

	const makeSplitLayer = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: DATA_URL,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			clickToZoom: args.clickToZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler,
			renderClusters: splitClusters<EventFeature>({
				getKey: eventTypeOf,
				colors: eventTypeColorsRGB,
				order: Object.keys(eventTypeColors)
			}),
			renderPoints: circlePoints<EventFeature>({
				getFillColor: (d: EventFeature) => eventTypeRGB(eventTypeOf(d)),
				radiusMinPixels: 5,
				radiusMaxPixels: 12
			})
		});

	const makeSplitLayerWithRing = (args: ClusterArgs) =>
		new ClusterLayer({
			id: 'events',
			data: DATA_URL,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			clickToZoom: args.clickToZoom,
			pickable: true,
			onHover: onMouseOverTooltipHandler,
			renderClusters: splitClusters<EventFeature>({
				getKey: eventTypeOf,
				colors: eventTypeColorsRGB,
				order: Object.keys(eventTypeColors),
				showRing: true,
				ringWidth: 3
			}),
			renderPoints: circlePoints<EventFeature>({
				getFillColor: (d: EventFeature) => eventTypeRGB(eventTypeOf(d)),
				radiusMinPixels: 5,
				radiusMaxPixels: 12
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
This example passes an `onClick` handler to the layer. When a cluster is clicked, the handler
receives a `PickingInfo` whose `object` is a `ClusterPickingObject`, and lists the events in that
cluster in a panel.

A user-supplied `onClick` runs before `clickToZoom`. If it returns `true`, the click is treated as
handled, and the map does not zoom in on the cluster. This handler returns `false`, so the map still
zooms when `clickToZoom` is `true`.
 -->
<Story name="Click handler">
	{#snippet template(args)}
		{@const layers = [makeClickableLayer(args as ClusterArgs)]}

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
				<MapDeckTooltips {layers} spec={{ events: tooltipText }} />

				<MapControlGroup position="TopRight">
					<div
						class="pointer-events-auto max-h-96 w-72 overflow-y-auto bg-color-container p-3 text-color-text"
					>
						{#if clickedCluster}
							<p class="font-bold">{clickedCluster.pointCount} events in this cluster</p>
							<ul class="mt-2 list-disc pl-5">
								{#each clickedCluster.points as point, i (i)}
									<li>{point.properties?.event_name}</li>
								{/each}
							</ul>
						{:else}
							<p>Click a cluster to list its events.</p>
						{/if}
					</div>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!--
This example still uses the default `circleClusters()` and `circlePoints()`
renderer functions, but provides options to change their appearance.

Here clusters have a different colour, and the color of each point is now
determined by its `event_type` using a `getFillColor` function.
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

<!--
This example replaces the default `circleClusters()` renderer with `donutClusters()`.
This draws each cluster as a donut using a `CanvasIconLayer`. The segments of each
donut show the proportion of the events in that cluster with each `event_type`.
 -->
<Story name="Donut clusters">
	{#snippet template(args)}
		{@const layers = [makeDonutLayer(args as ClusterArgs)]}

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
				<MapDeckTooltips {layers} spec={{ events: breakdownTooltipText }} />
			</Map>
		</div>
	{/snippet}
</Story>

<!--
This example replaces the default `circleClusters()` renderer with `splitClusters()`.

This splits each cluster into one circle per `event_type`.
Each circle is sized by the number of events of that type, and labelled with that
number. The circles are drawn by a `CanvasIconLayer`, with one icon per event type.
 -->
<Story name="Split clusters">
	{#snippet template(args)}
		{@const layers = [makeSplitLayer(args as ClusterArgs)]}

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
				<MapDeckTooltips {layers} spec={{ events: breakdownTooltipText }} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- 
This example also replaces the default `circleClusters()` renderer with `splitClusters()`.
It changes the options, to also draw a ring to visually group the markers corresponding to the same cluster.
-->
<Story name="Split clusters - with ring">
	{#snippet template(args)}
		{@const layers = [makeSplitLayerWithRing(args as ClusterArgs)]}

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
				<MapDeckTooltips {layers} spec={{ events: breakdownTooltipText }} />
			</Map>
		</div>
	{/snippet}
</Story>
