import type { GeocoderAdapter, GeocoderLocation } from './GeocoderAdapter';
import { GREATER_LONDON_BOUNDS_PADDED } from '@ldn-viz/maps';

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

export class GeocoderAdapterMapBox implements GeocoderAdapter {
	private _token: string = ''
	private _resultCount: number = 5

	constructor(token: string, resultCount = 5) {
		this._token = token;
		this.setResultCount(resultCount);
	}

	// GeocoderAdapter functions.

	search(text: string) {
		const url = buildUrl(text, this._token, this._resultCount);
		return fetch(url)
			.then((res) => res.json())
			.then(transformGeoJSONToGeocoderLocations);
	}

	attribution() {
		return {
			text: 'Powered by MapBox',
			link: 'https://docs.mapbox.com/api/search/'
		};
	}

	// GeocoderAdapterMapBox functions.

	setResultCount(resultCount: number): GeocoderAdapterMapBox {
		if (resultCount > 10) {
			resultCount = 10;
			console.warn(
				`[GeocoderAdapterMapBox] maximum MapBox API result count is 10. ${resultCount} is too high so defaulting to 10`
			);
		} else if (resultCount < 1) {
			resultCount = 1;
			console.warn(
				`[GeocoderAdapterMapBox] minimum MapBox API result count is 1. ${resultCount} is too low so defaulting to 1`
			);
		}

		this._resultCount = resultCount;
		return this;
	}
}

const buildUrl = (text: string, token: string, resultCount: number): string => {
	text = encodeURIComponent(text);

	const queryString = new URLSearchParams({
		access_token: token,
		bbox: GREATER_LONDON_BOUNDS_PADDED.flat(),
		autocomplete: true,
		limit: resultCount
	});

	return `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?${queryString}`;
};

const transformGeoJSONToGeocoderLocations = (
	geojson: MapBoxFeatureCollection
): GeocoderLocation[] => {
	return geojson.features.map((loc) => ({
		id: loc.id,
		name: loc.text,
		address: removeNameFromAddress(loc.place_name, loc.text),
		center: loc.center,
		bounds: loc.bbox
	}));
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
