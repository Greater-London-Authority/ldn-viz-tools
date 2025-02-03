<script context="module">
	import MapDeckOverlay from './MapDeckOverlay.svelte';

	export const meta = {
		title: 'Maps/DeckGL/DeckOverlay',
		component: MapDeckOverlay
	};
</script>

<script lang="ts">
	import { MVTLayer } from '@deck.gl/geo-layers/typed';

	import { Story } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import { Checkbox } from '@ldn-viz/ui';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const TILE_BASE_URL = 'https://d1lfm2zniswzpu.cloudfront.net';

	const getBoroughLayer = () => {
		return new MVTLayer({
			id: 'boroughLayer',
			data: `${TILE_BASE_URL}/boroughs/{z}/{x}/{y}.mvt`,

			filled: true,
			getFillColor: () => [0, 0, 0, 0],
			opacity: 1,

			stroked: true,
			getLineColor: [168, 168, 168, 255],

			lineWidthScale: 5,
			lineWidthMinPixels: 4
		});
	};

	const getWardsLayer = () => {
		return new MVTLayer({
			id: 'wardLayer',
			data: `${TILE_BASE_URL}/wards-2022-clipped/{z}/{x}/{y}.mvt`,

			filled: true,
			getFillColor: () => [0, 0, 0, 0],
			opacity: 1,

			stroked: true,
			getLineColor: [168, 168, 168, 255],

			lineWidthScale: 2,
			lineWidthMinPixels: 1
		});
	};

	let showWards = false;
	let showBoroughs = false;

	let layers: any[] = [];
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

<Story name="Default">
	<div class="relative w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapDeckOverlay layers={[getWardsLayer()]} />
		</Map>
	</div>
</Story>

<!--
 Example of updating the layers.
 Note that when we change `layers` we create new Layer objects.
 If we created a `wardLayer` layer once, and simply changed whether it was included in `layers`,
  then we would get "assertion failed" errors from deck.gl due to trying to initialize a layer that
   had already been finalized.
 -->

<Story name="Changing layers">
	<Checkbox label="Show wards" bind:checked={showWards} />
	<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

	<div class="relative w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapDeckOverlay {layers} />
		</Map>
	</div>
</Story>
