export interface GoodOrBadProps {
  /**
   * The value to be encoded in the cell.
   */
  value: number | string;
  /**
   * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
   * which is based on Python 3’s format specification mini-language (PEP 3101)).
   */
  formatString?: string;
  /**
   * Value that the cell's value should be compared to.
   */
  benchmarkValue: number;
  /**
   * Name of benchmark to be included in message.
   */
  benchmarkLabel?: string;
  /**
   * Determines whether a "good" or desired value is greater or less than the benchmark value.
   */
  goodIs?: 'high' | 'low' | 'n/a';
  /**
   * If `true`, then display just an icon, with no message.
   */
  iconOnly?: boolean;

  [key: string]: any;
}