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

	let features: Feature[] = [];

	const logShapeToConsole = (features: Feature[]) => console.log('User drew shape: ', features);
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
				<MapDraw bind:features onDone={logShapeToConsole} />
			</MapControlGroup>
		</Map>
	</div>

	<pre>{JSON.stringify(features, null, 4)}</pre>
</Story>

<Story name="Only allow specific modes/tools">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapDraw bind:features enabledModes={['rectangle', 'circle']} />
			</MapControlGroup>
		</Map>
	</div>

	<pre>{JSON.stringify(features, null, 4)}</pre>
</Story>
