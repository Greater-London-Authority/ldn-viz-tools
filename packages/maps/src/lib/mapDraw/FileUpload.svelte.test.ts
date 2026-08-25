import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import FileUpload from './FileUpload.svelte';
import { MapDraw } from './MapDrawState.svelte';

function createMockTerraDraw() {
	return {
		clear: vi.fn(),
		addFeatures: vi.fn()
	};
}

function setup() {
	const terraDraw = createMockTerraDraw();
	const mapDraw = new MapDraw();

	const rendered = render(FileUpload, {
		props: { terraDraw: terraDraw as any, mapDraw }
	});

	return { terraDraw, mapDraw, ...rendered };
}

function makeGeoJSONFile(content: unknown, name = 'shape.geojson') {
	return new File([JSON.stringify(content)], name, { type: 'application/geo+json' });
}

function getFileInput(container: HTMLElement) {
	const input = container.querySelector('input[type="file"]');
	if (!input) {
		throw new Error('file input not found');
	}
	return input as HTMLInputElement;
}

function dispatchFileSelect(input: HTMLInputElement, file: File | undefined) {
	Object.defineProperty(input, 'files', {
		value: file ? [file] : [],
		configurable: true
	});
	input.dispatchEvent(new Event('change', { bubbles: true }));
}

function dispatchDrop(dropZone: Element, file: File | undefined) {
	const items = file ? [{ kind: 'file', getAsFile: () => file }] : [];
	const event = new Event('drop', { bubbles: true, cancelable: true });
	Object.defineProperty(event, 'dataTransfer', { value: { items } });
	dropZone.dispatchEvent(event);
}

function dispatchDragEnter(dropZone: Element, itemCount = 1) {
	const items = Array.from({ length: itemCount }, () => ({ kind: 'file' }));
	const event = new Event('dragenter', { bubbles: true, cancelable: true });
	Object.defineProperty(event, 'dataTransfer', { value: { items } });
	dropZone.dispatchEvent(event);
}

function dispatchDragLeave(dropZone: Element) {
	const event = new Event('dragleave', { bubbles: true, cancelable: true });
	dropZone.dispatchEvent(event);
}

const successHeading = () => page.getByRole('heading', { name: 'File upload successful' });

const validFeatureCollection = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [0.123456789123, 51.987654321987] },
			properties: {}
		}
	]
};

