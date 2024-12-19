import themeTokens from '@ldn-viz/themes/styles/js/theme-tokens';
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
import { fontStack, getDefaultPlotStyles, type ThemeMode } from './observablePlotFragments';

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

// function that will take a marks prop and return a spec to be plotted
export const glaPlot = (
	_data: any,
	mode: ThemeMode,
	marks: Marks,
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
