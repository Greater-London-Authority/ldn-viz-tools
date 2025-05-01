import type {
	AreaOptions,
	AreaXOptions,
	AreaYOptions,
	AxisXOptions,
	AxisYOptions,
	BarXOptions,
	BarYOptions,
	Data,
	DotOptions,
	DotXOptions,
	DotYOptions,
	GridXOptions,
	GridYOptions,
	LineOptions,
	LineXOptions,
	LineYOptions,
	PlotOptions,
	RectOptions,
	RectXOptions,
	RectYOptions,
	RuleXOptions,
	RuleYOptions,
	TextOptions,
	TipOptions
} from '@observablehq/plot';
import * as ObservablePlot from '@observablehq/plot';
import { defaultPlotStyleFunctions, getDefaultPlotStyles } from './observablePlotFragments';

export const plot = (options: PlotOptions = {}) => {
	const {
		defaultStyle,
		defaultSize,
		defaultSizeFacet,
		defaultColor,
		defaultXScale,
		defaultYScale
	} = getDefaultPlotStyles();

	const { style, color, x, y, height, marginTop, marginBottom, marginLeft, marginRight, ...rest } =
		options;

	const sizeDefault = options.fx || options.fy || options.facet ? defaultSizeFacet : defaultSize;
	const defaultStyleString = Object.entries(defaultStyle)
		.map(([k, v]) => `${k}:${v}`)
		.join(';');

	const specWithDefaultsApplied = {
		// style may be either a string or an object

		style:
			typeof style === 'string'
				? defaultStyleString + style
				: {
						...defaultStyle,
						...style
					},

		height: height ?? sizeDefault.height,
		marginLeft: marginLeft ?? sizeDefault.marginLeft,
		marginRight: marginRight ?? sizeDefault.marginRight,
		marginTop: marginTop ?? sizeDefault.marginTop,
		marginBottom: marginBottom ?? sizeDefault.marginBottom,

		color: color
			? {
					...defaultColor,
					...color
				}
			: undefined,
		x: {
			...defaultXScale,
			...x
		},
		y: {
			...defaultYScale,
			...y
		},

		...rest
	};

	return ObservablePlot.plot(specWithDefaultsApplied as PlotOptions);
};

export const getDefault = (element: any) => defaultPlotStyleFunctions[element]();

