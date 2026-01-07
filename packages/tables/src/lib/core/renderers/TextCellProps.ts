export interface TextCellProps {
	value: number | string;
	alignText?: 'left' | 'right' | 'center' | undefined;
	fontWeight?: string | ((value: number | string) => string);
	visibility?: string | ((value: number | string) => string);
	formatString?: string | undefined;

	[key: string]: any;
}
