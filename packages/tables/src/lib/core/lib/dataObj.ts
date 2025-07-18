// This is a wrapper around the pure functions in dataFns.ts

import { filterData, getRows, getSortedRows, group, mergeData, sortGroups } from './dataFns';
import type {
	ColGroup,
	ColSpec,
	DataRow,
	Filter,
	Group,
	GroupOrderCriterion,
	LeafOrderCriterion,
	TableSpec
} from './types';

import { extent } from 'd3-array';
import { scaleBand } from 'd3-scale';

import { getCategoricalColorScale, getContinuousColorScale } from './scales';

import { axisRenderer, renderer } from '../renderers';

// TODO: convert data types?

export class TableData {
	data: DataRow[];
	rawData: DataRow[];
	groupingFields: string[];
	groupingOrderSpec: GroupOrderCriterion[];
	rowOrderSpec: LeafOrderCriterion[];
	filters: Filter[];

	onChangeFuncs: any[] = [];

	maxRowsPerGroup: number | undefined;

	columnSpec: ColSpec[];

	colGroups: ColGroup[];
	colGroupGap: number;

	// derived:
	extents: any; // TODO: FIXME
	scales;
	posScales;

	groups: Group[];
	rows: DataRow[];

	visibleFields: string[];

	expansionState: boolean[] = [];

	widths: {
		groupControl: string;
		groupLabel: string;
		groupSizeLabel: string;
		groupSizeBar: string;
		defaultCell: string;
	};

	constructor(tableSpec: TableSpec) {
		this.data = [];
		this.rawData = [];
		this.groupingFields = [];
		this.groupingOrderSpec = [];
		this.rowOrderSpec = [];
		this.filters = [];
		this.rows = [];
		this.colGroups = tableSpec.colGroups ?? [];
		this.colGroupGap = tableSpec.colGroupGap ?? 0;

		this.widths = {
			groupControl: '20px', // replaces GROUP_CONTROL_COLUMN_WIDTH
			groupLabel: '200px',
			groupSizeLabel: '40px',
			groupSizeBar: '50px',
			defaultCell: '100px' // replaces "DEFAULT_CELL_WIDTH
		};

		this.maxRowsPerGroup = tableSpec.maxRowsPerGroup;

		// TODO: allow setting of data, grouping, and ordering
		this.computeExtents();

		const unsortedGroups = group(this.data, this.groupingFields, this.maxRowsPerGroup);
		this.groups = sortGroups(unsortedGroups, this.data, this.groupingOrderSpec);
		this.rows = getRows(this.data, this.groups, this.filters);
	}

	// TODO: would probably be better to not mutate the spec, and instead to perform function look-up at time of use
	findRenderComponents(columnSpec: ColSpec[]) {
		for (const col of columnSpec) {
			// cell, column, group
			if (col.cell && typeof col.cell.renderer === 'string') {
				col.cell.renderer = renderer[col.cell.renderer];
			}
			if (col.column && typeof col.column.renderer === 'string') {
				col.column.renderer = renderer[col.column.renderer];
			}
			if (col.group && typeof col.group.renderer === 'string') {
				col.group.renderer = renderer[col.group.renderer];
			}
			if (col.cell && typeof col.cell.axisRenderer === 'string') {
				col.cell.axisRenderer = axisRenderer[col.cell.axisRenderer];
			}
			if (col.header && typeof col.header.renderer === 'string') {
				col.header.renderer = renderer[col.header.renderer];
			}
		}
	}

	setOnRowsChange(func) {
		this.onChangeFuncs.push(func);
	}

	notifyOfChanges() {
		for (const func of this.onChangeFuncs) {
			func(this.groups, this.rows);
		}
	}

	setMaxRowsForGroups(maxRows: number) {
		this.maxRowsPerGroup = maxRows;
		for (const group of this.groups) {
			group.maxRows = maxRows;
		}
	}

	setMaxRowsForGroup(group: Group, maxRows: number) {
		group.maxRows = maxRows;
	}

	setFilters(filters: Filter[]) {
		// TODO: set data from rawData
		this.filters = filters;
		const mergedData = mergeData(this.rawData, this.columnSpec);
		this.data = filterData(mergedData, this.filters);
		this.updateAfterDataOrFilterChange();
	}

	setData(rawData: DataRow[]) {
		this.rawData = rawData;
		const mergedData = mergeData(this.rawData, this.columnSpec);
		this.data = filterData(mergedData, this.filters);
		this.resetMergedValues();
		this.updateAfterDataOrFilterChange();
	}

	setMerged() {
		const mergedData = mergeData(this.rawData, this.columnSpec);
		this.data = filterData(mergedData, this.filters);
		this.updateAfterDataOrFilterChange();
	}

	updateAfterDataOrFilterChange() {
		this.computeExtents();
		this.constructScales();

		const unsortedGroups = group(this.data, this.groupingFields, this.maxRowsPerGroup);
		this.groups = sortGroups(unsortedGroups, this.data, this.groupingOrderSpec);

		this.rows = getRows(this.data, this.groups, this.filters);
		this.notifyOfChanges();
	}

	resetMergedValues() {
		if (!this.columnSpec) {
			return;
		}
		for (const col of this.columnSpec) {
			if (col.allowGrouping) {
				const vals = [...new Set(this.rawData.map((r) => r[col.short_label]))]; // TODO: think about data vs rawData
				col.groups = { ungrouped: vals, grouped: {} };
			}
		}
	}

