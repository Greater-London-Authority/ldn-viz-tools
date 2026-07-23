import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import MapDrawControls from './MapDrawControls.svelte';
import { MapDraw, Modes } from './MapDrawState.svelte';

/**
 * `MapDrawControls` is normally handed a real `TerraDraw` instance (constructed by
 * `MapDraw.svelte`), and real `Modes`/`MapDraw` state objects. Since both `drawModes`
 * and `mapDraw` props are typed `any` and are just plain reactive state containers,
 * we can use the real `Modes`/`MapDraw` classes directly (so all of the component's
 * internal reactivity keeps working) while only faking the `terraDraw` drawing engine
 * itself, whose methods (`setMode`, `clear`, `getSnapshot`, `addFeatures`, `on`) are
 * the only things `MapDrawControls` calls on it.
 */
function createMockTerraDraw() {
	return {
		setMode: vi.fn(),
		clear: vi.fn(),
		getSnapshot: vi.fn(() => []),
		addFeatures: vi.fn(),
		on: vi.fn(),
		start: vi.fn()
	};
}

function setup({
	enabledModes = ['polygon', 'point'],
	uploadDownload = [true, true] as [boolean, boolean]
} = {}) {
	const terraDraw = createMockTerraDraw();
	const drawModes = new Modes();
	drawModes.enabled = enabledModes;
	const mapDraw = new MapDraw();

	const onStart = vi.fn();
	const onCancel = vi.fn();
	const onDone = vi.fn();

	const rendered = render(MapDrawControls, {
		props: {
			terraDraw: terraDraw as any,
			onDone,
			onStart,
			onCancel,
			uploadDownload,
			drawModes,
			mapDraw
		}
	});

	return { terraDraw, drawModes, mapDraw, onStart, onCancel, onDone, ...rendered };
}

