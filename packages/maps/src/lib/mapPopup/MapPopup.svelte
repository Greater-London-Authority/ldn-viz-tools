<script>
	/**
	 * The `<MapPopup>` component allows tooltips and static markers to be added
	 * easily using client side rendered components. This component is designed
	 * to be slotted into `<MapLayer>` components but may be slotted anywhere
	 * within a `<Map>` instance.
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
	 * Disables hover cursor styling.
	 *
	 * By default the map cursor is a grab icon to
	 * indicate the map can be panned. Hovering a feature with a marker shows a
	 * pointer (implying a clickable feature) and tooltip only popups will
	 * show the default OS cursor icon.
	 */
	export let noCursorStyle = false;

	/**
	 * Component to render when the users mouse hovers a feature.
	 */
	export let tooltip = null;

	/**
	 * Component to render when the user clicks a feature.
	 */
	export let marker = null;

	let mapTooltip = null;
	let tooltipInstance = null;

	let mapMarker = null;
	let markerFeature = null;
	let markerInstance = null;

	const enterTopFeature = (event, { feature }) => {
		if (marker) {
			setCursorStyle('pointer');
		} else if (tooltip) {
			setCursorStyle('default');
		}

		if (markerFeature && featuresEqual(markerFeature, feature)) {
			return;
		}

		if (!mapTooltip && tooltip) {
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
		if (!marker) {
			return;
		}

		if (featuresEqual(feature, markerFeature)) {
			return;
		}

		removeTooltip();
		markerFeature = feature;
		renderMarker(event, feature);
	};

	const clickMap = (event, { features }) => {
		if (!featuresEqual(features[0], markerFeature)) {
			removeMarker();
		}
	};

	const featuresEqual = (a, b) => {
		return a && b && a.layer.id === b.layer.id && areFeatureIdsEqual(a, b);
	};

	const areFeatureIdsEqual = (a, b) => {
		const aProps = a.properties;
		const bProps = b.properties;

		if (aProps.objectid && bProps.objectid) {
			return aProps.objectid === bProps.objectid;
		}

		if (aProps.cluster_id && bProps.cluster_id) {
			return aProps.cluster_id === bProps.cluster_id;
		}

		return false;
	};

	const removeTooltip = () => {
		mapTooltip?.remove();
		mapTooltip = null;
		tooltipInstance?.$destroy();
		tooltipInstance = null;
	};

	const removeMarker = () => {
		mapMarker?.remove();
		mapMarker = null;
		markerInstance?.$destroy();
		markerInstance = null;
		markerFeature = null;
	};

	const renderTooltip = (event, feature) => {
		mapTooltip = new maplibre_gl.Popup({
			closeButton: false,
			closeOnClick: false
		});

		const container = document.createElement('div');
		mapTooltip.setDOMContent(container);
		mapTooltip.setLngLat(event.lngLat);

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
				['mapPopupTooltip', mapTooltip],
				['mapPopupLayerId', layerId],
				['mapPopupFeature', feature]
			])
		});

		mapTooltip.addTo($mapStore);
	};

	const renderMarker = (event, feature) => {
		mapMarker = new maplibre_gl.Marker();
		mapMarker.setLngLat(event.lngLat);
		mapMarker.setOffset([0, 0]);
		mapMarker.getElement().replaceChildren();
		const container = mapMarker.getElement();

		// We don't pass the event because some properties in the event object may
		// get cleaned up or changed after the event has officially finished but
		// before any async activity has occurred.
		//
		// If a new property from the event is required in component context, pass
		// (and maybe clone) the specific event property and pass it into the
		// function below to be set directly in the context.
		markerInstance = new marker({
			target: container,
			context: new Map([
				...contexts,
				['mapPopupMarker', mapMarker],
				['mapPopupLayerId', layerId],
				['mapPopupFeature', feature]
			])
		});

		mapMarker.addTo($mapStore);
	};
</script>

<MapCursorEvent {layerId} {enterTopFeature} {leaveTopFeature} {clickFeature} {clickMap}>
	<slot />
</MapCursorEvent>
