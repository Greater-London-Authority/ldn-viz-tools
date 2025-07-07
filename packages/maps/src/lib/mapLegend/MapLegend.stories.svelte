<script context="module">
	import MapLegend from './MapLegend.svelte';

	export const meta = {
		title: 'Maps/Components/MapLegend',
		component: MapLegend
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { ColorLegend, currentThemeMode, Input, LayerControlGroup } from '@ldn-viz/ui';
	import { scaleDiverging, scaleSequential } from 'd3-scale';
	import { interpolatePiYG, interpolateViridis } from 'd3-scale-chromatic';

	import Map from '../map/Map.svelte';
	import type { MapLibreStore } from '../map/types';
	import { appendOSKeyToUrl } from '../map/util';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import { writable } from 'svelte/store';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	let mapStore: MapLibreStore = writable();

	let width: number;

	let noLayersVisible: boolean;

	let options = [
		{
			id: 'sequential-layer',
			label: 'Sequential',
			disableSizeControl: true,
			disableOpacityControl: true,
			disableColorControl: true
		},
		{
			id: 'diverging-layer',
			label: 'Diverging',
			disableSizeControl: true,
			disableOpacityControl: true,
			disableColorControl: true
		}
	];

	let state = {
		'sequential-layer': {
			colorName: 'data.categorical.blue',
			visible: true,
			opacity: 1,
			size: 1
		},
		'diverging-layer': {
			colorName: 'data.categorical.green',
			visible: true,
			opacity: 1,
			size: 1
		}
	};

	$: layers = [
		{
			id: 'sequential-layer',
			label: 'Sequential ramp',
			title: 'Units of measurement',
			light: scaleSequential([0, 100], interpolateViridis),
			dark: scaleSequential([0, 100], interpolateViridis),
			visible: state['sequential-layer'].visible
		},
		{
			id: 'diverging-layer',
			label: 'Diverging ramp',
			title: 'Units of measurement',
			light: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			dark: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			visible: state['diverging-layer'].visible
		}
	];

	// Checks for case where no layers are visible and legend is open to display alternative content
	$: if (layers) {
		noLayersVisible = layers.filter((layer: any) => layer.visible).length === 0;
	}
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
						{#if layers[0].visible}
							<div class="flex flex-col gap-1">
								<p class="text-color-text-primary text-sm font-semibold">{layers[0].label}</p>
								<ColorLegend color={layers[0][$currentThemeMode]} title={layers[0].title} {width} />
							</div>
						{/if}
					{/key}
				</MapLegend>
			</MapControlGroup>
		</Map>
	</div>
</Story>

<Story name="Without label" let:args>
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
						{#if layers[0].visible}
							<div class="flex flex-col gap-1">
								<ColorLegend color={layers[0][$currentThemeMode]} title={layers[0].title} {width} />
							</div>
						{/if}
					{/key}
				</MapLegend>
			</MapControlGroup>
		</Map>
	</div>
</Story>

<!-- If you have a single layer map, you may want to forego the sidebar. In which case, you can include any required controls in the legend. -->

<Story name="With controls" let:args>
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
						{#if layers[0].visible}
							<div class="flex flex-col gap-1">
								<p class="text-color-text-primary text-sm font-semibold">{layers[0].label}</p>
								<ColorLegend color={layers[0][$currentThemeMode]} title={layers[0].title} {width} />
							</div>
						{/if}
					{/key}
					<div class="border-t border-color-ui-border-primary pt-3 text-sm">
						<Input type="range" label="Opacity" name="opacity" />
					</div>
				</MapLegend>
			</MapControlGroup>
		</Map>
	</div>
</Story>

<Story name="Multiple layers" let:args>
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
						{#each layers as layer (layer.id)}
							{#if layer.visible}
								<div class="flex flex-col gap-1">
									<p class="text-color-text-primary text-sm font-semibold">{layer.label}</p>
									<ColorLegend color={layer[$currentThemeMode]} title={layer.title} {width} />
								</div>
							{/if}
						{/each}
					{/key}
				</MapLegend>
			</MapControlGroup>
		</Map>
	</div>
</Story>

<!--
	Give the array of layers passed into `ColorLegend` (or another component) a visible property, which is connected to layerState visibility. So, when a user hides/shows a layer in the sidebar, that state is reflected in the legend.

	If no layers are visible, you can render some text to tell the user what to do.

	```
	let layers = [
		{
			id: 'sequential-layer',
			label: 'Sequential ramp',
			title: 'Units of measurement',
			light: scaleSequential([0, 100], interpolateViridis),
			dark: scaleSequential([0, 100], interpolateViridis),
			visible: state['sequential-layer'].visible
		},
		{
			id: 'diverging-layer',
			label: 'Diverging ramp',
			title: 'Units of measurement',
			light: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			dark: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			visible: state['diverging-layer'].visible
		}
	];```
-->
<Story name="Toggle visibility" let:args>
	<div class="flex flex-col space-y-2 mb-4">
		<p class="font-bold">Layers</p>
		<LayerControlGroup bind:state {options} buttonsHidden />
		<pre class="text-color-text-secondary">{JSON.stringify(state, null, 2)}</pre>
	</div>
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest
			}}
			bind:mapStore
		>
			<MapControlGroup position="BottomRight" classes="bottom-16 left-6 sm:bottom-11">
				<MapLegend {...args} bind:width>
					{#key [layers, width]}
						{#if !noLayersVisible}
							{#each layers as layer (layer.id)}
								{#if layer.visible}
									<div class="flex flex-col gap-1">
										<p class="text-color-text-primary text-sm font-semibold">{layer.label}</p>
										<ColorLegend color={layer[$currentThemeMode]} title={layer.title} {width} />
									</div>
								{/if}
							{/each}
						{:else}
							<p class="text-color-text-primary text-sm">Please choose a layer.</p>
						{/if}
					{/key}
				</MapLegend>
			</MapControlGroup>
		</Map>
	</div>
</Story>
