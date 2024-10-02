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

	type Data = {
		[key: string]: any;
	};

	type GeoJSONData = {
		id: number;
		properties: Data;
		geometry: Data;
	};

	/**
	 * The last clicked item on `<Map>` or `<CardList>`, passed in as
	 * a two-way bind. This is in the shape of an `esriData`
	 * item, which should have `geometry` and `properties` keys.
	 */
	export let selectedItem: GeoJSONData | Data;

	/**
	 * The last clicked item on `<Map>`, passed in as
	 * a two-way bind. This is in the shape of a `GeoJSON`,
	 * which should have `geometry` and `properties` keys.
	 */
	export let clickedMapItem: GeoJSONData | Data;

	/**
	 * Sets the size of the flyTo zoom.
	 */
	export let mapZoom: number = 13;

	/**
	 * Takes an object of type `Data` and returns the id for
	 * comparison between `selectedItem` and `clickedMapItem`.
	 * You can pass in a custom function to fetch id if your object
	 * doesn't have an `id` key. If item is undefined, it returns
	 * `undefined`.
	 */
	export let getID = (item: Data) => (item ? item.id : undefined);

	const flyToMapItem = (
		lastMapItem: GeoJSONData | Data,
		activeItem: GeoJSONData | Data,
		mapZoom: number
	) => {
		/**
		 * Check if lastMapItem is the same as activeItem
		 * if not, assign the value of activeItem to lastMapItem
		 * and fly to the coordinates of activeItem
		 */
		if (getID(lastMapItem) !== getID(activeItem)) {
			lastMapItem = activeItem;
			const { geometry } = lastMapItem;
			$mapStore.flyTo({
				center: geometry.coordinates,
				zoom: mapZoom
			});
		}
	};

	$: flyToMapItem(clickedMapItem, selectedItem, mapZoom);
</script>

<slot />
