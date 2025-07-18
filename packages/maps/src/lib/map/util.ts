import type { RequestTransformFunction } from 'maplibre-gl';

/**
 * Applied as the MapLibre `transformRequest` option to append the OS key
 * to outgoing OS API requests.
 */
export const appendOSKeyToUrl: (osKey: string) => RequestTransformFunction = (osKey) => {
	return (url: string) => {
		const urlObj = new URL(url);

		if (urlObj.hostname !== 'api.os.uk') {
			return { url: urlObj.href };
		}

		const WEB_MERCATOR_EPSG = '3857';
		urlObj.searchParams.set('srs', WEB_MERCATOR_EPSG);
		urlObj.searchParams.set('key', osKey);

		return { url: urlObj.href };
	};
};