describe('FileUpload', () => {
	test('selecting a file whose name does not end in .geojson is ignored', async () => {
		const { terraDraw, container } = setup();
		const input = getFileInput(container);
		const file = makeGeoJSONFile(validFeatureCollection, 'shape.json');

		dispatchFileSelect(input, file);
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(terraDraw.addFeatures).not.toHaveBeenCalled();
		await expect
			.element(page.getByText('Drag & drop a GeoJSON file here or click to open file picker.'))
			.toBeInTheDocument();
	});

	test('dropping a file whose name does not end in .geojson is ignored', async () => {
		const { terraDraw, container } = setup();
		const dropZone = container.querySelector('[role="button"]')!;
		const file = makeGeoJSONFile(validFeatureCollection, 'shape.json');

		dispatchDrop(dropZone, file);
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(terraDraw.addFeatures).not.toHaveBeenCalled();
	});

	test('a valid .geojson selection parses the file, runs fixImportedGeoJSON, calls terraDraw.addFeatures, and moves state to success', async () => {
		const { terraDraw, container } = setup();
		const input = getFileInput(container);
		const file = makeGeoJSONFile(validFeatureCollection);

		dispatchFileSelect(input, file);

		await expect.element(successHeading()).toBeInTheDocument();

		expect(terraDraw.addFeatures).toHaveBeenCalledTimes(1);
		const addedFeatures = terraDraw.addFeatures.mock.calls[0][0];
		expect(addedFeatures).toHaveLength(1);

		// fixImportedGeoJSON should have mutated the feature: assigned a valid id,
		// defaulted properties.mode, and rounded the coordinates (only Polygon
		// geometries are rounded, so this Point's coordinates are untouched).
		expect(addedFeatures[0].id).toBeTruthy();
		expect(addedFeatures[0].properties.mode).toBe('polygon');
		expect(addedFeatures[0].geometry.coordinates).toEqual([0.123456789123, 51.987654321987]);
	});

	test('a valid .geojson drop parses the file and calls terraDraw.addFeatures', async () => {
		const { terraDraw, container } = setup();
		const dropZone = container.querySelector('[role="button"]')!;
		const file = makeGeoJSONFile(validFeatureCollection);

		dispatchDrop(dropZone, file);

		await expect.element(successHeading()).toBeInTheDocument();
		expect(terraDraw.addFeatures).toHaveBeenCalledTimes(1);
	});

	test('malformed JSON moves state to error, logs via console.error, and does not touch TerraDraw', async () => {
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		const { terraDraw, container } = setup();
		const input = getFileInput(container);
		const file = new File(['not valid json'], 'shape.geojson', { type: 'application/geo+json' });

		dispatchFileSelect(input, file);

		await expect
			.element(page.getByText('File upload error. Please check and try again.'))
			.toBeInTheDocument();

		expect(terraDraw.addFeatures).not.toHaveBeenCalled();
		expect(consoleError).toHaveBeenCalled();

		consoleError.mockRestore();
	});

	test('dragging a file over the drop zone sets and unsets the isDragging highlight class', async () => {
		const { container } = setup();
		const dropZone = container.querySelector('[role="button"]')!;
		const dropZoneLocator = page.getByRole('button', { name: 'GeoJSON file drop zone' });
		const highlightClass = '!bg-color-interactive-primary-muted-hover';

		await expect.element(dropZoneLocator).not.toHaveClass(highlightClass);

		dispatchDragEnter(dropZone, 1);
		await expect.element(dropZoneLocator).toHaveClass(highlightClass);

		dispatchDragLeave(dropZone);
		await expect.element(dropZoneLocator).not.toHaveClass(highlightClass);
	});

	test('dropping a file unsets the isDragging highlight class', async () => {
		const { container } = setup();
		const dropZone = container.querySelector('[role="button"]')!;
		const dropZoneLocator = page.getByRole('button', { name: 'GeoJSON file drop zone' });
		const highlightClass = '!bg-color-interactive-primary-muted-hover';

		dispatchDragEnter(dropZone, 1);
		await expect.element(dropZoneLocator).toHaveClass(highlightClass);

		dispatchDrop(dropZone, undefined);
		await expect.element(dropZoneLocator).not.toHaveClass(highlightClass);
	});

	test('pressing Enter while the drop zone is focused opens the file picker via inputRef.click()', async () => {
		const { container } = setup();
		const dropZone = container.querySelector('[role="button"]') as HTMLElement;
		const input = getFileInput(container);
		const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {});

		dropZone.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
		);

		expect(clickSpy).toHaveBeenCalledTimes(1);
	});

	test('pressing Space while the drop zone is focused opens the file picker via inputRef.click()', async () => {
		const { container } = setup();
		const dropZone = container.querySelector('[role="button"]') as HTMLElement;
		const input = getFileInput(container);
		const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {});

		dropZone.dispatchEvent(
			new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
		);

		expect(clickSpy).toHaveBeenCalledTimes(1);
	});

	test('clicking Cancel restores mapDraw.features.current from upload.previousFeatures and re-populates TerraDraw', async () => {
		const { terraDraw, mapDraw, container } = setup();
		mapDraw.features.current = [{ id: 'before-upload' }] as any;

		const input = getFileInput(container);
		const file = makeGeoJSONFile(validFeatureCollection);
		dispatchFileSelect(input, file);

		await expect.element(successHeading()).toBeInTheDocument();

		// Simulate some drift in features.current between upload and Cancel, to prove
		// that Cancel really does restore from the snapshot rather than being a no-op.
		mapDraw.features.current = [{ id: 'drifted' }] as any;

		const cancelButton = page.getByRole('button', { name: 'Cancel' });
		await cancelButton.click();

		expect(mapDraw.features.current).toEqual([{ id: 'before-upload' }]);
		expect(terraDraw.clear).toHaveBeenCalledTimes(1);
		expect(terraDraw.addFeatures).toHaveBeenLastCalledWith([{ id: 'before-upload' }]);
		expect(mapDraw.controlMode.current).toBe('edit');
	});

	test('"Add area" is disabled until state is "success", then calls onLoad (sets controlMode back to "edit") when clicked', async () => {
		const { mapDraw, container } = setup();

		const addAreaButton = page.getByRole('button', { name: 'Add area' });
		await expect.element(addAreaButton).toBeDisabled();

		const input = getFileInput(container);
		const file = makeGeoJSONFile(validFeatureCollection);
		dispatchFileSelect(input, file);

		await expect.element(successHeading()).toBeInTheDocument();
		await expect.element(addAreaButton).not.toBeDisabled();

		mapDraw.controlMode.current = 'upload';
		await addAreaButton.click();

		expect(mapDraw.controlMode.current).toBe('edit');
	});
});
