import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as ObservablePlot from '@observablehq/plot';

vi.mock('@ldn-viz/ui', () => ({
	theme: {
		tokenNameToValue: vi.fn((tokenName: string) => `value(${tokenName})`)
	}
}));

vi.mock('@observablehq/plot', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@observablehq/plot')>();

	// Marks called as (data, options) — capture both so we can assert on the merged options.
	const passthrough = (name: string) =>
		vi.fn((data: unknown, options: unknown) => ({ _mark: name, data, options }));

	// axisX/axisY/gridX/gridY are overloaded as (data?, options?) | (options?) — capture raw args.
	const passthroughArgs = (name: string) => vi.fn((...args: unknown[]) => ({ _mark: name, args }));

	return {
		...actual,
		plot: vi.fn((spec: unknown) => spec),
		dot: passthrough('dot'),
		dotX: passthrough('dotX'),
		dotY: passthrough('dotY'),
		line: passthrough('line'),
		lineX: passthrough('lineX'),
		lineY: passthrough('lineY'),
		area: passthrough('area'),
		areaX: passthrough('areaX'),
		areaY: passthrough('areaY'),
		tip: passthrough('tip'),
		text: passthrough('text'),
		textX: passthrough('textX'),
		textY: passthrough('textY'),
		barX: passthrough('barX'),
		barY: passthrough('barY'),
		rect: passthrough('rect'),
		rectX: passthrough('rectX'),
		rectY: passthrough('rectY'),
		ruleX: passthrough('ruleX'),
		ruleY: passthrough('ruleY'),
		gridX: passthroughArgs('gridX'),
		gridY: passthroughArgs('gridY'),
		axisX: passthroughArgs('axisX'),
		axisY: passthroughArgs('axisY')
	};
});

const { plot, getDefault, Plot } = await import('./plot');

const data = [{ x: 1, y: 2 }];

// `plot()` is mocked above to return the constructed spec object verbatim rather than a
// rendered SVG/HTML element, so we cast its result to a plain record to inspect it.
type PlotSpec = Record<string, any>;
const buildSpec = (options: Parameters<typeof plot>[0]) => plot(options) as unknown as PlotSpec;

beforeEach(() => {
	vi.mocked(ObservablePlot.plot).mockClear();
});

describe('plot()', () => {
	it('uses defaultSize when none of fx/fy/facet are set', () => {
		const spec = buildSpec({});

		expect(spec.height).toBe(440);
		expect(spec.marginLeft).toBe(0);
		expect(spec.marginRight).toBe(8);
		expect(spec.marginTop).toBe(24);
		expect(spec.marginBottom).toBe(52);
	});

	it.each(['fx', 'fy', 'facet'])('uses defaultSizeFacet when options.%s is set', (key) => {
		const spec = buildSpec({ [key]: {} });

		expect(spec.height).toBe(660);
		expect(spec.marginRight).toBe(96);
		expect(spec.marginTop).toBe(40);
	});

	it('lets explicit height/margins override the defaults, including an explicit 0', () => {
		const spec = buildSpec({
			height: 100,
			marginTop: 0,
			marginLeft: 12,
			marginRight: 1,
			marginBottom: 2
		});

		expect(spec.height).toBe(100);
		expect(spec.marginTop).toBe(0);
		expect(spec.marginLeft).toBe(12);
		expect(spec.marginRight).toBe(1);
		expect(spec.marginBottom).toBe(2);
	});

	it('concatenates a string style after the generated default style string', () => {
		const spec = buildSpec({ style: 'color:red;' });

		expect(typeof spec.style).toBe('string');
		expect((spec.style as string).endsWith('color:red;')).toBe(true);
		expect((spec.style as string).startsWith('color:value(chart.label)')).toBe(true);
	});

	it('shallow-merges an object style over the default style', () => {
		const spec = buildSpec({ style: { color: 'red', extra: 'thing' } } as never);

		expect(spec.style).toEqual({
			color: 'red',
			fontSize: '0.875rem',
			fontFamily: expect.any(String),
			background: 'value(chart.background)',
			extra: 'thing'
		});
	});

	it('leaves color undefined in the output spec when no color option is supplied', () => {
		const spec = buildSpec({});

		expect(spec.color).toBeUndefined();
	});

	it('merges defaultColor underneath a supplied color option', () => {
		const spec = buildSpec({ color: { scheme: 'blues' } });

		expect(spec.color).toEqual({
			legend: true,
			swatchSize: 16,
			className: 'defaultColorLegendLabel',
			scheme: 'blues'
		});
	});

	it('always merges x/y scale defaults, present even when the caller passes {}', () => {
		const spec = buildSpec({ x: {}, y: {} });

		expect(spec.x).toEqual({
			grid: false,
			insetLeft: 32,
			labelAnchor: 'center',
			labelArrow: 'none'
		});
		expect(spec.y).toEqual({
			grid: false,
			ticks: 4,
			labelAnchor: 'top',
			labelArrow: 'none'
		});
	});

	it('passes unrecognised keys through unchanged', () => {
		const marks = [{ type: 'dot' }];
		const spec = buildSpec({ marks, facet: { data: [] } } as never);

		expect(spec.marks).toBe(marks);
		expect(spec.facet).toEqual({ data: [] });
	});

	it('passes the final merged spec through to ObservablePlot.plot', () => {
		plot({ marginTop: 5 });

		expect(ObservablePlot.plot).toHaveBeenCalledWith(expect.objectContaining({ marginTop: 5 }));
	});
});

