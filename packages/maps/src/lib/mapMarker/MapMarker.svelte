<script>
	/**
	 * The `<MapMarker>` component allows tooltips and popups to easily be added
	 * for feature hover and clicks respectively. This component may be slotted
	 * anywhere provided the `<Map>` component context is available.
	 *
	 * To ensure the correct behaviour for overlapping tooltips that aren't
	 * sourced via ESRI servers, set `generateId` to true in your
	 * [MapLibre Source Specifications](https://maplibre.org/maplibre-style-spec/sources/).
	 *
	 * The `tooltip` and `popup` components are client side rendered. This
	 * component's context is passed to them along with three additional
	 * values:
	 * - `mapMarkerMaplibrePopup` (tooltip component only) is the instance of `maplibre_gl.Popup` that contains the rendered tooltip component.
	 * - `mapMarkerMaplibreMarker` (popup component only) is the instance of `maplibre_gl.Marker` that contains the rendered popup component.
	 * - `mapMarkerLayerId` is the ID of the map layer the feature belongs to.
	 * - `mapMarkerFeature` is the target GeoJSON feature. Note that MapLibre adds additional fields, e.g. `layer`.
	 * @component
	 */

	import { getAllContexts } from 'svelte';
	import maplibre_gl from 'maplibre-gl';
	import MapCursorEvent from '../mapCursorEvent/MapCursorEvent.svelte';

	const contexts = getAllContexts();
	const mapStore = contexts.get('mapStore');
	const ctxLayerId = contexts.get('mapLayerId');

	/**
	 * ID of the target layer. Defaults to using the value of 'mapLayerId'
	 * context if it exists.
	 */
	export let layerId = ctxLayerId;

	/**
	 * Disables cursor style changes triggered on feature hover.
	 *
	 * By default the map cursor is a grab icon to indicate the map can be
	 * panned. Hovering a feature that has a clickable popup shows a pointer
	 * (the pointer implying clickability) and tooltips will show the default OS
	 * cursor icon.
	 */
	export let noCursorStyle = false;

	/**
	 * Component to render when the user's mouse hovers a feature.
	 */
	export let tooltip = null;

	/**
	 * Component to render when the user clicks a feature.
	 */
	export let popup = null;

	let tooltipMaplibrePopup = null;
	let tooltipInstance = null;

	let popupMaplibreMarker = null;
	let popupFeature = null;
	let popupInstance = null;

	const enterTopFeature = (event, { feature }) => {
		if (popup) {
			setCursorStyle('pointer');
		} else if (tooltip) {
			setCursorStyle('default');
		}

		if (popupFeature && featuresEqual(popupFeature, feature)) {
			return;
		}

		if (!tooltipMaplibrePopup && tooltip) {
			renderTooltip(event, feature);
		}
	};

	const leaveTopFeature = () => {
		setCursorStyle('');
		removeTooltip();
	};

	const setCursorStyle = (cursorStyle) => {
		if (!noCursorStyle) {
			$mapStore.getCanvas().style.cursor = cursorStyle;
		}
	};

	const clickFeature = (event, { feature }) => {
		if (!popup) {
			return;
		}

		if (featuresEqual(feature, popupFeature)) {
			return;
		}

		removeTooltip();
		popupFeature = feature;
		renderPopup(event, feature);
	};

	const clickMap = (event, { features }) => {
		if (!featuresEqual(features[0], popupFeature)) {
			removePopup();
		}
	};

	const featuresEqual = (a, b) => {
		if (!a || !b) {
			return false;
		}

		if (a.layer.id !== b.layer.id) {
			return false;
		}

		if (a.id !== undefined && b.id !== undefined) {
			return a.id === b.id;
		}

		if (a.properties.objectid !== undefined && b.properties.objectid !== undefined) {
			return a.properties.objectid === b.properties.objectid;
		}

		// Clusters may not have an ID and won't have an objectid.
		if (a.properties.cluster_id !== undefined && b.properties.cluster_id !== undefined) {
			return a.properties.cluster_id === b.properties.cluster_id;
		}

		return false;
	};

	const removeTooltip = () => {
		tooltipMaplibrePopup?.remove();
		tooltipMaplibrePopup = null;
		tooltipInstance?.$destroy();
		tooltipInstance = null;
	};

	const removePopup = () => {
		popupMaplibreMarker?.remove();
		popupMaplibreMarker = null;
		popupInstance?.$destroy();
		popupInstance = null;
		popupFeature = null;
	};

	const renderTooltip = (event, feature) => {
		tooltipMaplibrePopup = new maplibre_gl.Popup({
			closeButton: false,
			closeOnClick: false
		});

		const container = document.createElement('div');
		tooltipMaplibrePopup.setDOMContent(container);
		tooltipMaplibrePopup.setLngLat(event.lngLat);

		// We don't pass the event because some properties in the event object may
		// get cleaned up or changed after the event has officially finished but
		// before any async activity has occurred.
		//
		// If a new property from the event is required in component context, pass
		// (and maybe clone) the specific event property and pass it into the
		// function below to be set directly in the context.
		tooltipInstance = new tooltip({
			target: container,
			context: new Map([
				...contexts,
				['mapMarkerMaplibrePopup', tooltipMaplibrePopup],
				['mapMarkerLayerId', layerId],
				['mapMarkerFeature', feature]
			])
		});

		tooltipMaplibrePopup.addTo($mapStore);
	};

	const renderPopup = (event, feature) => {
		popupMaplibreMarker = new maplibre_gl.Marker();
		popupMaplibreMarker.setLngLat(event.lngLat);
		popupMaplibreMarker.setOffset([0, 0]);
		popupMaplibreMarker.getElement().replaceChildren();
		const container = popupMaplibreMarker.getElement();

		// We don't pass the event because some properties in the event object may
		// get cleaned up or changed after the event has officially finished but
		// before any async activity has occurred.
		//
		// If a new property from the event is required in component context, pass
		// (and maybe clone) the specific event property and pass it into the
		// function below to be set directly in the context.
		popupInstance = new popup({
			target: container,
			context: new Map([
				...contexts,
				['mapMarkerMaplibreMarker', popupMaplibreMarker],
				['mapMarkerLayerId', layerId],
				['mapMarkerFeature', feature]
			])
		});

		popupMaplibreMarker.addTo($mapStore);
	};
</script>

<MapCursorEvent {layerId} {enterTopFeature} {leaveTopFeature} {clickFeature} {clickMap}>
	<slot />
</MapCursorEvent>
