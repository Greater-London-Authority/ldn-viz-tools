import { GREATER_LONDON_BOUNDS_PADDED } from '@ldn-viz/maps';
import type {
	GeocoderAdapter,
	GeolocationBounds,
	GeolocationCoords,
	GeolocationNamed
} from '@ldn-viz/ui';

type MapBoxFeature = {
	id: string;
	text: string; // name
	place_name: string; // address
	center: [number, number];
	bbox?: [number, number, number, number]; // bounds
	[otherOptions: string]: unknown;
};

type MapBoxFeatureCollection = {
	features: MapBoxFeature[];
	[otherOptions: string]: unknown;
};

type SearchBoxFeature = {
	mapbox_id: string;
	name: string; // name
	place_formatted: string; // address
	center: [number, number];
	bbox?: [number, number, number, number]; // bounds
	[otherOptions: string]: unknown;
};

type SearchBoxFeatureCollection = {
	suggestions: SearchBoxFeature[];
	[otherOptions: string]: unknown;
};

// MapGeocoderAdapterMapBox adapter uses the MapBox API to source locations.
//
// Due to licensing this adapter can only be used within @ldn-viz maps and
// result locations must be shown on the map.
export class MapGeocoderAdapterMapBox implements GeocoderAdapter {
	private _token: string = '';
	private _resultCount: number = 5;
	private _sessionToken: string = '';
	static retrieveLocation: any;

	constructor(token: string, resultCount = 5) {
		this._token = token;
		this.setResultCount(resultCount);
		this.resetSessionToken(); // Initialize session token
	}

	private resetSessionToken() {
		this._sessionToken = crypto.randomUUID(); // Generate a new session token
	}

	// GeocoderAdapter functions.

	search(text: string) {
		const url = buildSuggestionUrl(text, this._token, this._resultCount, this._sessionToken);
		console.log('Suggestion link: ' + url);
		return fetch(url)
			.then((res) => res.json())
			.then(transformGeoJSONToNamedGeolocations);
	}

	retrieve(id: string) {
		const url = buildRetrieveUrl(id, this._token, this._sessionToken);
		console.log('Retrieve link: ' + url);
		return fetch(url)
			.then((res) => res.json())
			.then(transformGeoJSONToNamedGeolocations2);
	}

	attribution() {
		return {
			text: 'Powered by MapBox',
			link: 'https://docs.mapbox.com/api/search/'
		};
	}

	// MapGeocoderAdapterMapBox functions.

	setResultCount(resultCount: number): MapGeocoderAdapterMapBox {
		if (resultCount > 10) {
			resultCount = 10;
			console.warn(
				`[MapGeocoderAdapterMapBox] maximum MapBox API result count is 10. ${resultCount} is too high so defaulting to 10`
			);
		} else if (resultCount < 1) {
			resultCount = 1;
			console.warn(
				`[MapGeocoderAdapterMapBox] minimum MapBox API result count is 1. ${resultCount} is too low so defaulting to 1`
			);
		}

		this._resultCount = resultCount;
		return this;
	}
}

const buildSuggestionUrl = (
	text: string,
	token: string,
	resultCount: number,
	session_token: string
): string => {
	text = encodeURIComponent(text);

	const queryString = new URLSearchParams({
		access_token: token,
		bbox: GREATER_LONDON_BOUNDS_PADDED.flat().toString(),
		//autocomplete: true.toString(),
		limit: resultCount.toString(),
		session_token: session_token
	});

	return `https://api.mapbox.com/search/searchbox/v1/suggest?q=${text}&${queryString}`;
};

const buildRetrieveUrl = (suggestionId: string, token: string, session_token: string): string => {
	suggestionId = encodeURIComponent(suggestionId);
	const queryString = new URLSearchParams({
		access_token: token,
		session_token: session_token
	});

	return `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestionId}?${queryString}`;
};

const transformGeoJSONToNamedGeolocations = (
	geojson: SearchBoxFeatureCollection
): GeolocationNamed[] => {
	return geojson.suggestions.map((loc) => {
		return {
			id: loc.mapbox_id,
			name: loc.name,
			address: loc.place_formatted,
			// loc.center isn't always the center of the bbox
			center: [43, 57],
			bounds: [43, 24, 56, 23]
		};
	});
};

const transformGeoJSONToNamedGeolocations2 = (
	geojson: MapBoxFeatureCollection
): GeolocationNamed[] => {
	// Return only the first transformed feature
	const firstFeature = geojson.features[0];

	// Transform and return the first feature only
	return {
		id: firstFeature.properties.mapbox_id,
		name: firstFeature.properties.name,
		address: firstFeature.properties.place_formatted,
		center: [firstFeature.geometry.coordinates[0], firstFeature.geometry.coordinates[1]]
	};
};

const removeNameFromAddress = (address: string, name: string) => {
	if (!address.startsWith(name)) {
		return address;
	}

	address = address.slice(name.length).trim();

	if (address.startsWith(',')) {
		return address.slice(1).trim();
	}

	return address;
};

const calcBoundingBoxCenter = (
	bbox: undefined | GeolocationBounds,
	center: GeolocationCoords
): GeolocationCoords => {
	if (!bbox) {
		return center;
	}

	return [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
};
