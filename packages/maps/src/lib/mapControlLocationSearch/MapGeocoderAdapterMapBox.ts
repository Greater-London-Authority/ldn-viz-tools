import { GREATER_LONDON_BOUNDS_PADDED } from '@ldn-viz/maps';
import type {
	GeocoderAdapter,
	GeolocationBounds,
	GeolocationCoords,
	GeolocationNamed,
	Geolocation
} from '@ldn-viz/ui';

interface RetrieveFeatureCollection {
	features: Array<{
		properties: {
			mapbox_id: string;
			name: string;
			place_formatted: string;
		};
		geometry: {
			coordinates: number[]; // e.g., [longitude, latitude]
		};
	}>;
}

type SearchBoxFeature = {
	mapbox_id: string;
	name: string; // name
	place_formatted: string; // address
};

type SuggestFeatureCollection = {
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
			.then(transformSuggestGeoJSONToNamedGeolocations);
	}

	retrieve(id: string) {
		const url = buildRetrieveUrl(id, this._token, this._sessionToken);
		console.log('Retrieve link: ' + url);
		return fetch(url)
			.then((res) => res.json())
			.then(transformRetrieveGeoJSONToNamedGeolocations);
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

// Searchbox api 'suggest' endpoint to return a list of a suggestions based off of users input
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

// Searchbox api 'retrieve' endpoint to return the geometry of selected value from sugestion list
const buildRetrieveUrl = (suggestionId: string, token: string, session_token: string): string => {
	suggestionId = encodeURIComponent(suggestionId);
	const queryString = new URLSearchParams({
		access_token: token,
		session_token: session_token
	});

	return `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestionId}?${queryString}`;
};

const transformSuggestGeoJSONToNamedGeolocations = (geojson: SuggestFeatureCollection) => {
	return geojson.suggestions.map((loc) => {
		return {
			id: loc.mapbox_id,
			name: loc.name,
			address: loc.place_formatted
		};
	});
};

const transformRetrieveGeoJSONToNamedGeolocations = (geojson: RetrieveFeatureCollection) => {
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
