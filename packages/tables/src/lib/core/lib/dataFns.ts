import { max, mean, median, min, quantile } from 'd3-array';
import type { DataFns, Filter, Group, GroupOrderCriterion, LeafOrderCriterion } from './types';

// raw data is a list of data rows

// Operations:
// - group by field
// - apply ordering to groups
// - apply ordering within groups
// - get list of sorted data

// When we apply groupings,
// want structure like:

// Pure functions

// [ ] Apply an ordering to groups

// [ ] Apply an ordering to leaves

// [ ] Expand all
// [ ] Collapse all
// [ ] Toggle expansion fo single

// Keep track of filters

// sorting groups:
// - ascending/descending for categorical values
// - max/median/mean/min/25% quartile/75% quartile

function getMemberIds(group: Group, groups: Group[]): number[] {
	// each group has either an order or a list of childGroups
	if (group.order && group.order.length > 0) {
		return group.order;
	}

	const members = [];
	for (const g of group.childGroups) {
		members.push(...getMemberIds(g, groups));
	}
	return members;
}

function getValuesForField(criterion: GroupOrderCriterion, groups: Group[], data) {
	const aggregatedVals: Record<string, number> = {};

	for (const group of groups) {
		const values = getMemberIds(group, groups).map((ind) => data[ind][criterion.field]);

		let aggregate: number = 0;
		if (criterion.aggregation === 'min') {
			aggregate = min(values);
		} else if (criterion.aggregation === 'max') {
			aggregate = max(values);
		} else if (criterion.aggregation === 'median') {
			aggregate = median(values);
		} else if (criterion.aggregation === 'mean') {
			aggregate = mean(values);
		} else if (criterion.aggregation === 'q1') {
			aggregate = quantile(values, 0.25);
		} else if (criterion.aggregation === 'q3') {
			aggregate = quantile(values, 0.75);
		} else if (criterion.aggregation === 'count') {
			aggregate = values.length;
		}

		aggregatedVals[group.name] = aggregate;
	}

	//    console.log(aggregatedVals)
	return aggregatedVals;
}

// TODO: choosing ordering for categorical variables

export function getSortedRows(indexes: number[], data, orderingCriteria: LeafOrderCriterion[]) {
	const compareFn = (a, b) => compareRows(a, b, orderingCriteria, data);
	return indexes.map((ind) => data[ind]).sort(compareFn);
}

function compareRows(a, b, orderingCriteria: LeafOrderCriterion[]) {
	for (let i = 0; i < orderingCriteria.length; i++) {
		const criterion = orderingCriteria[i];
		const valA = a[criterion.field];
		const valB = b[criterion.field];

		if (valA < valB) {
			return criterion.direction === 'descending' ? +1 : -1;
		} else if (valA > valB) {
			return criterion.direction === 'descending' ? -1 : +1;
		}
	}

	return 0;
}

function compareGroups(
	a: Group,
	b: Group,
	orderingCriteria: GroupOrderCriterion[],
	aggregatedVals
) {
	for (let i = 0; i < orderingCriteria.length; i++) {
		const criterion = orderingCriteria[i];
		const valA = aggregatedVals[i][a.name];
		const valB = aggregatedVals[i][b.name];

		if (valA < valB) {
			return criterion.direction === 'descending' ? +1 : -1;
		} else if (valA > valB) {
			return criterion.direction === 'descending' ? -1 : +1;
		}
	}

	return 0;
}

function sortAndFlattenChildren(group: Group, aggregatedVals, orderingCriteria): Group[] {
	if (!group.childGroups || group.childGroups.length === 0) {
		return [group];
	} else {
		const compareFn = (a: Group, b: Group) => compareGroups(a, b, orderingCriteria, aggregatedVals);
		const sortedChildren = group.childGroups.sort(compareFn);

		const flattened = [];
		if (group.childGroups && group.childGroups.length > 0) {
			flattened.push(group);
		}

		for (const child of sortedChildren) {
			flattened.push(...sortAndFlattenChildren(child, aggregatedVals, orderingCriteria));
		}
		return flattened;
	}
}

export function sortGroups(groups: Group[], data, orderingCriteria: GroupOrderCriterion[]) {
	// first, compute the required metrics for each group
	const aggregatedVals = [];
	for (const criterion of orderingCriteria) {
		aggregatedVals.push(getValuesForField(criterion, groups, data));
	}

	// then do the sort
	// first sort the top-level nodes

	const compareFn = (a: Group, b: Group) => compareGroups(a, b, orderingCriteria, aggregatedVals);

	const topLevelGroups = groups.filter((g) => !g.parentGroup);

	topLevelGroups.sort(compareFn);

	const flattenedOrderedGroups = [];
	for (const g of topLevelGroups) {
		flattenedOrderedGroups.push(...sortAndFlattenChildren(g, aggregatedVals, orderingCriteria));
	}
	return flattenedOrderedGroups;

	// then sort its children, recursively
}

// sorting values: ascending/descending

// List out data in order
// [ ] only show top n for each section

