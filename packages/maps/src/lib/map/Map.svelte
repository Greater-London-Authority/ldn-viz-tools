<script lang="ts">
	/**
	 * The `<Map>` component wraps a MapLibre map and manages the style (based
	 * on the current theme mode) and cursor event handling for quicker and
	 * easier map creation and management.
	 *
	 * It also:
	 * - provides stores for `Map` and `MapCursor` instances;
	 * - sets context for `Map` and `MapCursor` instances;
	 *
	 * The map's container has a relative CSS position so slotted content can
	 * position itself accordingly. Map controls and other overlay components
	 * should be wrapped and positioned using a `MapControlGroup` instance.
	 *
	 * (see [MapLibre Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)).
	 * @component
	 */

	import maplibre_gl from 'maplibre-gl';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	// import { currentThemeMode } from '@ldn-viz/ui';

	import { theme_os_dark, theme_os_light_vts } from '@ldn-viz/maps';

	import MapCursor from './mapCursor/MapCursor';
	import type { MapCursorType, MapCursorTypeStore } from './mapCursor/types';

	import MapLibre from './MapLibre.svelte';
	import type { MapLibreOptions, MapLibreStyle, MapStore, WhenMapLoads } from './types';

	import { mode, type SystemModeValue } from 'mode-watcher';
	let currentThemeMode: SystemModeValue = $derived(mode.current);

	interface Props {
		/**
		 * Disables initialisation of the map on mount. This is most often used
		 * to avoid un-needed map rendering during development of non-map application
		 * elements.
		 */
		disabled?: boolean;
		/**
		 * Custom ([MapLibre `MapOptions`](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/)).
		 */
		options?: MapLibreOptions;
		/**
		 * Called when the map is finished loading and ready for use.
		 */
		whenMapLoads?: null | WhenMapLoads;
		/**
		 * Called when the map component is destroyed. Required when external
		 * resources need to be cleaned up.
		 */
		whenMapUnloads?: null | WhenMapLoads;
		/**
		 * Light style base map. Defaults to `theme_os_light_vts`. Pass `null`
		 * to disable light mode.
		 */
		lightStyle?: null | MapLibreStyle;
		/**
		 * Dark style base map. Defaults to `theme_os_dark`. Pass `null`
		 * to disable dark mode.
		 */
		darkStyle?: null | MapLibreStyle;
		children?: import('svelte').Snippet;
		[key: string]: any;

		/**
		 * Store containing the MapLibre instance.
		 */
		mapStore: MapStore;

		/**
		 * Store containing the MapCursor instance.
		 */

		mapCursorStore: MapCursorTypeStore;
	}

	let {
		disabled = false,
		options = {},
		whenMapLoads = null,
		whenMapUnloads = null,
		lightStyle = theme_os_light_vts as MapLibreStyle,
		darkStyle = theme_os_dark as MapLibreStyle,
		children,

		mapStore = $bindable(),
		mapCursorStore = $bindable(),

		...rest
	}: Props = $props();

	if (!mapStore) {
		mapStore = writable(null);
	}
	if (!mapCursorStore) {
		mapCursorStore = writable(null);
	}

	setContext('mapStore', mapStore);
	setContext('mapCursorStore', mapCursorStore);

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

	const identifyStyle = (
		currentThemeMode: SystemModeValue,
		darkStyle,
		lightStyle
	): MapLibreStyle => {
		if (!lightStyle && !darkStyle) {
			return theme_os_light_vts as MapLibreStyle;
		}

		if (lightStyle && !darkStyle) {
			return lightStyle as MapLibreStyle;
		}

		if (!lightStyle && darkStyle) {
			return darkStyle as MapLibreStyle;
		}

		const style = currentThemeMode === 'dark' ? darkStyle : lightStyle;
		return style as MapLibreStyle;
	};

	let mapOptions: Omit<maplibre_gl.MapOptions, 'container'> = $derived({
		...options,
		style: identifyStyle(currentThemeMode, darkStyle, lightStyle)
	});
</script>

{#key mapOptions}
	<MapLibre {disabled} options={mapOptions} {whenMapCreated} {whenMapDestroyed} {...rest}>
		{@render children?.()}
	</MapLibre>
{/key}
