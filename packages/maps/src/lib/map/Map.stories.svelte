<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from './Map.svelte';

	import * as os_light_vts from '../themes/os_light_vts.json';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	/**
	 * The `<Map>` component wraps a MapLibre map and manages the style (based
	 * on the current theme mode) and cursor event handling for quicker and
	 * easier map creation and management.
	 *
	 * It also:
	 * - provides stores for `Map` and `MapCursor` instances;
	 * - sets context for `Map` and `MapCursor` instances;
	 *
	 * The map's container has a relative CSS position so slotted content can
	 * position itself accordingly. Map controls and other overlay components
	 * should be wrapped and positioned using a `MapControlGroup` instance.
	 *
	 * (see [MapLibre Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)).
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/Map',
		component: Map,
		tags: ['autodocs'],
		render: defaultTemplate,

		parameters: {
			layout: 'full'
		},

		argTypes: {
			appendOSKeyToUrl: {
				table: {
					type: {
						summary: 'function',
						detail: '(osKey: string) => maplibre_gl.TransformRequestFunction'
					}
				}
			},
			options: {
				control: 'none',
				table: {
					type: {
						summary: 'object',
						detail: 'MapLibreOptions'
					}
				}
			},
			mapStore: {
				control: 'none',
				table: {
					type: {
						summary: 'Svelte store',
						detail: 'writable<null | MapLibre>'
					}
				}
			},
			mapCursorStore: {
				control: 'none',
				table: {
					type: {
						summary: 'Svelte store',
						detail: 'writable<null | MapCursorType>'
					}
				}
			},
			whenMapLoads: {
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '(map: MapLibre) => void'
					}
				}
			},
			whenMapUnloads: {
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '(map: MapLibre) => void'
					}
				}
			},
			lightStyle: {
				control: 'none',
				table: {
					type: {
						summary: 'object',
						detail: 'MapLibreStyle'
					}
				}
			},
			darkStyle: {
				control: 'none',
				table: {
					type: {
						summary: 'object',
						detail: 'MapLibreStyle'
					}
				}
			}
		},
		args: {
			options: {
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}
		}
	});

	let map = $state();
</script>

<script lang="ts">
	import { Button } from '@ldn-viz/ui';

	import * as darkStyle from '../themes/os_dark.json';
	import * as darkGreyMutedStyle from '../themes/os_dark_grey_muted_buildings.json';
	import * as greyStyle from '../themes/os_greyscale.json';

	import loadTestLayers from '../loadTestLayers';
	import type { MapLibreStyle } from './types';
	import { appendOSKeyToUrl } from './util';

	import PropertiesStory from './PropertiesStory.svelte';

	const castAsMapLibreStyle = (style: unknown): MapLibreStyle => {
		return style as MapLibreStyle;
	};

	let mapCursor = $state();
	let mapMounted = $state(true);
	let unloadCount = $state(0);
</script>

{#snippet defaultTemplate({ args })}
	<div class="h-[100dvh] w-[100dvw]">
		<Map {...args}>I'm a map!</Map>
	</div>
{/snippet}

<Story name="Responsive to theme">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map {...args}></Map>
		</div>
	{/snippet}
</Story>

<!--
This is our default light basemap.
It uses the Ordnance Survey's [OS_VTS_3857_Light.json](https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets) stylesheet.
-->
<Story name="Light OS Basemap">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				lightStyle={castAsMapLibreStyle(os_light_vts)}
				darkStyle={null}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			/>
		</div>
	{/snippet}
</Story>

<!--
This is the greyscale basemap used on the Cool Spaces map.
It is very similar to the Ordnance Survey's [OS_VTS_3857_Greyscale.json](https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets) stylesheet, with a few tweaks.
 -->
<Story name="Greyscale OS Basemap">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				lightStyle={castAsMapLibreStyle(greyStyle)}
				darkStyle={null}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			/>
		</div>
	{/snippet}
</Story>

<!-- This was created by Mike Brondbjerg based on the Ordnance Survey's greyscale theme. -->
<Story name="Dark Grey, muted buildings">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				lightStyle={null}
				darkStyle={castAsMapLibreStyle(darkGreyMutedStyle)}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			/>
		</div>
	{/snippet}
</Story>

<!--
This was created by the Ordnance Survey, inspired by Mike Brondbjerg's dark gray theme with muted buildings.
It uses the Ordnance Survey's [OS_VTS_3857_Dark.json](https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets) stylesheet.
-->
<Story name="Dark OS Basemap">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				lightStyle={null}
				darkStyle={castAsMapLibreStyle(darkStyle)}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			/>
		</div>
	{/snippet}
</Story>

<!-- This story registers event handlers to identify the layers underneath the point where the user clicks. -->
<Story name="Properties">
	{#snippet template()}
		<PropertiesStory />
	{/snippet}
</Story>

<!--
This demonstrates how you can bind to the maplibre `map` object.
-->
<Story name="Accessing map object">
	{#snippet template()}
		<Button onclick={() => $map.flyTo({ center: [-0.124, 51.5], zoom: 15 })}>Fly!</Button>
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				lightStyle={null}
				darkStyle={castAsMapLibreStyle(darkStyle)}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
				bind:mapStore={map}
			/>
		</div>
	{/snippet}
</Story>

<!--
When `disabled` is set the map is not initialised at all: the underlying
MapLibre instance is never created and no basemap is rendered. This is useful
during development of non-map UI to avoid unnecessary map rendering.
-->
<Story name="Disabled">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw] border border-gray-500">
			<Map
				disabled
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				The map is disabled, so nothing is rendered here.
			</Map>
		</div>
	{/snippet}
</Story>

<!--
Passes MapLibre `MapOptions` beyond `transformRequest`. Here `center`, `zoom`
and `maxBounds` are supplied, and the default `bounds` is cleared (set to
`undefined`) so that the `center`/`zoom` view is used instead of the default
Greater London bounds.
-->
<Story name="Custom MapOptions">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY),
					bounds: undefined,
					center: [-0.1276, 51.5072],
					zoom: 13,
					maxBounds: [
						[-0.5103, 51.2868],
						[0.334, 51.6919]
					]
				}}
			/>
		</div>
	{/snippet}
</Story>

<!--
With both `lightStyle` and `darkStyle` set to `null`, `identifyStyle` falls
back to the default `theme_os_light_vts` basemap regardless of the current
theme mode.
-->
<Story name="Both styles null (fallback)">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				lightStyle={null}
				darkStyle={null}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			/>
		</div>
	{/snippet}
</Story>

<!--
Demonstrates the `whenMapUnloads` callback. Toggling the button mounts and
unmounts the `<Map>`; on unmount the component tears down the MapCursor store
and invokes `whenMapUnloads`, which here increments a counter.

TODO: whenMapUnloads doesn't seem to be called
-->
<Story name="Unload cleanup (whenMapUnloads)">
	{#snippet template()}
		<Button onclick={() => (mapMounted = !mapMounted)}>
			{mapMounted ? 'Unmount map' : 'Mount map'}
		</Button>
		<p>whenMapUnloads called {unloadCount} time(s).</p>
		<div class="h-[100dvh] w-[100dvw]">
			{#if mapMounted}
				<Map
					whenMapLoads={loadTestLayers}
					whenMapUnloads={() => {
						console.log('UNMOUNTED!');
						unloadCount += 1;
					}}
					options={{
						transformRequest: appendOSKeyToUrl(OS_KEY)
					}}
				/>
			{/if}
		</div>
	{/snippet}
</Story>

<!--
This demonstrates how you can bind to the `mapCursorStore`, giving access to
the `MapCursor` instance (parallel to the `Accessing map object` story which
binds `mapStore`).
-->
<Story name="Binding mapCursorStore">
	{#snippet template()}
		<Button onclick={() => console.log('MapCursor instance:', $mapCursor)}>Log MapCursor</Button>
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				whenMapLoads={loadTestLayers}
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
				bind:mapCursorStore={mapCursor}
			/>
		</div>
	{/snippet}
</Story>
