<script lang="ts">
	/**
	 * The `MapTooltip` component allows the creation of a popover using MapLibre, without creating a MapLibre marker.
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
	 * @component
	 */

	import { getAllContexts, onDestroy, onMount } from 'svelte';
	import maplibre_gl from 'maplibre-gl';

	import { centroid } from '@turf/centroid';

	const contexts = getAllContexts();
	const mapStore = contexts.get('mapStore');

	/**
	 * Svelte component used to render the tooltip.
	 */
	export let popup = null;

	/**
	 * Feature to which the popover should be attached.
	 * This is used to position the popover, and is also passed to the popover component via the `mapMarkerFeature` context.
	 */
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
