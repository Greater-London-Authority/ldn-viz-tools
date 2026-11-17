/**
 * @typedef {import('./types').HandlerCollectionEntry} HandlerCollectionEntry
 * @typedef {import('./types').MapCursorFeatureHandler} MapCursorFeatureHandler
 * @typedef {import('./types').HandlerCollectionType} HandlerCollectionType
 * @typedef {Record<string, HandlerCollectionEntry[]>} HandlerEntries
 */

/**
 * Stores the handlers used by MapCursor.
 *
 * @returns {HandlerCollectionType}
 */
export default function HandlerCollection() {
	const self = /** @type {HandlerCollectionType} */ ({});

	// Event entry list item:
	// {
	//   layerId: "",
	//   handler: (event, { feature, features, isTouchEvent }) => {}
	// }
	/** @type {Readonly<HandlerEntries>} */
	const entriesMap = Object.freeze({
		enterFeature: [],
		leaveFeature: [],
		enterTopFeature: [],
		leaveTopFeature: [],
		clickMap: [],
		clickFeature: []
	});

	self.entries = structuredClone(entriesMap);
	self.layerIds = [];

	self.size = () => {
		return self.layerIds.length;
	};

	self.findAll = (eventType, layerId = null) => {
		const results = self.entries[eventType];

		if (layerId === null) {
			return results;
		}

		return results.filter((entry) => entry.layerId === layerId);
	};

	self.add = (eventType, layerId, handler) => {
		checkArguments(eventType, layerId, handler);
		removeHandler(eventType, layerId, handler);
		addHandler(eventType, layerId, handler);
		updateLayerIds();
	};

	self.remove = (eventType, layerId, handler) => {
		checkArguments(eventType, layerId, handler);
		removeHandler(eventType, layerId, handler);
		updateLayerIds();
	};

	self.clear = () => {
		self.entries = structuredClone(entriesMap);
		self.layerIds = [];
	};

	/**
	 * @param {string} eventType
	 * @param {string} layerId
	 * @param {MapCursorFeatureHandler} handler
	 */
	const checkArguments = (eventType, layerId, handler) => {
		checkLayerId(layerId);
		checkEventType(eventType, layerId);
		checkHandler(layerId, handler);
	};

	/** @param {string} layerId */
	const checkLayerId = (layerId) => {
		if (typeof layerId !== 'string' || layerId === '') {
			throw new Error(
				`[HandlerCollection] Missing layer ID or invalid type (expected non-empty string) for '${layerId}'`
			);
		}
	};

	/**
	 * @param {string} eventType
	 * @param {string} layerId
	 */
	const checkEventType = (eventType, layerId) => {
		if (typeof eventType !== 'string' || eventType === '') {
			throw new Error(
				`[HandlerCollection] Missing event type or invalid type (expected non-empty string) for '${layerId}'`
			);
		}

		if (!self.entries[eventType]) {
			throw new Error(`[HandlerCollection] Unknown event type '${eventType}' for '${layerId}'`);
		}
	};

	/**
	 * @param {string} layerId
	 * @param {MapCursorFeatureHandler} handler
	 */
	const checkHandler = (layerId, handler) => {
		if (!handler || typeof handler !== 'function') {
			throw new Error(
				`[HandlerCollection] Missing handler or invalid type (expected function) for '${layerId}'`
			);
		}
	};

	/**
	 * @param {string} eventType
	 * @param {string} layerId
	 * @param {MapCursorFeatureHandler} handler
	 */
	const addHandler = (eventType, layerId, handler) => {
		self.entries[eventType].push({
			layerId,
			handler
		});
	};

	/**
	 * @param {string} eventType
	 * @param {string} layerId
	 * @param {MapCursorFeatureHandler} handler
	 */
	const removeHandler = (eventType, layerId, handler) => {
		const events = self.entries[eventType];

		for (let i = 0; i < events.length; i++) {
			const entry = events[i];

			if (entry.layerId === layerId && entry.handler === handler) {
				events.splice(i, 1);
				return true;
			}
		}

		return false;
	};

	const updateLayerIds = () => {
		const nonUniqueLayerIds = Object.values(self.entries) //
			.flat()
			.map((h) => h.layerId);
		self.layerIds = [...new Set(nonUniqueLayerIds)];
	};

	return self;
}
