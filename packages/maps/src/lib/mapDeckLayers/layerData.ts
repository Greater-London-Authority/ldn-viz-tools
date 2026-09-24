/** A GeoJSON FeatureCollection, whose features are the data. */
export type FeatureCollectionData<DataT> = { features: DataT[] };

/** Data for a layer: an array, or a GeoJSON FeatureCollection whose features are the data. */
export type LayerDataArray<DataT> = DataT[] | FeatureCollectionData<DataT>;

/**
 * The type of the `data` prop: data as above, or a URL or promise that resolves to it
 * (loaded as for deck's own layers).
 */
export type LayerDataInput<DataT> =
	| LayerDataArray<DataT>
	| string
	| Promise<LayerDataArray<DataT>>
	| null;

/** Returns the features of a FeatureCollection, or `undefined` for any other data. */
export const featuresOf = <DataT>(data: unknown): DataT[] | undefined => {
	const features = (data as { features?: unknown } | null)?.features;
	return Array.isArray(features) ? features : undefined;
};

/**
 * Returns the data of a layer as an array. deck resolves a URL or promise before `updateState`
 * sees it, so this only needs to unwrap a FeatureCollection. Anything else is treated as empty.
 */
export const toDataArray = <DataT>(data: unknown): DataT[] => {
	return Array.isArray(data) ? data : (featuresOf<DataT>(data) ?? []);
};
