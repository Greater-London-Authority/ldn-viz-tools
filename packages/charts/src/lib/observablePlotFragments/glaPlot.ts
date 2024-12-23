import type {
	AreaOptions,
	AreaXOptions,
	AreaYOptions,
	AxisXOptions,
	AxisYOptions,
	Data,
	DotOptions,
	DotXOptions,
	DotYOptions,
	GridXOptions,
	GridYOptions,
	LineOptions,
	LineXOptions,
	LineYOptions,
	RuleXOptions,
	RuleYOptions,
	TextOptions,
	TipOptions
} from '@observablehq/plot';
import * as ObservablePlot from '@observablehq/plot';
import { getDefaultPlotStyles, type ThemeMode } from './observablePlotFragments';

interface PlotOptions {
	size?: {};
	color?: {};
	xScale?: {};
	yScale?: {};
}

// Function that handles default styles and takes data, mode and marks props.
// It also optionally takes an options object which can handle overriding default styling
// where needed, as well as a boolean to change size for faceted charts
export const glaPlot = (
	_data: any,
	mode: ThemeMode,
	marks: any[],
	options: PlotOptions = {},
	isFaceted: boolean = false
) => {
	const {
		defaultStyle,
		defaultSize,
		defaultSizeFacet,
		defaultColor,
		defaultXScale,
		defaultYScale
	} = getDefaultPlotStyles(mode);

	const spec = {
		style: {
			...defaultStyle
		},
		...defaultSize,
		...options.size,
		color: {
			...defaultColor,
			...options.color
		},
		x: {
			...defaultXScale,
			...options.xScale
		},
		y: {
			...defaultYScale,
			...options.yScale
		},
		marks
	};

	const facetedSpec = {
		...spec,
		...defaultSizeFacet,
		...options.size
	};

	return isFaceted ? facetedSpec : spec;
};

// Mark styles
const {
	defaultGridX,
	defaultGridY,
	defaultXAxis,
	defaultYAxis,
	defaultLine,
	defaultDashedLine,
	defaultDot,
	defaultArea,
	defaultRule,
	defaultTip,
	defaultAnnotationText,
	defaultAnnotationTip
} = getDefaultPlotStyles();

// Object contains a custom function for each mark, that wraps the existing mark but provides default styling and props
export const Plot = {
	...ObservablePlot,
	annotationText: (data?: Data, options?: TextOptions) => {
		ObservablePlot.text(data, { ...defaultAnnotationText, ...options });
	},
	annotationTip: (data?: Data, options?: TipOptions) => {
		ObservablePlot.tip(data, { ...defaultAnnotationTip, ...options });
	},
	area: (data?: Data, options?: AreaOptions) => {
		ObservablePlot.area(data, { ...defaultArea, ...options });
	},
	areaX: (data?: Data, options?: AreaXOptions) => {
		ObservablePlot.areaX(data, { ...defaultArea, ...options });
	},
	areaY: (data?: Data, options?: AreaYOptions) => {
		ObservablePlot.areaY(data, { ...defaultArea, ...options });
	},
	axisX: (...args: [data?: Data, options?: AxisXOptions] | [options?: AxisXOptions]) =>
		args.length > 1
			? ObservablePlot.axisX(args[0] as Data, { ...defaultXAxis, ...args[1] })
			: ObservablePlot.axisX({ ...defaultXAxis, ...args[1] }),
	axisY: (...args: [data?: Data, options?: AxisYOptions] | [options?: AxisYOptions]) =>
		args.length > 1
			? ObservablePlot.axisY(args[0] as Data, { ...defaultYAxis, ...args[1] })
			: ObservablePlot.axisY({ ...defaultYAxis, ...args[1] }),
	dashedLine: (data?: Data, options?: LineOptions) => {
		ObservablePlot.line(data, { ...defaultDashedLine, ...options });
	},
	dashedLineX: (data?: Data, options?: LineXOptions) => {
		ObservablePlot.lineX(data, { ...defaultDashedLine, ...options });
	},
	dashedLineY: (data?: Data, options?: LineYOptions) => {
		ObservablePlot.lineY(data, { ...defaultDashedLine, ...options });
	},
	dot: (data?: Data, options?: DotOptions) => {
		ObservablePlot.dot(data, { ...defaultDot, ...options });
	},
	dotX: (data?: Data, options?: DotXOptions) => {
		ObservablePlot.dotX(data, { ...defaultDot, ...options });
	},
	dotY: (data?: Data, options?: DotYOptions) => {
		ObservablePlot.dotY(data, { ...defaultDot, ...options });
	},
	gridX: (...args: [data?: Data, options?: GridXOptions] | [options?: GridXOptions]) => {
		args.length > 1
			? ObservablePlot.gridX(args[0] as Data, { ...defaultGridX, ...args[1] })
			: ObservablePlot.gridX({ ...defaultGridX, ...args[0] });
	},
	gridY: (...args: [data?: Data, options?: GridYOptions] | [options?: GridYOptions]) => {
		args.length > 1
			? ObservablePlot.gridY(args[0] as Data, { ...defaultGridY, ...args[1] })
			: ObservablePlot.gridY({ ...defaultGridY, ...args[0] });
	},
	line: (data?: Data, options?: LineOptions) => {
		ObservablePlot.line(data, { ...defaultLine, ...options });
	},
	lineX: (data?: Data, options?: LineXOptions) => {
		ObservablePlot.lineX(data, { ...defaultLine, ...options });
	},
	lineY: (data?: Data, options?: LineYOptions) => {
		ObservablePlot.lineY(data, { ...defaultLine, ...options });
	},
	point: (data?: Data, options?: DotOptions) => {
		ObservablePlot.dot(data, { ...defaultDot, ...options });
	},
	pointX: (data?: Data, options?: DotXOptions) => {
		ObservablePlot.dotX(data, { ...defaultDot, ...options });
	},
	pointY: (data?: Data, options?: DotYOptions) => {
		ObservablePlot.dotY(data, { ...defaultDot, ...options });
	},
	ruleX: (data?: Data, options?: RuleYOptions) => {
		ObservablePlot.ruleX(data, { ...defaultRule, ...options });
	},
	ruleY: (data?: Data, options?: RuleXOptions) => {
		ObservablePlot.ruleY(data, { ...defaultRule, ...options });
	},
	tip: (data?: Data, options?: TipOptions) => {
		ObservablePlot.tip(data, { ...defaultTip, ...options });
	}
};
