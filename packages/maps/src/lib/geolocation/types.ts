// Coords represents map coordinates in the form [lng, lat].
export type GeolocationCoords = [number, number];

// Boudns represents map bounds in the form [minLng, minLat, maxLng, maxLat].
export type GeolocationBounds = [number, number, number, number];

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

	// name is the short human readable name of the loaction presented to the
	// user.
	name?: string;

	// address in the human readable address presented to the user.
	address?: string;

	// otherProps allows adapters to store or pass adapter specific information.
	[otherProps: string]: unknown;
}

// Geolocation represents either a named or unamed location.
export type Geolocation = GeolocationUnamed | GeolocationNamed;

// GeolocationSearchError represents an error thrown by a geolocation or
// or geolocator search.
export type GeolocationSearchError = Error | GeolocationPositionError;

// OnGeolocationSearchResult is invoked when a location search feature
// (Geocoder or Geolocator) finds a result or a suggested result is selected by
// the user.
export type OnGeolocationSearchResult = (loc: Geolocation) => void;

// OnGeolocationSearchError is invoked when an adapter promise rejects a
// search request.
export type OnGeolocationSearchError = (err: GeolocationSearchError) => void;
