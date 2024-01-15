<script lang="ts">
	import type { LayerCake } from 'layercake';
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext<LayerCake>('LayerCake');

	export let r = 5;
	export let fill = '#0cf';
	export let stroke = '#000';
	export let strokeWidth = 0;

    $: path = 'M' + $data
    .map(d => {
      return $xGet(d) + ',' + $yGet(d);
    })
    .join('L');


</script>

<path class='path-line' d='{path}' {stroke}></path>

<style>
    .path-line {
      fill: none;
      stroke-linejoin: round;
      stroke-linecap: round;
      stroke-width: 2;
    }
  </style>

  