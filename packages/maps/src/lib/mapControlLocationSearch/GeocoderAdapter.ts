// Geolocation represents a geographical location with a center point and
// possible bounding box.
export interface Geolocation {
	// center in the form [lng, lat].
	center: [number, number];

	// bounds in the form [minLng, minLat, maxLng, maxLat].
	bounds?: [number, number, number, number];
}

// GeocoderLocation should contain either a name, an address, or both.
export interface GeocoderLocation<ExtraType = any> extends Geolocation {
	// id or identifier.
	id: string;

	// name is the short human readable name of the loaction presented to the
	// user.
	name?: string;

	// address in the human readable address presented to the user.
	address?: string;

	// extra allows adapters to store extra information
	extra: ExtraType;
}

// GeocoderAttribution specifies the attribution text and optional link
// returned by an adapter.
export interface GeocoderAttribution {
	// text such as the company or individual name.
	text: string;

	// link URL to the data source. If this is unknown then link to the company
	// or individual providing the service.
	link?: string;
}

// GeocoderAdapter is used to separate the MapControlGeocoder from the location
// lookup requests so search methods can easily be swapped out during
// development or runtime.
//
// The simple design allows for bespoke adapters to be developed easily.
// E.g. an application may require location searching within a non-standard
// API or where non-standard filtering is needed.
export interface GeocoderAdapter {
	// search returns a promise for a list of search results.
	//
	// You do not need to implement delay or debounce as the MapControlGeocoder
	// handles that. Furthermore, search requests are only made if a user's
	// query contains at least three characters.
	//
	// Except for the above constraints, every change to the search input box
	// will trigger a search request. It is up to individual adapters to apply
	// any caching or search optimisation.
	search: (query: string) => Promise<GeocoderLocation[]>;

	// attribution returns an object containing two strings acknowledging the
	// authors or owners of the location data or hosting service and an optional
	// link.
	//
	// This function is optional and should not be imlemented if attribution is
	// not needed. Alternatively, returning undefined will also omit attribution.
	attribution?: () => undefined | GeocoderAttribution;
}
