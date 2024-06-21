<script>
	import { getContext } from 'svelte';
	import MapMarkerContainer from './elements/mapMarkerContainer/MapMarkerContainer.svelte';

	const feature = getContext('mapMarkerFeature');
	const props = feature.properties;
</script>

<MapMarkerContainer>
	{props.site_name}
</MapMarkerContainer>
