export interface TextCellWithUncertaintyProps {
  value: number | string;
  contextVals?: boolean[];
  alignText?: 'left' | 'right' | 'center' | undefined;
  formatString?: string | undefined;

  [key: string]: any;
}