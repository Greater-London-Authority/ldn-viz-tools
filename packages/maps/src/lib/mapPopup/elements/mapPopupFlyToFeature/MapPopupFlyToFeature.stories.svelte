<script context="module">
	import MapPopupFlyToFeature from './MapPopupFlyToFeature.svelte';

	export const meta = {
		title: 'Maps/MapPopup/elements/MapPopupFlyToFeature',
		component: MapPopupFlyToFeature
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	setContext('mapPopupFeature', {});
</script>

<Template let:args>
	<MapPopupFlyToFeature {...args} />
</Template>

<Story name="Default" source />
