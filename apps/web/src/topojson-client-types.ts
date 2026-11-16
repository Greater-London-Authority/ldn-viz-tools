// topojson-client has no bundled types. The topology parameters are `unknown`
// because JSON imports type `type` as `string`, not the literal 'Topology'.
declare module 'topojson-client' {
	import type { FeatureCollection, GeoJsonProperties, Geometry, MultiLineString } from 'geojson';

	export function feature<P = GeoJsonProperties>(
		topology: unknown,
		object: unknown
	): FeatureCollection<Geometry, P>;

	export function mesh(
		topology: unknown,
		object?: unknown,
		filter?: (a: unknown, b: unknown) => boolean
	): MultiLineString;
}
