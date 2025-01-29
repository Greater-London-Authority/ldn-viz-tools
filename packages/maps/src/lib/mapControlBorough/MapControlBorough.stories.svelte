<script context="module">
	import MapControlBorough from './MapControlBorough.svelte';

	export const meta = {
		title: 'Maps/MapControls/MapControlBorough',
		component: MapControlBorough,
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script lang="ts">
	import { Template, Story } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import type { MapLibreStore } from '../map/types';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import { writable } from 'svelte/store';
	import BoroughsContextLayer from '../mapContextLayers/boroughsContextLayer/BoroughsContextLayer.svelte';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	let mapStore: MapLibreStore = writable();
</script>

<Template let:args>
	<MapControlBorough {...args} />
</Template>

<Story name="Zooming to borough">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest
			}}
			bind:mapStore
		>
			<MapControlGroup position="TopLeft">
				<MapControlBorough map={$mapStore} />
			</MapControlGroup>

			<BoroughsContextLayer />
		</Map>
	</div>
</Story>
