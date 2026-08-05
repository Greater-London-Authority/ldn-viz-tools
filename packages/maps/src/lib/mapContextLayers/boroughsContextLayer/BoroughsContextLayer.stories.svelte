<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BoroughsContextLayer from './BoroughsContextLayer.svelte';

	import tokens from '@ldn-viz/themes/styles/js/color-tokens';

	const theme = (mode: 'light' | 'dark' = 'light') => {
		return tokens.mode[mode];
	};

	const color = {
		type: 'string',
		control: 'text',
		table: {
			defaultValue: {
				summary: theme().border.default
			},
			type: {
				summary: 'string'
			}
		}
	};

	const opacityOrWidth = {
		type: 'number',
		control: 'number',
		table: {
			type: {
				summary: 'number'
			}
		}
	};

	/**
	 * The `<BoroughsContextLayer>` component is slotted into a `<Map>` to show
	 * boroughs and their boundaries.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapContextLayers/BoroughsContextLayer',
		component: BoroughsContextLayer,
		tags: ['autodocs'],
		//render: defaultTemplate,

		parameters: {
			layout: 'full'
		},
		argTypes: {
			lineColor: color,
			lineOpacity: opacityOrWidth,
			lineWidth: opacityOrWidth,
			fillColor: color,
			fillOpacity: opacityOrWidth
		}
	});
</script>

<script>
	import Map from '../../map/Map.svelte';
	import { appendOSKeyToUrl } from '../../map/util';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<BoroughsContextLayer {...args} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Overrides the default token colours with explicit `lineColor` and `fillColor` values. -->
<Story name="Custom colors">
	{#snippet template()}
		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<BoroughsContextLayer lineColor="#c2185b" fillColor="#f06292" fillOpacity={0.2} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Shows only the borough borders by setting `fillOpacity` to 0, leaving the basemap visible inside each borough. -->
<Story name="Borders only (no fill)">
	{#snippet template()}
		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<BoroughsContextLayer fillOpacity={0} lineWidth={2} lineOpacity={1} />
			</Map>
		</div>
	{/snippet}
</Story>

<!-- Emphasises boroughs strongly with a high `lineWidth`, fully opaque borders and a heavier `fillOpacity`. -->
<Story name="Heavy emphasis">
	{#snippet template()}
		<div class="relative h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest: appendOSKeyToUrl(OS_KEY)
				}}
			>
				<BoroughsContextLayer lineWidth={6} lineOpacity={1} fillOpacity={0.35} />
			</Map>
		</div>
	{/snippet}
</Story>
