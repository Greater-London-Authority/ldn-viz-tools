import { expect, test } from 'vitest';
import { group, sortGroups, getRows, getSortedRows } from './dataFns.ts';

test('can group based on single variable', () => {
	const data = [
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 3, c: 4 },

		{ a: 2, b: 3, c: 3 },
		{ a: 2, b: 3, c: 4 },

		{ a: 3, b: 3, c: 5 },
		{ a: 3, b: 2, c: 4 }
	];

	const groupedData = group(data, ['a']);

	const expectedGroup = [
		{
			name: '1',
			color: undefined,
			order: [0, 1],
			parentGroup: undefined,
			childGroups: []
		},
		{
			name: '2',
			color: undefined,
			order: [2, 3],
			parentGroup: undefined,
			childGroups: []
		},
		{
			name: '3',
			color: undefined,
			order: [4, 5],
			parentGroup: undefined,
			childGroups: []
		}
	];

	expect(groupedData).toStrictEqual(expectedGroup);
});

/*
test("can group based on 2 variables", () => {
    const data = [
        {a: 1, b: 2, c: 3},
        {a: 1, b: 3, c: 4},

        {a: 2, b: 3, c: 3},
        {a: 2, b: 3, c: 4},

        {a: 3, b: 3, c: 5},
        {a: 3, b: 2, c: 4},
    ];

    const groupedData = group(data, ["a", "b"])

    const expectedGroup = [
        {
            name: '1',
            color: undefined,
            order: [0, 1],
            parentGroup: undefined,
            childGroups: []
        },
        {
            name: '2',
            color: undefined,
            order: [2, 3],
            parentGroup: undefined,
            childGroups: []
        },
        {
            name: '3',
            color: undefined,
            order: [4, 5],
            parentGroup: undefined,
            childGroups: []
        }
    ];

    expect(groupedData).toStrictEqual(expectedGroup)
});

 */

/*
test('can sort groups based on single variable', () => {
	const data = [
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 3, c: 4 },

		{ a: 3, b: 3, c: 5 },
		{ a: 3, b: 2, c: 4 },

		{ a: 2, b: 3, c: 3 },
		{ a: 2, b: 3, c: 4 }
	];

	const groupedData = group(data, ['a']);

	const sortSpec = [
		{
			field: 'a',
			aggregation: 'max',
			direction: 'ascending'
		}
	];

	const sortedGroups = sortGroups(groupedData, data, sortSpec);

	//    expect(groupedData).toStrictEqual(expectedGroup)
});
 */

test('can sort groups based on pair of variables', () => {
	const data = [
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 3, c: 4 },

		{ a: 3, b: 3, c: 5 },
		{ a: 3, b: 2, c: 4 },

		{ a: 2, b: 3, c: 3 },
		{ a: 2, b: 3, c: 4 }
	];

	const groupedData = group(data, ['a', 'b']);

	const sortSpec = [
		{
			field: 'a',
			aggregation: 'max',
			direction: 'ascending'
		},
		{
			field: 'b',
			aggregation: 'max',
			direction: 'ascending'
		}
	];

	//  console.log("WOOHOO")
	//  console.log(groupedData)

	const sortedGroups = sortGroups(groupedData, data, sortSpec);

	// console.log("SORTED")
	// console.log(sortedGroups);

	const sortedRow = getRows(data, sortedGroups, []);

	console.log(sortedRow);
	//    expect(groupedData).toStrictEqual(expectedGroup)
});

test('can sort rows based on pair of variables', () => {
	const data = [
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 3, c: 4 },

		{ a: 3, b: 3, c: 5 },
		{ a: 3, b: 2, c: 4 },

		{ a: 2, b: 3, c: 3 },
		{ a: 2, b: 3, c: 4 }
	];

	const sortSpec = [
		{
			field: 'a',
			aggregation: 'max',
			direction: 'ascending'
		},
		{
			field: 'b',
			aggregation: 'max',
			direction: 'descending'
		}
	];

	const sortedRows = getSortedRows([0, 1, 2, 3, 4, 5], data, sortSpec);

	console.log(sortedRows);
	//    expect(groupedData).toStrictEqual(expectedGroup)
});
