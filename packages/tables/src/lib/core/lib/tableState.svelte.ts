import { computeColumnWidths, type ColSpecWithWidth } from './computeWidths';
import { filterData, getGroupLevel, getRows, getSortedRows, group, mergeData, sortGroups } from './dataFns';
import { computeExtents } from './extents';
import { resolveAllColumnRenderers } from './rendererRegistry';
import { createColorScales, createPositionScales } from './scaleFactory';
import type {
	ColGroup,
	ColSpec,
	ColorScaleRecord,
	DataRow,
	ExtentRecord,
	Filter,
	Group,
	GroupOrderCriterion,
	LeafOrderCriterion,
	PositionScaleRecord,
	ResolvedColSpec,
	TableSpec,
	TableWidths
} from './types';

/** Convert a Map to a Record object */
function mapToRecord<V>(map: Map<string, V>): Record<string, V> {
	const record: Record<string, V> = {};
	for (const [key, value] of map) {
		record[key] = value;
	}
	return record;
}

/**
 * Reactive table state class
 *
 * Uses Svelte5 reactivity to manage table data, filtering, grouping, and sorting.
 */
export class TableState {
	// ========================================================================
	// Source State (writable)
	// ========================================================================

	private _rawData = $state<DataRow[]>([]);
	private _filters = $state<Filter[]>([]);
	private _groupingFields = $state<string[]>([]);
	private _rowOrderSpec = $state<LeafOrderCriterion[]>([]);
	private _groupingOrderSpec = $state<GroupOrderCriterion[]>([]);
	private _columnSpec = $state<ColSpec[]>([]);
	private _visibleFields = $state<string[]>([]);
	private _maxRowsPerGroup = $state<number | undefined>(undefined);
	private _levelExpansionState = $state<boolean[]>([]);

	// UI state for groups (expanded/collapsed) is stored separately, keyed by group name
	// This preserves state when groups are recomputed
	private _groupExpansion = $state<Map<string, boolean>>(new Map());
	private _groupMaxRows = $state<Map<string, number>>(new Map());

	// Table width for computing column widths
	private _tableWidth = $state<number | undefined>(undefined);

	// ========================================================================
	// Configuration (static after construction)
	// ========================================================================

	private _colGroups: ColGroup[];
	private _colGroupGap: number;
	private _widths: TableWidths;

	// ========================================================================
	// Derived State
	// ========================================================================

	// Column specs with computed widths (derived from columnSpec + tableWidth)
	private _columnsWithWidths = $derived.by(() => {
		if (this._tableWidth === undefined) {
			// No width set yet - return columns without computed widths
			return this._columnSpec as ColSpecWithWidth[];
		}
		return computeColumnWidths(
			this._columnSpec,
			this._colGroups,
			this._colGroupGap,
			this._tableWidth
		);
	});

	private _resolvedColumnSpec = $derived(resolveAllColumnRenderers(this._columnsWithWidths));
	private _mergedData = $derived(mergeData(this._rawData, this._columnSpec));
	private _filteredData = $derived(filterData(this._mergedData, this._filters));

	// Convert Maps to Records for backwards compatibility with bracket notation
	private _extents = $derived(mapToRecord(computeExtents(this._filteredData)));
	private _scales = $derived(mapToRecord(createColorScales(this._filteredData, this._columnSpec)));
	private _posScales = $derived(mapToRecord(createPositionScales(this._filteredData, this._columnSpec)));

	// _baseGroups do not include the expanded/collapsed UI state
	private _baseGroups = $derived.by(() => {
		const unsortedGroups = group(this._filteredData, this._groupingFields);
		return sortGroups(unsortedGroups, this._filteredData, this._groupingOrderSpec);
	});

	// Merge the UI state (expansion, maxRows) into groups
	private _computedGroups = $derived.by(() => {
		return this._baseGroups.map((g) => ({
			...g,
			isExpanded: this._groupExpansion.get(g.name) ?? true,
			maxRows: this._groupMaxRows.get(g.name) ?? this._maxRowsPerGroup
		}));
	});

	private _rows = $derived(getRows(this._filteredData, this._computedGroups, this._filters));

	// ========================================================================
	// Constructor
	// ========================================================================

	constructor(spec: TableSpec) {
		this._filters = spec.filters ?? [];
		this._rowOrderSpec = spec.rowOrderSpec ?? [];
		this._groupingOrderSpec = spec.groupOrderSpec ?? [];
		this._columnSpec = spec.columns ?? [];
		this._maxRowsPerGroup = spec.maxRowsPerGroup;

		this._colGroups = spec.colGroups ?? [];
		this._colGroupGap = spec.colGroupGap ?? 0;
		this._widths = {
			groupControl: '20px',
			groupLabel: '200px',
			groupSizeLabel: '40px',
			groupSizeBar: '50px',
			defaultCell: '100px'
		};
	}

	// ========================================================================
	// Public Getters and Setters
	// ========================================================================

	// Source state getters and setters
	get rawData(): readonly DataRow[] {
		return this._rawData;
	}
	set rawData(data: DataRow[]) {
		this._rawData = data;
	}

