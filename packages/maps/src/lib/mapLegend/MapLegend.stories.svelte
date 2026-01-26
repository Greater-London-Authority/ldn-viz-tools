<script module lang="ts">
	import { ColorLegend, Input, LayerControlGroup, theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { scaleDiverging, scaleSequential } from 'd3-scale';
	import { interpolatePiYG, interpolateViridis } from 'd3-scale-chromatic';
	import { writable } from 'svelte/store';
	import { LayerControlGroupStory } from '../../../../ui/src/lib/layerControl/LayerControlGroup.stories.svelte';
	import Map from '../map/Map.svelte';
	import type { MapLibreStore } from '../map/types';
	import { appendOSKeyToUrl } from '../map/util';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapLegend from './MapLegend.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapLegend',
		component: MapLegend,
		tags: ['autodocs'],
		render: defaultTemplate
	});

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	let mapStore: MapLibreStore = $state(writable());
	let width: number = $state(0);

	let options = [
		{
			id: 'sequential-layer',
			label: 'Sequential'
		},
		{
			id: 'diverging-layer',
			label: 'Diverging'
		}
	];

	let layerState = $state({
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
	});

	let layers = $derived([
		{
			id: 'sequential-layer',
			label: 'Sequential ramp',
			title: 'Units of measurement',
			light: scaleSequential([0, 100], interpolateViridis),
			dark: scaleSequential([0, 100], interpolateViridis),
			visible: layerState['sequential-layer'].visible
		},
		{
			id: 'diverging-layer',
			label: 'Diverging ramp',
			title: 'Units of measurement',
			light: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			dark: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			visible: layerState['diverging-layer'].visible
		}
	]);

	// Checks for case where no layers are visible and legend is open to display alternative content
	const checkLayersVisibility = (layers: any) => {
		return layers.filter((layer: any) => layer.visible).length === 0;
	};

	let noLayersVisible = $derived(checkLayersVisibility(layers));

	let currentThemeMode = $derived(theme.currentMode);
</script>

{#snippet defaultTemplate({ args }: any)}
	<MapLegend {...args} />
{/snippet}

<Story name="Default">
	{#snippet template({ args })}
		<div class="h-[100dvh] w-[100dvw]">
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
									<p class="text-color-text text-sm font-semibold">{layers[0].label}</p>
									<ColorLegend
										color={layers[0][currentThemeMode!]}
										title={layers[0].title}
										{width}
									/>
								</div>
							{/if}
						{/key}
					</MapLegend>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Without label">
	{#snippet template({ args })}
		<div class="h-[100dvh] w-[100dvw]">
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
									<ColorLegend
										color={layers[0][currentThemeMode!]}
										title={layers[0].title}
										{width}
									/>
								</div>
							{/if}
						{/key}
					</MapLegend>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!-- If you have a single layer map, you may want to forego the sidebar. In which case, you can include any required controls in the legend. -->

<Story name="With controls">
	{#snippet template({ args })}
		<div class="h-[100dvh] w-[100dvw]">
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
									<p class="text-color-text text-sm font-semibold">{layers[0].label}</p>
									<ColorLegend
										color={layers[0][currentThemeMode!]}
										title={layers[0].title}
										{width}
									/>
								</div>
							{/if}
						{/key}
						<div class="border-color-border border-t pt-3 text-sm">
							<Input type="range" label="Opacity" name="opacity" />
						</div>
					</MapLegend>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Multiple layers">
	{#snippet template({ args })}
		<div class="h-[100dvh] w-[100dvw]">
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
										<p class="text-color-text text-sm font-semibold">{layer.label}</p>
										<ColorLegend color={layer[currentThemeMode!]} title={layer.title} {width} />
									</div>
								{/if}
							{/each}
						{/key}
					</MapLegend>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
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
			visible: layerState['sequential-layer'].visible
		},
		{
			id: 'diverging-layer',
			label: 'Diverging ramp',
			title: 'Units of measurement',
			light: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			dark: scaleDiverging([-0.1, 0, 0.1], interpolatePiYG),
			visible: layerState['diverging-layer'].visible
		}
	];```
-->
<Story name="Toggle layer visibility">
	{#snippet template({ args })}
		<div class="mb-4 flex flex-col space-y-2">
			<p class="font-bold">Layers</p>
			<LayerControlGroup
				bind:layersState={layerState}
				{options}
				disableColorControl
				disableOpacityControl
				disableSizeControl
				disableFillControl
			/>
		</div>
		<div class="h-[100dvh] w-[100dvw]">
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
											<p class="text-color-text text-sm font-semibold">{layer.label}</p>
											<ColorLegend color={layer[currentThemeMode!]} title={layer.title} {width} />
										</div>
									{/if}
								{/each}
							{:else}
								<p class="text-color-text text-sm">Please choose a layer.</p>
							{/if}
						{/key}
					</MapLegend>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="With layer control group">
	{#snippet template({ args })}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
				bind:mapStore
			>
				<MapControlGroup position="BottomRight" classes="bottom-16 left-6 sm:bottom-11">
					<MapLegend {...args} bind:width>
						<LayerControlGroup {...LayerControlGroupStory.args} />
					</MapLegend>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
