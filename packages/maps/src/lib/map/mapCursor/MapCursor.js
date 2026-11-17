import HandlerCollection from './HandlerCollection';

/**
 * @typedef {import('../types').MapLibre} MapLibre
 * @typedef {import('../types').MapLibreMouseLikeEvent} MapLibreMouseLikeEvent
 * @typedef {import('maplibre-gl').MapGeoJSONFeature} MapGeoJSONFeature
 * @typedef {import('./types').MapCursorType} MapCursorType
 * @typedef {import('./types').MapCursorFeatureHandler} MapCursorFeatureHandler
 */

/**
 * MapCursor provides map cursor event and style management.
 *
 * The way MapLibre uses JavaScript's event system makes it difficult and
 * verbose to manage propagation of events. Specifically, ensuring events for
 * features on top take precedence in controlling the state of the map
 * including current popup, feature highlights, mouse style, or any other
 * singleton states.
 *
 * For example, a mouseenter event setting the cursor maybe overridden in the
 * same tick by a mouseleave event for a different feature, possible in
 * an unrelated layer.
 *
 * Another example is the need to only have one popup shown at once while
 * keeping popup specific code isolated from each other.
 *
 * Firing order:
 * 1. onTouchDownMap
 * 2. onMouseMove
 * 3. onClickMap
 *
 * @param {MapLibre} map
 * @returns {MapCursorType}
 */
export default function MapCursor(map) {
	const handlers = HandlerCollection();
	const self = /** @type {MapCursorType} */ ({});

	let isTouchEvent = false;
	let isHandlingMove = false;
	let isHandlingClick = false;

	// Optimise UX by avoiding too much processing on mouse moves.
	let mouseMoveTimeoutMs = 20;
	/** @type {MapGeoJSONFeature[]} */
	let activeFeatures = [];

	self.activeFeatures = () => {
		return activeFeatures;
	};

	/** @returns {MapGeoJSONFeature | null} */
	const topFeature = () => {
		return activeFeatures.length > 0 ? activeFeatures[0] : null;
	};

	self.topFeature = topFeature;

	/** @type {MapCursorType['on']} */
	self.on = (eventType, layerId, handler) => {
		const originalSize = handlers.size();
		handlers.add(eventType, layerId, handler);

		if (originalSize === 0) {
			map.on('touchstart', onTouchDownMap);
			map.on('mousemove', onMouseMove);
			map.on('click', onClickMap);
		}
	};

	/** @type {MapCursorType['off']} */
	self.off = (eventType, layerId, handler) => {
		handlers.remove(eventType, layerId, handler);

		if (handlers.size() === 0) {
			map.off('click', onClickMap);
			map.off('mousemove', onMouseMove);
			map.off('touchstart', onTouchDownMap);
		}
	};

	/** @param {string} layerId */
	self.offLayer = (layerId) => {
		for (const eventType in handlers.entries) {
			for (const entry of handlers.entries[eventType]) {
				if (entry.layerId === layerId) {
					self.off(eventType, entry.layerId, entry.handler);
				}
			}
		}
	};

	self.destroy = () => {
		map = /** @type {MapLibre} */ (/** @type {unknown} */ (null));
		handlers.clear();
	};

	const onTouchDownMap = () => {
		if (!isHandlingMove) {
			isTouchEvent = true;
		}
	};

	/** @param {MapLibreMouseLikeEvent} event */
	const onMouseMove = async (event) => {
		if (isHandlingMove || !map) {
			return;
		}

		isHandlingMove = true;

		const eventFeatures = getFeaturesUnderEventPoint(map, event, handlers.layerIds);
		handleFeatureChanges(event, eventFeatures);
		activeFeatures = eventFeatures;

		setTimeout(() => {
			isTouchEvent = false;
			isHandlingMove = false;
		}, mouseMoveTimeoutMs);
	};

	/**
	 * @param {MapLibreMouseLikeEvent} event
	 * @param {MapGeoJSONFeature[]} eventFeatures
	 */
	const handleFeatureChanges = (event, eventFeatures) => {
		const eventFeatureMap = featureArrayToObject(eventFeatures);
		const activeFeatureMap = featureArrayToObject(activeFeatures);
		const newTopFeature = eventFeatures.length > 0 ? eventFeatures[0] : null;
		const oldTopFeature = topFeature();
		const sameTopFeature = featuresEqual(oldTopFeature, newTopFeature);

		for (const id in activeFeatureMap) {
			if (!eventFeatureMap[id]) {
				callHandlerForFeature(event, 'leaveFeature', eventFeatures, activeFeatureMap[id]);
			}
		}

		if (!sameTopFeature && oldTopFeature) {
			callHandlerForFeature(event, 'leaveTopFeature', eventFeatures, oldTopFeature);
		}

		for (const id in eventFeatureMap) {
			if (!activeFeatureMap[id]) {
				callHandlerForFeature(event, 'enterFeature', eventFeatures, eventFeatureMap[id]);
			}
		}

		if (!sameTopFeature && newTopFeature) {
			callHandlerForFeature(event, 'enterTopFeature', eventFeatures, newTopFeature);
		}
	};

	/** @param {MapLibreMouseLikeEvent} event */
	const onClickMap = (event) => {
		if (isHandlingClick) {
			return;
		}

		isHandlingClick = true;

		clickedMap(event);
		const clickedFeature = topFeature();
		if (clickedFeature) {
			callHandlerForFeature(event, 'clickFeature', activeFeatures, clickedFeature);
		}

		if (!isHandlingMove) {
			isTouchEvent = false;
		}

		isHandlingClick = false;
	};

	/** @param {MapLibreMouseLikeEvent} event */
	const clickedMap = (event) => {
		for (const entry of handlers.findAll('clickMap')) {
			entry.handler(event, {
				feature: null,
				features: activeFeatures,
				isTouchEvent: isTouchEvent
			});
		}
	};

	/**
	 * @param {MapLibreMouseLikeEvent} event
	 * @param {string} eventType
	 * @param {MapGeoJSONFeature[]} features
	 * @param {MapGeoJSONFeature} feature
	 */
	const callHandlerForFeature = (event, eventType, features, feature) => {
		const entries = handlers.findAll(eventType, feature.layer.id);

		for (const entry of entries) {
			entry.handler(event, {
				feature,
				features,
				isTouchEvent: isTouchEvent
			});
		}
	};

	return self;
}

