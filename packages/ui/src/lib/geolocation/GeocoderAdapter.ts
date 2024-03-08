import type { GeolocationNamed } from './types';

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
//
// If an adapter encounters an error that means it can't return any results it
// must reject (possible via throw) with a type compatible with
// OnGeolocationSearchError.
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
	search: (query: string) => Promise<GeolocationNamed[]>;

	// attribution returns an object containing two strings acknowledging the
	// authors or owners of the location data or hosting service and an optional
	// link.
	//
	// This function is optional and should not be imlemented if attribution is
	// not needed. Alternatively, returning undefined will also omit attribution.
	attribution?: () => undefined | GeocoderAttribution;
}
