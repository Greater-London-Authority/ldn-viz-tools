<script lang="ts">
	import type { MapLibreStore } from '$lib/map/types';
	import { GeoJsonLayer } from '@deck.gl/layers';
	import { Button, Input, theme } from '@ldn-viz/ui';
	import { XMark } from '@steeze-ui/heroicons';
	import { MapPinSimpleArea } from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import * as turf from '@turf/turf';
	import type { Feature, FeatureCollection } from 'geojson';
	import type { LngLatLike, Map as MapLibreMap, Marker as MarkerType } from 'maplibre-gl';
	import { Marker } from 'maplibre-gl';
	import { getContext, onDestroy, type Snippet } from 'svelte';
	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';

	interface Props {
		/**
		 * Bindable prop to access active state for conditionally rendering tooltips/popovers.
		 */
		searchActive?: boolean;

		/**
		 * Type of search to instantiate. Defaults to 'both' (point with radius search).
		 */
		searchType?: 'point' | 'radius' | 'both';

		/**
		 * Set radius value when map is clicked. Default value is 0.
		 */
		radius?: number;

		/**
		 * Maximum size of radius in metres. Default value is 500.
		 */
		maxRadius?: number;

		/**
		 * Fill colour token for point icon and radius. Default is 'geo.interactive'.
		 */
		fillColorToken?: string;

		/**
		 * Line colour token for point icon and radius. Default is 'geo.feature'.
		 */
		lineColorToken?: string;

		/**
		 * Hover fill colour token for point icon and radius. Default is 'geo.feature'.
		 */
		hoverColorToken?: string;

		/**
		 * Custom title for search popup. Defaults to 'Search at point' and 'Search within radius'.
		 */
		title?: Snippet;

		/**
		 * Custom 'call to action' button contents.
		 */
		cta?: Snippet;

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
		searchActive = $bindable(false),
		searchType = 'both',
		radius = $bindable(0),
		maxRadius = 500,
		fillColorToken = 'geo.interactive',
		lineColorToken = 'geo.feature',
		hoverColorToken = 'geo.interactive.hover',
		title,
		cta,
		onCTA = (_pointFeature, _radiusFeature) => null,
		onCancel = () => null
	}: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');

	let isRadiusSearch: boolean = searchType === 'radius' || searchType === 'both';
	let isPointSearch: boolean = searchType === 'point' || searchType === 'both';

	// Create Map Pin element for maplibre to add marker to DOM
	const mapPin = document.createElement('div');
	let mapPinHovered: boolean = $state(false);

	const mapPinSvg = (hover: boolean) => {
		let pinColor = hover ? hoverColorToken : fillColorToken;
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" fill="${theme.tokenNameToValue(pinColor, theme.currentTheme)}"/></svg>`;
		return svg;
	};
	$effect(() => {
		mapPin.innerHTML = mapPinSvg(mapPinHovered);
	});
	mapPin.style.width = '32px';
	mapPin.style.height = '32px';

	// Add event listeners for hover and click on map pin
	mapPin.addEventListener('mouseenter', () => {
		mapPin.style.cursor = 'pointer';
		mapPinHovered = true;
	});

	mapPin.addEventListener('mouseleave', () => {
		mapPinHovered = false;
	});

	mapPin.addEventListener('click', () => {
		isOpen = true;
	});

	let marker: MarkerType | undefined = $state(undefined);

	let defaultTitle: string = $derived.by(() => {
		if (isRadiusSearch || (center && isRadiusSearch)) {
			return 'Search within radius';
		}

		return 'Search at point';
	});

	let isOpen: boolean = $state(false);

	// If radius is not set externally, set the radius to maxRadius so it's visible when user clicks the map
	radius = radius === 0 && isRadiusSearch && !isPointSearch ? maxRadius : radius;

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

	let clampedRadius = $derived(Math.min(radius, maxRadius));

	let ring = $derived.by(() => {
		if (isRadiusSearch && center) {
			return turf.circle(center, clampedRadius, { steps: 64, units: 'meters' });
		}
		return undefined;
	});

	const setCursorStyle = (cursorStyle: string) => {
		if ($mapStore) {
			$mapStore.getCanvas().style.cursor = cursorStyle;
		}
	};

	const toggleSearch = (isActive: boolean) => {
		searchActive = isActive;

		if (searchActive && $mapStore) {
			setCursorStyle('crosshair');

			$mapStore.once('click', (ev) => {
				clickMap($mapStore, ev);
				setCursorStyle('grab');
				toggleSearch(false);
			});
		}
	};

	const toggleModalOpen = () => {
		isOpen = !isOpen;
	};

	const clearFeatures = () => {
		center = undefined;
		radius = 0;

		clearMarker();
	};

	const clickHandler = () => {
		toggleModalOpen();
		toggleSearch(true);
	};

	const clickCancel = () => {
		toggleModalOpen();

		clearFeatures();

		onCancel();
	};

	const clickCTA = () => {
		if (radius > 0) {
			onCTA(pointFeature, ring);
		} else {
			onCTA(pointFeature, undefined);
		}
	};

	const clickMap = (map: MapLibreMap, ev: { lngLat: any }) => {
		const { lng, lat } = ev.lngLat;

		center = [lng, lat];

		if (isPointSearch) {
			setMarker(map, center);
		}

		map.flyTo({ center, zoom: 14 });
	};

	const setMarker = (map: MapLibreMap, coords: LngLatLike) => {
		clearMarker();

		marker = new Marker({
			element: mapPin,
			anchor: 'bottom'
		})
			.setLngLat(coords)
			.addTo(map);
	};

	const clearMarker = () => {
		if (marker) {
			marker.remove();
			marker = undefined;
		}
	};

	type RGBA = [number, number, number, number];

	let radiusLayer = $derived(
		new GeoJsonLayer({
			id: 'location-radius',
			data: ring,
			filled: true,
			getFillColor: theme.colorTokenNameToRGBArray(fillColorToken, theme.currentTheme) as RGBA,
			pickable: true,
			autoHighlight: true,
			highlightColor: [...theme.colorTokenNameToRGBArray(hoverColorToken, theme.currentTheme), 25],
			opacity: 0.1,
			stroked: true,
			getLineColor: theme.colorTokenNameToRGBArray(lineColorToken, theme.currentTheme) as RGBA,
			lineWidthScale: 2,
			lineWidthMinPixels: 1,
			onClick: () => {
				isOpen = true;
			}
		})
	);

	onDestroy(() => {
		clearFeatures();
	});
