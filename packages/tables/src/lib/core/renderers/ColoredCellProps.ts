import type { ScaleThreshold } from 'd3-scale';

export interface ColoredCellProps {
  /**
   * The value to be encoded in the cell.
   */
  value: number;
  /**
   * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
   * which is based on Python 3’s format specification mini-language (PEP 3101)).
   * If set to a falsy value, then bars will not be labelled with a value.
   */
  formatString?: string;
  /**
   * A D3 color scale used to determine cell background color.
   */
  colorScale: ScaleThreshold<string | number, string> | (() => string);
}