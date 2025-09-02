export interface HistogramProps {
  /**
   * Array of values to be displayed.
   */
  values: number[];
  extent?: any;
  /**
   * Color of bars.
   */
  color?: string;
  /**
   * Width of cell (in pixels).
   */
  width?: number;

  [key: string]: any;
}