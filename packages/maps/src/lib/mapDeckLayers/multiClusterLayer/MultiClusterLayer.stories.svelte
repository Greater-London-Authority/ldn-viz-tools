<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/**
	 * The `MultiClusterLayer` is similar to [ClusterLayer](./?path=/docs/maps-components-deckgl-clusterlayer--documentation).
	 * However, rather than clustering all points together, it first separates them into groups based on the value
	 * returned by the `getKey` function, then clusters each group separately, and uses a
	 * [NonOverlappingGlyphLayer](./?path=/docs/maps-components-deckgl-nonoverlappingglyphlayer--documentation)
	 * to avoid overlap between cluster markers from different groups.
	 *
	 * The clusters are re-calculated whenever the map crosses an integer zoom level.
	 * The layout of their markers is re-calculated whenever it crosses a multiple of `zoomStep`.
	 *
	 * **N.B.** This layer sizes markers in pixels (rather than meters);
	 * to avoid overlaps when the map is zoomed out to just before the threshold at which the layout would be updated,
	 * the layout is computed for the zoom at the bottom of the current `zoomStep` range.
	 * At zoom 12.9 with `zoomStep: 1`, gaps are about 2^12.9/2^12 = 2^0.9 = ~1.9 larger than they need to be.
	 * Decreasing `zoomStep` reduces this, at the cost of recomputing the layout more frequently.
	 * An alternative would be to instead set marker sizes in meters, but they would then get larger as the map zooms in.
	 *
	 *
	 * When a glyph is picked, `info.object` is `{ key, position, count, points, radius }`, where
	 * `points` are the original features. Clusters also have `clusterId` and
	 * `expansionZoom` (the zoom level at which the cluster splits apart) attributes.
	 * The `expansionZoom` can be used in a click handler to zoom-in to the level at which a cluster expands.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/DeckGL/MultiClusterLayer',
		tags: ['autodocs'],
		argTypes: {
			clusterRadius: {
				description:
					'The radius (in pixels) within which points of the same type are grouped into a cluster.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '60' } },
				control: { type: 'range', min: 10, max: 150, step: 5 }
			},
			clusterMaxZoom: {
				description:
					'The maximum zoom level at which points are clustered; above this, every point is shown individually.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '16' } },
				control: { type: 'range', min: 0, max: 20, step: 1 }
			},
			zoomStep: {
				description:
					'The zoom interval at which the non-overlapping layout is re-calculated; e.g. `0.5` re-calculates it at 12, 12.5, 13, 13.5, ...',
				table: { type: { summary: 'number' }, defaultValue: { summary: '1' } },
				control: { type: 'range', min: 0.1, max: 1, step: 0.1 }
			}
		},
		args: {
			clusterRadius: 60,
			clusterMaxZoom: 16,
			zoomStep: 0.1
		},
		parameters: {
			layout: 'full'
		}
	});
</script>

<script lang="ts">
	import { MVTLayer } from '@deck.gl/geo-layers';
	import { theme } from '@ldn-viz/ui';
	import type { Feature, Point } from 'geojson';
	import Map from '../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../map/util';
	import MapDeckOverlay from '../../mapDeckOverlay/MapDeckOverlay.svelte';
	import MapDeckTooltips from '../../mapDeckTooltips/MapDeckTooltips.svelte';
	import { onMouseOverTooltipHandler } from '../../mapDeckTooltips/stores';
	import { MultiClusterLayer, type ClusterByTypeGlyph } from './multiClusterLayer';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const TILE_BASE_URL = 'https://d1lfm2zniswzpu.cloudfront.net';

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

	type ClusterArgs = { clusterRadius: number; clusterMaxZoom: number; zoomStep: number };

	/**************************************************************************/
	// example of grouping by event_type

	const eventTypeColors: Record<string, string> = {
		'general community': 'data.categorical.blue',
		'arts & culture': 'data.categorical.darkpink',
		environment: 'data.categorical.green',
		sport: 'data.categorical.orange'
	};

	const eventTypeOf = (d: EventFeature) => String(d.properties?.event_type).toLowerCase();

	const eventTypeColorsRGB = Object.fromEntries(
		Object.entries(eventTypeColors).map(([type, token]) => [
			type,
			theme.colorTokenNameToRGBArray(token) as [number, number, number]
		])
	);

	const tooltipText = (glyph: ClusterByTypeGlyph<EventFeature>) =>
		glyph.count > 1
			? `${glyph.count} ${glyph.key} events`
			: `${glyph.points[0].properties?.event_name} (${glyph.points[0].properties?.borough})`;

	/**************************************************************************/
	// example of grouping by borough

	const boroughOf = (d: EventFeature) => String(d.properties?.borough);

	// every borough is drawn in the same color
	const boroughColors = Object.fromEntries(
		[
			'Newham',
			'Harrow',
			'Sutton',
			'Bexley',
			'Barking and Dagenham',
			'Haringey',
			'Lewisham',
			'Barnet',
			'Southwark',
			'Brent',
			'Hackney',
			'Hillingdon',
			'Lambeth',
			'Greenwich',
			'Croydon',
			'Wandsworth',
			'Kingston upon Thames',
			'Islington',
			'Hounslow',
			'Hammersmith and Fulham',
			'Camden',
			'Richmond upon Thames',
			'Merton',
			'Waltham Forest',
			'Ealing',
			'Enfield',
			'Redbridge',
			'Westminster',
			'Kensington and Chelsea',
			'Bromley',
			'Havering',
			'Tower Hamlets',
			'City of London',
			'Barking & Dagenham',
			'City Of London'
		].map((b) => [
			b,
			theme.colorTokenNameToRGBArray('data.categorical.blue') as [number, number, number]
		])
	);

	const boroughTooltipText = (glyph: ClusterByTypeGlyph<EventFeature>) =>
		glyph.count > 1
			? `Cluster of ${glyph.count} events in ${glyph.key}`
			: `${glyph.points[0].properties?.event_name} (${glyph.points[0].properties?.borough})`;

	const makeBoroughOutlinesLayer = () =>
		new MVTLayer({
			id: 'boroughs',
			data: `${TILE_BASE_URL}/boroughs/{z}/{x}/{y}.mvt`,
			filled: false,
			stroked: true,
			getLineColor: theme.colorTokenNameToRGBArray('geo.feature') as [number, number, number],
			lineWidthMinPixels: 2
		});

	const makeBoroughLayer = (args: ClusterArgs) =>
		new MultiClusterLayer<EventFeature>({
			id: 'events',
			data: DATA_URL,
			getKey: boroughOf,
			colors: boroughColors,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			zoomStep: args.zoomStep,
			pickable: true,
			onHover: onMouseOverTooltipHandler
		});

	const makeLayer = (args: ClusterArgs) =>
		new MultiClusterLayer<EventFeature>({
			id: 'events',
			data: DATA_URL,
			getKey: eventTypeOf,
			colors: eventTypeColorsRGB,
			clusterRadius: args.clusterRadius,
			clusterMaxZoom: args.clusterMaxZoom,
			zoomStep: args.zoomStep,
			pickable: true,
			onHover: onMouseOverTooltipHandler
		});
</script>

<!--
Events are clustered separately for each `event_type`, and each cluster is drawn in the color
of its type. Where glyphs would overlap, they are moved apart.
-->
<Story name="Default">
	{#snippet template(args)}
		{@const layers = [makeLayer(args as ClusterArgs)]}

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
Sometimes it's desirable to avoid clustering together points in different geographical areas.
For example, if we have a borough boundaries shown on a map, then grouping together points in different boroughs may cause confusion about how many are assigned to each borough.

In this example, events are clustered separately for each `borough` (ignoring the `event_type`)
-->
<Story name="By borough">
	{#snippet template(args)}
		{@const layers = [makeBoroughOutlinesLayer(), makeBoroughLayer(args as ClusterArgs)]}

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
				<MapDeckTooltips {layers} spec={{ events: boroughTooltipText }} />
			</Map>
		</div>
	{/snippet}
</Story>
