<script context="module">
	import MapDeckTooltips from './MapDeckTooltips.svelte';

	export const meta = {
		title: 'Maps/DeckGL/Tooltips',
		component: MapDeckTooltips,
		parameters: {
			layout: 'full'
		}
	};
</script>

<script lang="ts">
	import { MVTLayer } from '@deck.gl/geo-layers/typed';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';
	import { Checkbox } from '@ldn-viz/ui';
	import { onMouseOverTooltipHandler } from './stores';
	import DemoTooltipComponent from './demo/DemoTooltipComponent.svelte';

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

	let showWards = false;
	let showBoroughs = false;

	let layers = [];
	$: {
		layers = [];
		if (showWards) {
			layers.push(getWardsLayer());
		}
		if (showBoroughs) {
			layers.push(getBoroughLayer());
		}
	}
</script>

<Template let:args>
	<MapDeckTooltips {...args} />
</Template>

<!-- Here every feature in a layer is assigned the same string as a Tooltip. -->
<Story name="Example - spec as string">
	<Checkbox label="Show wards" bind:checked={showWards} />
	<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

	<div class="w-[100dvw] h-[100dvh]">
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
</Story>

<!-- Here the Tooltip contents are given by applying a function (which is the same for all features in a layer, but may be different between layers) to the feature. -->
<Story name="Example - spec as function">
	<Checkbox label="Show wards" bind:checked={showWards} />
	<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapDeckOverlay {layers} />

			<MapDeckTooltips
				{layers}
				spec={{
					wardLayer: (feature) => feature.properties.wd22nm,
					boroughLayer: (feature) => feature.properties.name
				}}
			/>
		</Map>
	</div>
</Story>

<!-- Here the Tooltip is rendered by a custom component, which ahs access to the feature object.
  Each layer can use a separate component to render the Tooltips for its features.
  -->
<Story name="Example - spec as components">
	<Checkbox label="Show wards" bind:checked={showWards} />
	<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

	<div class="w-[100dvw] h-[100dvh]">
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
</Story>
