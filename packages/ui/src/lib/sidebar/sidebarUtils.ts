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
	// left: '-end-[80px] inset-y-0',
	left: 'inset-y-0 z-30 border-r border-color-ui-border-secondary',
	right: '-start-[80px] inset-y-0 border-l border-color-ui-border-secondary',
	top: '-bottom-[80px] inset-x-0 border-b border-color-ui-border-secondary',
	bottom: '-top-[80px] inset-x-0 border-t border-color-ui-border-secondary'
};

export const tabLayoutOverride: PlacementLookup = {
	left: '!w-20 !flex-col !space-y-0.5 !pb-0 !float-none',
	right: '!w-20 !flex-col !space-y-0.5 !pb-0 !float-none',
	top: '!w-auto !flex !flex-row !space-y-0 !pb-0 !float-left',
	bottom: '!w-auto !flex !flex-row !space-y-0 !pb-0 !float-left'
};

export const tabThemeOverride = '[&>button]:bg-color-container-level-0 [&>button]:no-underline';

// const orientationClasses =
// 	'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center';

// $: tabLabelClasses = classNames(...themeClasses, orientationClasses, 'select-none');

// The width and height classes are a bit complex to accommodate absolutely positioned nav trigger elements...
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
		bottom: 'h-[60dvh] max-h-[800px]'
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
