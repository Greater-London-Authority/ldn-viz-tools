<script context="module" lang="ts">
		import { defineMeta } from '@storybook/addon-svelte-csf';
	import MapMarker from './MapMarker.svelte';

	const componentType = {
		type: 'object',
		control: 'none',
		table: {
			type: {
				summary: 'Svelte component'
			}
		}
	};

			const { Story } = defineMeta({
		title: 'Maps/Components/MapMarker',
		component: MapMarker,
		tags: ['autodocs'],
		render: defaultTemplate,

		parameters: {
			layout: 'full'
		},
		argTypes: {
			layerId: {
				type: 'string',
				control: 'none'
			},
			noCursorStyle: {
				type: 'boolean',
				control: 'none'
			},
			tooltip: componentType,
			popup: componentType
		}
	});
</script>

<script>
	import loadTestLayers from '../loadTestLayers';
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import TestPopup from './TestPopup.svelte';
	import TestTooltip from './TestTooltip.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

{#snippet defaultTemplate({ args })}
		<MapMarker {...args} />
{/snippet}

<Story name="Interactive Example">
		{#snippet template(args)}
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			whenMapLoads={loadTestLayers}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapMarker
				layerId="gla/ldn-viz-tools/test-data/polygon"
				tooltip={TestTooltip}
				popup={TestPopup}
			/>
			<MapMarker
				layerId="gla/ldn-viz-tools/test-data/line"
				tooltip={TestTooltip}
				popup={TestPopup}
			/>
			<MapMarker
				layerId="gla/ldn-viz-tools/test-data/point"
				tooltip={TestTooltip}
				popup={TestPopup}
			/>
		</Map>
	</div>
	{/snippet}
</Story>
