export interface PairArrowAxisProps {
  /**
   * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
   * which is based on Python 3’s format specification mini-language (PEP 3101)).
   * If set to a falsy value, then bars will not be labelled with a value.
   */
  formatString?: string;
  extent?: any; // used to pass automatically extracted val
  /**
   * Width of cell (in pixels).
   */
  width?: number;
  numTicks?: number;
  textSize?: number;

  [key: string]: any;
}