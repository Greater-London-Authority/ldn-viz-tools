import type { Component } from 'svelte';

export type DataRow = Record<string, string | number>;

export type Group = {
	name: string;
	color: string | undefined;
	order: number[];
	parentGroup: Group | undefined;
	childGroups: Group[];

	maxRows: number | undefined;
	isExpanded: boolean;
};

export type ColGroup = {
	label: string;
	startCol: number;
	endCol: number;
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

export type SortDirection = 'ascending' | 'descending' | undefined;
export type Aggregation = 'min' | 'mean' | 'median' | 'max' | 'q1' | 'q3' | 'count';

export type LeafOrderCriterion = {
	field: string;
	direction: SortDirection;
};

export type GroupOrderCriterion = {
	field: string;
	direction: SortDirection;
	aggregation: Aggregation;
};

export type ColumnType =
	| 'string' // like categorical type, but likely to be unique
	| 'number'
	| 'categorical'
	| 'ordinal' // like categorical, but values are mapped to number so ordered
	| 'hierachical'
	| 'date';

export type ColorScale = {
	breaks: number[];
	colors: string[];
	labels: string[];
	extendedBreaks: number[];
};

export type ColSpec = {
	label: string;
	short_label: string;
	type?: ColumnType;

	allowGrouping?: boolean;
	sortable?: boolean;
	alignHeader?: 'left' | 'right' | 'center';
	superscriptText?: string;
	hintText?: string;
	hintComponent?: Component;
	hintType?: 'tooltip' | 'popover' | 'modal';

	groups?: {
		ungrouped: any[];
		grouped: Record<string, any[]>;
	};

	computedWidth?: number;
	href?: string;

	cell?: {
		renderer?: string | Component;
		axisRenderer?: string | Component;
		contextFields?: string[];
		[other: string]: any;
	};

	group?: {
		renderer?: string | Component;
		[other: string]: any;
	};

	column?: {
		renderer?: string | Component;
		[other: string]: any;
	};

	header?: {
		renderer?: string | Component;
		[other: string]: any;
	};
};

// TODO: check
export type TableSpec = {
	columns: ColSpec[];

	colGroups?: ColGroup[];
	colGroupGap?: number;

	//data: DataRow;
	groups?: Group[];
	maxRowsPerGroup?: number;

	rowOrderSpec?: LeafOrderCriterion[];
	groupOrderSpec?: GroupOrderCriterion[];
	filters?: Filter[];

	showHeaderTopRule?: boolean;
};