</script>

{#snippet radiusControls()}
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
{/snippet}

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
		class="flow-product product pointer-events-auto min-w-60 max-w-[300px] border-color-border-muted bg-color-container p-2 shadow-sm"
	>
		<div class="flex items-center justify-between">
			<p class="eyebrow">
				{#if title}
					{@render title()}
				{:else}
					{defaultTitle}
				{/if}
			</p>
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
				{#if center && isRadiusSearch}
					{@render radiusControls()}
				{:else if center && isPointSearch}
					You've selected a point.
				{:else}
					<p class="caption"><span class="font-bold">Hint:</span> Click a position on the map</p>
				{/if}
			</div>
			<div class="mt-flow-loose flex justify-between">
				<Button
					variant="outline"
					size="sm"
					emphasis="secondary"
					onclick={clickCancel}
					aria-label="Cancel point search and close"
				>
					Cancel
				</Button>
				{#if center}
					<Button size="sm" class="gap-1" onclick={clickCTA}>
						{#if cta}
							{@render cta()}
						{:else}
							Search
						{/if}
					</Button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- TODO: WHY THIS EXIST? -->
<!-- <MapCursorEvent {layerId} {clickMap} /> -->

<!-- TODO Move out of this component and pass layers to parent component to avoid creating multiple DeckOverlays -->
<MapDeckOverlay layers={[radiusLayer]} />
