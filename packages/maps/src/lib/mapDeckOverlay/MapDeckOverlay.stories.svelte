<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapDeckOverlay from './MapDeckOverlay.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/DeckGL/MapDeckOverlay',
		component: MapDeckOverlay,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { MVTLayer } from '@deck.gl/geo-layers/typed';

	import { Checkbox } from '@ldn-viz/ui';
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

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

	let showWards = $state(false);
	let showBoroughs = $state(false);

	let layers = $derived.by(() => {
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

<!--
 Example of updating the layers.
 Note that when we change `layers` we create new Layer objects.
 If we created a `wardLayer` layer once, and simply changed whether it was included in `layers`,
  then we would get "assertion failed" errors from deck.gl due to trying to initialize a layer that
   had already been finalized.
 -->

<Story name="Changing layers">
	{#snippet template(args)}
		<Checkbox label="Show wards" bind:checked={showWards} />
		<Checkbox label="Show boroughs" bind:checked={showBoroughs} />

		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapDeckOverlay {layers} />
			</Map>
		</div>
	{/snippet}
</Story>
