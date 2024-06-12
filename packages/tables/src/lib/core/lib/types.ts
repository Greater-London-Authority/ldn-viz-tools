export type DataRow = Record<string, string | number>[];
export type Group = {
	name: string;
	color: string | undefined;
	order: number[];
	parentGroup: Group | undefined;
	childGroups: Group[];

	maxRows: number | undefined;
	isExpanded: boolean;
};

export type Filter =
	| { type: 'contains'; field: string; value: string }
	| { type: 'isDefined'; field: string }
	| { type: 'equals'; field: string; value: string | number }
	| { type: 'isOneOf'; field: string; value: string[] | number[] }
	| { type: 'lt'; field: string; value: number }
	| { type: 'lte'; field: string; value: number }
	| { type: 'gt'; field: string; value: number }
	| { type: 'gte'; field: string; value: number }
	| { type: 'range'; field: string; value: number; val2: number };

export type LeafOrderCriterion = {
	field: 'string';
	direction: 'ascending' | 'descending' | undefined;
};

export type GroupOrderCriterion = {
	field: 'string';
	direction: 'ascending' | 'descending' | undefined;
	aggregation: 'min' | 'mean' | 'median' | 'max' | 'q1' | 'q3';
};

export type ColumnType =
	| 'String' // like categorical type, but likely to be unique
	| 'Number'
	| 'Categorical'
	| 'Ordinal' // like categorical, but values are mapped to number so ordered
	| 'Hierachical'
	| 'Date';


export type ColorScale = {
	breaks: number[];
	colors: string[];
	labels: string[];
	extendedBreaks: number[];
};

