<script context="module">
	import MapPopup from './MapPopup.svelte';

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
		title: 'Maps/MapPopup',
		component: MapPopup,
		argTypes: {
			layerId: {
				type: 'string',
				control: 'text',
				table: {
					type: {
						summary: 'string'
					}
				}
			},
			noCursorStyle: {
				type: 'boolean',
				control: 'boolean',
				table: {
					type: {
						summary: 'boolean'
					}
				}
			},
			tooltip: componentType,
			marker: componentType
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<MapPopup {...args} />
</Template>

<Story name="Default" source />
