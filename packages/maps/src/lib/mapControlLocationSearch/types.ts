import type { GeocoderLocation } from './GeocoderAdapter'

export type MapControlLocationUpdate =  undefined | (loc: GeocoderLocation) => void
export type MapControlLocationError = undefined | (err: Error) => void
