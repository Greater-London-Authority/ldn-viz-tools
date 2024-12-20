import type {
	Area,
	Arrow,
	AutoSpec,
	BarX,
	BarY,
	Cell,
	CompoundMark,
	Contour,
	Density,
	Difference,
	Dot,
	Frame,
	Geo,
	Hexgrid,
	Image,
	Line,
	Link,
	Raster,
	Rect,
	RenderableMark,
	RuleX,
	RuleY,
	Text,
	TickX,
	TickY,
	Tip,
	Vector
} from '@observablehq/plot';
import * as ObservablePlot from '@observablehq/plot';
import { getDefaultPlotStyles, type ThemeMode } from './observablePlotFragments';

interface PlotOptions {
	size?: {};
	color?: {};
	xScale?: {};
	yScale?: {};
}

type Marks =
	| Area
	| Arrow
	| AutoSpec
	// | CompoundMark
	| RuleX
	| RuleY
	| BarX
	| BarY
	| Cell
	| Contour
	| RenderableMark
	| Density
	| Difference
	| Dot
	| Frame
	| Geo
	| Hexgrid
	| Image
	| Line
	| Link
	| Raster
	| Rect
	| Text
	| TickX
	| TickY
	| Tip
	| Vector;

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
	gridX: (options: any) => ObservablePlot.gridX({ ...defaultGridX, ...options }),
	gridY: (options: any) => ObservablePlot.gridY({ ...defaultGridY, ...options }),
	axisX: (options: any) => ObservablePlot.axisX({ ...defaultXAxis, ...options }),
	axisY: (options: any) => ObservablePlot.axisY({ ...defaultYAxis, ...options }),
	line: (options: any) => ObservablePlot.line({ ...defaultLine, ...options }),
	lineX: (options: any) => ObservablePlot.lineX({ ...defaultLine, ...options }),
	lineY: (options: any) => ObservablePlot.lineY({ ...defaultLine, ...options }),
	dashedLine: (options: any) => ObservablePlot.line({ ...defaultDashedLine, ...options }),
	dashedLineX: (options: any) => ObservablePlot.lineX({ ...defaultDashedLine, ...options }),
	dashedLineY: (options: any) => ObservablePlot.lineY({ ...defaultDashedLine, ...options }),
	dot: (options: any) => ObservablePlot.dot({ ...defaultDot, ...options }),
	dotX: (options: any) => ObservablePlot.dotX({ ...defaultDot, ...options }),
	dotY: (options: any) => ObservablePlot.dotY({ ...defaultDot, ...options }),
	point: (options: any) => ObservablePlot.dot({ ...defaultDot, ...options }),
	pointX: (options: any) => ObservablePlot.dotX({ ...defaultDot, ...options }),
	pointY: (options: any) => ObservablePlot.dotY({ ...defaultDot, ...options }),
	area: (options: any) => ObservablePlot.area({ ...defaultArea, ...options }),
	areaX: (options: any) => ObservablePlot.areaX({ ...defaultArea, ...options }),
	areaY: (options: any) => ObservablePlot.areaY({ ...defaultArea, ...options }),
	ruleY: (options: any) => ObservablePlot.ruleY({ ...defaultRule, ...options }),
	ruleX: (options: any) => ObservablePlot.ruleX({ ...defaultRule, ...options }),
	tip: (options: any) => ObservablePlot.tip({ ...defaultTip, ...options }),
	annotationTip: (options: any) => ObservablePlot.tip({ ...defaultAnnotationTip, ...options }),
	annotationText: (options: any) => ObservablePlot.text({ ...defaultAnnotationText, ...options })
};
