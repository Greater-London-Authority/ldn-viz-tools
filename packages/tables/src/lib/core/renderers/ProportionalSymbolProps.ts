export interface ProportionalSymbolProps {
  /**
   * The fill color of the proportional symbol.
   */
  color?: string;
  /**
   * The value to be encoded in the cell.
   */
  value: number;
  /**
   * If `true`, then the numerical value will be displayed as text beside the symbol.
   */
  showValues?: boolean;
  /**
   * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
   * which is based on Python 3’s format specification mini-language (PEP 3101)).
   */
  formatString?: string;
  /**
   * Array containing the min and max values in the data; used ad domain for scale.
   */
  extent: [number, number];

  [key: string]: any;
}