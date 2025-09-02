export interface BarDivergingCellProps {
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
   * Text size of labels (in pixels).
   */
  textSize?: number;
  /**
   * Color to be applied to bars corresponding to positive values.
   */
  positiveColor?: string;
  /**
   * Color to be applied to bars corresponding to negative values.
   */
  negativeColor?: string;
  extent?: any; // used to pass automatically extracted val
  /**
   * Width of cell (in pixels).
   */
  width?: number;

  [key: string]: any;
}