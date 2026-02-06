<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarker from './MapMarker.svelte';

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
	 * The `<MapMarker>` component allows tooltips and popups to easily be added
	 * for feature hover and clicks respectively. This component may be slotted
	 * anywhere provided the `<Map>` component context is available.
	 *
	 * To ensure the correct behaviour for overlapping tooltips that aren't
	 * sourced via ESRI servers, set `generateId` to true in your
	 * [MapLibre Source Specifications](https://maplibre.org/maplibre-style-spec/sources/).
	 * This will set the value of the `feature.id` property to be equal to the
	 * index of the corresponding feature, rather than leaving it undefined.
	 *
	 * The `tooltip` and `popup` components are client side rendered. This
	 * component's context is passed to them along with three additional
	 * values:
	 * - `mapMarkerMaplibrePopup` is the instance of `maplibre_gl.Popup` that contains the rendered tooltip component.
	 * - `mapMarkerLayerId` is the ID of the map layer the feature belongs to.
	 * - `mapMarkerFeature` is the target GeoJSON feature. Note that MapLibre adds additional fields, e.g. `layer`.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapMarker',
		component: MapMarker,
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

<script>
	import loadTestLayers from '../loadTestLayers';
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import TestPopup from './TestPopup.svelte';
	import TestTooltip from './TestTooltip.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Story name="Interactive Example">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapMarker
					layerId="gla/ldn-viz-tools/test-data/polygon"
					tooltip={TestTooltip}
					popup={TestPopup}
				/>
				<MapMarker
					layerId="gla/ldn-viz-tools/test-data/line"
					tooltip={TestTooltip}
					popup={TestPopup}
				/>
				<MapMarker
					layerId="gla/ldn-viz-tools/test-data/point"
					tooltip={TestTooltip}
					popup={TestPopup}
				/>
			</Map>
		</div>
	{/snippet}
</Story>
