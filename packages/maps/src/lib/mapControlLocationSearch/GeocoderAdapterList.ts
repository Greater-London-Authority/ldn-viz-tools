import type { GeocoderAdapter, GeocoderLocation, GeocoderAttribution } from './GeocoderAdapter';

export class GeocoderAdapterList implements GeocoderAdapter {
	private _locations: GeocoderLocation[]
	private _attribution: undefined | GeocoderAttribution

	constructor(locations: GeocoderLocation[] = []) {
		this._locations = locations;
		this._attribution = undefined;
	}

	// GeocoderAdapter functions.

	search(searchText: string) {
		const result = this._locations.filter((op) => containsQuery(op, searchText));
		return Promise.resolve(result);
	}

	attribution() {
		return this._attribution;
	}

	// GeocoderAdapterList functions.

	locations(): GeocoderLocation[] {
		return this._locations;
	}

	setLocations(locations: GeocoderLocation[]): GeocoderAdapterList {
		this._locations = locations;
		return this;
	}

	setAttribution(attribution: GeocoderAttribution): GeocoderAdapterList {
		this._attribution = attribution;
		return this;
	}
}

const containsQuery = (location: GeocoderLocation, searchText: string): boolean => {
	const haystack = location.name + ' ' + location.address;
	return haystack.toLowerCase().includes(searchText.toLowerCase());
};
