<script>
	import { getContext } from 'svelte';
	import MapPopupStyledContainer from './MapPopupStyledContainer.svelte';

	const feature = getContext('mapPopupFeature');
	const props = feature.properties;
</script>

<MapPopupStyledContainer>
	{props.site_name}
</MapPopupStyledContainer>
