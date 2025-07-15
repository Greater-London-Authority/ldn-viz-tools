<script context="module" lang="ts">
		import { defineMeta } from '@storybook/addon-svelte-csf';
	import Map from './Map.svelte';

		const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

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
</script>

<script lang="ts">
	import * as darkStyle from '../themes/os_dark.json';
	import * as darkGreyMutedStyle from '../themes/os_dark_grey_muted_buildings.json';
	import * as greyStyle from '../themes/os_greyscale.json';
	import * as os_light_vts from '../themes/os_light_vts.json';

	import loadTestLayers from '../loadTestLayers';
	import type { MapLibreStyle } from './types';
	import { appendOSKeyToUrl } from './util';

	import PropertiesStory from './PropertiesStory.svelte';

	const castAsMapLibreStyle = (style: unknown): MapLibreStyle => {
		return style as MapLibreStyle;
	};
</script>

{#snippet defaultTemplate({ args })}
	<div class="w-[100dvw] h-[100dvh]">
		<Map {...args}>I'm a map!</Map>
	</div>
{/snippet}

<Story name="Responsive to theme" source>
	{#snippet template(args)}
	<div class="w-[100dvw] h-[100dvh]">
		<Map {...args}></Map>
	</div>

	{/snippet}
</Story>

<!--
This is our default light basemap.
It uses the Ordnance Survey's [OS_VTS_3857_Light.json](https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets) stylesheet.
-->
<Story name="Light OS Basemap">
	{#snippet template(args)}
	<div class="w-[100dvw] h-[100dvh]">
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
		{#snippet template(args)}

	<div class="w-[100dvw] h-[100dvh]">
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
		{#snippet template(args)}

	<div class="w-[100dvw] h-[100dvh]">
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
		{#snippet template(args)}

	<div class="w-[100dvw] h-[100dvh]">
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
		{#snippet template(args)}

	<PropertiesStory />
	{/snippet}
</Story>