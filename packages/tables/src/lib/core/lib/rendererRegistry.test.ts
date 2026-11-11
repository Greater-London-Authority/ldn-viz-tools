import { describe, it, expect, vi } from 'vitest';
import {
	resolveRenderer,
	resolveAxisRenderer,
	resolveColumnRenderers,
	resolveAllColumnRenderers
} from './rendererRegistry';
import type { ColSpec } from './types';

// Mock component for testing
const MockComponent = {} as any;

describe('rendererRegistry', () => {
	describe('resolveRenderer', () => {
		it('returns undefined for undefined input', () => {
			expect(resolveRenderer(undefined)).toBeUndefined();
		});

		it('returns component if already a component', () => {
			expect(resolveRenderer(MockComponent)).toBe(MockComponent);
		});

		it('resolves known renderer names', () => {
			const resolved = resolveRenderer('TextCell');
			expect(resolved).toBeDefined();
		});

		it('warns and returns undefined for unknown names', () => {
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
			const resolved = resolveRenderer('UnknownRenderer');

			expect(resolved).toBeUndefined();
			expect(consoleSpy).toHaveBeenCalledWith('Unknown renderer: UnknownRenderer');

			consoleSpy.mockRestore();
		});
	});

	describe('resolveAxisRenderer', () => {
		it('returns undefined for undefined input', () => {
			expect(resolveAxisRenderer(undefined)).toBeUndefined();
		});

		it('resolves known axis renderer names', () => {
			const resolved = resolveAxisRenderer('BarDivergingAxis');
			expect(resolved).toBeDefined();
		});
	});

	describe('resolveColumnRenderers', () => {
		it('resolves renderers in column spec without mutation', () => {
			const original: ColSpec = {
				label: 'Test',
				short_label: 'test',
				cell: { renderer: 'TextCell' }
			};

			const resolved = resolveColumnRenderers(original);

			// Original should not be mutated
			expect(original.cell!.renderer).toBe('TextCell');

			// Resolved should have component
			expect(typeof resolved.cell!.renderer).not.toBe('string');
		});

		it('handles columns without renderers', () => {
			const col: ColSpec = {
				label: 'Test',
				short_label: 'test'
			};

			const resolved = resolveColumnRenderers(col);
			expect(resolved.cell).toBeUndefined();
		});

		it('resolves all renderer types', () => {
			const col: ColSpec = {
				label: 'Test',
				short_label: 'test',
				cell: { renderer: 'TextCell', axisRenderer: 'BarDivergingAxis' },
				group: { renderer: 'BoxPlot' },
				column: { renderer: 'Histogram' },
				header: { renderer: 'Header' }
			};

			const resolved = resolveColumnRenderers(col);

			expect(resolved.cell!.renderer).toBeDefined();
			expect(resolved.cell!.axisRenderer).toBeDefined();
			expect(resolved.group!.renderer).toBeDefined();
			expect(resolved.column!.renderer).toBeDefined();
			expect(resolved.header!.renderer).toBeDefined();
		});
	});

	describe('resolveAllColumnRenderers', () => {
		it('resolves all columns in array', () => {
			const columns: ColSpec[] = [
				{ label: 'A', short_label: 'a', cell: { renderer: 'TextCell' } },
				{ label: 'B', short_label: 'b', cell: { renderer: 'ColoredCell' } }
			];

			const resolved = resolveAllColumnRenderers(columns);

			expect(resolved.length).toBe(2);
			expect(typeof resolved[0].cell!.renderer).not.toBe('string');
			expect(typeof resolved[1].cell!.renderer).not.toBe('string');
		});

		it('does not mutate original array', () => {
			const columns: ColSpec[] = [{ label: 'A', short_label: 'a', cell: { renderer: 'TextCell' } }];

			resolveAllColumnRenderers(columns);

			expect(columns[0].cell!.renderer).toBe('TextCell');
		});
	});
});
