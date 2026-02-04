import { filterData, getRows, getSortedRows, group, mergeData, sortGroups } from './dataFns';
import { computeExtents } from './extents';
import { createColorScales, createPositionScales } from './scaleFactory';
import { resolveAllColumnRenderers } from './rendererRegistry';
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
	TableSpec,
	TableWidths
} from './types';

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
	private _expansionState = $state<boolean[]>([]);

	// Version counter for triggering reactivity on group expansion mutations
	private _groupsVersion = $state(0);

	// Legacy change listeners
	private _onChangeFuncs: Array<(groups: Group[], rows: DataRow[]) => void> = [];

	// ========================================================================
	// Configuration (static after construction)
	// ========================================================================

	private _colGroups: ColGroup[];
	private _colGroupGap: number;
	private _widths: TableWidths;

	// ========================================================================
	// Derived State
	// ========================================================================

	private _resolvedColumnSpec = $derived(resolveAllColumnRenderers(this._columnSpec));
	private _mergedData = $derived(mergeData(this._rawData, this._columnSpec));
	private _filteredData = $derived(filterData(this._mergedData, this._filters));

	// Convert Maps to Records for backwards compatibility with bracket notation
	private _extentsMap = $derived(computeExtents(this._filteredData));
	private _extents = $derived.by(() => {
		const record: ExtentRecord = {};
		for (const [key, value] of this._extentsMap) {
			record[key] = value;
		}
		return record;
	});

	private _scalesMap = $derived(createColorScales(this._filteredData, this._columnSpec));
	private _scales = $derived.by(() => {
		const record: ColorScaleRecord = {};
		for (const [key, value] of this._scalesMap) {
			record[key] = value;
		}
		return record;
	});

	private _posScalesMap = $derived(createPositionScales(this._filteredData, this._columnSpec));
	private _posScales = $derived.by(() => {
		const record: PositionScaleRecord = {};
		for (const [key, value] of this._posScalesMap) {
			record[key] = value;
		}
		return record;
	});

	// Groups computation with version tracking for expansion changes
	private _computedGroups = $derived.by(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		this._groupsVersion; // Depend on version for reactivity on expansion changes

		const unsortedGroups = group(this._filteredData, this._groupingFields, this._maxRowsPerGroup);
		return sortGroups(unsortedGroups, this._filteredData, this._groupingOrderSpec);
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
	// Helper Functions
	// ========================================================================

	private notifyChanges() {
		for (const func of this._onChangeFuncs) {
			func(this._computedGroups, this._rows);
		}
	}

	private getGroupLevel(name: string): number {
		return (name.match(new RegExp(' ∩ ', 'g')) || []).length;
	}

	// ========================================================================
	// Public Getters and Setters
	// ========================================================================

	// Source state getters
	get rawData() {
		return this._rawData;
	}
	get filters() {
		return this._filters;
	}
	get groupingFields() {
		return this._groupingFields;
	}
	get rowOrderSpec() {
		return this._rowOrderSpec;
	}
	get groupingOrderSpec() {
		return this._groupingOrderSpec;
	}
	get columnSpec() {
		return this._columnSpec;
	}
	set columnSpec(cols: ColSpec[]) {
		this._columnSpec = cols;
	}
	get resolvedColumnSpec() {
		return this._resolvedColumnSpec;
	}
	get visibleFields() {
		return this._visibleFields;
	}
	set visibleFields(fields: string[]) {
		this._visibleFields = fields;
	}
	get maxRowsPerGroup() {
		return this._maxRowsPerGroup;
	}
	get expansionState() {
		return this._expansionState;
	}

	// Derived state getters
	get data() {
		return this._filteredData;
	}
	get groups() {
		return this._computedGroups;
	}
	get rows() {
		return this._rows;
	}
	get extents() {
		return this._extents;
	}
	get scales() {
		return this._scales;
	}
	get posScales() {
		return this._posScales;
	}

	// Configuration getters
	get colGroups() {
		return this._colGroups;
	}
	get colGroupGap() {
		return this._colGroupGap;
	}
	get widths() {
		return this._widths;
	}

	// ========================================================================
	// Public Methods - Setters
	// ========================================================================

	setData(data: DataRow[]) {
		this._rawData = data;
		this.notifyChanges();
	}

	setFilters(filters: Filter[]) {
		this._filters = filters;
		this.notifyChanges();
	}

	setGrouping(fields: string[]) {
		this._groupingFields = fields;
		this.notifyChanges();
	}

	setRowOrder(order: LeafOrderCriterion[]) {
		this._rowOrderSpec = order;
		this.notifyChanges();
	}

	setGroupOrdering(order: GroupOrderCriterion[]) {
		this._groupingOrderSpec = order;
		this.notifyChanges();
	}

	setColumnSpec(columns: ColSpec[]) {
		this._columnSpec = columns;
		this._visibleFields = columns.map((f) => f.short_label);
		this.notifyChanges();
	}

	setVisibleFields(fields: string[]) {
		this._visibleFields = fields;
		this.notifyChanges();
	}

	setMaxRowsForGroups(maxRows: number) {
		this._maxRowsPerGroup = maxRows;
		for (const g of this._computedGroups) {
			g.maxRows = maxRows;
		}
		this._groupsVersion++;
		this.notifyChanges();
	}

	setMaxRowsForGroup(targetGroup: Group, maxRows: number) {
		targetGroup.maxRows = maxRows;
		this._groupsVersion++;
		this.notifyChanges();
	}

	setMerged() {
		// Trigger re-merge by updating version
		this._groupsVersion++;
		this.notifyChanges();
	}

	// ========================================================================
	// Public Methods - Actions
	// ========================================================================

	toggleGroupCollapsed(targetGroup: Group, adjustChildren = false) {
		targetGroup.isExpanded = !targetGroup.isExpanded;

		if (adjustChildren && !targetGroup.isExpanded) {
			for (const childGroup of targetGroup.childGroups) {
				childGroup.isExpanded = false;
			}
		}

		this._groupsVersion++;
		this.notifyChanges();
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
		this.notifyChanges();
	}

	openOrCloseLevel(level: number) {
		const isExpanded = !(this._expansionState[level] ?? true);
		this._expansionState[level] = isExpanded;

		for (const g of this._computedGroups) {
			const thisLevel = this.getGroupLevel(g.name);
			if (thisLevel === level) {
				g.isExpanded = isExpanded;
			}
		}

		this._groupsVersion++;
		this.notifyChanges();
	}

	// ========================================================================
	// Public Methods - Queries
	// ========================================================================

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

	// ========================================================================
	// Legacy Compatibility
	// ========================================================================

	setOnRowsChange(func: (groups: Group[], rows: DataRow[]) => void) {
		this._onChangeFuncs.push(func);
	}
}
