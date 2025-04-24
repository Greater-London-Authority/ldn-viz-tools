<script lang="ts">
	/**
	 * The `MapArrow` draws an arrow pointing at a location.
	 * The arrow will adjust as the users pans or zooms.
	 */

	import { getContext, onDestroy } from 'svelte';

	import type { Map as MaplibreglMap } from 'maplibre-gl';
	import type { MapLibreStore } from '../map/types';

	// export let map;

	/**
	 * Color of the arrow (both line and arrowhead), in any format that can be directly applied to an SVG element.
	 */
	export let color = 'red';

	/**
	 * Position that the arrow points at (a `Maplibre [LngLatLike](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/LngLatLike/) object.
	 */
	export let pointAt:
		| { lat: number; lng: number }
		| {
				lat: number;
				lon: number;
		  }
		| [number, number]
		| undefined = undefined;

	/**
	 * Length of the arrow (in pixels).
	 */
	export let arrowLength = 200;

	/**
	 * Arrowhead size (in pixels).
	 */
	export let arrowheadSize = 20;

	/**
	 * Gap between the arrowhead and point (in pixels).
	 */
	export let gap = 30;

	const mapStore: MapLibreStore = getContext('mapStore');
	$: map = $mapStore;

	$: console.log({ mapStore });

	let pointPosPixels = { x: 0, y: 0 }; // what we're pointing at
	let centerPosPixels = { x: 0, y: 0 }; // center of map

	let arrowStartPos = { x: 0, y: 0 };
	let arrowEndPos = { x: 0, y: 0 };

	const updatePos = () => {
		if (!map || !pointAt) {
			return;
		}
		pointPosPixels = map.project(pointAt);
		centerPosPixels = map.project(map.getCenter());

		const d = Math.sqrt(
			Math.pow(pointPosPixels.x - centerPosPixels.x, 2) +
				Math.pow(pointPosPixels.y - centerPosPixels.y, 2)
		);

		arrowStartPos = {
			x: pointPosPixels.x + ((centerPosPixels.x - pointPosPixels.x) * arrowLength) / d,
			y: pointPosPixels.y + ((centerPosPixels.y - pointPosPixels.y) * arrowLength) / d
		};

		arrowEndPos = {
			x: pointPosPixels.x + ((centerPosPixels.x - pointPosPixels.x) * gap) / d,
			y: pointPosPixels.y + ((centerPosPixels.y - pointPosPixels.y) * gap) / d
		};
	};

	const onMapLoad = (newMap: MaplibreglMap) => {
		newMap.on('zoom', updatePos);
		newMap.on('drag', updatePos);
		updatePos();
	};

	onDestroy(() => {
		if (map) {
			map.off('zoom', updatePos);
			map.off('drag', updatePos);
		}
	});

	$: {
		if (map) {
			onMapLoad(map);
		}
	}

	$: pointAt && updatePos();
</script>

<div class="h-full w-full pointer-events-none absolute z-50" style="top: 0">
	<svg class="h-full w-full">
		{#if map && pointAt}
			<line
				x1={arrowStartPos?.x ?? 0}
				x2={arrowEndPos?.x ?? 0}
				y1={arrowStartPos?.y ?? 0}
				y2={arrowEndPos?.y ?? 0}
				stroke={color}
				marker-end="url(#arrowhead)"
			/>

			<defs>
				<marker
					markerWidth={arrowheadSize}
					markerHeight={arrowheadSize}
					refX={arrowheadSize / 2}
					refY={arrowheadSize / 2}
					viewBox={`0 0 ${arrowheadSize} ${arrowheadSize}`}
					orient="auto"
					id="arrowhead"
				>
					<polygon
						points={`0,${arrowheadSize} 0,0 ${arrowheadSize},${arrowheadSize / 2}`}
						fill={color}
					></polygon>
				</marker>
			</defs>
		{/if}
	</svg>
</div>
