<script lang="ts">
	/**
	 * The `<BoroughsContextLayer>` component is slotted into a `<Map>` to show
	 * boroughs and their boundaries.
	 * @component
	 */

	import { theme } from '@ldn-viz/ui';
	import MapLayerSource from '../../mapLayerSource/MapLayerSource.svelte';
	import MapLayerView from '../../mapLayerView/MapLayerView.svelte';

	interface Props {
		/**
		 * Color of borough borders.
		 */
		lineColor?: any;
		/**
		 * Opacity of borough borders between 0 and 1.
		 */
		lineOpacity?: number;
		/**
		 * Width of the borough borders.
		 */
		lineWidth?: number;
		/**
		 * Color of borough fill.
		 */
		fillColor?: any;
		/**
		 * Opacity of borough fill between 0 and 1.
		 */
		fillOpacity?: number;
	}

	let {
		lineColor = theme.tokenNameToValue('geo.feature'),
		lineOpacity = 0.5,
		lineWidth = 2,
		fillColor = theme.tokenNameToValue('geo.feature'),
		fillOpacity = 0.06
	}: Props = $props();

	const sourceId = 'gla/context/boroughs';
</script>

<MapLayerSource
	id={sourceId}
	spec={{
		type: 'vector',
		tiles: ['https://d1lfm2zniswzpu.cloudfront.net/boroughs/{z}/{x}/{y}.mvt'],
		minzoom: 7,
		maxzoom: 14,
		promoteId: 'objectid' // 'gss_code' instead?
	}}
>
	{#key lineColor + lineWidth + lineOpacity}
		<MapLayerView
			id={`${sourceId}/line`}
			spec={{
				type: 'line',
				'source-layer': 'boroughs',
				filter: ['==', '$type', 'Polygon'],
				paint: {
					'line-color': lineColor,
					'line-width': Number(lineWidth),
					'line-opacity': Number(lineOpacity)
				}
			}}
		/>
	{/key}
	{#key fillColor + fillOpacity}
		<MapLayerView
			id={`${sourceId}/fill`}
			spec={{
				type: 'fill',
				'source-layer': 'boroughs',
				filter: ['==', '$type', 'Polygon'],
				paint: {
					'fill-color': fillColor,
					'fill-opacity': Number(fillOpacity)
				}
			}}
		/>
	{/key}
</MapLayerSource>
