import type {
	AreaOptions,
	AreaXOptions,
	AreaYOptions,
	ArrowOptions,
	AutoOptions,
	AxisXOptions,
	AxisYOptions,
	BarXOptions,
	BarYOptions,
	BollingerOptions,
	BollingerXOptions,
	BollingerYOptions,
	BoxXOptions,
	BoxYOptions,
	Data,
	DotOptions,
	DotXOptions,
	DotYOptions,
	GridXOptions,
	GridYOptions,
	LineOptions,
	LineXOptions,
	LineYOptions,
	PointerOptions,
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
// type Marks =
// 	| Area
// 	| Arrow
// 	// | CompoundMark
// 	| RuleX
// 	| RuleY
// 	| BarX
// 	| BarY
// 	| Cell
// 	| Contour
// 	| RenderableMark
// 	| Density
// 	| Difference
// 	| Dot
// 	| Frame
// 	| Geo
// 	| Hexgrid
// 	| Image
// 	| Line
// 	| Link
// 	| Raster
// 	| Rect
// 	| Text
// 	| TickX
// 	| TickY
// 	| Tip
// 	| Vector;

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
	arrow: (data?: Data, options?: ArrowOptions) => ObservablePlot.arrow(data, { ...options }),
	auto: (data?: Data, options?: AutoOptions) => ObservablePlot.auto(data, { ...options }),
	autoSpec: (data?: Data, options?: AutoOptions) => ObservablePlot.autoSpec(data, { ...options }),
	axisX: (...args: [data?: Data, options?: AxisXOptions] | [options?: AxisXOptions]) =>
		args.length > 1
			? ObservablePlot.axisX(args[0] as Data, { ...defaultXAxis, ...args[1] })
			: ObservablePlot.axisX({ ...defaultXAxis, ...args[1] }),
	axisY: (...args: [data?: Data, options?: AxisYOptions] | [options?: AxisYOptions]) =>
		args.length > 1
			? ObservablePlot.axisY(args[0] as Data, { ...defaultYAxis, ...args[1] })
			: ObservablePlot.axisY({ ...defaultYAxis, ...args[1] }),
	barX: (data?: Data, options?: BarXOptions) => ObservablePlot.barX(data, { ...options }),
	barY: (data?: Data, options?: BarYOptions) => ObservablePlot.barY(data, { ...options }),
	bollinger: (options?: BollingerOptions) => ObservablePlot.bollinger({ ...options }),
	bollingerX: (data?: Data, options?: BollingerXOptions) =>
		ObservablePlot.bollingerX(data, { ...options }),
	bollingerY: (data?: Data, options?: BollingerYOptions) =>
		ObservablePlot.bollingerY(data, { ...options }),
	boxX: (data?: Data, options?: BoxXOptions) => ObservablePlot.boxX(data, { ...options }),
	boxY: (data?: Data, options?: BoxYOptions) => ObservablePlot.boxY(data, { ...options }),
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
	pointer: <T>(options?: T & PointerOptions) => ObservablePlot.pointer({ ...options }),
	pointerX: <T>(options?: T & PointerOptions) => ObservablePlot.pointerX({ ...options }),
	pointerY: <T>(options?: T & PointerOptions) => ObservablePlot.pointerY({ ...options }),
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
	text: (data?: Data, options?: TextOptions) => ObservablePlot.text(data, { ...options }),
	textX: (data?: Data, options?: TextOptions) => ObservablePlot.textX(data, { ...options }),
	textY: (data?: Data, options?: TextOptions) => ObservablePlot.textY(data, { ...options }),
	tip: (data?: Data, options?: TipOptions) => {
		ObservablePlot.tip(data, { ...defaultTip, ...options });
	}
};
