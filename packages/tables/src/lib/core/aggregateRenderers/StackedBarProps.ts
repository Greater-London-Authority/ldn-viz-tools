export interface StackedBarProps {
  /**
   * Array of values to be displayed.
   */
  values: number[];
  /**
   * A D3 color scale used to determine bar color.
   */
  colorScale: (val: any) => string;
  /**
   * Width of cell (in pixels).
   */
  width?: number;

  [key: string]: any;
}