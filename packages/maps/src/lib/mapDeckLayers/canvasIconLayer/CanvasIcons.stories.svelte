<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/**
	 * `CanvasIconLayer` is a Deck.gl layer that dynamically draws icons to represent features.
	 *
	 * The `paint` function draws an icon on an HTML Canvas.
	 *
	 * Each datum is mapped to a key by `getIconKey`, and `paint` is called once per distinct key.
	 *
	 * The generated icons are rendered by an IconLayer.
	 *
	 * All other IconLayer props (e.g. `getPosition`, `getColor`, `getSize`) are passed through.
	 *
	 * **N.N** this will not work well if the number of distinct icons required is very large.
	 * There is some performance overhead incurred by rendering each icon to an HTML Canvas,
	 * serialising to a `data:` URL, and then converting to a WebGL texture.
	 * Also, if the icons do not all fit in the WebGL `MAX_TEXTURE_SIZE`, then an error will occur.
	 *
	 * **Alternatives**:  if you only need to draw circles, use the [ScatterplotLayer](https://deck.gl/docs/api-reference/layers/scatterplot-layer).
	 * If you need to use a small set of dsitinct icons, condier pre-rendering them as an iconAtlas for an [IconLayer](https://deck.gl/docs/api-reference/layers/icon-layer).
	 * If the number of icons to render is large, and they are relatively simple, consider writing a layer that renders them susing a custom shader.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/DeckGL/CanvasIconLayer',
		tags: ['autodocs'],
		argTypes: {
			size: {
				description: 'The diameter of each icon, in pixels.',
				table: { type: { summary: 'number' }, defaultValue: { summary: '16' } },
				control: { type: 'range', min: 4, max: 48, step: 1 }
			}
		},
		args: {
			size: 16
		},
		parameters: {
			layout: 'full'
		}
	});
</script>

<script lang="ts">
	import { theme } from '@ldn-viz/ui';
	import {
		symbol,
		symbolCircle,
		symbolSquare,
		symbolStar,
		symbolTriangle,
		type SymbolType
	} from 'd3-shape';
	import type { Feature, FeatureCollection, Point } from 'geojson';
	import Map from '../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../map/util';
	import MapDeckOverlay from '../../mapDeckOverlay/MapDeckOverlay.svelte';
	import MapDeckTooltips from '../../mapDeckTooltips/MapDeckTooltips.svelte';
	import { onMouseOverTooltipHandler } from '../../mapDeckTooltips/stores';
	import { CanvasIconLayer, rgba } from './canvasIconLayer';

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

	const eventTypeColors: Record<string, string> = {
		'general community': 'data.categorical.blue',
		'arts & culture': 'data.categorical.darkpink',
		environment: 'data.categorical.green',
		sport: 'data.categorical.orange'
	};

	const tooltipText = (d: EventFeature) => `${d.properties?.event_name} (${d.properties?.borough})`;

	const eventTypeOf = (d: EventFeature) => String(d.properties?.event_type).toLowerCase();

	const colorOf = (d: EventFeature) =>
		theme.colorTokenNameToRGBArray(eventTypeColors[eventTypeOf(d)] ?? 'data.primary') as [
			number,
			number,
			number
		];

	// This renders a white circle, regardless of the data.
	// With `mask: true`, only its alpha channel is used and it re-colored by `getColor`.
	const paintCircle = (ctx: CanvasRenderingContext2D) => {
		const r = ctx.canvas.width / 2;
		ctx.beginPath();
		ctx.arc(r, r, r - 2, 0, Math.PI * 2);
		ctx.fillStyle = '#fff';
		ctx.fill();
	};

	// This renders a circle, with the fill color set by the feature's `event_type`
	const paintEventType = (ctx: CanvasRenderingContext2D, d: EventFeature) => {
		const r = ctx.canvas.width / 2;
		ctx.beginPath();
		ctx.arc(r, r, r - 8, 0, Math.PI * 2);
		ctx.fillStyle = rgba(colorOf(d));
		ctx.fill();
		ctx.lineWidth = 12;
		ctx.strokeStyle = '#fff';
		ctx.stroke();
	};

	// This renders a different symbol shape for each `event_type`
	const paintEventSymbol = (ctx: CanvasRenderingContext2D, d: EventFeature) => {
		const eventTypeSymbols: Record<string, SymbolType> = {
			'general community': symbolCircle,
			'arts & culture': symbolStar,
			environment: symbolTriangle,
			sport: symbolSquare
		};

		const r = ctx.canvas.width / 2;
		const area = (r * r) / 1.15;
		const type = eventTypeSymbols[eventTypeOf(d)] ?? symbolCircle;

		ctx.translate(r, r);
		ctx.beginPath();
		symbol(type, area).context(ctx)();
		ctx.fillStyle = rgba(colorOf(d));
		ctx.fill();
		ctx.lineWidth = 8;
		ctx.lineJoin = 'round';
		ctx.strokeStyle = '#fff';
		ctx.stroke();
	};

	const sharedProps = (args: { size: number }) => ({
		id: 'events',
		data: events,
		getPosition: (d: EventFeature) => d.geometry.coordinates as [number, number],
		getSize: args.size,
		sizeUnits: 'pixels' as const,
		pickable: true,
		onHover: onMouseOverTooltipHandler
	});

	const makeMaskLayer = (args: { size: number }) =>
		new CanvasIconLayer<EventFeature>({
			...sharedProps(args),
			paint: paintCircle,
			getIconKey: 'circle',
			mask: true,
			getColor: colorOf
		});

	const makeKeyedLayer = (args: { size: number }) =>
		new CanvasIconLayer<EventFeature>({
			...sharedProps(args),
			paint: paintEventType,
			getIconKey: eventTypeOf
		});

	const makeSymbolLayer = (args: { size: number }) =>
		new CanvasIconLayer<EventFeature>({
			...sharedProps(args),
			paint: paintEventSymbol,
			getIconKey: eventTypeOf
		});
</script>

<!--
Every feature has the same icon: `getIconKey` is the constant `'circle'`, so `paint` is called once.
As `mask: true`, each circle is recolored by `getColor`, which sets the color according to its `event_type`.
-->
<Story name="Single masked icon">
	{#snippet template(args)}
		{@const layers = [makeMaskLayer(args as { size: number })]}

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
The `getIconKey` function returns the `event_type` of each feature, so `paint` is called once per event type.
The `paint` function draws a outlined circle, whose fill color is determined by the event type.
-->
<Story name="Icon per key">
	{#snippet template(args)}
		{@const layers = [makeKeyedLayer(args as { size: number })]}

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
The `getIconKey` function returns the `event_type` of each feature, so `paint` is called once per event type.
The `paint` function draws different symbol shape for each event type.
-->
<Story name="Icon per key II">
	{#snippet template(args)}
		{@const layers = [makeSymbolLayer(args as { size: number })]}

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
