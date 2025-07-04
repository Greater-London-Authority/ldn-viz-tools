<script context="module">
	import MapLegend from './MapLegend.svelte';

	export const meta = {
		title: 'Maps/Components/MapLegend',
		component: MapLegend
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { scaleSequential } from 'd3-scale';
	import { interpolateViridis } from 'd3-scale-chromatic';
	import ColorLegend from '../../../../ui/src/lib/colorLegends/ColorLegend.svelte';
	import { currentThemeMode } from '../../../../ui/src/lib/theme/themeStore';

	import Map from '../map/Map.svelte';
	import type { MapLibreStore } from '../map/types';
	import { appendOSKeyToUrl } from '../map/util';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import { writable } from 'svelte/store';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	let mapStore: MapLibreStore = writable();

	let width: number;

	const layers = [
		{
			id: 'temperature',
			title: 'Temperature (°F)',
			light: scaleSequential([0, 100], interpolateViridis),
			dark: scaleSequential([0, 100], interpolateViridis),
			visible: true
		}
	];
</script>

<Template let:args>
	<MapLegend {...args} />
</Template>

<Story name="Legend on map" let:args>
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest
			}}
			bind:mapStore
		>
			<MapControlGroup position="BottomRight" classes="bottom-16 left-6 sm:bottom-11">
				<MapLegend {...args} bind:width>
					{#key width}
						{#each layers as layer}
							{#if layer.visible}
								<ColorLegend color={layer[$currentThemeMode]} title={layer.title} {width} />
							{/if}
						{/each}
					{/key}
				</MapLegend>
			</MapControlGroup>
		</Map>
	</div>
</Story>