	get filters(): readonly Filter[] {
		return this._filters;
	}
	set filters(filters: Filter[]) {
		this._filters = filters;
	}

	get groupingFields(): readonly string[] {
		return this._groupingFields;
	}
	set groupingFields(fields: string[]) {
		this._groupingFields = fields;
	}

	get rowOrderSpec(): readonly LeafOrderCriterion[] {
		return this._rowOrderSpec;
	}
	set rowOrderSpec(order: LeafOrderCriterion[]) {
		this._rowOrderSpec = order;
	}

	get groupingOrderSpec(): readonly GroupOrderCriterion[] {
		return this._groupingOrderSpec;
	}
	set groupingOrderSpec(order: GroupOrderCriterion[]) {
		this._groupingOrderSpec = order;
	}

	get columnSpec(): readonly ColSpecWithWidth[] {
		return this._columnsWithWidths;
	}
	set columnSpec(cols: ColSpec[]) {
		this._columnSpec = cols;
		this._visibleFields = cols.map((f) => f.short_label);
	}

	get resolvedColumnSpec(): readonly ResolvedColSpec[] {
		return this._resolvedColumnSpec;
	}

	get tableWidth() {
		return this._tableWidth;
	}
	set tableWidth(width: number | undefined) {
		this._tableWidth = width;
	}

	get visibleFields(): readonly string[] {
		return this._visibleFields;
	}
	set visibleFields(fields: string[]) {
		this._visibleFields = fields;
	}

	get maxRowsPerGroup() {
		return this._maxRowsPerGroup;
	}
	set maxRowsPerGroup(maxRows: number | undefined) {
		this._maxRowsPerGroup = maxRows;
		// Clear per-group overrides so all groups use the new default
		this._groupMaxRows = new Map();
	}

	get expansionState(): readonly boolean[] {
		return this._levelExpansionState;
	}

	get groupExpansion(): ReadonlyMap<string, boolean> {
		return this._groupExpansion;
	}

	get groupMaxRows(): ReadonlyMap<string, number> {
		return this._groupMaxRows;
	}

	// Derived state getters
	get data(): readonly DataRow[] {
		return this._filteredData;
	}
	get groups(): readonly Group[] {
		return this._computedGroups;
	}
	get rows(): readonly DataRow[] {
		return this._rows;
	}
	get extents(): Readonly<ExtentRecord> {
		return this._extents;
	}
	get scales(): Readonly<ColorScaleRecord> {
		return this._scales;
	}
	get posScales(): Readonly<PositionScaleRecord> {
		return this._posScales;
	}

	// Configuration getters
	get colGroups(): readonly ColGroup[] {
		return this._colGroups;
	}
	get colGroupGap() {
		return this._colGroupGap;
	}
	get widths(): Readonly<TableWidths> {
		return this._widths;
	}

	// ========================================================================
	// Public Methods - these work with groups and sorting
	// ========================================================================

	toggleGroupCollapsed(targetGroup: Group, adjustChildren = false) {
		const newExpanded = !targetGroup.isExpanded;
		const newMap = new Map(this._groupExpansion);
		newMap.set(targetGroup.name, newExpanded);

		if (adjustChildren && !newExpanded) {
			for (const childGroup of targetGroup.childGroups) {
				newMap.set(childGroup.name, false);
			}
		}

		this._groupExpansion = newMap;
	}

	toggleSort(fieldName: string) {
		if (this._rowOrderSpec.length === 0) {
			this._rowOrderSpec = [{ field: fieldName, direction: 'descending' }];
		} else if (this._rowOrderSpec[0].field !== fieldName) {
			this._rowOrderSpec = [{ field: fieldName, direction: 'descending' }];
		} else {
			this._rowOrderSpec = [
				{
					field: fieldName,
					direction: this._rowOrderSpec[0].direction === 'ascending' ? 'descending' : 'ascending'
				}
			];
		}
	}

	openOrCloseLevel(level: number) {
		const isExpanded = !(this._levelExpansionState[level] ?? true);
		
		// Grow array if needed, defaulting new levels to expanded (true)
		const newState = [...this._levelExpansionState];
		while (newState.length <= level) {
			newState.push(true);
		}
		newState[level] = isExpanded;
		this._levelExpansionState = newState;
		

		const newMap = new Map(this._groupExpansion);
		for (const g of this._baseGroups) {
			const thisLevel = getGroupLevel(g.name);
			if (thisLevel === level) {
				newMap.set(g.name, isExpanded);
			}
		}

		this._groupExpansion = newMap;
	}

	fetchGroupContents(targetGroup: Group): DataRow[] {
		return getSortedRows(
			targetGroup.order.slice(0, targetGroup.maxRows ?? targetGroup.order.length),
			this._filteredData,
			this._rowOrderSpec
		);
	}

	getValsForGroup(targetGroup: Group, colName: string): unknown[] {
		return getRows(this._filteredData, [targetGroup], []).map((d) => d[colName]);
	}

}
