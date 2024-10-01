<script lang="ts">
	/**
	 * The `<MapFlyTo>` component exposes the `map.flyTo` capability,
	 * as a Svelte component. It's designed to be slotted into a
	 * `<Map>` component and used in tandem with `<CardList>` to fly
	 * to a `clickedListItem` when clicked. It will center and zoom
	 * to the `clickedListItem`, with a default zoom of 13 that can
	 * be modified by passing in the optional prop `mapZoom`.
	 *
	 * @component
	 */

	import { getContext } from 'svelte';
	import type { MapStore } from '../map/Map.svelte';

	const mapStore: MapStore = getContext('mapStore');

	/**
	 * The last clicked item on `<Map>` or `<CardList>`, passed in as
	 * a two-way bind. This is in the shape of an `esriData`
	 * item, which should have `geometry` and `properties` keys.
	 */
	export let selectedItem;

	/**
	 * The last clicked item on `<Map>`, passed in as
	 * a two-way bind. This is in the shape of a `GeoJSON`,
	 * which should have `geometry` and `properties` keys.
	 */
	export let clickedMapItem;

	/**
	 * Sets the size of the flyTo zoom.
	 */
	export let mapZoom: number = 13;

	/**
	 * Sets the name of the key corresponding to an id value,
	 * for comparison of `selectedItem` and `clickedMapItem`.
	 * This name depends on the shape of the `GeoJSON` data,
	 * e.g. `site_id`.
	 */
	export let idField: string;

	const flyToMapItem = (
		lastMapItem: { properties: { [x: string]: any }; geometry: { [x: string]: any } },
		activeItem: { properties: { [x: string]: any } },
		idField: string,
		mapZoom: number
	) => {
		/**
		 * Check if lastMapItem is the same as activeItem
		 * if not, assign the value of activeItem to lastMapItem
		 * and fly to the coordinates of activeItem
		 */
		if (lastMapItem?.properties[idField] !== activeItem?.properties[idField]) {
			lastMapItem = activeItem;
			const { geometry } = lastMapItem;
			$mapStore.flyTo({
				center: geometry.coordinates,
				zoom: mapZoom
			});
		}
	};

	$: flyToMapItem(clickedMapItem, selectedItem, idField, mapZoom);
</script>
