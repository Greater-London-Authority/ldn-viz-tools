<script context="module">
	import MapPopover from './MapPopover.svelte';

	const componentType = {
		type: 'object',
		control: 'none',
		table: {
			type: {
				summary: 'Svelte component'
			}
		}
	};

	export const meta = {
		title: 'Maps/MapPopover',
		component: MapPopover,
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
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import { Button } from '@ldn-viz/ui';

	import DemoPopover from './DemoPopover.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const feature_1 = {
		type: 'Feature',
		geometry: { type: 'Point', coordinates: [-0.22091751065882667, 51.549221311516909] },
		properties: {
			site_name: 'Willesden Green Tube Station',
			objectid: 101
		}
	};

	const feature_2 = {
		type: 'Feature',
		geometry: { type: 'Point', coordinates: [-0.14332953326827994, 51.539748314746866] },
		properties: {
			site_name: 'Camden High Street',
			objectid: 103
		}
	};

	let selectedFeature;
</script>

<Template let:args>
	<MapPopover {...args} />
</Template>

<Story name="Interactive Example">
	<div class="flex gap-2">
		<Button on:click={() => (selectedFeature = feature_1)}>Select point 1</Button>
		<Button on:click={() => (selectedFeature = feature_2)}>Select point 2</Button>
		<Button on:click={() => (selectedFeature = undefined)} disabled={!selectedFeature}>
			Unselect point
		</Button>
	</div>

	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapPopover feature={selectedFeature} popup={DemoPopover} />
		</Map>
	</div>
</Story>
