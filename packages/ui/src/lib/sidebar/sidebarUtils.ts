// import type { PositionLookup, WidthLookup } from './types';

import type { PlacementLookup, WidthLookup } from './types';

export const placementLookup: PlacementLookup = {
	left: 'inset-y-0 start-0',
	right: 'inset-y-0 end-0',
	top: 'inset-x-0 top-0',
	bottom: 'inset-x-0 bottom-0'
};

export const togglePlacementLookup: PlacementLookup = {
	left: '-end-[40px]',
	right: '-start-[40px]',
	top: '-bottom-[40px]',
	bottom: '-top-[40px]'
};

export const tabPlacementLookup: PlacementLookup = {
	left: '-end-[80px] inset-y-0',
	right: '-start-[80px] inset-y-0',
	top: '-bottom-[80px] inset-x-0',
	bottom: '-top-[80px] inset-x-0'
};

export const tabLayoutOverride: PlacementLookup = {
	left: '!w-20 !flex-col !space-y-0.5 !pb-0 !float-none',
	right: '!w-20 !flex-col !space-y-0.5 !pb-0 !float-none',
	top: '!w-auto !flex !flex-row !space-y-0 !pb-0 !float-left',
	bottom: '!w-auto !flex !flex-row !space-y-0 !pb-0 !float-left'
};

// The width and height classes are a bit complex to accomodate absolutely positioned nav trigger elements...
export const widthLookup: WidthLookup = {
	standard: {
		left: 'max-w-[408px] min-[488px]:min-w-[408px] w-[calc(100vw-80px)]',
		right: 'max-w-[408px] min-[488px]:min-w-[408px] w-[calc(100vw-80px)]',
		top: 'w-full',
		bottom: 'w-full'
	},
	wide: {
		left: 'max-w-[608px] min-[688px]:min-w-[608px] w-[calc(100vw-80px)]',
		right: 'max-w-[608px] min-[688px]:min-w-[608px] w-[calc(100vw-80px)]',
		top: 'w-full',
		bottom: 'w-full'
	}
};

export const heightLookup: WidthLookup = {
	standard: {
		left: 'h-full',
		right: 'h-full',
		top: 'h-[60dvh] max-h-[800px]', //TODO breakpoints?
		bottom: 'h-[60dvh] max-h-[800px]'
	},
	wide: {
		left: 'h-full',
		right: 'h-full',
		top: 'h-[60dvh] max-h-[800px]', //TODO breakpoints?
		bottom: 'h-[60dvh]max-h-[800px]'
	}
};

export const wrapperFlowLookup: PlacementLookup = {
	left: 'flex-row-reverse',
	right: 'flex-row',
	top: 'flex-col-reverse',
	bottom: 'flex-col'
};

export const transitionAxis: { [key: string]: any } = {
	left: 'x',
	right: 'x',
	top: 'y',
	bottom: 'y'
};
