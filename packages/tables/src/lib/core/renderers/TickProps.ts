export interface TickProps {
  /**
   * Color of the tick, in any CSS format (color name, hex-string, `rgb()` notation, etc.).
   */
  color?: string;
  /**
   * If `true`, then the numerical value will be displayed as text beside the symbol.
   */
  showValues?: boolean;
  /**
   * The value to be encoded in the cell.
   */
  value: number;
  /**
   * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
   * which is based on Python 3’s format specification mini-language (PEP 3101)).
   */
  formatString?: string;
  extent: [number, number];

  [key: string]: any;
}