// Object contains a custom function for each mark, that wraps the existing mark but provides default styling and props
export const Plot = {
	...ObservablePlot,
	plot,
	annotationText: (data?: Data, options?: TextOptions) => {
		return ObservablePlot.text(data, {
			...getDefault('defaultAnnotationText'),
			...options
		});
	},
	annotationTip: (data?: Data, options?: TipOptions) => {
		return ObservablePlot.tip(data, { ...getDefault('defaultAnnotationTip'), ...options });
	},
	area: (data?: Data, options?: AreaOptions) => {
		return ObservablePlot.area(data, { ...getDefault('defaultArea'), ...options });
	},
	areaX: (data?: Data, options?: AreaXOptions) => {
		return ObservablePlot.areaX(data, { ...getDefault('defaultArea'), ...options });
	},
	areaY: (data?: Data, options?: AreaYOptions) => {
		return ObservablePlot.areaY(data, { ...getDefault('defaultArea'), ...options });
	},
	axisX: (...args: [data?: Data, options?: AxisXOptions] | [options?: AxisXOptions]) =>
		args.length > 1
			? ObservablePlot.axisX(args[0] as Data, { ...getDefault('defaultXAxis'), ...args[1] })
			: ObservablePlot.axisX({ ...getDefault('defaultXAxis'), ...args[0] }),
	axisY: (...args: [data?: Data, options?: AxisYOptions] | [options?: AxisYOptions]) =>
		args.length > 1
			? ObservablePlot.axisY(args[0] as Data, { ...getDefault('defaultYaxis'), ...args[1] })
			: ObservablePlot.axisY({ ...getDefault('defaultYAxis'), ...args[0] }),
	barX: (data?: Data, options?: BarXOptions) => {
		return ObservablePlot.barX(data, { ...getDefault('defaultBar'), ...options });
	},
	barY: (data?: Data, options?: BarYOptions) => {
		return ObservablePlot.barY(data, { ...getDefault('defaultBar'), ...options });
	},
	dashedLine: (data?: Data, options?: LineOptions) => {
		return ObservablePlot.line(data, { ...getDefault('defaultDashedLine'), ...options });
	},
	dashedLineX: (data?: Data, options?: LineXOptions) => {
		return ObservablePlot.lineX(data, { ...getDefault('defaultDashedLine'), ...options });
	},
	dashedLineY: (data?: Data, options?: LineYOptions) => {
		return ObservablePlot.lineY(data, { ...getDefault('defaultDashedLine'), ...options });
	},
	dot: (data?: Data, options?: DotOptions) => {
		return ObservablePlot.dot(data, { ...getDefault('defaultDot'), ...options });
	},
	dotX: (data?: Data, options?: DotXOptions) => {
		return ObservablePlot.dotX(data, { ...getDefault('defaultDot'), ...options });
	},
	dotY: (data?: Data, options?: DotYOptions) => {
		return ObservablePlot.dotY(data, { ...getDefault('defaultDot'), ...options });
	},
	gridX: (...args: [data?: Data, options?: GridXOptions] | [options?: GridXOptions]) => {
		return args.length > 1
			? ObservablePlot.gridX(args[0] as Data, { ...getDefault('defaultGridX'), ...args[1] })
			: ObservablePlot.gridX({ ...getDefault('defaultGridX'), ...args[0] });
	},
	gridY: (...args: [data?: Data, options?: GridYOptions] | [options?: GridYOptions]) => {
		return args.length > 1
			? ObservablePlot.gridY(args[0] as Data, { ...getDefault('defaultGridY'), ...args[1] })
			: ObservablePlot.gridY({ ...getDefault('defaultGridY'), ...args[0] });
	},
	line: (data?: Data, options?: LineOptions) => {
		return ObservablePlot.line(data, { ...getDefault('defaultLine'), ...options });
	},
	lineX: (data?: Data, options?: LineXOptions) => {
		return ObservablePlot.lineX(data, { ...getDefault('defaultLine'), ...options });
	},
	lineY: (data?: Data, options?: LineYOptions) => {
		return ObservablePlot.lineY(data, { ...getDefault('defaultLine'), ...options });
	},
	point: (data?: Data, options?: DotOptions) => {
		return ObservablePlot.dot(data, { ...getDefault('defaultPoint'), ...options });
	},
	pointX: (data?: Data, options?: DotXOptions) => {
		return ObservablePlot.dotX(data, { ...getDefault('defaultPoint'), ...options });
	},
	pointY: (data?: Data, options?: DotYOptions) => {
		return ObservablePlot.dotY(data, { ...getDefault('defaultPoint'), ...options });
	},
	rect: (data?: Data, options?: RectOptions) => {
		return ObservablePlot.rect(data, { ...getDefault('defaultRect'), ...options });
	},
	rectX: (data?: Data, options?: RectXOptions) => {
		return ObservablePlot.rectX(data, { ...getDefault('defaultRect'), ...options });
	},
	rectY: (data?: Data, options?: RectYOptions) => {
		return ObservablePlot.rectY(data, { ...getDefault('defaultRect'), ...options });
	},
	ruleX: (data?: Data, options?: RuleYOptions) => {
		return ObservablePlot.ruleX(data, { ...getDefault('defaultRule'), ...options });
	},
	ruleY: (data?: Data, options?: RuleXOptions) => {
		return ObservablePlot.ruleY(data, { ...getDefault('defaultRule'), ...options });
	},
	text: (data?: Data, options?: TextOptions) => ObservablePlot.text(data, { ...options }),
	textX: (data?: Data, options?: TextOptions) => ObservablePlot.textX(data, { ...options }),
	textY: (data?: Data, options?: TextOptions) => ObservablePlot.textY(data, { ...options }),
	tip: (data?: Data, options?: TipOptions) => {
		return ObservablePlot.tip(data, { ...getDefault('defaultTip'), ...options });
	}
};
