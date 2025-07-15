import type { RequestTransformFunction } from 'maplibre-gl';

/**
 * Applied as the MapLibre `transformRequest` option to append the OS key
 * to outgoing OS API requests.
 */
export const appendOSKeyToUrl: (osKey: string) => RequestTransformFunction = (osKey) => {
	return (url: string) => {

		            console.log("Processing:", url)


		const urlObj = new URL(url);

		if (urlObj.hostname !== 'api.os.uk') {
			console.log("...wrong domain")
			return { url: urlObj.href };
		}

		const WEB_MERCATOR_EPSG = '3857';
		urlObj.searchParams.set('srs', WEB_MERCATOR_EPSG);
		urlObj.searchParams.set('key', osKey);

		console.log("...", urlObj.href)

		return { url: urlObj.href };
	};
};
