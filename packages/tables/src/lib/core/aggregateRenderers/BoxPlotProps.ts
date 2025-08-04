export interface BoxPlotProps {
  /**
   * Array of values to be displayed.
   */
  values: number[];
  extent: number[];
  showAllPoints?: boolean;
  /**
   * Width of cell (in pixels).
   */
  width?: number;

  [key: string]: any;
}