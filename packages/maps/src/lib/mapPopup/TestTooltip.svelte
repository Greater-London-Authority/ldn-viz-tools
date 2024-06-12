<script>
	import { getContext } from 'svelte';
	import MapPopupTooltip from './elements/mapPopupTooltip/MapPopupTooltip.svelte';

	const feature = getContext('mapPopupFeature');
	const props = feature.properties;
</script>

<MapPopupTooltip>
	{props.site_name}
</MapPopupTooltip>
