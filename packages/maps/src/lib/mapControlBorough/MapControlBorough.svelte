<script lang="ts">
	/**
	 * The `MapControlBorough` component lets the user select a borough, and zooms the map to the selected borough.
	 * @component
	 */

	import type { Map as MaplibreglMap } from 'maplibre-gl';

	import { Select } from '@ldn-viz/ui';
	import { GREATER_LONDON_BOUNDS } from '../themes/bounds';

	import boroughs from './boroughs.json';

	interface Props {
		/**
		 * Name of the selected borough: can be bound to.
		 */
		selectedBorough?: string | undefined;
		/**
		 * Maplibre map object, corresponding to the map that will be zoomed.
		 */
		map?: MaplibreglMap | undefined;
	}

	let { selectedBorough = $bindable(undefined), map = undefined }: Props = $props();

	let options = $derived([
		{ id: '', label: 'Show all of Greater London', value: 'GREATER LONDON' },
		...boroughs
			.map((b) => ({
				id: b.properties.borough,
				label: b.properties.name,
				value: b.properties.borough
			}))
			.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0))
	]);

	$effect(() => {
		if (selectedBorough && boroughs.length > 0 && map) {
			if (selectedBorough === 'GREATER LONDON') {
				map.fitBounds(GREATER_LONDON_BOUNDS);
			} else {
				const bounds = boroughs.filter((f) => f.properties.borough === selectedBorough)[0].bounds;
				map.fitBounds(bounds);
			}
		}
	});
</script>

<div class="pointer-events-auto invisible z-[999] flex w-64 flex-col shadow sm:visible">
	<Select
		bind:justValue={selectedBorough}
		items={options}
		label=""
		placeholder="Select a Borough to zoom"
	/>
</div>
