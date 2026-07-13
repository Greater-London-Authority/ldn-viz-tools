<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapPopover from './MapPopover.svelte';

	const componentType = {
		type: 'object',
		control: 'none',
		table: {
			type: {
				summary: 'Svelte component'
			}
		}
	};

	/**
	 * The `MapPopover` component allows the creation of a popover using MapLibre, without creating a MapLibre marker.
	 * This can be useful if the popover corresponds to a point rendered using Deck.gl (rather than MapLibre),
	 * or to a location on a basemap that has no associated marker at all.
	 *
	 * Note that each instance of the component renders only a single popover.
	 * If multiple popovers should be present simultaneously, you could create an array of features that should be labelled,
	 * and create the popovers using an `{#each}` block.
	 *
	 * You can use the components defined in`mapMarker/elements` within the popover component.
	 *
	 * **Alternatives**: if the popover is meant to be attached to a Maplibre marker, use the [MapMarker](./?path=/docs/maps-mapmarker--documentation) instead.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapPopover',
		component: MapPopover,
		tags: ['autodocs'],

		parameters: {
			layout: 'full'
		},
		argTypes: {
			layerId: {
				type: 'string',
				control: 'none'
			},
			noCursorStyle: {
				type: 'boolean',
				control: 'none'
			},
			tooltip: componentType,
			popup: componentType
		}
	});
</script>

<script lang="ts">
	import { Button, theme } from '@ldn-viz/ui';
	import type { Feature } from 'geojson';
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapLayerSource from '../mapLayerSource/MapLayerSource.svelte';
	import MapLayerView from '../mapLayerView/MapLayerView.svelte';

	import DefaultPopover from '../mapDeckPopovers/DefaultPopover.svelte';
	import DemoPopover from './DemoPopover.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const feature_1 = {
		type: 'Feature',
		geometry: { type: 'Point', coordinates: [-0.22091751065882667, 51.549221311516909] },
		properties: {
			site_name: 'Willesden Green Tube Station',
			objectid: 101
		}
	} as Feature;

	const feature_2 = {
		type: 'Feature',
		geometry: { type: 'Point', coordinates: [-0.14332953326827994, 51.539748314746866] },
		properties: {
			site_name: 'Camden High Street',
			objectid: 103
		}
	} as Feature;

	// A polygon feature: the popover is positioned at its centroid.
	const polygonFeature = {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[-0.16, 51.51],
					[-0.1, 51.51],
					[-0.1, 51.55],
					[-0.16, 51.55],
					[-0.16, 51.51]
				]
			]
		},
		properties: {
			site_name: 'Central London area',
			objectid: 201
		}
	} as Feature;

	// Several features labelled simultaneously via an `{#each}` block.
	const features = [feature_1, feature_2, polygonFeature];

	let selectedFeature: Feature | undefined = $state();
</script>

<Story name="Interactive Example">
	{#snippet template()}
		<div class="flex gap-2 p-2">
			<Button onclick={() => (selectedFeature = feature_1)}>Select point 1</Button>
			<Button onclick={() => (selectedFeature = feature_2)}>Select point 2</Button>
			<Button onclick={() => (selectedFeature = undefined)} disabled={!selectedFeature}>
				Unselect point
			</Button>
		</div>

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapPopover feature={selectedFeature} popup={DemoPopover} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- 
The `msgString` prop passes plain text to the popover component (via the `mapMarkerString` context),
so the logic for constructing a label can live outisde of the popover component.
   -->
<Story name="With msgString">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapPopover
					feature={feature_1}
					popup={DefaultPopover}
					msgString="Willesden Green Tube Station"
				/>
			</Map>
		</div>
	{/snippet}
</Story>

<!--
For geometries that are of type `Polygon` or `LineString` rather than `Point`, the popover is positioned at the feature's centroid, computed with `@turf/centroid`.

Here the polygon itself is also drawn on the map with a `<MapLayerSource>`/`<MapLayerView>`, so the popover can be seen sitting at the centroid of the rendered shape.
-->
<Story name="Non-point feature">
	{#snippet template()}
		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapLayerSource
					id="gla/ldn-viz-tools/mappopover/non-point-feature"
					spec={{
						type: 'geojson',
						data: polygonFeature
					}}
				>
					<MapLayerView
						id="gla/ldn-viz-tools/mappopover/non-point-feature/fill"
						spec={{
							type: 'fill',
							filter: ['==', '$type', 'Polygon'],
							paint: {
								'fill-color': theme.tokenNameToValue('geo.interactive.selected'),
								'fill-outline-color': theme.tokenNameToValue('geo.interactive.selected'),
								'fill-opacity': 0.6
							}
						}}
					/>
				</MapLayerSource>
				<MapPopover
					feature={polygonFeature}
					popup={DefaultPopover}
					msgString="A square in London"
				/>
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Each `MapPopover` renders a single popover. To show several at once, create an array of features and render a `MapPopover` for each within an `{#each}` block. -->
<Story name="Multiple simultaneous popovers">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				{#each features as feature, i (i)}
					<MapPopover {feature} popup={DemoPopover} />
				{/each}
			</Map>
		</div>
	{/snippet}
</Story>
