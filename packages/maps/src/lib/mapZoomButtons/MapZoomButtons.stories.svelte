<script>
	import { onMount } from 'svelte'
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Map from './Map.svelte'

	import MapControlGroup from './MapControlGroup.svelte';
	import MapZoomButtons from './MapZoomButtons.svelte';

	let map
	const whenMapLoads = (m) => map = m
</script>

<Meta title="Maps/MapZoomButtons" component={MapZoomButtons} />

<Template let:args>
	<Map {...args}>I'm a map zoom button!</Map>
</Template>

<Story name="Abc">
	<p class="text-white">
		These are map zoom buttons.
	</p>

	<div style="width: 80vw; height: 80vh;">
		<Map {whenMapLoads}>
			<MapControlGroup position="top-left">
				<MapZoomButtons {map} />
			</MapControlGroup>

			<MapControlGroup position="bottom-left">
				<MapZoomButtons  {map} />
			</MapControlGroup>
		</Map>
	</div>
</Story>
