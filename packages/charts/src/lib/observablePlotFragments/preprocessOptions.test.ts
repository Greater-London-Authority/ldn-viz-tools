import { describe, it, expect, vi } from 'vitest';
import { preprocessOptions } from './observablePlotFragments';

describe('preprocessOptions', () => {
	describe('basic functionality - creating separate marks', () => {
		it('should create a mark for each data entry, with correct data', () => {
			const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				options: {}
			};

			const result = preprocessOptions(data, config);

			expect(result).toHaveLength(3);
			expect(result.map((r) => r.data)).toEqual(data.map((d) => [d]));
			expect(mockMarkFunction).toHaveBeenCalledTimes(3);
		});

		it('should call mark function function with single-element array for each datum', () => {
			const data = [{ id: 1 }, { id: 2 }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenNthCalledWith(1, [{ id: 1 }], {});
			expect(mockMarkFunction).toHaveBeenNthCalledWith(2, [{ id: 2 }], {});
		});

		it('should return empty array for empty data', () => {
			const data: any[] = [];
			const mockMarkFunction = vi.fn();

			const config = {
				type: mockMarkFunction
			};

			const result = preprocessOptions(data, config);

			expect(result).toHaveLength(0);
			expect(mockMarkFunction).not.toHaveBeenCalled();
		});
	});

	describe('filter functionality', () => {
		it('should filter data based on filter function', () => {
			const data = [
				{ id: 1, include: true },
				{ id: 2, include: false },
				{ id: 3, include: true }
			];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				filter: (d: any) => d.include
			};

			const result = preprocessOptions(data, config);

			expect(result).toHaveLength(2);

			expect(result.map((r) => r.data)).toEqual(data.filter((d) => d.include).map((d) => [d]));

			expect(mockMarkFunction).toHaveBeenCalledTimes(2);
			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1, include: true }], {});
			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 3, include: true }], {});
		});

		it('should process all data when no filter is provided', () => {
			const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
			const mockMarkFunction = vi.fn();

			const config = {
				type: mockMarkFunction
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenCalledTimes(3);
		});
	});

	describe('options handling', () => {
		it('should pass static options unchanged', () => {
			const data = [{ id: 1 }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				options: {
					fill: 'red',
					stroke: 'blue',
					r: 5
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1 }], {
				fill: 'red',
				stroke: 'blue',
				r: 5
			});
		});

		it('should evaluate function provided for dy when in options', () => {
			const data = [
				{ id: 1, offset: 10 },
				{ id: 2, offset: 20 }
			];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				options: {
					dy: (d: any) => d.offset
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenNthCalledWith(1, [{ id: 1, offset: 10 }], { dy: 10 });
			expect(mockMarkFunction).toHaveBeenNthCalledWith(2, [{ id: 2, offset: 20 }], { dy: 20 });
		});

		it('should evaluate function provided for textAnchor when in options', () => {
			const data = [
				{ id: 1, align: 'start' },
				{ id: 2, align: 'end' }
			];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				options: {
					textAnchor: (d: any) => d.align
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenNthCalledWith(1, [{ id: 1, align: 'start' }], {
				textAnchor: 'start'
			});
			expect(mockMarkFunction).toHaveBeenNthCalledWith(2, [{ id: 2, align: 'end' }], {
				textAnchor: 'end'
			});
		});

		it('should NOT evaluate function options for keys not in optionsToConvert', () => {
			const data = [{ id: 1 }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));
			const fillFunction = (d: any) => 'red';

			const config = {
				type: mockMarkFunction,
				options: {
					fill: fillFunction
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1 }], { fill: fillFunction });
		});

		it('should handle mixed static and function options', () => {
			const data = [{ id: 1, offset: 5 }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				options: {
					fill: 'red',
					dy: (d: any) => d.offset,
					stroke: 'blue'
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1, offset: 5 }], {
				fill: 'red',
				dy: 5,
				stroke: 'blue'
			});
		});
	});

	describe('optionsToEval handling', () => {
		it('should evaluate optionsToEval functions', () => {
			const data = [
				{ id: 1, quarter: '2019 Q4' },
				{ id: 2, quarter: '2020 Q1' }
			];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				optionsToEval: {
					fill: (d: any) => (d.quarter === '2019 Q4' ? 'black' : 'GDPType')
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenNthCalledWith(1, [{ id: 1, quarter: '2019 Q4' }], {
				fill: 'black'
			});
			expect(mockMarkFunction).toHaveBeenNthCalledWith(2, [{ id: 2, quarter: '2020 Q1' }], {
				fill: 'GDPType'
			});
		});

		it('should handle non-function values in optionsToEval', () => {
			const data = [{ id: 1 }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				optionsToEval: {
					fill: 'red' as any // Non-function value
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1 }], { fill: 'red' });
		});

		it('should combine options and optionsToEval', () => {
			const data = [{ id: 1, offset: 10, quarter: '2019 Q4' }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				options: {
					dy: (d: any) => d.offset,
					stroke: 'blue'
				},
				optionsToEval: {
					fill: (d: any) => (d.quarter === '2019 Q4' ? 'black' : 'white')
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1, offset: 10, quarter: '2019 Q4' }], {
				dy: 10,
				stroke: 'blue',
				fill: 'black'
			});
		});

		it('should handle multiple optionsToEval keys', () => {
			const data = [{ id: 1, value: 100, type: 'A' }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				optionsToEval: {
					fill: (d: any) => (d.type === 'A' ? 'red' : 'blue'),
					r: (d: any) => d.value / 10,
					opacity: (d: any) => (d.value > 50 ? 1 : 0.5)
				}
			};

			preprocessOptions(data, config);

			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1, value: 100, type: 'A' }], {
				fill: 'red',
				r: 10,
				opacity: 1
			});
		});
	});

	describe('integration scenarios', () => {
		it('should handle combined use of filter, options, and optionsToEval', () => {
			const data = [
				{ id: 1, label: 'A', offset: 5, quarter: '2019 Q4', show: true },
				{ id: 2, label: 'B', offset: 10, quarter: '2020 Q1', show: false },
				{ id: 3, label: 'C', offset: 15, quarter: '2020 Q2', show: true }
			];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				filter: (d: any) => d.show,
				options: {
					dy: (d: any) => d.offset,
					textAnchor: (d: any) => (d.id === 1 ? 'start' : 'middle'),
					stroke: 'black'
				},
				optionsToEval: {
					fill: (d: any) => (d.quarter === '2019 Q4' ? 'red' : 'blue'),
					text: (d: any) => d.label
				}
			};

			const result = preprocessOptions(data, config);

			expect(result).toHaveLength(2);

			expect(mockMarkFunction).toHaveBeenCalledTimes(2);

			expect(mockMarkFunction).toHaveBeenNthCalledWith(
				1,
				[{ id: 1, label: 'A', offset: 5, quarter: '2019 Q4', show: true }],
				{
					dy: 5,
					textAnchor: 'start',
					stroke: 'black',
					fill: 'red',
					text: 'A'
				}
			);

			expect(mockMarkFunction).toHaveBeenNthCalledWith(
				2,
				[{ id: 3, label: 'C', offset: 15, quarter: '2020 Q2', show: true }],
				{
					dy: 15,
					textAnchor: 'middle',
					stroke: 'black',
					fill: 'blue',
					text: 'C'
				}
			);
		});

		it('should return marks as returned by the mark function', () => {
			const data = [{ id: 1 }, { id: 2 }];
			const mockMark = { type: 'mock-mark' };
			const mockMarkFunction = vi.fn(() => mockMark);

			const config = {
				type: mockMarkFunction
			};

			const result = preprocessOptions(data, config);

			expect(result).toEqual([mockMark, mockMark]);
		});

		it('should handle missing/undefined options and optionsToEval gracefully', () => {
			const data = [{ id: 1 }];
			const mockMarkFunction = vi.fn((data, options) => ({ data, options }));

			const config = {
				type: mockMarkFunction,
				options: undefined,
				optionsToEval: undefined
			};

			const result = preprocessOptions(data, config);

			expect(result).toHaveLength(1);
			expect(mockMarkFunction).toHaveBeenCalledWith([{ id: 1 }], {});
		});
	});
});
