<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import { default as Map } from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import type { Feature } from 'geojson';
	import MapDraw from './MapDraw.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapDraw',
		component: MapDraw
	});

	let features1: Feature[] = $state([]);
	let features2: Feature[] = $state([]);

	let features3: Feature[] = $state([]);
</script>

<!-- <script lang="ts">
	import { mapDraw } from './MapDrawState.svelte';
</script> -->

<Story name="Default">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapDraw onDone={(features) => (features1 = features)} />
				</MapControlGroup>
			</Map>
		</div>

		<pre>{JSON.stringify(features1, null, 4)}</pre>
	{/snippet}
</Story>

<Story name="Allow all specific modes/tools">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapDraw
						modes={['point', 'polygon', 'linestring', 'freehand', 'circle', 'rectangle', 'sector']}
						onDone={(features) => (features2 = features)}
					/>
				</MapControlGroup>
			</Map>
		</div>

		<pre>{JSON.stringify(features2, null, 4)}</pre>
	{/snippet}
</Story>

<Story name="Allow upload but not download">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapDraw uploadDownload={[true, false]} onDone={(features) => (features3 = features)} />
				</MapControlGroup>
			</Map>
		</div>

		<pre>{JSON.stringify(features3, null, 4)}</pre>
	{/snippet}
</Story>
