import type { GeolocationNamed } from './types';
import type { GeocoderAdapter, GeocoderAttribution } from './GeocoderAdapter';

// GeocoderAdapterList is constructed with an array of GeolocationNamed which
// is searched using name and address.
//
// It is very simple being intended for prototyping and demonstration. However,
// it does make good boiler plate for new adapters.
export class GeocoderAdapterList implements GeocoderAdapter {
	private _locations: GeolocationNamed[];
	private _attribution: undefined | GeocoderAttribution;

	constructor(locations: GeolocationNamed[] = []) {
		this._locations = locations;
		this._attribution = undefined;
	}

	// GeocoderAdapter functions.

	search(searchText: string) {
		const result = this._locations //
			.filter((op) => containsQuery(op, searchText));
		return Promise.resolve(result);
	}

	attribution() {
		return this._attribution;
	}

	// GeocoderAdapterList functions.

	locations(): GeolocationNamed[] {
		return this._locations;
	}

	setLocations(locations: GeolocationNamed[]): GeocoderAdapterList {
		this._locations = locations;
		return this;
	}

	setAttribution(attribution: GeocoderAttribution): GeocoderAdapterList {
		this._attribution = attribution;
		return this;
	}
}

const containsQuery = (location: GeolocationNamed, searchText: string): boolean => {
	let haystack = location.name ? location.name : '';
	haystack += ' ';
	haystack += location.address ? location.address : '';
	haystack = haystack.trim().toLowerCase();

	return haystack.toLowerCase().includes(searchText.toLowerCase());
};
