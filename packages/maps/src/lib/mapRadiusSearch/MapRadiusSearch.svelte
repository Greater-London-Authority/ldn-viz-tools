<script lang="ts">
	import type { MapLibreStore } from '$lib/map/types';
	import { GeoJsonLayer } from '@deck.gl/layers';
	import { Button, Input, theme } from '@ldn-viz/ui';
	import { CheckCircle, XCircle, XMark } from '@steeze-ui/heroicons';
	import { MapPinSimpleArea } from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import * as turf from '@turf/turf';
	import type { Feature, FeatureCollection } from 'geojson';
	import { getContext, onDestroy } from 'svelte';
	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';
	// TODO fix module declaration error
	// @ts-expect-error
	import MapPin from './mapPinIcons/map_pin_mask_96x96.svg';

	interface Props {
		/**
		 * Maximum size of radius in metres
		 */
		maxRadius: number;

		/**
		 * Custom 'call to action' button label. Default is 'Search'.
		 */
		ctaLabel?: string;

		/**
		 * Function to be called when user clicks call to action button (which may have different names depending on user need).
		 */
		onCTA: (
			_pointFeature: FeatureCollection | undefined,
			_radiusFeature: Feature | undefined
		) => any;

		/**
		 * Function to be called when user clicks 'Cancel' button
		 */
		onCancel?: () => any;
	}

	let {
		maxRadius,
		ctaLabel = 'Search',
		onCTA = (_pointFeature, _radiusFeature) => null,
		onCancel = () => null
	}: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');

	let isOpen: boolean = $state(false);
	let searchActive: boolean = $state(false);

	let center = $state<[number, number] | undefined>(undefined);
	let pointFeature = $derived({
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
	});

	let radius = $state(0);
	let clampedRadius = $derived(Math.min(radius, maxRadius));

	let ring = $derived(center && turf.circle(center, clampedRadius, { steps: 64, units: 'meters' }));

	const setCursorStyle = (cursorStyle: string) => {
		if ($mapStore) {
			$mapStore.getCanvas().style.cursor = cursorStyle;
		}
	};

	const toggleRadiusSearch = () => {
		searchActive = !searchActive;

		if (searchActive && $mapStore) {
			// TODO Deactivate tooltips on other layers while search is active

			setCursorStyle('crosshair');

			$mapStore.once('click', (ev) => {
				clickMap(ev);
				setCursorStyle('pointer');
				toggleRadiusSearch();
			});
		}
	};

	const toggleModalOpen = () => {
		isOpen = !isOpen;
	};

	const clearFeatures = () => {
		center = undefined;
		radius = 0;
	};

	const clickHandler = () => {
		toggleModalOpen();
		toggleRadiusSearch();
	};

	const clickCancel = () => {
		toggleModalOpen();

		clearFeatures();

		onCancel();
	};

	const clickCTA = () => {
		onCTA(pointFeature, ring);
	};

	const clickMap = (ev: { lngLat: any }) => {
		const { lng, lat } = ev.lngLat;

		center = [lng, lat];
		$mapStore?.flyTo({ center, zoom: 14 });
	};

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

	let layers = $derived([
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
			id: 'location-point',
			data: pointFeature,
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

	onDestroy(() => {
		clearFeatures();
	});
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
						<div class="grid grid-cols-3 items-center gap-2">
							<div class="col-span-2">
								<Input
									type="range"
									name="searchRadius"
									id="searchRadius"
									min="0"
									max={`${maxRadius}`}
									bind:value={radius}
									aria-label="Select radius"
								/>
							</div>
							<div class="col-span-1 w-16">
								<Input
									type="text"
									name="searchRadiusText"
									id="searchRadiusText"
									min="0"
									max={`${maxRadius}`}
									bind:value={radius}
									aria-label="Enter desired radius"
								/>
							</div>
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
					onclick={clickCancel}
					aria-label="Cancel point search and close"
				>
					Cancel <Icon src={XCircle} theme="mini" class="h5 w-5" />
				</Button>
				{#if center}
					<!-- TODO Check how much customisability is desired for CTA button. Should it be a snippet? -->
					<Button size="sm" class="gap-1" onclick={clickCTA}>
						{ctaLabel ? ctaLabel : 'Search'}
						<Icon src={CheckCircle} theme="mini" class="h5 w-5" />
					</Button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- TODO: WHY THIS EXIST? -->
<!-- <MapCursorEvent {layerId} {clickMap} /> -->

<MapDeckOverlay {layers} />