/**
 * @param {MapGeoJSONFeature[]} features
 * @returns {Record<string, MapGeoJSONFeature>}
 */
const featureArrayToObject = (features) => {
	return features.reduce((acc, f) => {
		// For ESRI GeoJSON the layer ID and objectid provide enough uniqueness but
		// non-ESRI GeoJSON requires the source specification set 'generateId' to
		// true so that 'feature.id' is always set. However, not setting this is
		// unlikely to cause an issue unless there are overlapping features in the
		// same layer.
		const id = f.layer.id + ':' + f.id + ':' + f.properties.objectid;
		acc[id] = f;
		return acc;
	}, /** @type {Record<string, MapGeoJSONFeature>} */ ({}));
};

/**
 * @param {MapGeoJSONFeature | null} a
 * @param {MapGeoJSONFeature | null} b
 */
const featuresEqual = (a, b) => {
	if (!a && !b) {
		return true;
	}

	if (!a || !b) {
		return false;
	}

	if (a.layer.id !== b.layer.id) {
		return false;
	}

	if (a.id !== undefined && b.id !== undefined) {
		return a.id === b.id;
	}

	return a.properties.objectid === b.properties.objectid;
};

/**
 * @param {MapLibre} map
 * @param {MapLibreMouseLikeEvent} event
 * @param {string[]} layerIds
 */
const getFeaturesUnderEventPoint = (map, event, layerIds) => {
	/** @type {[number, number]} */
	const mousePoint = [event.point.x, event.point.y];
	return map.queryRenderedFeatures(mousePoint, {
		layers: layerIds
	});
};
