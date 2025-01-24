import { color, type RGBColor } from 'd3-color';

export const convertColorToHex = (rgbString: string) => {
  const c = (color(rgbString) ?? { r: 128, g: 128, b: 128 }) as RGBColor;
  return [c.r, c.g, c.b];
};
