<script context="module">
	import { Story } from '@storybook/addon-svelte-csf';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import { default as Map } from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapDraw from './MapDraw.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	export const meta = {
		title: 'Maps/MapDraw',
		component: MapDraw
	};
</script>

<script lang="ts">
	import type { Feature } from 'geojson';

	let savedFeatures: Feature[] = [];

	let savedFeatures2 = [
		{
			id: 'eda554be-53a7-402d-9e4f-d17eb74a5f8e',
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-0.336512108, 51.720280543],
						[-0.260034188, 51.575641207],
						[-0.088723647, 51.670600962],
						[-0.336512108, 51.720280543]
					]
				]
			},
			properties: {
				mode: 'polygon'
			}
		}
	];

	const logShapeToConsole = (savedFeatures: Feature[]) =>
</script>

<Story name="Default">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapDraw bind:savedFeatures onDone={logShapeToConsole} />
			</MapControlGroup>
		</Map>
	</div>

	<pre>{JSON.stringify(savedFeatures, null, 4)}</pre>
</Story>

<Story name="Allow all specific modes/tools">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapDraw
					bind:savedFeatures
					enabledModes={[
						'point',
						'polygon',
						'linestring',
						'freehand',
						'circle',
						'rectangle',
						'sector'
					]}
				/>
			</MapControlGroup>
		</Map>
	</div>

	<pre>{JSON.stringify(savedFeatures, null, 4)}</pre>
</Story>

<Story name="Load saved feature">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapDraw bind:savedFeatures={savedFeatures2} />
			</MapControlGroup>
		</Map>
	</div>
	<pre>{JSON.stringify(savedFeatures2, null, 4)}</pre>
</Story>
