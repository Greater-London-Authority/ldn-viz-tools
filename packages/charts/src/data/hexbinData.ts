import rewind from '@turf/rewind';

const buildEsriQueryUrl = (esriLayerUrl: string, endpointId: number, esriParams = {}) => {
	const queryParams = {
		where: '1=1',
		outFields: '*',
		f: 'pjson'
	};

	Object.assign(queryParams, esriParams);
	const queryString = new URLSearchParams(queryParams);

	return `${esriLayerUrl}${endpointId}/query?${queryString}`;
};

const loadGeoData = async () => {
	const geojsonURL =
		'https://gis2.london.gov.uk/server/rest/services/apps/Busyness_context/MapServer/';

	const geoQueryParams = {
		where: `objectid IS NOT NULL`,
		outFields: ['highstreet_id', 'highstreet_name'].toString(),
		geometryPrecision: 4,
		orderByFields: 'highstreet_id',
		f: 'geojson'
	};

	const geoQueryUrl = buildEsriQueryUrl(geojsonURL, 3, geoQueryParams);
	const res = await fetch(geoQueryUrl);
	return res.json();
};

const rewindData = (data: GeoJSON.FeatureCollection) =>
	data.features.map((feature) => rewind(feature, { reverse: true }));

let hexbinData: any;
loadGeoData().then((res) => (hexbinData = rewindData(res)));

console.log(hexbinData);
export default hexbinData;
