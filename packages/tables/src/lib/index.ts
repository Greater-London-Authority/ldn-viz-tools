export { default as Table } from './table/Table.svelte';

export { TableState } from './core/lib/tableState.svelte';

export {
	filterData,
	getRows,
	getSortedRows,
	group,
	mergeData,
	sortGroups
} from './core/lib/dataFns';

export {
	createColorScales,
	createCategoricalColorScale,
	createContinuousColorScale,
	createPositionScales
} from './core/lib/scaleFactory';

export { computeExtents, computeColumnExtent, computeExtentsForColumns } from './core/lib/extents';

export {
	resolveRenderer,
	resolveAxisRenderer,
	resolveColumnRenderers,
	resolveAllColumnRenderers
} from './core/lib/rendererRegistry';

export type {
	DataRow,
	Group,
	ColGroup,
	Filter,
	SortDirection,
	Aggregation,
	LeafOrderCriterion,
	GroupOrderCriterion,
	ColumnType,
	ColorScale,
	ColSpec,
	ResolvedColSpec,
	TableSpec,
	Extent,
	ExtentMap,
	ExtentRecord,
	ColorScaleMap,
	ColorScaleRecord,
	PositionScaleMap,
	PositionScaleRecord,
	TableWidths
} from './core/lib/types';
