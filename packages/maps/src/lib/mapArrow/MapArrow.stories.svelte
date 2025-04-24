<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import MapArrow from './MapArrow.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	export const meta = {
		title: 'Maps/Components/MapArrow/MapArrow',
		component: MapArrow,
		parameters: {
			layout: 'full'
		}
	};
</script>

<script lang="ts">
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import { RadioButtonGroupSolid } from '@ldn-viz/ui';

	const options = [
		{ id: 'nothing', label: 'Nothing' },
		{ id: 'buckingham-palace', label: 'Buckingham Palace' },
		{ id: 'parliament', label: 'Houses of Parliament' },
		{ id: 'tower', label: 'Tower of London' }
	];
	let location = 'buckingham-palace';

	const coords = {
		nothing: undefined,
		'buckingham-palace': { lat: 51.5014499, lng: -0.1434776 },
		parliament: { lat: 51.4995045, lng: -0.1249316 },
		tower: { lat: 51.5081449, lng: -0.0761326 }
	};
	$: selectedPosition = coords[location];
</script>

<Template let:args>
	<MapArrow {...args} />
</Template>

<Story name="Fullscreen Button" let:args>
	<div class="w-[100dvw] h-[100dvh] max-w-full">
		<div class="text-color-text-primary space-y-4 m-2">
			<RadioButtonGroupSolid
				label="Point at"
				name="What to point at"
				{options}
				bind:selectedId={location}
			></RadioButtonGroupSolid>
		</div>

		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapArrow {...args} pointAt={selectedPosition} />
		</Map>
	</div>
</Story>
