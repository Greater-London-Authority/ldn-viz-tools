import HandlerCollection from './HandlerCollection';
import util from './util';

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

		const eventFeatures = util.getFeaturesUnderEventPoint(map, event, handlers.layerIds);

		handleFeatureChanges(event, eventFeatures);
		handleTopFeatureChanges(event, eventFeatures);

		activeFeatures = eventFeatures;

		setTimeout(() => {
			isTouchEvent = false;
			isHandlingMove = false;
		}, mouseMoveTimeoutMs);
	};

	const handleFeatureChanges = (event, eventFeatures) => {
		const eventFeatureMap = util.featureArrayToObject(eventFeatures);
		const activeFeatureMap = util.featureArrayToObject(activeFeatures);

		for (const id in activeFeatureMap) {
			if (!eventFeatureMap[id]) {
				callHandlerViaFeatureId(event, 'leaveFeature', eventFeatures, id);
			}
		}

		for (const id in eventFeatureMap) {
			if (!activeFeatureMap[id]) {
				callHandlerViaFeatureId(event, 'enterFeature', eventFeatures, id);
			}
		}
	};

	const handleTopFeatureChanges = (event, eventFeatures) => {
		const newTopFeature = eventFeatures.length > 0 ? eventFeatures[0] : null;
		const oldTopFeature = self.topFeature();

		if (util.featuresEqual(oldTopFeature, newTopFeature)) {
			return;
		}

		if (oldTopFeature) {
			callHandlerForFeature(event, 'leaveTopFeature', eventFeatures, oldTopFeature);
		}

		if (newTopFeature) {
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

	const callHandlerViaFeatureId = (event, eventType, features, id) => {
		const feature = features.find((f) => f.id == id);
		if (feature) {
			callHandlerForFeature(event, eventType, features, feature);
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
