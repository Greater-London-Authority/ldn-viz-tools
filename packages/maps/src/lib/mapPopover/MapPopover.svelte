<script lang="ts">
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
	 * @component
	 */

	import type { Feature } from 'geojson';
	import type { Component } from 'svelte';
	import { getAllContexts, mount, onDestroy, onMount, unmount, type SvelteComponent } from 'svelte';

	import maplibre_gl from 'maplibre-gl';

	import { centroid } from '@turf/centroid';

	const contexts = getAllContexts();
	const mapStore = contexts.get('mapStore');

	interface Props {
		/**
		 * Svelte component used to render the tooltip.
		 */
		popup?: Component | null;
		/**
		 * Optional message to be passed to child popop component via `mapMarkerString` context.
		 */
		msgString?: string | null;
		/**
		 * Feature to which the popover should be attached.
		 * This is used to position the popover, and is also passed to the popover component via the `mapMarkerFeature` context.
		 */
		feature: Feature;
		/**
		 * Name of layer containing this feature.
		 * This is passed to the popover component via the `mapMarkerLayer` context.
		 */
		layer?: string;
	}

	let { popup = null, msgString = null, feature, layer = '' }: Props = $props();

	let popupMaplibrePopup: maplibre_gl.Popup | null = null;
	let popupInstance: SvelteComponent | null = null;

	const renderComponent = (feature: Feature, component: Component | null) => {
		if (!$mapStore || !component) {
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
		maplibrePopup.setLngLat(position as [number, number]);

		// make hyperlinks clickable
		container.style.pointerEvents = 'auto';

		const instance = mount(component, {
			target: container,
			context: new Map([
				...contexts,
				['mapMarkerMaplibrePopup', maplibrePopup],
				['mapMarkerFeature', feature],
				['mapMarkerLayer', layer],
				['mapMarkerString', msgString]
			])
		});

		maplibrePopup.addTo($mapStore);

		popupMaplibrePopup = maplibrePopup;
		popupInstance = instance;
	};

	const removePopup = () => {
		popupMaplibrePopup?.remove();
		popupMaplibrePopup = null;

		unmount(popupInstance);
		popupInstance = null;
	};

	onMount(() => renderComponent(feature, popup));

	onDestroy(() => removePopup());

	$effect(() => {
		if ($mapStore) {
			renderComponent(feature, popup);
		}
	});
</script>

<style>
	/** TODO: remove this hack **/
	/* N.B. The applied z-index is equivalent to the z-10 index applied to the MapControlGroup.
   It will display the popover above the map, but below the sidebar or a modal (if one is open).
   */
	:global(.maplibregl-popup) {
		z-index: 10;
	}
</style>
