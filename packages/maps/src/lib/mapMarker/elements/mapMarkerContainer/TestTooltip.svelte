<script>
	import { getContext } from 'svelte';
	import MapMarkerContainer from './MapMarkerContainer.svelte';

	const feature = getContext('mapMarkerFeature');
	const props = feature.properties;
</script>

<MapMarkerContainer>
	{props.site_name}
</MapMarkerContainer>
