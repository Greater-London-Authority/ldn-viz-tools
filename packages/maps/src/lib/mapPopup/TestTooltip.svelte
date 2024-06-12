<script>
	import { getContext } from 'svelte';
	import MapPopupContainer from './elements/mapPopupContainer/MapPopupContainer.svelte';

	const feature = getContext('mapPopupFeature');
	const props = feature.properties;
</script>

<MapPopupContainer>
	{props.site_name}
</MapPopupContainer>
