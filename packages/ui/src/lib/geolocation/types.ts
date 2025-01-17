export type GeolocationCoords = [lng: number, lat: number];

export type GeolocationBounds = [minLng: number, minLat: number, maxLng: number, maxLat: number];

// GeolocationUnamed represents a geographical location with a center point
// and possible bounding box.
export interface GeolocationUnamed {
	center: GeolocationCoords;
	bounds?: GeolocationBounds;
}

// GeolocationNamed represents a named and possible addressed location. Named
// locations must be unique within a collection.
export interface GeolocationNamed extends GeolocationUnamed {
	id: string;

	// name is the short human-readable name of the location presented to the
	// user.
	name?: string;

	// address in the human-readable address presented to the user.
	address?: string;

	// otherProps allows adapters to store or pass adapter specific information.
	[otherProps: string]: unknown;
}

// Geolocation represents either a named or unamed location.
export type Geolocation = GeolocationUnamed | GeolocationNamed;

// GeolocationSearchError represents an error thrown by a geolocation
// or geolocator search.
export type GeolocationSearchError = Error | GeolocationPositionError;

// OnGeolocationSearchResult is invoked when a Geocoder or Geolocator
// finds a result or a suggested result is selected by the user.
export type OnGeolocationSearchResult = (loc: Geolocation) => void;

// OnGeolocationSearchError is invoked when an adapter promise rejects a
// search request.
export type OnGeolocationSearchError = (err: GeolocationSearchError) => void;

// OnSuggestionListInteraction is invoked when a keyboard, mouse, or touch
// event occurs in the suggestion list, except when a suggestion is selected.
export type OnSuggestionListInteraction = (event: Event, geolocation: GeolocationNamed) => void;
