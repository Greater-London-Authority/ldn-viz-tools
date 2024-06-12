<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import * as greyStyle from '../themes/os_greyscale.json';
	import * as darkGreyMutedStyle from '../themes/os_dark_grey_muted_buildings.json';
	import * as darkStyle from '../themes/os_dark.json';

	import Map, { appendOSKeyToUrl } from './Map.svelte';
	import PropertiesStory from './PropertiesStory.svelte';
	import loadTestLayers from '../loadTestLayers';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Meta
	title="Maps/Map"
	component={Map}
	parameters={{
		layout: 'full'
	}}
	argTypes={{
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
	}}
/>

<Template let:args>
	<div class="w-[100dvw] h-[100dvh]">
		<Map {...args}>I'm a map!</Map>
	</div>
</Template>

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

<Story name="Properties">
	<PropertiesStory />
</Story>
