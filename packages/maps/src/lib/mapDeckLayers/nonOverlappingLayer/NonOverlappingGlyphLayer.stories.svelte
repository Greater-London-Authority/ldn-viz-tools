<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/**
	 * `NonOverlappingGlyphLayer` is a Deck.gl `CompositeLayer` that moves glyphs apart so that they
	 * do not overlap. Each glyph is treated as a circle of radius `getGlyphRadius` (in meters),
	 * which may be either a constant or a function returning the radius of each glyph.
	 *
	 * The glyphs are drawn by the layer(s) returned from the `renderGlyphs` function. This function
	 * receives the shifted position of each glyph (`getPosition`), the original datum (`getDatum`),
	 * and the radius that each glyph was spaced for (`getRadius`).
	 *
	 * Glyphs that have moved are joined to their original position by a leader line, unless
	 * `showLeaderLines` is `false`.
	 *
	 * Positions are calculated once, at the zoom level of the first viewport. They then stay fixed
	 * in geographic space, so glyphs sized in meters remain non-overlapping at every zoom level.
	 *
	 * Alternatively, set `radiusUnits` to `'pixels'` to space glyphs that are sized in pixels.
	 * Positions are then re-calculated whenever the zoom level crosses a multiple of `zoomStep`.
	 *
	 * When a glyph is picked, `info.object` is the original datum.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/DeckGL/NonOverlappingGlyphLayer',
		tags: ['autodocs'],
		argTypes: {
			getGlyphRadius: {
				description:
					'The radius (in meters) of each glyph, used when moving glyphs apart. Either a constant, or a function of the datum.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '10' } },
				control: { type: 'range', min: 50, max: 1000, step: 50 }
			},
			showLeaderLines: {
				description: 'Whether to draw a line from each moved glyph back to its original position.',
				table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
				control: { type: 'boolean' }
			},
			leaderLineWidth: {
				description: 'The width (in pixels) of the leader lines.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '1' } },
				control: { type: 'range', min: 0.5, max: 5, step: 0.5 }
			},
			leaderLineEndRadius: {
				description:
					'The radius (in meters) of the marker drawn at the original position of each moved glyph.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '1.5' } },
				control: { type: 'range', min: 0, max: 150, step: 0.5 }
			}
		},
		args: {
			getGlyphRadius: 300,
			showLeaderLines: true,
			leaderLineWidth: 1,
			leaderLineEndRadius: 50
		},
		parameters: {
			layout: 'full'
		}
	});
</script>

<script lang="ts">
	import { ScatterplotLayer } from '@deck.gl/layers';
	import { theme } from '@ldn-viz/ui';
	import type { Feature, FeatureCollection, Point } from 'geojson';
	import Map from '../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../map/util';
	import MapDeckOverlay from '../../mapDeckOverlay/MapDeckOverlay.svelte';
	import MapDeckTooltips from '../../mapDeckTooltips/MapDeckTooltips.svelte';
	import { onMouseOverTooltipHandler } from '../../mapDeckTooltips/stores';
	import {
		NonOverlappingGlyphLayer,
		type GlyphRenderProps,
		type NonOverlappingRow
	} from './nonOverlappingGlyphLayer';

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

	type GlyphArgs = {
		getGlyphRadius: number;
		showLeaderLines: boolean;
		leaderLineWidth: number;
		leaderLineEndRadius: number;
	};

	const tooltipText = (object: EventFeature) =>
		`${object.properties?.event_name} (${object.properties?.borough})`;

	const eventTypeColors: Record<string, string> = {
		'general community': 'data.categorical.blue',
		'arts & culture': 'data.categorical.darkpink',
		environment: 'data.categorical.green',
		sport: 'data.categorical.orange'
	};

	const eventTypeRGB = (d: EventFeature) =>
		theme.colorTokenNameToRGBArray(
			eventTypeColors[String(d.properties?.event_type).toLowerCase()] ?? 'data.primary'
		) as [number, number, number];

	// Draws each glyph as a circle of the radius it was spaced for, coloured by event type
	const renderCircles = ({ getDatum, ...props }: GlyphRenderProps<EventFeature>) =>
		new ScatterplotLayer<NonOverlappingRow<EventFeature>>({
			...props,
			getFillColor: (row) => eventTypeRGB(getDatum(row)),
			stroked: true,
			getLineColor: [255, 255, 255],
			lineWidthUnits: 'pixels',
			getLineWidth: 1
		});

	const makeLayer = (args: GlyphArgs) =>
		new NonOverlappingGlyphLayer<EventFeature>({
			id: 'events',
			data: events,
			getGlyphRadius: args.getGlyphRadius,
			showLeaderLines: args.showLeaderLines,
			leaderLineWidth: args.leaderLineWidth,
			leaderLineEndRadius: args.leaderLineEndRadius,
			renderGlyphs: renderCircles,
			pickable: true,
			onHover: onMouseOverTooltipHandler
		});
</script>

<!--
Events are rendered by a `ScatterplotLayer`, which draws each as a circle, coloured by its `event_type`
Where circles would overlap, they are moved apart, and a leader line joins each moved circle to the
event's original location.
 -->
<Story name="Default">
	{#snippet template(args)}
		{@const layers = [makeLayer(args as GlyphArgs)]}

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
With `showLeaderLines` set to `false`, circles are still moved apart, 
but no line is drawn to indicate their original locations.
 -->
<Story name="Without leader lines" args={{ showLeaderLines: false }}>
	{#snippet template(args)}
		{@const layers = [makeLayer(args as GlyphArgs)]}

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
