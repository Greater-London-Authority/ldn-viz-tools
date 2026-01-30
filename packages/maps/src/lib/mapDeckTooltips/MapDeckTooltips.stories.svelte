<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapDeckTooltips from './MapDeckTooltips.svelte';

	/**
	 * The `MapDeckTooltips` component renders a tooltip for features rendered by Deck.gl, when they are hovered over.
	 * It accepts a configuration object, the keys are the layer ids for which Popovers should be rendered, and the  values specify how they should be rendered.
	 * For each layer, the output can be specified as a string constant, a function that is passed a feature and returns a string, or a custom Svelte component.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/DeckGL/MapDeckTooltips',
		component: MapDeckTooltips,
		tags: ['autodocs'],

		parameters: {
			layout: 'full'
		}
	});
</script>

<script lang="ts">
	import { MVTLayer } from '@deck.gl/geo-layers';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import type { Layer } from '@deck.gl/core';
	import { Checkbox } from '@ldn-viz/ui';
	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';
	import DemoTooltipComponent from './demo/DemoTooltipComponent.svelte';
	import { onMouseOverTooltipHandler } from './stores';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const TILE_BASE_URL = 'https://d1lfm2zniswzpu.cloudfront.net';

	const getBoroughLayer = () => {
		return new MVTLayer({
			id: 'boroughLayer',
			data: `${TILE_BASE_URL}/boroughs/{z}/{x}/{y}.mvt`,

			filled: true,
			getFillColor: () => [255, 0, 0],
			opacity: 1,

			stroked: true,
			getLineColor: [168, 168, 168, 255],

			lineWidthScale: 5,
			lineWidthMinPixels: 4,

			pickable: true, // not needed?
			//	onClick: onClickTooltipHandler
			onHover: onMouseOverTooltipHandler
		});
	};

	const getWardsLayer = () => {
		return new MVTLayer({
			id: 'wardLayer',
			data: `${TILE_BASE_URL}/wards-2022-clipped/{z}/{x}/{y}.mvt`,

			filled: true,
			getFillColor: () => [0, 255, 0],
			opacity: 1,

			stroked: true,
			getLineColor: [168, 168, 168, 255],

			lineWidthScale: 2,
			lineWidthMinPixels: 1,

			pickable: true,
			//onClick: onClickTooltipHandler,
			onHover: onMouseOverTooltipHandler
		});
	};

	let showWards = $state(false);
	let showBoroughs = $state(true);

	let layers: Layer[] = $derived.by(() => {
		const l = [];
		if (showWards) {
			l.push(getWardsLayer());
		}
		if (showBoroughs) {
			l.push(getBoroughLayer());
		}
		return l;
	});
</script>

<!-- Here every feature in a layer is assigned the same string as a Tooltip. -->
<Story name="Example - spec as string">
	{#snippet template()}
		<Checkbox label="Show wards" bind:checked={showWards} />
		<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />

				<MapDeckTooltips
					{layers}
					spec={{
						wardLayer: 'This is one of the Wards',
						boroughLayer: 'This is one of the Boroughs'
					}}
				/>
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Here the Tooltip contents are given by applying a function (which is the same for all features in a layer, but may be different between layers) to the feature. -->
<Story name="Example - spec as function">
	{#snippet template()}
		<Checkbox label="Show wards" bind:checked={showWards} />
		<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />

				<MapDeckTooltips
					{layers}
					spec={{
						wardLayer: (feature) => feature?.properties?.wd22nm,
						boroughLayer: (feature) => feature?.properties?.name
					}}
				/>
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Here the Tooltip is rendered by a custom component, which ahs access to the feature object.
  Each layer can use a separate component to render the Tooltips for its features.
  -->
<Story name="Example - spec as components">
	{#snippet template()}
		<Checkbox label="Show wards" bind:checked={showWards} />
		<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />

				<MapDeckTooltips
					{layers}
					spec={{
						wardLayer: DemoTooltipComponent,
						boroughLayer: DemoTooltipComponent
					}}
				/>
			</Map>
		</div>
	{/snippet}
</Story>
