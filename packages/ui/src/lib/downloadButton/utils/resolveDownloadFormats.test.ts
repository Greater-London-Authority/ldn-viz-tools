import { describe, expect, it } from 'vitest';
import { resolveDownloadFormats } from './resolveDownloadFormats';

describe('resolveDownloadFormats', () => {
	it('offers every format when an option is true', () => {
		expect(resolveDownloadFormats({ dataDownload: true, imageDownload: true })).toEqual({
			dataFormats: ['CSV', 'JSON'],
			imageFormats: ['PNG', 'SVG'],
			hasDownload: true
		});
	});

	it('offers only the listed formats when an option is an array', () => {
		expect(resolveDownloadFormats({ dataDownload: ['JSON'], imageDownload: ['SVG'] })).toEqual({
			dataFormats: ['JSON'],
			imageFormats: ['SVG'],
			hasDownload: true
		});
	});

	it('offers no formats when an option is false or undefined', () => {
		expect(resolveDownloadFormats({ dataDownload: false, imageDownload: undefined })).toEqual({
			dataFormats: [],
			imageFormats: [],
			hasDownload: false
		});
	});

	it('offers no data formats when hasData is false', () => {
		const result = resolveDownloadFormats({
			dataDownload: true,
			imageDownload: false,
			hasData: false
		});
		expect(result.dataFormats).toEqual([]);
		expect(result.hasDownload).toBe(false);
	});

	it('offers no image formats when hasImage is false', () => {
		const result = resolveDownloadFormats({
			dataDownload: ['CSV'],
			imageDownload: true,
			hasImage: false
		});
		expect(result.imageFormats).toEqual([]);
		expect(result.hasDownload).toBe(true);
	});

	it('treats an empty array as no formats', () => {
		expect(resolveDownloadFormats({ dataDownload: [], imageDownload: [] }).hasDownload).toBe(false);
	});
});
