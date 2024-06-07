<script context="module">
	/**
	 * The `<BoroughsContextLayer>` component is slotted into a `<Map>` to show
	 * boroughs and their boundaries.
	 * @component
	 */

	import colors from '@ldn-viz/themes/colors.json';
	import MapContextLayer from './MapContextLayer.svelte';

	const id = 'gla/context/boroughs';

	export const boroughsContextLayer = Object.freeze({
		id: id,
		source: {
			type: 'vector',
			tiles: ['https://d1lfm2zniswzpu.cloudfront.net/boroughs/{z}/{x}/{y}.mvt'],
			minzoom: 7,
			maxzoom: 14,
			promoteId: 'objectid' // 'gss_code' instead?
		},
		layers: [
			{
				id: `${id}/line`,
				type: 'line',
				source: id,
				'source-layer': 'boroughs',
				paint: {
					'line-color': colors.core.grey['500'],
					'line-width': 2,
					'line-opacity': 0.5
				}
			},
			{
				id: `${id}/fill`,
				type: 'fill',
				source: id,
				'source-layer': 'boroughs',
				paint: {
					'fill-color': colors.core.grey['600'],
					'fill-opacity': 0.08
				}
			}
		]
	});
</script>

<script>
	/**
	 * Color of borough borders.
	 */
	export let lineColor = colors.core.grey['500'];

	/**
	 * Opacity of borough borders.
	 */
	export let lineOpacity = 0.5;

	/**
	 * Color of borough shading.
	 */
	export let fillColor = colors.core.grey['600'];

	/**
	 * Opacity of borough shading.
	 */
	export let fillOpacity = 0.08;

	const layer = structuredClone(boroughsContextLayer);

	layer.layers[0].paint['line-color'] = lineColor;
	layer.layers[0].paint['line-opacity'] = Number(lineOpacity);

	layer.layers[1].paint['fill-color'] = fillColor;
	layer.layers[1].paint['fill-opacity'] = Number(fillOpacity);
</script>

<MapContextLayer {...layer}>
	<slot />
</MapContextLayer>
