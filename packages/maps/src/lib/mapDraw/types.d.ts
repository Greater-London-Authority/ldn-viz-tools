export type HexColor = `#${string}`;

export type HexColorStyling = HexColor | ((feature: GeoJSONStoreFeatures) => HexColor);
