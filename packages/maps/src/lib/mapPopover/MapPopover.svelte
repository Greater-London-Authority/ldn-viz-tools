<script lang="ts">
	/**
	 * The `MapTooltip` component allows the creation of a popover using MapLibre, without creating a MapLibre marker.
	 * This can be useful if the popover corresponds to a point rendered using Deck.gl (rather than MapLibre),
	 * or to a location on a basemap that has no associated marker at all.
	 *
	 * If this component is rendered, a popup is displayed.
	 *
	 * **Alternatives**: if the popover is meant to be attached to a Maplibre marker, use the [MapMarker](./?path=/docs/maps-mapmarker--documentation) instead.
   *
   * @component
	 */

	import { getAllContexts, onDestroy, onMount, tick } from 'svelte';
	import maplibre_gl from 'maplibre-gl';

	import { centroid } from '@turf/centroid';

	const contexts = getAllContexts();
	const mapStore = contexts.get('mapStore');

	export let popup = null;

	export let feature;

	let popupMaplibrePopup = null;
	let popupInstance = null;

	const renderComponent = (feature, component) => {
		if (!$mapStore) {
			return;
		}

		if (popupMaplibrePopup) {
			removePopup();
		}

		if (!feature) {
			return;
		}

		const position = centroid(feature).geometry.coordinates;

		const maplibrePopup = new maplibre_gl.Popup({
			closeButton: false,
			closeOnClick: false
		});

		const container = document.createElement('div');
		maplibrePopup.setDOMContent(container);
		maplibrePopup.setLngLat(position);

		const instance = new component({
			target: container,
			context: new Map([
				...contexts,
				['mapMarkerMaplibrePopup', maplibrePopup],
				['mapMarkerFeature', feature]
			])
		});

		maplibrePopup.addTo($mapStore);

		popupMaplibrePopup = maplibrePopup;
		popupInstance = instance;
	};

	const removePopup = () => {
		popupMaplibrePopup?.remove();
		popupMaplibrePopup = null;

		popupInstance?.$destroy();
		popupInstance = null;
	};

	onMount(() => renderComponent(feature, popup));

	onDestroy(() => removePopup());

	$: $mapStore && renderComponent(feature, popup);
</script>

<style>
	/** TODO: remove this hack **/
	:global(.maplibregl-popup) {
		z-index: 99;
	}
</style>
