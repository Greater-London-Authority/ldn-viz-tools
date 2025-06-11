import { APCAcontrast, sRGBtoY } from 'apca-w3';
import { colorParsley } from 'colorparsley'; // optional string parsing

/**
 * Return the text color with the greatest color from the background color, as judged by the
 * Accessible Perceptual Contrast Algorithm specified in WCAG3.
 *
 */
export const colorWithBestContrast = (
	backgroundColor: string,
	textColorOne: string,
	textColorTwo: string
) => {
	const contrastOne = APCAcontrast(
		sRGBtoY(colorParsley(textColorOne)),
		sRGBtoY(colorParsley(backgroundColor))
	);
	const contrastTwo = APCAcontrast(
		sRGBtoY(colorParsley(textColorTwo)),
		sRGBtoY(colorParsley(backgroundColor))
	);

	return Math.abs(contrastOne) > Math.abs(contrastTwo) ? textColorOne : textColorTwo;
};
