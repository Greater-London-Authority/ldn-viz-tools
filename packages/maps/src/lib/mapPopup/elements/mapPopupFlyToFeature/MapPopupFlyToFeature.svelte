<script context="module">
	/**
	 * The `<MapPopupFlyToFeature>` component is a wrapping container for use
	 * within tooltip and marker components. It moves the map so it centers
	 * the popup on the screen. This is activated soon after mounting.
	 * @component
	 */

	import { onMount, getContext } from 'svelte';
	import { pointOnFeature } from '@turf/turf';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';

	const findFlyPoint = (map, containerHeight, mapCoords) => {
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

	const findElementHeight = (container) => {
		let tallest = container.offsetHeight;

		for (const child of Object.values(container.children)) {
			const childHeight = findElementHeight(child);
			if (childHeight && childHeight > tallest) {
				tallest = childHeight;
			}
		}

		return tallest;
	};
</script>

<script>
	/**
	 * If true disables all fly events.
	 */
	export let disabled = false;

	const mapStore = getContext('mapStore');
	const feature = getContext('mapPopupFeature');
	const point = feature.geometry ? pointOnFeature(feature) : null;

	let container;

	const flyToFeature = () => {
		$mapStore.easeTo({
			...GLIDE_ANIMATION_OPTIONS,
			duration: 600,
			center: findFlyPoint($mapStore, findElementHeight(container), point.geometry.coordinates)
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
	<slot />
</div>
