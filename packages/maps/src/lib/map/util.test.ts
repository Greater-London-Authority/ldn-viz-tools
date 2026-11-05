import { describe, test, expect } from 'vitest';
import type { ResourceType } from 'maplibre-gl';
import { appendOSKeyToUrl } from './util';

const TILE = 'Tile' as ResourceType;

describe('appendOSKeyToUrl', () => {
	test('leaves a non-api.os.uk URL unchanged', () => {
		const transformRequest = appendOSKeyToUrl('my-os-key');

		const result = transformRequest('https://example.com/tiles/1/2/3.png', TILE);

		expect(result).toEqual({ url: 'https://example.com/tiles/1/2/3.png' });
	});

	test('appends srs and key to an api.os.uk URL', () => {
		const transformRequest = appendOSKeyToUrl('my-os-key');

		const result = transformRequest(
			'https://api.os.uk/maps/raster/v1/zxy/Light_3857/1/2/3.png',
			TILE
		);

		const url = new URL(result!.url);
		expect(url.searchParams.get('srs')).toEqual('3857');
		expect(url.searchParams.get('key')).toEqual('my-os-key');
	});

	test('preserves existing query parameters on an api.os.uk URL', () => {
		const transformRequest = appendOSKeyToUrl('my-os-key');

		const result = transformRequest(
			'https://api.os.uk/maps/raster/v1/zxy/Light_3857/1/2/3.png?format=png',
			TILE
		);

		const url = new URL(result!.url);
		expect(url.searchParams.get('format')).toEqual('png');
		expect(url.searchParams.get('srs')).toEqual('3857');
		expect(url.searchParams.get('key')).toEqual('my-os-key');
	});

	test('returns a fresh factory per call with no shared state between keys', () => {
		const transformRequestA = appendOSKeyToUrl('key-a');
		const transformRequestB = appendOSKeyToUrl('key-b');

		const resultA = transformRequestA(
			'https://api.os.uk/maps/raster/v1/zxy/Light_3857/1/2/3.png',
			TILE
		);
		const resultB = transformRequestB(
			'https://api.os.uk/maps/raster/v1/zxy/Light_3857/1/2/3.png',
			TILE
		);

		expect(new URL(resultA!.url).searchParams.get('key')).toEqual('key-a');
		expect(new URL(resultB!.url).searchParams.get('key')).toEqual('key-b');
	});
});