describe('MapDrawControls (exercised via MapDraw.svelte / MapDrawControls.svelte)', () => {
	test('clickEdit moves controlMode to "edit", picks the first enabled mode when there is no previous mode, snapshots features, and calls onStart', () => {
		const { component, terraDraw, drawModes, mapDraw, onStart } = setup();
		mapDraw.features.current = [{ id: 'a' }] as any;

		component.clickEdit();

		expect(mapDraw.controlMode.current).toBe('edit');
		expect(drawModes.mode.selected).toBe('polygon');
		expect(terraDraw.setMode).toHaveBeenCalledWith('polygon');
		expect(mapDraw.features.previous).toBe(JSON.stringify([{ id: 'a' }]));
		expect(onStart).toHaveBeenCalledTimes(1);
	});

	test('clickEdit selects drawModes.mode.previous when it is already set', () => {
		const { component, terraDraw, drawModes, mapDraw } = setup();
		drawModes.mode.previous = 'point';

		component.clickEdit();

		expect(drawModes.mode.selected).toBe('point');
		expect(terraDraw.setMode).toHaveBeenCalledWith('point');
		expect(mapDraw.controlMode.current).toBe('edit');
	});

	test('clickMode(mode) sets the TerraDraw mode and records it as both selected and previous', () => {
		const { component, terraDraw, drawModes } = setup();

		component.clickMode('point');

		expect(terraDraw.setMode).toHaveBeenCalledWith('point');
		expect(drawModes.mode.selected).toBe('point');
		expect(drawModes.mode.previous).toBe('point');
	});

	test('clickClear clears TerraDraw, resets the snapshot from terraDraw.getSnapshot(), and reverts selected to previous', () => {
		const { component, terraDraw, drawModes, mapDraw } = setup();
		terraDraw.getSnapshot.mockReturnValue([{ id: 'cleared-snapshot' }]);
		drawModes.mode.selected = 'point';
		drawModes.mode.previous = 'polygon';

		component.clickClear();

		expect(terraDraw.clear).toHaveBeenCalledTimes(1);
		expect(mapDraw.features.current).toEqual([{ id: 'cleared-snapshot' }]);
		expect(drawModes.mode.selected).toBe('polygon');
	});

	test('clickCancel restores features.current from the JSON snapshot, re-adds them to TerraDraw, resets mode to "default", and calls onCancel', () => {
		const { component, terraDraw, mapDraw, onCancel } = setup();
		mapDraw.features.previous = JSON.stringify([{ id: 'snapshot-feature' }]);
		mapDraw.controlMode.current = 'edit';

		component.clickCancel();

		expect(mapDraw.features.current).toEqual([{ id: 'snapshot-feature' }]);
		expect(terraDraw.clear).toHaveBeenCalledTimes(1);
		expect(terraDraw.addFeatures).toHaveBeenCalledWith([{ id: 'snapshot-feature' }]);
		expect(mapDraw.controlMode.current).toBe('default');
		expect(onCancel).toHaveBeenCalledTimes(1);
	});

	test('clickDone sets TerraDraw to "render" mode, resets controlMode to "default", calls onDone(features.current), and copies current into saved', () => {
		const { component, terraDraw, mapDraw, onDone } = setup();
		mapDraw.features.current = [{ id: 'done-feature' }] as any;

		component.clickDone();

		expect(terraDraw.setMode).toHaveBeenCalledWith('render');
		expect(mapDraw.controlMode.current).toBe('default');
		expect(onDone).toHaveBeenCalledWith([{ id: 'done-feature' }]);
		expect(mapDraw.features.saved).toEqual([{ id: 'done-feature' }]);
	});

	test('clickUpload switches TerraDraw to "select" mode and sets controlMode to "upload"', () => {
		const { component, terraDraw, mapDraw } = setup();

		component.clickUpload();

		expect(terraDraw.setMode).toHaveBeenCalledWith('select');
		expect(mapDraw.controlMode.current).toBe('upload');
	});

	test('controlMode "upload" renders FileUpload instead of the draw controls', async () => {
		const { mapDraw } = setup();
		mapDraw.controlMode.current = 'upload';

		await expect
			.element(page.getByText('Drag & drop a GeoJSON file here or click to open file picker.'))
			.toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Draw' })).not.toBeInTheDocument();
	});

	test('Select and Clear all buttons are disabled when there are no current features', async () => {
		const { mapDraw } = setup();
		mapDraw.controlMode.current = 'edit';
		mapDraw.features.current = [];

		const selectButton = page.getByRole('button', { name: 'Select' });
		const clearButton = page.getByRole('button', { name: 'Clear all' });

		await expect.element(selectButton).toBeDisabled();
		await expect.element(clearButton).toBeDisabled();
	});

	test('Select and Clear all buttons are enabled once there are current features', async () => {
		const { mapDraw } = setup();
		mapDraw.controlMode.current = 'edit';
		mapDraw.features.current = [{ id: 'a' }] as any;

		const selectButton = page.getByRole('button', { name: 'Select' });
		const clearButton = page.getByRole('button', { name: 'Clear all' });

		await expect.element(selectButton).not.toBeDisabled();
		await expect.element(clearButton).not.toBeDisabled();
	});

	test('Upload/Download buttons render according to the uploadDownload tuple: [true, false] shows only Upload', async () => {
		const { mapDraw } = setup({ uploadDownload: [true, false] });
		mapDraw.controlMode.current = 'edit';

		await expect.element(page.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Download' })).not.toBeInTheDocument();
	});

	test('Upload/Download buttons render according to the uploadDownload tuple: [false, true] shows only Download', async () => {
		const { mapDraw } = setup({ uploadDownload: [false, true] });
		mapDraw.controlMode.current = 'edit';

		await expect.element(page.getByRole('button', { name: 'Upload' })).not.toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Download' })).toBeInTheDocument();
	});

	test('Upload/Download buttons are both absent when the tuple is [false, false]', async () => {
		const { mapDraw } = setup({ uploadDownload: [false, false] });
		mapDraw.controlMode.current = 'edit';

		await expect.element(page.getByRole('button', { name: 'Upload' })).not.toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Download' })).not.toBeInTheDocument();
	});
});
