<script context="module">
	import MapPopupPlacement from './MapPopupPlacement.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupPlacement',
		component: MapPopupPlacement,
		argTypes: {
			placement: {
				options: ['center', 'follow', 'none'],
				type: 'string',
				control: 'select'
			}
		}
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	setContext('mapPopupFeature', {});
	setContext('mapStore', writable(null));
</script>

<Template let:args>
	<MapPopupPlacement {...args} />
</Template>

<Story name="Default" source />
