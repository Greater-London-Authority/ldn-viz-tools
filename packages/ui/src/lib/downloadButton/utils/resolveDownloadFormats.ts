/**
 * Converts the `dataDownload` and `imageDownload` props of a container (such as `ChartContainer`
 * or `TableContainer`) into the format lists that `DownloadButton` takes.
 */

export type DataFormat = 'CSV' | 'JSON';
export type ImageFormat = 'PNG' | 'SVG';

/** `true` offers every format, `false` offers none, and an array offers the formats it lists. */
export type DataDownloadOption = boolean | DataFormat[];
/** `true` offers every format, `false` offers none, and an array offers the formats it lists. */
export type ImageDownloadOption = boolean | ImageFormat[];

export const allDataFormats: DataFormat[] = ['CSV', 'JSON'];
export const allImageFormats: ImageFormat[] = ['PNG', 'SVG'];

const toFormats = <F>(option: boolean | F[] | undefined, all: F[]): F[] =>
	option === true ? [...all] : Array.isArray(option) ? option : [];

/**
 * Returns the data and image formats to pass to `DownloadButton`.
 *
 * The data formats are empty when `hasData` is `false`, and the image formats are empty when
 * `hasImage` is `false`. `hasDownload` is `true` when either list has a format, so the container
 * can leave out the button when there is nothing to download.
 */
export const resolveDownloadFormats = ({
	dataDownload,
	imageDownload,
	hasData = true,
	hasImage = true
}: {
	dataDownload?: DataDownloadOption;
	imageDownload?: ImageDownloadOption;
	hasData?: boolean;
	hasImage?: boolean;
}) => {
	const dataFormats = hasData ? toFormats(dataDownload, allDataFormats) : [];
	const imageFormats = hasImage ? toFormats(imageDownload, allImageFormats) : [];
	return {
		dataFormats,
		imageFormats,
		hasDownload: dataFormats.length > 0 || imageFormats.length > 0
	};
};
