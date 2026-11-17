<script module lang="ts">
	/**
	 * The `<MapMarkerFlyToFeature>` component is a wrapping container for use
	 * within tooltip and marker components. It moves the map so it centers
	 * the popup on the screen. This is activated soon after mounting.
	 * @component
	 */

	import { pointOnFeature } from '@turf/turf';
	import { getContext, onMount } from 'svelte';
	import type { LngLatLike, MapGeoJSONFeature } from 'maplibre-gl';
	import { GLIDE_ANIMATION_OPTIONS } from '../../../themes/animations';
	import type { MapLibre, MapLibreStore } from '../../../map/types';

	const findFlyPoint = (map: MapLibre, containerHeight: number, mapCoords: LngLatLike) => {
		const mapRect = map.getContainer().getBoundingClientRect();
		const offsetHalfMap = mapRect.height / 2;
		const totalVertGap = mapRect.height - containerHeight;
		const pixelCoords = map.project(mapCoords);

		if (totalVertGap < 0) {
			// Places the marker so its tip is a little above the bottom of the
			// screen. Or would it be better to align the screen and marker tops?
			pixelCoords.y = pixelCoords.y - offsetHalfMap + 10;
		} else {
			const requiredVertPointOnScreen = totalVertGap / 2 + containerHeight;

			// Puts the center of the marker at the center of the screen otherwise
			// the marker content might extend beyond the top of the screen.
			pixelCoords.y = pixelCoords.y + offsetHalfMap - requiredVertPointOnScreen;
		}

		return map.unproject(pixelCoords);
	};

	const findElementHeight = (container: HTMLElement): number => {
		let tallest = container.offsetHeight;

		for (const child of Object.values(container.children)) {
			const childHeight = findElementHeight(child as HTMLElement);
			if (childHeight && childHeight > tallest) {
				tallest = childHeight;
			}
		}

		return tallest;
	};
</script>

<script lang="ts">
	interface Props {
		/**
		 * If `true`, then all fly events are disabled.
		 */
		disabled?: boolean;
		children?: import('svelte').Snippet;
	}

	let { disabled = false, children }: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');
	const feature: MapGeoJSONFeature = getContext('mapMarkerFeature');
	const point = feature.geometry ? pointOnFeature(feature) : null;

	let container: HTMLDivElement | undefined = $state();

	const flyToFeature = () => {
		$mapStore!.easeTo({
			...GLIDE_ANIMATION_OPTIONS,
			duration: 600,
			center: findFlyPoint(
				$mapStore!,
				findElementHeight(container!),
				point!.geometry.coordinates as [number, number]
			)
		});
	};

	onMount(() => {
		if (!disabled && point?.geometry?.coordinates) {
			// Ensure DOM updated so we have correct heights on elements.
			setTimeout(flyToFeature, 1);
		}
	});
</script>

<div bind:this={container}>
	{@render children?.()}
</div>
