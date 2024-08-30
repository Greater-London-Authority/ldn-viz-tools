<script lang="ts">
	/**
	 * The `<Map>` component wraps a MapLibre map and manages the style (based
	 * on the current theme mode) and cursor event handling for quicker and
	 * easier map creation and management.
	 *
	 * It also:
	 * - provides stores for `Map` and `MapCursor` instances;
	 * - sets context for `Map` and `MapCursor` instances.
	 *
	 * The map's container has a relative CSS position so slotted content can
	 * position itself accordingly. Map controls and other overlay components
	 * should be wrapped and positioned using a `MapControlGroup` instance.
	 *
	 * (see [MapLibre Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)).
	 * @component
	 */

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import maplibre_gl from 'maplibre-gl';

	import { currentThemeMode } from '@ldn-viz/ui';
	import { theme_os_light_vts, theme_os_dark } from '@ldn-viz/maps';

	import MapCursor from './mapCursor/MapCursor';
	import type { MapCursorType, MapCursorTypeStore } from './mapCursor/types';

	import MapLibre from './MapLibre.svelte';
	import type { MapLibreOptions, MapLibreStyle, MapStore, WhenMapLoads } from './types';

	/**
	 * Disables initialisation of the map on mount. This is most often used
	 * to avoid uneeded map rendering during development of non-map application
	 * elements.
	 */
	export let disabled = false;

	/**
	 * Custom ([MapLibre `MapOptions`](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/)).
	 */
	export let options: MapLibreOptions = {};

	/**
	 * Store containing the MapLibre instance.
	 */
	export const mapStore: MapStore = writable(null);
	setContext('mapStore', mapStore);

	/**
	 * Store containing the MapCursor instance.
	 */
	export const mapCursorStore: MapCursorTypeStore = writable(null);
	setContext('mapCursorStore', mapCursorStore);

	/**
	 * Called when the map is finished loading and ready for use.
	 */
	export let whenMapLoads: null | WhenMapLoads = null;

	/**
	 * Called when the map component is destroyed. Required when external
	 * resources need to be cleaned up.
	 */
	export let whenMapUnloads: null | WhenMapLoads = null;

	/**
	 * Light style base map. Defaults to `theme_os_light_vts`. Pass `null`
	 * to disable light mode.
	 */
	export let lightStyle: null | MapLibreStyle = theme_os_light_vts as MapLibreStyle;

	/**
	 * Dark style base map. Defaults to `theme_os_dark`. Pass `null`
	 * to disable dark mode.
	 */
	export let darkStyle: null | MapLibreStyle = theme_os_dark as MapLibreStyle;

	const whenMapCreated: WhenMapLoads = (maplibre) => {
		maplibre.once('load', () => {
			mapStore.set(maplibre);

			const mapCursor = MapCursor(maplibre) as MapCursorType;
			mapCursorStore.set(mapCursor);

			if (whenMapLoads) {
				whenMapLoads(maplibre);
			}
		});
	};

	const whenMapDestroyed: WhenMapLoads = (maplibre) => {
		if (whenMapUnloads) {
			whenMapUnloads(maplibre);
		}

		$mapCursorStore?.destroy();

		mapStore.set(null);
		mapCursorStore.set(null);
	};

	const updateMapOptions = () => {
		mapOptions = {
			...options,
			style: identifyStyle()
		};
	};

	const identifyStyle = (): MapLibreStyle => {
		if (!lightStyle && !darkStyle) {
			return theme_os_light_vts as MapLibreStyle;
		}

		if (lightStyle && !darkStyle) {
			return lightStyle as MapLibreStyle;
		}

		if (!lightStyle && darkStyle) {
			return darkStyle as MapLibreStyle;
		}

		const style = $currentThemeMode === 'dark' ? darkStyle : lightStyle;
		return style as MapLibreStyle;
	};

	let mapOptions: Omit<maplibre_gl.MapOptions, 'container'> = {
		...options,
		style: identifyStyle()
	};

	$: $currentThemeMode, darkStyle, lightStyle, updateMapOptions();
</script>

{#key mapOptions}
	<MapLibre {disabled} options={mapOptions} {whenMapCreated} {whenMapDestroyed} {...$$restProps}>
		<slot />
	</MapLibre>
{/key}
