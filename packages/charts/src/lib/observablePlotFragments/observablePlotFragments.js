import { theme } from '@ldn-viz/utils';

export const fontStack = "'Aktiv Grotesk', system-ui, sans-serif";

export const defaultStyle = {
	color: theme.light.labels,
	fontSize: '18px',
	fontFamily: fontStack,
	background: theme.light.background
};

export const defaultSize = {
	width: 1100,
	height: 600,
	marginRight: 20,
	marginLeft: 100,
	marginTop: 30,
	marginBottom: 50
};

export const defaultColor = {
	legend: true,
	swatchSize: 25,
	className: 'defaultCcolorLegendLabel',

	type: 'ordinal'
};

export const defaultXAxis = {
	label: '',
	grid: true,
	labelArrow: 'none'
};

export const defaultYAxis = {
	grid: true,
	tickSize: 0,
	label: '',
	labelArrow: 'none'
};

export const defaultLine = {
	stroke: theme.light.primary,
	strokeWidth: 2
};

export const defaultDashedLine = {
	...defaultLine,
	strokeDasharray: '5,5'
};

export const defaultDot = {
	stroke: theme.light.primary,
	strokeWidth: 2,
	r: 8,
	fill: 'white'
};

export const defaultArea = {
	stroke: theme.light.primary,
	strokeWidth: 0,
	fill: theme.light.primary,
	opacity: 0.2
};

export const defaultRule = {
	stroke: theme.light.axis
};

export const defaultAnnotationText = {
	fontSize: '25px',
	fill: theme.light.primary
};
