<script lang="ts">
	/**
	 * The `MapDeckOverlay` component renders Deck.gl layers in an overlay on top of a MapLibre map.
	 * It must be used inside a `Map` component, so that it can access the MapLibre map object from the `mapStore` context.
	 * @component
	 */
	import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox/typed';
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';

	const mapStore = getContext('mapStore');

	/**
	 * Array of Deck.gl layer objects.
	 * See the Deck.gl [Layer Catalog](https://deck.gl/docs/api-reference/layers) for details
	 */
	export let layers = [];

	/**
	 * Any additional options to be passed through to the Deck.gl [MapboxOverlay](https://deck.gl/docs/api-reference/mapbox/mapbox-overlay)
	 * constructor.
	 * */
	export let options = {};

	const loaded = writable(false);
	let deckOverlay;

	const removeOverlay = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		deckOverlay && $mapStore.removeControl(deckOverlay);
	};

	const doLoad = () => {
		loaded.set(false);
		removeOverlay();

		deckOverlay = new DeckOverlay({
			layers,
			interleaved: false,
			...options
		});

		$mapStore.addControl(deckOverlay, 'top-left');

		loaded.set(true);
	};

	const doUnload = () => {
		removeOverlay();
	};

	const updateLayers = (newLayers) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		deckOverlay && deckOverlay.setProps({ layers: newLayers });
	};

	$: if ($mapStore) {
		doLoad();
	}

	$: if ($loaded && !$mapStore) {
		doUnload();
	}

	$: updateLayers(layers);
</script>