	setGrouping(groupingFields: string[]) {
		this.groupingFields = groupingFields;

		const unsortedGroups = group(this.data, this.groupingFields, this.maxRowsPerGroup);
		this.groups = sortGroups(unsortedGroups, this.data, this.groupingOrderSpec);
		this.rows = getRows(this.data, this.groups, this.filters);
		this.notifyOfChanges();
	}

	setRowOrder(rowOrderSpec: LeafOrderCriterion[]) {
		this.rowOrderSpec = rowOrderSpec;
		this.rows = getRows(this.data, this.groups, this.filters);
		this.notifyOfChanges();
	}

	toggleGroupCollapsed(group: Group, adjustChildren = false) {
		group.isExpanded = !group.isExpanded;

		if (adjustChildren && !group.isExpanded) {
			for (const childGroup of group.childGroups) {
				childGroup.isExpanded = false;
			}
		}

		this.groups = this.groups; // eslint-disable-line
		this.notifyOfChanges();
	}

	setGroupOrdering(newOrdering: GroupOrderCriterion[]) {
		this.groupingOrderSpec = newOrdering;
		this.groups = sortGroups(this.groups, this.data, this.groupingOrderSpec);
		this.rows = getRows(this.data, this.groups, this.filters);

		this.notifyOfChanges();
		// TODO: need to apply getSortedRows
	}

	setVisibleFields(fields: string[]) {
		this.visibleFields = fields;
		this.notifyOfChanges();
	}

	setColumnSpec(columnSpec: ColSpec[]) {
		this.columnSpec = columnSpec;
		this.findRenderComponents(this.columnSpec);

		this.visibleFields = columnSpec.map((f) => f.short_label); // makes all fields visible: may not be desirable

		this.resetMergedValues();
		this.computeExtents();
		this.constructScales();
		this.notifyOfChanges();
	}

	openOrCloseLevel(level: number) {
		const isExpanded = !(this.expansionState[level] ?? true);
		this.expansionState[level] = isExpanded;

		const getGroupLevel = (name: string) => (name.match(new RegExp(' ∩ ', 'g')) || []).length;

		for (const group of this.groups) {
			const thisLevel = getGroupLevel(group.name);

			if (thisLevel === level) {
				group.isExpanded = isExpanded;
			}
		}

		this.groups = this.groups; // eslint-disable-line
		this.notifyOfChanges();
	}

	toggleSort(fieldName: string) {
		// TODO: implement

		if (this.rowOrderSpec.length === 0) {
			// not currently sorted
			this.rowOrderSpec = [{ field: fieldName, direction: 'descending' }];
		} else if (this.rowOrderSpec[0].field !== fieldName) {
			// currently sorted using a different field
			this.rowOrderSpec = [{ field: fieldName, direction: 'descending' }];
		} else {
			this.rowOrderSpec = [
				{
					field: fieldName,
					direction: this.rowOrderSpec[0].direction === 'ascending' ? 'descending' : 'ascending'
				}
			];
		}

		this.setRowOrder(this.rowOrderSpec); // TODO: FIXME this doesn't see to work

		this.rows = getRows(this.data, this.groups, this.filters);
		this.notifyOfChanges();
	}

	fetchGroupContents(group: Group) {
		return getSortedRows(
			group.order.slice(0, group.maxRows ?? group.order.length),
			this.data,
			this.rowOrderSpec
		);
	}

	constructScales() {
		this.scales = []; // color
		this.posScales = {}; // position
		if (!this.columnSpec) {
			return;
		}

		// TODO: construct scales for each column, based on type
		for (const colSpec of this.columnSpec) {
			const values = this.data.map((d) => d[colSpec.short_label]).filter((d) => d); // exclude nulls, or else values[0] may be null

			// TODO: switch based on recorded column types
			if (colSpec.type === 'categorical') {
				const uniqValues = [...new Set(values)].sort();
				this.posScales[colSpec.short_label] = scaleBand().range([0, 1]).domain(uniqValues);
			}

			if (typeof values[0] === 'string') {
				const uniqValues = [...new Set(values)];
				const scale = getCategoricalColorScale(uniqValues);
				this.scales[colSpec.short_label] = (val: string) =>
					val === undefined || val === null ? 'lightgrey' : scale(val);
			} else if (typeof values[0] === 'number') {
				const scale = getContinuousColorScale(colSpec.short_label, 'MinToMax', values as number[]); // TODO: pass actual domain type
				this.scales[colSpec.short_label] = (val: number) =>
					val === undefined || val === null ? 'lightgrey' : scale(val);
			} else if (values[0] instanceof Date) {
				// TODO: implement
			}

			if (this.scales[colSpec.short_label]) {
				// /    this.scales[colSpec.short_label] = (val) => (val === undefined) ? "lightgrey" : this.scales[colSpec.short_label](val);
			}
		}
	}

	computeExtents() {
		this.extents = {};

		if (!this.data[0]) {
			return;
		}

		// TODO: work with column definitions instead
		for (const colName of Object.keys(this.data[0])) {
			this.extents[colName] = extent(this.data.map((d) => d[colName]));
		}
	}

	getValsForGroup(group: Group, colName: string) {
		return getRows(this.data, [group], []).map((d) => d[colName]);
	}
}
