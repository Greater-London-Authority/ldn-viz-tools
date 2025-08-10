<script context="module">
	import { mapStyles } from './mapStyleFragments';
	import MapDeckOverlay from '../mapDeckOverlay/MapDeckOverlay.svelte';

	export const meta = {
		title: 'Maps/MapStyling',
		component: mapStyles
	};
</script>

<script lang="ts">
	import { MVTLayer } from '@deck.gl/geo-layers/typed';

	import { Story } from '@storybook/addon-svelte-csf';

	import { Checkbox, colorTokenNameToRGBArray, currentTheme } from '@ldn-viz/ui';
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	//import { mapStyles } from './mapStyleFragments';
	import { GeoJsonLayer } from '@deck.gl/layers/typed';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const TILE_BASE_URL = 'https://d1lfm2zniswzpu.cloudfront.net';

	const getBoroughLayer = () => {
		return new MVTLayer({
			id: 'boroughLayer',
			data: `${TILE_BASE_URL}/boroughs/{z}/{x}/{y}.mvt`,

			...mapStyles.fill.transparent,
			...mapStyles.border.primary($currentTheme)
		});
	};

	const getWardsLayer = () => {
		return new MVTLayer({
			id: 'wardLayer',
			data: `${TILE_BASE_URL}/wards-2022-clipped/{z}/{x}/{y}.mvt`,
			...mapStyles.fill.transparent,
			...mapStyles.border.secondary($currentTheme)
		});
	};

	const getLSOALayer = () => {
		return new MVTLayer({
			id: 'lsoaLayer',
			data: `${TILE_BASE_URL}/loac-2021/{z}/{x}/{y}.mvt`,
			...mapStyles.fill.transparent,
			...mapStyles.border.tertiary($currentTheme)
		});
	};

	const getOpportunityAreas = () =>
		new GeoJsonLayer({
			id: 'opportunityAreasAdoptedThin',
			geometryType: 'polygon',
			data: 'https://gis2.london.gov.uk/server/rest/services/apps/opportunity_areas_webmap/MapServer/20/query?where=objectid+%3E%3D+0&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Foot&returnGeometry=true&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&featureEncoding=esriDefault&f=geojson',

			getFillColor: colorTokenNameToRGBArray('data.primary', $currentTheme),

			...mapStyles.outlines.thin($currentTheme)
		});

	const getOpportunityAreasThick = () =>
		new GeoJsonLayer({
			id: 'opportunityAreasAdoptedThicj',
			geometryType: 'polygon',
			data: 'https://gis2.london.gov.uk/server/rest/services/apps/opportunity_areas_webmap/MapServer/20/query?where=objectid+%3E%3D+0&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Foot&returnGeometry=true&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&featureEncoding=esriDefault&f=geojson',

			getFillColor: colorTokenNameToRGBArray('data.primary', $currentTheme),

			...mapStyles.outlines.thick($currentTheme)
		});

	let showBoroughs = true;
	let showWards = true;
	let showLSOAs = true;

	let layers: any[] = [];
	$: {
		layers = [];
		if (showBoroughs) {
			layers.push(getBoroughLayer());
		}
		if (showWards) {
			layers.push(getWardsLayer());
		}
		if (showLSOAs) {
			layers.push(getLSOALayer());
		}
	}

	/************************************/

	let showOpportunityAreasThin = false;
	let showOpportunityAreasThick = false;

	let layers2: any[] = [];
	$: {
		layers2 = [];
		if (showOpportunityAreasThin) {
			layers2.push(getOpportunityAreas());
		}
		if (showOpportunityAreasThick) {
			layers2.push(getOpportunityAreasThick());
		}
	}
</script>

<!--
 `mapStyles.border` defines line styles for the boundaries of political and statistical geographies (boroughs, wards, MSOAs, LSOAs, etc.).
 -->

<Story name="Hierarchy of political/statistical geographies">
	<Checkbox label="Show boroughs (primary)" bind:checked={showBoroughs} />
	<Checkbox label="Show wards (secondary)" bind:checked={showWards} />
	<Checkbox label="Show LSOAs (tertiary)" bind:checked={showLSOAs} />

	<div class="relative w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapDeckOverlay {layers} />
		</Map>
	</div>
</Story>

<!--
`mapstyles.outlines` defines line styles for the outlines of filled areas.
-->
<Story name="Outlines filled areas">
	<Checkbox label="Show polygons (thin outlines)" bind:checked={showOpportunityAreasThin} />
	<Checkbox label="Show polygons (thick outlines)" bind:checked={showOpportunityAreasThick} />

	<div class="relative w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapDeckOverlay layers={layers2} />
		</Map>
	</div>
</Story>
