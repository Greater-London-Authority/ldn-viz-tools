import type { Component } from 'svelte';
import type { ScaleBand, ScaleThreshold, ScaleOrdinal } from 'd3-scale';

// ============================================================================
// Core Data Types
// ============================================================================

export type DataRow = Record<string, string | number | Date | null | undefined>;

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

// ============================================================================
// Filter Types
// ============================================================================

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

// ============================================================================
// Sorting & Aggregation Types
// ============================================================================

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

// ============================================================================
// Column Types
// ============================================================================

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
		ungrouped: unknown[];
		grouped: Record<string, unknown[]>;
	};

	width?: number | string;
	relativeWidth?: number;
	computedWidth?: number;
	href?: string;

	cell?: {
		renderer?: string | Component;
		axisRenderer?: string | Component;
		contextFields?: string[];
		[other: string]: unknown;
	};

	group?: {
		renderer?: string | Component;
		[other: string]: unknown;
	};

	column?: {
		renderer?: string | Component;
		[other: string]: unknown;
	};

	header?: {
		renderer?: string | Component;
		[other: string]: unknown;
	};
};

// Resolved column spec with renderer components (not strings)
export type ResolvedColSpec = Omit<ColSpec, 'cell' | 'group' | 'column' | 'header'> & {
	cell?: {
		renderer?: Component;
		axisRenderer?: Component;
		contextFields?: string[];
		[other: string]: unknown;
	};
	group?: {
		renderer?: Component;
		[other: string]: unknown;
	};
	column?: {
		renderer?: Component;
		[other: string]: unknown;
	};
	header?: {
		renderer?: Component;
		[other: string]: unknown;
	};
};

// ============================================================================
// Table Specification
// ============================================================================

export type TableSpec = {
	columns: ColSpec[];

	colGroups?: ColGroup[];
	colGroupGap?: number;

	groups?: Group[];
	maxRowsPerGroup?: number;

	rowOrderSpec?: LeafOrderCriterion[];
	groupOrderSpec?: GroupOrderCriterion[];
	filters?: Filter[];

	showHeaderTopRule?: boolean;
	showTableHeader?: boolean;
};

// ============================================================================
// Scale Types
// ============================================================================

export type NumericExtent = [number, number];
export type DateExtent = [Date, Date];
export type StringExtent = [string, string];
export type Extent = NumericExtent | DateExtent | StringExtent | [undefined, undefined];

// Map-based (new style)
export type ExtentMap = Map<string, Extent>;

export type CategoricalColorScale = ScaleOrdinal<string, string>;
export type ContinuousColorScale = ScaleThreshold<number, string>;
export type ColorScaleFn = (value: unknown) => string;
export type ColorScaleMap = Map<string, ColorScaleFn>;

export type PositionScale = ScaleBand<string>;
export type PositionScaleMap = Map<string, PositionScale>;

// Object-based (legacy style, for backwards compatibility)
export type ExtentRecord = Record<string, Extent>;
export type ColorScaleRecord = Record<string, ColorScaleFn>;
export type PositionScaleRecord = Record<string, PositionScale>;

// ============================================================================
// Table State Interface
// ============================================================================

export type TableWidths = {
	groupControl: string;
	groupLabel: string;
	groupSizeLabel: string;
	groupSizeBar: string;
	defaultCell: string;
};
