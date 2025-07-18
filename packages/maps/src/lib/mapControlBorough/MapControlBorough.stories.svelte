<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlBorough from './MapControlBorough.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlBorough',
		component: MapControlBorough,
		render: defaultTemplate,
		tags: ['autodocs'],

		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<script lang="ts">
	import Map from '../map/Map.svelte';
	import type { MapLibreStore } from '../map/types';
	import { appendOSKeyToUrl } from '../map/util';

	import { writable } from 'svelte/store';
	import BoroughsContextLayer from '../mapContextLayers/boroughsContextLayer/BoroughsContextLayer.svelte';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	let mapStore: MapLibreStore = $state(writable());
</script>

{#snippet defaultTemplate({ args })}
	<MapControlBorough {...args} />
{/snippet}

<Story name="Zooming to borough">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
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
	{/snippet}
</Story>
