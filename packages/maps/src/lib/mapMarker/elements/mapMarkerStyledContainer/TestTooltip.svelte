<script>
	import { getContext } from 'svelte';
	import MapMarkerStyledContainer from './MapMarkerStyledContainer.svelte';

	const feature = getContext('mapMarkerFeature');
	const props = feature.properties;
</script>

<MapMarkerStyledContainer>
	{props.site_name}
</MapMarkerStyledContainer>
