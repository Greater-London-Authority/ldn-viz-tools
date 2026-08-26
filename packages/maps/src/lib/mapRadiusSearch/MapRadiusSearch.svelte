<script lang="ts">
	import type { MapLibreStore } from '$lib/map/types';
	import { GeoJsonLayer } from '@deck.gl/layers';
	import { Button, Input, theme } from '@ldn-viz/ui';
	import { CheckCircle, XCircle, XMark } from '@steeze-ui/heroicons';
	import { MapPinSimpleArea } from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import * as turf from '@turf/turf';
	import { getContext } from 'svelte';
	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';
	// TODO fix module declaration error
	// @ts-expect-error
	import MapPin from './mapPinIcons/map_pin_mask_96x96.svg';

	interface Props {
		/**
		 * ID of the target layer.
		 */
		layerId?: any;
		/**
		 * Maximum size of radius in metres
		 */
		maxRadius: number;
	}

	let { layerId, maxRadius }: Props = $props();
	const mapStore: MapLibreStore = getContext('mapStore');
	let isOpen: boolean = $state(false);
	let searchActive: boolean = $state(false);

	// GEN CODE
	let center = $state<[number, number] | undefined>(undefined);

	let radius = $derived(Math.min(0, maxRadius));

	const ring = $derived(center && turf.circle(center, radius, { steps: 64, units: 'meters' }));

	// Activate

	$effect(() => {
		if (searchActive && $mapStore) {
			$mapStore.getCanvas().style.cursor = 'crosshair';

			$mapStore.once('click', (ev) => {
				clickMap(ev);
				toggleRadiusSearch();
			});
		} else if (!searchActive && $mapStore) {
			$mapStore.getCanvas().style.cursor = 'pointer';
		}
	});

	const toggleRadiusSearch = () => {
		searchActive = !searchActive;
	};

	const toggleModalOpen = () => {
		isOpen = !isOpen;
	};

	const clickHandler = () => {
		toggleModalOpen();
		toggleRadiusSearch();
	};
	// 	// Deactivate tooltips
	// 	// Set cursor to cross hairs
	// };

	// Drop a pin
	// Move map to pin

	const clickMap = (ev: { lngLat: any }) => {
		// console.log(ev);

		const { lng, lat } = ev.lngLat;

		center = [lng, lat];
		$mapStore?.flyTo({ center, zoom: 14 });
	};

	// Extend circle out from pin

	// Tie Radius to range slider

	// Display Radius in M2

	// Limit radius of search to X m

	// Debounce callbacks/ Submit on done

	//----//

	type RGBA = [number, number, number, number];

	const iconMapping = {
		custom: {
			x: 0,
			y: 0,
			width: 96,
			height: 96,
			mask: true,
			anchorX: 96 / 2,
			anchorY: 96
		}
	};

	const layers = $derived([
		new GeoJsonLayer({
			id: 'location-radius',
			data: ring,

			filled: true,
			getFillColor: theme.colorTokenNameToRGBArray('geo.interactive', theme.currentTheme) as RGBA,
			opacity: 0.1,

			stroked: true,
			getLineColor: theme.colorTokenNameToRGBArray('geo.feature', theme.currentTheme) as RGBA,

			lineWidthScale: 2,
			lineWidthMinPixels: 1
		}),

		new GeoJsonLayer({
			id: 'location-radius-point',
			data: center
				? {
						type: 'FeatureCollection',
						features: [
							{
								type: 'Feature',
								properties: {},
								geometry: {
									type: 'Point',
									coordinates: center
								}
							}
						]
					}
				: undefined,
			pointType: 'icon',
			getIconColor: theme.colorTokenNameToRGBArray('geo.interactive', theme.currentTheme) as RGBA,
			iconAtlas: MapPin,
			iconMapping,
			getIcon: 'custom',
			getIconSize: 32,
			pickable: true
			// onClick: (d: any) => {
			// 	interactions.onClick(d);
			// },
			// onHover: (d: any) => {
			// 	interactions.onHover(d);
			// }
		})
	]);
</script>

{#if !isOpen}
	<Button
		variant="square"
		emphasis="secondary"
		title="Radius Search"
		class="pointer-events-auto"
		onclick={clickHandler}
	>
		<Icon src={MapPinSimpleArea} class="h-8 w-8 p-1" />
	</Button>
{:else}
	<div
		class="product flow-product pointer-events-auto min-w-60 max-w-[300px] border-color-border-muted bg-color-container p-2 shadow-sm"
	>
		<div class="flex items-center justify-between">
			<p class="eyebrow">Search at point</p>
			<Button
				variant="text"
				size="xs"
				class="cursor-pointer bg-color-container text-color-text"
				onclick={toggleModalOpen}
				aria-label="Close legend"
			>
				<Icon src={XMark} theme="mini" class="h-5 w-5" />
			</Button>
		</div>
		<div class="flex flex-col">
			<div>
				{#if center}
					<fieldset>
						<legend class="label">Radius (max {maxRadius} metres)</legend>
						<div class="flex items-center gap-2">
							<Input
								type="range"
								name="searchRadius"
								id="searchRadius"
								min="0"
								max={`${maxRadius}`}
								bind:value={radius}
								aria-label="Select radius"
								class=""
							/>
							<Input
								type="text"
								name="searchRadiusText"
								id="searchRadiusText"
								min="0"
								max={`${maxRadius}`}
								bind:value={radius}
								aria-label="Enter desired radius"
								class="max-w-10"
							/>
						</div>
					</fieldset>
				{:else}
					<p class="caption"><span class="font-bold">Hint:</span> Click a position on the map</p>
				{/if}
			</div>
			<div class="mt-flow-loose flex justify-between">
				<Button
					variant="outline"
					size="sm"
					emphasis="secondary"
					class="gap-1"
					onclick={toggleModalOpen}
					aria-label="Cancel point search and close"
				>
					Cancel <Icon src={XCircle} theme="mini" class="h5 w-5" />
				</Button>
				{#if center}
					<Button size="sm" class="gap-1">
						Search <Icon src={CheckCircle} theme="mini" class="h5 w-5" />
					</Button>
				{/if}
			</div>
		</div>
	</div>

	<!-- TODO: WHY THIS EXIST? -->
	<!-- <MapCursorEvent {layerId} {clickMap} /> -->

	<MapDeckOverlay {layers} />
{/if}
