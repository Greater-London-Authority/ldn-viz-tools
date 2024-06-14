<script context="module">
	import BoroughsContextLayer from './BoroughsContextLayer.svelte';
	import colors from '@ldn-viz/themes/colors.json';

	const color = {
		type: 'string',
		control: 'text',
		table: {
			defaultValue: {
				summary: colors.core.grey[500]
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

	export const meta = {
		title: 'Maps/MapContextLayers/BoroughsContextLayer',
		component: BoroughsContextLayer,
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
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Map, { appendOSKeyToUrl } from '../../map/Map.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Template let:args>
	<div class="relative w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<BoroughsContextLayer {...args} />
		</Map>
	</div>
</Template>

<Story name="Default" source />
