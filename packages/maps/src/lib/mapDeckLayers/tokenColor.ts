import type { Color } from '@deck.gl/core';
import { theme } from '@ldn-viz/ui';

/**
 * Resolves a color token (e.g. `'data.primary'`) for the current theme mode as a deck.gl color,
 * optionally with an alpha value (0-255).
 */
export const tokenColor = (tokenName: string, alpha?: number): Color => {
	const [r, g, b] = theme.colorTokenNameToRGBArray(tokenName);
	return alpha === undefined ? [r, g, b] : [r, g, b, alpha];
};
