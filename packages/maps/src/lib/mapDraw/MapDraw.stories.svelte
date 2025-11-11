<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import { default as Map } from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapDraw from './MapDraw.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapDraw',
		component: MapDraw
	});
</script>

<script lang="ts">
	import { mapDraw } from './MapDrawState.svelte';
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
					<MapDraw />
				</MapControlGroup>
			</Map>
		</div>

		<pre>{JSON.stringify(mapDraw.features.saved, null, 4)}</pre>
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
					/>
				</MapControlGroup>
			</Map>
		</div>

		<pre>{JSON.stringify(mapDraw.features.saved, null, 4)}</pre>
	{/snippet}
</Story>

<Story name="Allow Upload only">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapDraw uploadDownload={[true, false]} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
