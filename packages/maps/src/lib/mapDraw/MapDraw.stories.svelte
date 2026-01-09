<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import { default as Map } from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import { Button } from '@ldn-viz/ui';

	import type { Feature } from 'geojson';
	import MapDraw from './MapDraw.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapDraw',
		component: MapDraw,
		tags: ['autodocs'],
	});

	let features1: Feature[] = $state([]);
	let features2: Feature[] = $state([]);
	let features3: Feature[] = $state([]);
	let features4: Feature[] = $state([]);

	const newFeatures = [
		{
			id: 'cdb20d21-a866-4e4e-819a-4397da10f988',
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [
					[
						[-0.098955242, 51.544672657],
						[-0.219235288, 51.480301072],
						[-0.059872651, 51.470018362],
						[-0.098955242, 51.544672657]
					]
				]
			},
			properties: {
				mode: 'polygon'
			}
		}
	];

	let isEditing = $state(false);
</script>

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

<Story name="Externally update">
	{#snippet template()}
		<Button onclick={() => (features4 = newFeatures)}>Update</Button>

		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapDraw
						uploadDownload={[false, false]}
						onDone={(features) => (features4 = features)}
						features={features4}
					/>
				</MapControlGroup>
			</Map>
		</div>

		<pre>{JSON.stringify(features4, null, 4)}</pre>
	{/snippet}
</Story>

<Story name="Externally track whether editing is in progress">
	{#snippet template()}
		<span>isEditing: {isEditing}</span>
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapDraw
						uploadDownload={[false, false]}
						onStart={() => (isEditing = true)}
						onDone={() => (isEditing = false)}
						onCancel={() => (isEditing = false)}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
