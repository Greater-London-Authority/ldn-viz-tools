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
