<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlPan',
		component: MapControlPan,
		parameters: {
			layout: 'full'
		}
	});
</script>

<script>
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
</script>

{#snippet defaultTemplate({ args })}
	<MapControlPan {...args} />
{/snippet}

<Story name="Pan Buttons">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<div class="text-color-text-primary m-2 space-y-4">
				<p>
					The zoom buttons are usually positioned in the top left corner under the location search.
					They enable <a
						class="underline"
						href="https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#zoomin"
					>
						zoom in
					</a>
					and
					<a
						class="underline"
						href="https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#zoomout"
					>
						zoom out
					</a> by one zoom level per click.
				</p>
			</div>

			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<MapControlGroup position="BottomRight">
					<MapControlPan />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
