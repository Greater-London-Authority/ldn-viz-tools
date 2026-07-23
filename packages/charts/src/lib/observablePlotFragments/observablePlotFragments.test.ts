import { beforeEach, describe, expect, it, vi } from 'vitest';
import { theme } from '@ldn-viz/ui';
import { defaultPlotStyleFunctions, getDefaultPlotStyles } from './observablePlotFragments';

vi.mock('@ldn-viz/ui', () => ({
	theme: {
		tokenNameToValue: vi.fn((tokenName: string) => `value(${tokenName})`)
	}
}));

const mockedTokenNameToValue = vi.mocked(theme.tokenNameToValue);

beforeEach(() => {
	mockedTokenNameToValue.mockClear();
});

describe('getDefaultPlotStyles', () => {
	it('returns one entry per key in defaultPlotStyleFunctions', () => {
		const styles = getDefaultPlotStyles();

		expect(Object.keys(styles).sort()).toEqual(Object.keys(defaultPlotStyleFunctions).sort());
	});

	it('resolves each entry by calling its function, rather than returning the function itself', () => {
		const styles = getDefaultPlotStyles();

		for (const [key, value] of Object.entries(styles)) {
			expect(typeof value, `expected "${key}" to be resolved`).not.toBe('function');
		}
	});
});

describe('default* values that resolve colours from the theme', () => {
	it('defaultStyle resolves color from chart.label and background from chart.background', () => {
		const { defaultStyle } = getDefaultPlotStyles();

		expect(defaultStyle.color).toBe('value(chart.label)');
		expect(defaultStyle.background).toBe('value(chart.background)');
		expect(mockedTokenNameToValue).toHaveBeenCalledWith('chart.label');
		expect(mockedTokenNameToValue).toHaveBeenCalledWith('chart.background');
	});

	it.each([
		['defaultGridX', 'chart.grid'],
		['defaultGridY', 'chart.grid'],
		['defaultLine', 'data.primary'],
		['defaultArea', 'data.primary'],
		['defaultRule', 'chart.axis'],
		['defaultAnnotationText', 'chart.label'],
		['defaultAnnotationRange', 'chart.label']
	])('%s resolves its colour from the "%s" token', (key, token) => {
		const styles = getDefaultPlotStyles();

		expect(mockedTokenNameToValue).toHaveBeenCalledWith(token);
		expect(Object.values(styles[key])).toContain(`value(${token})`);
	});

	it('defaultDot resolves fill from data.primary and has no stroke', () => {
		const { defaultDot } = getDefaultPlotStyles();

		expect(defaultDot.fill).toBe('value(data.primary)');
		expect(defaultDot.stroke).toBeNull();
	});

	it('defaultPoint resolves stroke from data.primary and fill from chart.background', () => {
		const { defaultPoint } = getDefaultPlotStyles();

		expect(defaultPoint.stroke).toBe('value(data.primary)');
		expect(defaultPoint.fill).toBe('value(chart.background)');
	});

	it.each(['defaultTip', 'defaultAnnotationTip'])(
		'%s resolves stroke from border.muted and fill from chart.background',
		(key) => {
			const styles = getDefaultPlotStyles();

			expect(styles[key].stroke).toBe('value(border.muted)');
			expect(styles[key].fill).toBe('value(chart.background)');
		}
	);

	it.each(['defaultBar', 'defaultRect'])(
		'%s resolves fill from data.primary and stroke from chart.background',
		(key) => {
			const styles = getDefaultPlotStyles();

			expect(styles[key].fill).toBe('value(data.primary)');
			expect(styles[key].stroke).toBe('value(chart.background)');
		}
	);
});

describe('defaultDashedLine', () => {
	it('spreads the defaultLine function rather than calling it, so only strokeDasharray survives (latent bug, pinned here)', () => {
		const { defaultDashedLine } = getDefaultPlotStyles();

		expect(defaultDashedLine).toEqual({ strokeDasharray: '5,5' });
	});
});

describe('defaultSize vs defaultSizeFacet', () => {
	it('have the documented height/margin shape, with fx/fy padding only on the facet variant', () => {
		const { defaultSize, defaultSizeFacet } = getDefaultPlotStyles();

		expect(defaultSize).toEqual({
			height: 440,
			marginLeft: 0,
			marginRight: 8,
			marginTop: 24,
			marginBottom: 52
		});

		expect(defaultSizeFacet).toEqual({
			height: 660,
			marginLeft: 0,
			marginBottom: 52,
			marginRight: 96,
			marginTop: 40,
			fx: { padding: 0.15 },
			fy: { padding: 0.15 }
		});

		expect(defaultSize).not.toHaveProperty('fx');
		expect(defaultSize).not.toHaveProperty('fy');
	});
});
