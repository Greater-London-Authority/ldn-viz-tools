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
	gridX: (data?: Data, options?: GridXOptions) =>
		data
			? ObservablePlot.gridX(data, { ...defaultGridX, ...options })
			: ObservablePlot.gridX({ ...defaultGridX, ...options }),
	gridY: (data?: Data, options?: GridYOptions) =>
		!data
			? ObservablePlot.gridY({ ...defaultGridY, ...options })
			: ObservablePlot.gridY(data, { ...defaultGridY, ...options }),
	axisX: (data?: Data, options?: AxisXOptions) =>
		data
			? ObservablePlot.axisX(data, { ...defaultXAxis, ...options })
			: ObservablePlot.axisX({ ...defaultXAxis, ...options }),
	axisY: (data?: Data, options?: AxisYOptions) =>
		data
			? ObservablePlot.axisY(data, { ...defaultYAxis, ...options })
			: ObservablePlot.axisY(data, { ...defaultYAxis, ...options }),
	line: (data?: Data, options?: LineOptions) =>
		ObservablePlot.line(data, { ...defaultLine, ...options }),
	lineX: (data?: Data, options?: LineXOptions) =>
		ObservablePlot.lineX(data, { ...defaultLine, ...options }),
	lineY: (data?: Data, options?: LineYOptions) =>
		ObservablePlot.lineY(data, { ...defaultLine, ...options }),
	dashedLine: (data?: Data, options?: LineOptions) =>
		ObservablePlot.line(data, { ...defaultDashedLine, ...options }),
	dashedLineX: (data?: Data, options?: LineXOptions) =>
		ObservablePlot.lineX(data, { ...defaultDashedLine, ...options }),
	dashedLineY: (data?: Data, options?: LineYOptions) =>
		ObservablePlot.lineY(data, { ...defaultDashedLine, ...options }),
	dot: (data?: Data, options?: DotOptions) =>
		ObservablePlot.dot(data, { ...defaultDot, ...options }),
	dotX: (data?: Data, options?: DotXOptions) =>
		ObservablePlot.dotX(data, { ...defaultDot, ...options }),
	dotY: (data?: Data, options?: DotYOptions) =>
		ObservablePlot.dotY(data, { ...defaultDot, ...options }),
	point: (data?: Data, options?: DotOptions) =>
		ObservablePlot.dot(data, { ...defaultDot, ...options }),
	pointX: (data?: Data, options?: DotXOptions) =>
		ObservablePlot.dotX(data, { ...defaultDot, ...options }),
	pointY: (data?: Data, options?: DotYOptions) =>
		ObservablePlot.dotY(data, { ...defaultDot, ...options }),
	area: (data?: Data, options?: AreaOptions) =>
		ObservablePlot.area(data, { ...defaultArea, ...options }),
	areaX: (data?: Data, options?: AreaXOptions) =>
		ObservablePlot.areaX(data, { ...defaultArea, ...options }),
	areaY: (data?: Data, options?: AreaYOptions) =>
		ObservablePlot.areaY(data, { ...defaultArea, ...options }),
	ruleY: (data?: Data, options?: RuleXOptions) =>
		ObservablePlot.ruleY(data, { ...defaultRule, ...options }),
	ruleX: (data?: Data, options?: RuleYOptions) =>
		ObservablePlot.ruleX(data, { ...defaultRule, ...options }),
	tip: (data?: Data, options?: TipOptions) =>
		ObservablePlot.tip(data, { ...defaultTip, ...options }),
	annotationTip: (data?: Data, options?: TipOptions) =>
		ObservablePlot.tip(data, { ...defaultAnnotationTip, ...options }),
	annotationText: (data?: Data, options?: TextOptions) =>
		ObservablePlot.text(data, { ...defaultAnnotationText, ...options }),
	arrow: (data?: Data, options?: ArrowOptions) => ObservablePlot.arrow(data, { ...options }),
	auto: (data?: Data, options?: AutoOptions) => ObservablePlot.auto(data, { ...options }),
	autoSpec: (data?: Data, options?: AutoOptions) => ObservablePlot.autoSpec(data, { ...options }),
	barX: (data?: Data, options?: BarXOptions) => ObservablePlot.barX(data, { ...options }),
	barY: (data?: Data, options?: BarYOptions) => ObservablePlot.barY(data, { ...options }),
	pointer: (options?: PointerOptions) => ObservablePlot.pointer({ ...options }),
	pointerX: (options?: PointerOptions) => ObservablePlot.pointerX({ ...options }),
	pointerY: (options?: PointerOptions) => ObservablePlot.pointerY({ ...options })
};
