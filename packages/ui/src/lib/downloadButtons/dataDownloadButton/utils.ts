/**
 * Utility functions for data downloading functionality.
 * These are shared between DataDownloadButton and DownloadButton components.
 */

import { csvFormat } from 'd3-dsv';

/**
 * Ensures a filename has the specified extension.
 *
 * @param name - The filename to check
 * @param extension - The extension to ensure (including the dot, e.g., '.json')
 * @returns The filename with the extension
 */
export const enforceExtension = (name: string, extension: string): string => {
	return name.toLocaleLowerCase().endsWith(extension) ? name : `${name}${extension}`;
};

/**
 * Triggers a download from a data URL with a specified filename.
 *
 * @param url - The data URL to download
 * @param name - The filename to give the downloaded file
 */
export const downloadFromURL = (url: string, name: string): void => {
	const link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('target', '_blank');
	link.setAttribute('download', name);
	link.dispatchEvent(new MouseEvent('click'));
	link.remove();
};

/**
 * Renames columns in a dataset based on a column mapping.
 *
 * @param data - The data array or undefined
 * @param dataFn - Optional function that returns data (used instead of `data` argument)
 * @param columnMapping - Optional mapping of old column names to new column names
 * @returns Promise resolving to the data with renamed columns
 */
export const renameColumns = async (
	data: Record<string, number | string>[] | undefined,
	dataFn: undefined | (() => any[]) | (() => Promise<any[]>),
	columnMapping: undefined | { [oldName: string]: string }
): Promise<Record<string, number | string>[]> => {
	const dataToSave = dataFn ? await Promise.resolve(dataFn()) : data;

	return dataToSave!.map((datum) => {
		if (!columnMapping) {
			return datum;
		} else {
			const reshapedDatum: { [newName: string]: string | number } = {};

			for (const oldColName of Object.keys(columnMapping)) {
				reshapedDatum[columnMapping[oldColName]] = datum[oldColName];
			}
			return reshapedDatum;
		}
	});
};

/**
 * Downloads data as a JSON file.
 *
 * @param data - The data array or undefined
 * @param dataFn - Optional function that returns data (used instead of `data` argument)
 * @param columnMapping - Optional mapping of old column names to new column names
 * @param filename - The filename to use (without extension)
 */
export const downloadJSON = async (
	data: Record<string, number | string>[] | undefined,
	dataFn: undefined | (() => any[]) | (() => Promise<any[]>),
	columnMapping: undefined | { [oldName: string]: string },
	filename: string
): Promise<void> => {
	const renamedData = await renameColumns(data, dataFn, columnMapping);
	const dataString = JSON.stringify(renamedData, null, 4);
	const dataURL = 'data:application/json;base64,' + window.btoa(dataString);
	downloadFromURL(dataURL, enforceExtension(filename || 'data', '.json'));
};

/**
 * Downloads data as a CSV file.
 *
 * @param data - The data array or undefined
 * @param dataFn - Optional function that returns data (used instead of `data` argument)
 * @param columnMapping - Optional mapping of old column names to new column names
 * @param filename - The filename to use (without extension)
 */
export const downloadCSV = async (
	data: Record<string, number | string>[] | undefined,
	dataFn: undefined | (() => any[]) | (() => Promise<any[]>),
	columnMapping: undefined | { [oldName: string]: string },
	filename: string
): Promise<void> => {
	const renamedData = await renameColumns(data, dataFn, columnMapping);
	const dataString = csvFormat(renamedData);
	const dataURL = 'data:application/csv;base64,' + window.btoa(dataString);
	downloadFromURL(dataURL, enforceExtension(filename || 'data', '.csv'));
};