describe('getDefault(element)', () => {
	it('returns the resolved value for a given key, not the function itself', () => {
		const dot = getDefault('defaultDot');

		expect(typeof dot).not.toBe('function');
		expect(dot.fill).toBe('value(data.primary)');
	});
});

describe.each([
	['dot', 'defaultDot'],
	['dotX', 'defaultDot'],
	['dotY', 'defaultDot'],
	['line', 'defaultLine'],
	['lineX', 'defaultLine'],
	['lineY', 'defaultLine'],
	['area', 'defaultArea'],
	['areaX', 'defaultArea'],
	['areaY', 'defaultArea'],
	['point', 'defaultPoint'],
	['pointX', 'defaultPoint'],
	['pointY', 'defaultPoint'],
	['ruleX', 'defaultRule'],
	['ruleY', 'defaultRule'],
	['tip', 'defaultTip'],
	['barX', 'defaultBar'],
	['barY', 'defaultBar'],
	['rect', 'defaultRect'],
	['rectX', 'defaultRect'],
	['rectY', 'defaultRect'],
	['annotationTip', 'defaultAnnotationTip'],
	['annotationText', 'defaultAnnotationText'],
	['dashedLine', 'defaultDashedLine'],
	['dashedLineX', 'defaultDashedLine'],
	['dashedLineY', 'defaultDashedLine']
] as const)('Plot.%s', (plotKey, defaultsKey) => {
	it(`merges ${defaultsKey} underneath the caller's options (caller options win)`, () => {
		const options = { opacity: 0.5 };

		const result = (
			Plot[plotKey] as unknown as (
				data: unknown,
				options: unknown
			) => { data: unknown; options: unknown }
		)(data, options);

		expect(result.data).toBe(data);
		expect(result.options).toEqual({ ...getDefault(defaultsKey), ...options });
	});
});

describe('Plot.text / Plot.textX / Plot.textY', () => {
	it('do not apply any default styling, unlike the other mark wrappers', () => {
		const options = { fontSize: 20 };

		expect((Plot.text(data, options) as never as { options: unknown }).options).toEqual(options);
		expect((Plot.textX(data, options) as never as { options: unknown }).options).toEqual(options);
		expect((Plot.textY(data, options) as never as { options: unknown }).options).toEqual(options);
	});
});

describe('Plot.gridX / Plot.gridY', () => {
	it('gridX 2-arg form merges defaultGridX underneath the caller options', () => {
		const options = { strokeOpacity: 0.5 };

		const result = Plot.gridX(data, options) as never as { args: unknown[] };

		expect(result.args).toEqual([data, { ...getDefault('defaultGridX'), ...options }]);
	});

	it('gridX 1-arg form treats the single argument as options', () => {
		const options = { strokeOpacity: 0.5 };

		const result = Plot.gridX(options) as never as { args: unknown[] };

		expect(result.args).toEqual([{ ...getDefault('defaultGridX'), ...options }]);
	});

	it('gridY 2-arg and 1-arg forms both merge defaultGridY underneath the caller options', () => {
		const options = { ticks: 6 };

		expect((Plot.gridY(data, options) as never as { args: unknown[] }).args).toEqual([
			data,
			{ ...getDefault('defaultGridY'), ...options }
		]);
		expect((Plot.gridY(options) as never as { args: unknown[] }).args).toEqual([
			{ ...getDefault('defaultGridY'), ...options }
		]);
	});
});

describe('Plot.axisX', () => {
	it('2-arg form merges defaultXAxis underneath the caller options', () => {
		const options = { label: 'Custom' };

		const result = Plot.axisX(data, options) as never as { args: unknown[] };

		expect(result.args).toEqual([data, { ...getDefault('defaultXAxis'), ...options }]);
	});

	it('1-arg form treats the single argument as options and still merges defaultXAxis', () => {
		const options = { label: 'Custom' };

		const result = Plot.axisX(options) as never as { args: unknown[] };

		expect(result.args).toEqual([{ ...getDefault('defaultXAxis'), ...options }]);
	});
});

describe('Plot.axisY', () => {
	it('1-arg form merges defaultYAxis underneath the caller options', () => {
		const options = { label: 'Custom' };

		const result = Plot.axisY(options) as never as { args: unknown[] };

		expect(result.args).toEqual([{ ...getDefault('defaultYAxis'), ...options }]);
	});

	it('documents a real bug: the 2-arg form looks up "defaultYaxis" (lowercase axis), which has no matching default and throws', () => {
		expect(() => Plot.axisY(data, { label: 'Custom' })).toThrow();
	});
});
