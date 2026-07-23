import { describe, test, expect } from 'vitest';
import { MapDraw, Modes } from './MapDrawState.svelte';

describe('Modes', () => {
	test('setting enabled also updates options to the same array', () => {
		const modes = new Modes();

		modes.enabled = ['polygon', 'point'];

		expect(modes.enabled).toEqual(['polygon', 'point']);
		expect(modes.options).toEqual(['polygon', 'point']);
	});

	test('modes always appends select and render mode instances after the mapped enabled modes', () => {
		const modes = new Modes();

		modes.enabled = ['polygon', 'circle'];

		const result = modes.modes;

		expect(result).toHaveLength(4);
		expect(result[0]).toBe(modes.modeMapping.polygon);
		expect(result[1]).toBe(modes.modeMapping.circle);
		expect(result[2]).toBe(modes.modeMapping.select);
		expect(result[3]).toBe(modes.modeMapping.render);
	});

	test('modes reflects an empty enabled list as just select and render', () => {
		const modes = new Modes();

		modes.enabled = [];

		expect(modes.modes).toEqual([modes.modeMapping.select, modes.modeMapping.render]);
	});
});

describe('MapDraw', () => {
	test('default state has controlMode "default" and empty features', () => {
		const mapDraw = new MapDraw();

		expect(mapDraw.controlMode.current).toBe('default');
		expect(mapDraw.features).toEqual({ current: [], saved: [], previous: '' });
	});
});
