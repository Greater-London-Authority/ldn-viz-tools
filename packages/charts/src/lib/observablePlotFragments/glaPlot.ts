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
	size?: { height?: {}; marginLeft?: {}; marginRight?: {}; marginTop?: {}; marginBottom?: {} };
	color?: {};
	xScale?: {};
	yScale?: {};
	fx?: {};
	fy?: {};
}

// Function that handles default styles and takes data, mode and marks props.
// It also optionally takes an options object which can handle overriding default styling
// where needed, as well as a boolean to change size for faceted charts
export const glaPlot = (
	_data: any,
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
	} = getDefaultPlotStyles();

	const { color, xScale, yScale, size, ...other } = options;

	const spec = {
		style: {
			...defaultStyle
		},
		...defaultSize,
		...size,
		color: {
			...defaultColor,
			...color
		},
		x: {
			...defaultXScale,
			...xScale
		},
		y: {
			...defaultYScale,
			...yScale
		},
		...other,
		marks
	};

	const facetedSpec = {
		...spec,
		...defaultSizeFacet,
		...size
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
		return ObservablePlot.text(data, { ...defaultAnnotationText, ...options });
	},
	annotationTip: (data?: Data, options?: TipOptions) => {
		return ObservablePlot.tip(data, { ...defaultAnnotationTip, ...options });
	},
	area: (data?: Data, options?: AreaOptions) => {
		return ObservablePlot.area(data, { ...defaultArea, ...options });
	},
	areaX: (data?: Data, options?: AreaXOptions) => {
		return ObservablePlot.areaX(data, { ...defaultArea, ...options });
	},
	areaY: (data?: Data, options?: AreaYOptions) => {
		return ObservablePlot.areaY(data, { ...defaultArea, ...options });
	},
	axisX: (...args: [data?: Data, options?: AxisXOptions] | [options?: AxisXOptions]) =>
		args.length > 1
			? ObservablePlot.axisX(args[0] as Data, { ...defaultXAxis, ...args[1] })
			: ObservablePlot.axisX({ ...defaultXAxis, ...args[0] }),
	axisY: (...args: [data?: Data, options?: AxisYOptions] | [options?: AxisYOptions]) =>
		args.length > 1
			? ObservablePlot.axisY(args[0] as Data, { ...defaultYAxis, ...args[1] })
			: ObservablePlot.axisY({ ...defaultYAxis, ...args[0] }),
	dashedLine: (data?: Data, options?: LineOptions) => {
		return ObservablePlot.line(data, { ...defaultDashedLine, ...options });
	},
	dashedLineX: (data?: Data, options?: LineXOptions) => {
		return ObservablePlot.lineX(data, { ...defaultDashedLine, ...options });
	},
	dashedLineY: (data?: Data, options?: LineYOptions) => {
		return ObservablePlot.lineY(data, { ...defaultDashedLine, ...options });
	},
	dot: (data?: Data, options?: DotOptions) => {
		return ObservablePlot.dot(data, { ...defaultDot, ...options });
	},
	dotX: (data?: Data, options?: DotXOptions) => {
		return ObservablePlot.dotX(data, { ...defaultDot, ...options });
	},
	dotY: (data?: Data, options?: DotYOptions) => {
		return ObservablePlot.dotY(data, { ...defaultDot, ...options });
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
		return ObservablePlot.line(data, { ...defaultLine, ...options });
	},
	lineX: (data?: Data, options?: LineXOptions) => {
		return ObservablePlot.lineX(data, { ...defaultLine, ...options });
	},
	lineY: (data?: Data, options?: LineYOptions) => {
		return ObservablePlot.lineY(data, { ...defaultLine, ...options });
	},
	point: (data?: Data, options?: DotOptions) => {
		return ObservablePlot.dot(data, { ...defaultDot, ...options });
	},
	pointX: (data?: Data, options?: DotXOptions) => {
		return ObservablePlot.dotX(data, { ...defaultDot, ...options });
	},
	pointY: (data?: Data, options?: DotYOptions) => {
		return ObservablePlot.dotY(data, { ...defaultDot, ...options });
	},
	ruleX: (data?: Data, options?: RuleYOptions) => {
		return ObservablePlot.ruleX(data, { ...defaultRule, ...options });
	},
	ruleY: (data?: Data, options?: RuleXOptions) => {
		return ObservablePlot.ruleY(data, { ...defaultRule, ...options });
	},
	text: (data?: Data, options?: TextOptions) => ObservablePlot.text(data, { ...options }),
	textX: (data?: Data, options?: TextOptions) => ObservablePlot.textX(data, { ...options }),
	textY: (data?: Data, options?: TextOptions) => ObservablePlot.textY(data, { ...options }),
	tip: (data?: Data, options?: TipOptions) => {
		return ObservablePlot.tip(data, { ...defaultTip, ...options });
	}
};
