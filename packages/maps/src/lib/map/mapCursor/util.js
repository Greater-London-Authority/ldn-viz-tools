const featureArrayToObject = (features) => {
	return features.reduce((acc, f) => {
		acc[f.id] = f;
		return acc;
	}, {});
};

const featuresEqual = (a, b) => {
	if (!a && !b) {
		return true;
	}

	return (
		!!a && //
		!!b &&
		a.layer.id === b.layer.id &&
		a.properties.objectid === b.properties.objectid
	);
};

const getFeaturesUnderEventPoint = (map, event, layerIds) => {
	const mousePoint = [event.point.x, event.point.y];
	return map.queryRenderedFeatures(mousePoint, {
		layers: layerIds
	});
};

export default {
	featureArrayToObject,
	featuresEqual,
	getFeaturesUnderEventPoint
};
