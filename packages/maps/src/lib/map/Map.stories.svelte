<script context="module">
	import Map from './Map.svelte';

	export const meta = {
		title: 'Maps/Map',
		component: Map,
		parameters: { layout: 'fullscreen' },
		argTypes: {
			appendOSKeyToUrl: {
				table: {
					type: {
						summary: 'function',
						detail: '(osKey: string) => string'
					}
				}
			},
			mapStore: {
				control: 'none',
				table: {
					type: {
						summary: 'Svelte store',
						detail: 'writable<null | maplibre_gl.Map>'
					}
				}
			},
			mapCursorStore: {
				control: 'none',
				table: {
					type: {
						summary: 'Svelte store',
						detail: 'writable<null | MapCursor>'
					}
				}
			},
			whenMapLoads: {
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '(map: maplibre_gl.Map) => void'
					}
				}
			},
			whenMapUnloads: {
				control: 'none',
				table: {
					type: {
						summary: 'function',
						detail: '(map: maplibre_gl.Map) => void'
					}
				}
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import * as darkStyle from '../themes/os_dark.json';
	import * as darkGreyMutedStyle from '../themes/os_dark_grey_muted_buildings.json';
	import * as greyStyle from '../themes/os_greyscale.json';
	import * as os_light_vts from '../themes/os_light_vts.json';

	import loadTestLayers from '../loadTestLayers';
	import { appendOSKeyToUrl } from './Map.svelte';
	import PropertiesStory from './PropertiesStory.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Template let:args>
	<div class="w-[100dvw] h-[100dvh]">
		<Map {...args}>I'm a map!</Map>
	</div>
</Template>

<!--
This is our default light basemap.
It uses the Ordnance Survey's [OS_VTS_3857_Light.json](https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets) stylesheet.
-->
<Story name="Light OS Basemap">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</div>
</Story>

<!--
This is the greyscale basemap used on the Cool Spaces map. 
It is very similar to the Ordnance Survey's [OS_VTS_3857_Greyscale.json](https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets) stylesheet, with a few tweaks.
 -->
<Story name="Greyscale OS Basemap">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				style: greyStyle,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</div>
</Story>

<!-- This was created by Mike Brondbjerg based on the Ordnance Survey's greyscale theme. -->
<Story name="Dark Grey, muted buildings">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				style: darkGreyMutedStyle,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</div>
</Story>

<!--
This was created by the Ordnance Survey, inspired by Mike Brondbjerg's dark gray theme with muted buildings.
It uses the Ordnance Survey's [OS_VTS_3857_Dark.json](https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets) sylesheet.
-->
<Story name="Dark OS Basemap">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				style: darkStyle,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</div>
</Story>

<!-- This story registers event handlers to identify the layers underneath the point where the user clicks. -->
<Story name="Properties">
	<PropertiesStory />
</Story>
