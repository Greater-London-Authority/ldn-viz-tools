<script lang="ts">
	import type { MapLibreStore } from '$lib/map/types';
	import { GeoJsonLayer } from '@deck.gl/layers';
	import { Button, Input, theme } from '@ldn-viz/ui';
	import { MapPinSimpleArea } from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import * as turf from '@turf/turf';
	import { getContext } from 'svelte';
	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';

	interface Props {
		/**
		 * ID of the target layer.
		 */
		layerId?: any;
	}

	let { layerId }: Props = $props();
	const mapStore: MapLibreStore = getContext('mapStore');

	// GEN CODE
	let center = $state<[number, number]>([-0.18494436416196436, 51.35689422927953]);
	let pointer = $state([-0.06639739884536766, 51.29328620024461]);
	const MAX_RADIUS_M = 10000;

	// $effect(() => {
	// 	$mapStore?.on('click', (ev) => {
	// 		clickMap(ev);
	// 	});
	// });

	const bearing = $derived(turf.bearing(center, pointer));
	const raw = $derived(turf.distance(center, pointer, { units: 'meters' }));
	let radius = $derived(Math.min(raw, MAX_RADIUS_M));
	const clamped = $derived(raw > MAX_RADIUS_M);

	// handle pins to the max ring while the cursor runs past it
	const handle = $derived(turf.destination(center, radius, bearing, { units: 'meters' }));
	const ring = $derived(turf.circle(center, radius, { steps: 64, units: 'meters' }));

	// Activate

	const activateRadiusSearch = () => {
		console.log('clicked');

		$mapStore?.on('click', (ev) => {
			clickMap(ev);
		});

		$mapStore?.on('mousemove', (ev) => {
			pointer = [ev.lngLat.lng, ev.lngLat.lat];
		});

		// Deactivate tooltips
		// Set cursor to cross hairs
	};

	// Drop a pin
	// Move map to pin

	const clickMap = (ev: { lngLat: any }) => {
		// console.log(ev);

		const { lng, lat } = ev.lngLat;

		center = [lng, lat];
		$mapStore?.flyTo({ center });
	};

	// Extend circle out from pin

	// Tie Radius to range slider

	// Display Radius in M2

	// Limit radius of search to X m

	// Debounce callbacks/ Submit on done

	//----//

	type RGBA = [number, number, number, number];

	const layers = $derived([
		new GeoJsonLayer({
			id: 'location-radius',
			data: ring,

			filled: true,
			getFillColor: theme.colorTokenNameToRGBArray('geo.interactive', theme.currentTheme) as RGBA,
			opacity: 0.5,

			stroked: true,
			getLineColor: [168, 168, 168, 255],

			lineWidthScale: 2,
			lineWidthMinPixels: 1
		}),

		new GeoJsonLayer({
			id: 'location-radius-handle',
			data: handle,

			// TODO: HANDLE STYLES
			// filled: true,
			// getFillColor: theme.colorTokenNameToRGBArray('geo.interactive', theme.currentTheme) as RGBA,
			// opacity: 0,

			// stroked: true,
			// getLineColor: theme.colorTokenNameToRGBArray('geo.interactive', theme.currentTheme) as RGBA,

			// lineWidthScale: 5,
			// lineWidthMinPixels: 1,

			pointType: 'circle',
			pointRadiusUnits: 'pixels',
			getLineWidth: 1,
			getPointRadius: 5
		})
	]);
</script>

<Button
	variant="square"
	emphasis="secondary"
	title="Radius Search"
	class="pointer-events-auto"
	onclick={activateRadiusSearch}
>
	<Icon src={MapPinSimpleArea} class="h-8 w-8 p-1" />
</Button>

<div class="pointer-events-auto bg-color-container p-2">
	<p>TODO: Radius feedback here</p>
	<p>{radius}</p>

	<Input
		type="range"
		label="Radius"
		name="searchRadius"
		max={`${MAX_RADIUS_M}`}
		bind:value={radius}
	/>

	<Input type="text" label="Radius M<sup>2</sup>" max={`${MAX_RADIUS_M}`} bind:value={radius}
	></Input>
</div>

<!-- TODO: WHY THIS EXIST? -->
<!-- <MapCursorEvent {layerId} {clickMap} /> -->

<MapDeckOverlay {layers} />