const doFiltersApply = (row: any, filters: Filter[]) => {
	// handle undefined
	for (const filter of filters) {
		if (filter.type === 'isDefined' && typeof row[filter.field] === 'undefined') {
			return false;
		} else if (typeof row[filter.field] === 'undefined') {
			return false; // other check would throw an error
		} else if (filter.type === 'isOneOf') {
			let valueIsValid = false;
			for (const val of filter.value) {
				if (row[filter.value] === val) {
					valueIsValid = true;
				}
			}

			if (!valueIsValid) {
				return false;
			}
		} else if (filter.type === 'contains' && !row[filter.field].includes(filter.value)) {
			return false;
		} else if (filter.type === 'equals' && row[filter.field] != filter.value) {
			return false;
		} else if (filter.type === 'lt' && row[filter.field] >= filter.value) {
			return false;
		} else if (filter.type === 'lte' && row[filter.field] > filter.value) {
			return false;
		} else if (filter.type === 'gt' && row[filter.field] <= filter.value) {
			return false;
		} else if (filter.type === 'gte' && row[filter.field] < filter.value) {
			return false;
		}
	}
	return true;
};

export function getRows(data: DataFns, groups: Group[], filters: Filter[]) {
	// TODO: consider which groups are expanded, and how many entries to show for each group
	const results = [];
	for (const group of groups) {
		for (const ind of group.order) {
			const row = data[ind];
			if (doFiltersApply(row, filters)) {
				results.push(row);
			}
		}
	}
	return results;
}

// Construct a grouping
export function group(
	data: DataFns,
	fieldsToGroupBy: string[],
	maxRowsPerGroup?: number
): {
	maxRows: number | undefined;
	color: string;
	name: string;
	childGroups: any[];
	parentGroup: undefined;
	order: number[];
	isExpanded: boolean;
}[] {
	const groups: Group[] = [];

	if (fieldsToGroupBy.length === 0) {
		return [
			{
				name: 'Default',
				color: 'gray',
				order: [...Array(data.length).keys()],
				parentGroup: undefined,
				childGroups: [],
				maxRows: maxRowsPerGroup,
				isExpanded: true
			}
		];
	}

	// Iterate over the data, adding each element to the lowest-level group
	for (let ind = 0; ind < data.length; ind++) {
		const item = data[ind];

		// add entries for parent groups, if they don't already exist
		for (let i = 0; i < fieldsToGroupBy.length - 1; i++) {
			const groupName = fieldsToGroupBy
				.slice(0, i + 1)
				.map((fieldName) => item[fieldName])
				.join(' ∩ ');

			const existingItem = groups.find((groupedItem) => groupedItem.name === groupName);

			if (!existingItem) {
				groups.push({
					name: groupName,
					color: undefined,
					order: [],
					parentGroup: undefined,
					childGroups: [],
					maxRows: maxRowsPerGroup,
					isExpanded: true
				});
			}
		}

		// add entry for leaf group
		const groupName = fieldsToGroupBy.map((fieldName) => item[fieldName]).join(' ∩ ');
		const existingItem = groups.find((groupedItem) => groupedItem.name === groupName);

		if (existingItem) {
			existingItem.order.push(ind);
		} else {
			groups.push({
				name: groupName,
				color: undefined,
				order: [ind],
				parentGroup: undefined,
				childGroups: [],
				maxRows: maxRowsPerGroup,
				isExpanded: true
			});
		}
	}

	// now iterate, filling in the parent group reference for each group with a parent
	for (const group of groups) {
		if (group.name.includes(' ∩ ')) {
			const parentName = group.name.split(' ∩ ').slice(0, -1).join(' ∩ ');
			const parentItem = groups.find((groupedItem) => groupedItem.name === parentName);

			if (parentItem) {
				// should always be defined, but TS wants us to check
				group.parentGroup = parentItem;
				parentItem.childGroups.push(group);

				parentItem.order.push(...group.order); // TODO: check this is correct and we don't ever end up with entries being added twice
			}
		}
	}

	return groups;
}

export function filterData(data: any[], filters: Filter[]) {
	// return data;
	return data.filter((d) => {
		let isOk = true;

		for (const filter of filters ?? []) {
			const val = d[filter.field];
			if (filter.type === 'contains') {
				isOk = val.includes(filter.value);
			} else if (filter.type === 'isDefined') {
				isOk = !(val === null || val === undefined);
			} else if (filter.type === 'isOneOf') {
				isOk = filter.value.includes(val); // TODO: string/number conversions
			} else if (filter.type === 'lt') {
				isOk = val < filter.value;
			} else if (filter.type === 'lte') {
				isOk = val <= filter.value;
			} else if (filter.type === 'equals') {
				isOk = val == filter.value;
			} else if (filter.type === 'gte') {
				isOk = val >= filter.value;
			} else if (filter.type === 'gt') {
				isOk = val > filter.value;
			} else if (filter.type === 'range') {
				isOk = val > filter.value && val < filter.val2;
			}

			if (!isOk) {
				return false;
			}
		}

		return true;
	});
}

export function mergeData(data: any[], columns: any[]) {
	if (!columns) {
		return data;
	}

	return data.map((d) => {
		const newRow = {};
		for (const col of columns) {
			const fieldName = col.short_label;

			const val = d[fieldName];

			if (col.groups) {
				// merge
				if (col.groups.ungrouped.includes(val)) {
					newRow[fieldName] = d[fieldName];
				} else {
					for (const groupName of Object.keys(col.groups.grouped)) {
						if (col.groups.grouped[groupName].includes(val)) {
							newRow[fieldName] = groupName;
						}
					}
				}
			} else {
				newRow[fieldName] = d[fieldName];
			}
		}
		return newRow;
	});
}
