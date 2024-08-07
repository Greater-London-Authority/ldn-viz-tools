<script lang="ts">
	/**
	 * The `<BoroughsContextLayer>` component is slotted into a `<Map>` to show
	 * boroughs and their boundaries.
	 * @component
	 */

	import tokens from '@ldn-viz/themes/styles/js/theme-tokens';
	import MapLayerSource from '../../mapLayerSource/MapLayerSource.svelte';
	import MapLayerView from '../../mapLayerView/MapLayerView.svelte';

	const theme = (mode: 'light' | 'dark' = 'light') => {
		return tokens.theme[mode];
	};

	/**
	 * Color of borough borders.
	 */
	export let lineColor = theme().color.ui.border.primary;

	/**
	 * Opacity of borough borders between 0 and 1.
	 */
	export let lineOpacity = 0.5;

	/**
	 * Width of the borough borders.
	 */
	export let lineWidth = 2;

	/**
	 * Color of borough fill.
	 */
	export let fillColor = theme().color.ui.border.primary;

	/**
	 * Opacity of borough fill between 0 and 1.
	 */
	export let fillOpacity = 0.08;

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
			id="{sourceId}/line"
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
			id="{sourceId}/fill"
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
