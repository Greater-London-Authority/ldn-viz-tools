export interface PairArrowCellProps {
  /**
   * The value to be encoded in the cell.
   */
  value: number;
  extent?: any; // used to pass automatically extracted val
  contextVals?: number[]; // value to be compared to
  /**
   * Color to be applied to bars corresponding to positive values.
   */
  positiveColor?: string;
  /**
   * Color to be applied to bars corresponding to negative values.
   */
  negativeColor?: string;
  /**
   * Width of cell (in pixels).
   */
  width?: number;

  [key: string]: any;
}