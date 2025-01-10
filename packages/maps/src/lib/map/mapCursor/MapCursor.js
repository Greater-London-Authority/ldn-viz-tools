import HandlerCollection from './HandlerCollection';

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
 */
export default function MapCursor(map) {
	const handlers = new HandlerCollection();
	const self = {};

	let isTouchEvent = false;
	let isHandlingMove = false;
	let isHandlingClick = false;

	// Optimise UX by avoiding too much processing on mouse moves.
	let mouseMoveTimeoutMs = 20;
	let activeFeatures = [];

	self.activeFeatures = () => {
		return activeFeatures;
	};

	self.topFeature = () => {
		return activeFeatures.length > 0 ? activeFeatures[0] : null;
	};

	self.on = (eventType, layerId, handler) => {
		const originalSize = handlers.size();
		handlers.add(eventType, layerId, handler);

		if (originalSize === 0) {
			map.on('touchstart', onTouchDownMap);
			map.on('mousemove', onMouseMove);
			map.on('click', onClickMap);
		}
	};

	self.off = (eventType, layerId, handler) => {
		handlers.remove(eventType, layerId, handler);

		if (handlers.size() === 0) {
			map.off('click', onClickMap);
			map.off('mousemove', onMouseMove);
			map.off('touchstart', onTouchDownMap);
		}
	};

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
		map = null;
		handlers.clear();
	};

	const onTouchDownMap = () => {
		if (!isHandlingMove) {
			isTouchEvent = true;
		}
	};

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

	const handleFeatureChanges = (event, eventFeatures) => {
		const eventFeatureMap = featureArrayToObject(eventFeatures);
		const activeFeatureMap = featureArrayToObject(activeFeatures);
		const newTopFeature = eventFeatures.length > 0 ? eventFeatures[0] : null;
		const oldTopFeature = self.topFeature();
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

	const onClickMap = (event) => {
		if (isHandlingClick) {
			return;
		}

		isHandlingClick = true;

		clickedMap(event);
		if (self.topFeature()) {
			callHandlerForFeature(event, 'clickFeature', activeFeatures, self.topFeature());
		}

		if (!isHandlingMove) {
			isTouchEvent = false;
		}

		isHandlingClick = false;
	};

	const clickedMap = (event) => {
		for (const entry of handlers.findAll('clickMap')) {
			entry.handler(event, {
				feature: null,
				features: activeFeatures,
				isTouchEvent: isTouchEvent
			});
		}
	};

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
	}, {});
};

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

const getFeaturesUnderEventPoint = (map, event, layerIds) => {
	const mousePoint = [event.point.x, event.point.y];
	return map.queryRenderedFeatures(mousePoint, {
		layers: layerIds
	});
};
