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

export const widthLookup: WidthLookup = {
	standard: {
		left: 'w-[408px] h-full',
		right: 'w-[408px] h-full',
		top: 'w-full h-2/3 min-h-[408px]', //TODO breakpoints?
		bottom: 'w-full h-2/3 min-h-[408px]'
	},
	wide: {
		left: 'w-[608px] h-full',
		right: 'w-[608px] h-full',
		top: 'w-full h-2/3 min-h-[408px]', //TODO breakpoints?
		bottom: 'w-full h-2/3 min-h-[408px]'
	}
};

export const wrapperFlowLookup: PlacementLookup = {
	left: 'flex-row-reverse',
	right: 'flex-row',
	top: 'flex-col-reverse',
	bottom: 'flex-col'
};

// // Because these 'stack' we need to reset any previous start/ end as we go
// export const positions: PositionLookup = {
// 	initial: {
// 		left: 'inset-y-0 start-0',
// 		right: 'inset-y-0 end-0',
// 		top: 'inset-x-0 top-0',
// 		bottom: 'inset-x-0 bottom-0'
// 	},
// 	sm: {
// 		left: 'sm:inset-y-0 sm:start-0 sm:end-auto sm:inset-x-auto',
// 		right: 'sm:inset-y-0 sm:end-0 sm:start-auto sm:inset-x-auto',
// 		top: 'sm:inset-x-0 sm:top-0 sm:bottom-auto sm:inset-y-auto',
// 		bottom: 'sm:inset-x-0 sm:bottom-0 sm:top-auto sm:inset-y-auto'
// 	},
// 	md: {
// 		left: 'md:inset-y-0 md:start-0 md:end-auto md:inset-x-auto',
// 		right: 'md:inset-y-0 md:end-0 md:start-auto md:inset-x-auto',
// 		top: 'md:inset-x-0 md:top-0 md:bottom-auto md:inset-y-auto',
// 		bottom: 'md:inset-x-0 md:bottom-0 md:top-auto md:inset-y-auto'
// 	},
// 	lg: {
// 		left: 'lg:inset-y-0 lg:start-0 lg:end-auto lg:inset-x-auto',
// 		right: 'lg:inset-y-0 lg:end-0 lg:start-auto lg:inset-x-auto',
// 		top: 'lg:inset-x-0 lg:top-0 lg:bottom-auto lg:inset-y-auto',
// 		bottom: 'lg:inset-x-0 lg:bottom-0 lg:top-auto lg:inset-y-auto'
// 	},
// 	xl: {
// 		left: 'xl:inset-y-0 xl:start-0 xl:end-auto xl:inset-x-auto',
// 		right: 'xl:inset-y-0 xl:end-0 xl:start-auto xl:inset-x-auto',
// 		top: 'xl:inset-x-0 xl:top-0 xl:bottom-auto xl:inset-y-auto',
// 		bottom: 'xl:inset-x-0 xl:bottom-0 xl:top-auto xl:inset-y-auto'
// 	},
// 	'2xl': {
// 		left: '2xl:inset-y-0 2xl:start-0 2xl:end-auto 2xl:inset-x-auto',
// 		right: '2xl:inset-y-0 2xl:end-0 2xl:start-auto 2xl:inset-x-auto',
// 		top: '2xl:inset-x-0 2xl:top-0 2xl:bottom-auto 2xl:inset-y-auto',
// 		bottom: '2xl:inset-x-0 2xl:bottom-0 2xl:top-auto 2xl:inset-y-auto'
// 	}
// };

// // Depending on the sidebar position, the togggle needs to be offset diferently (same valuse as position?!)

// export const togglePositions: PositionLookup = {
// 	initial: {
// 		left: '-end-[40px]',
// 		right: '-start-[40px]',
// 		top: '-bottom-[40px]',
// 		bottom: '-top-[40px]'
// 	},
// 	sm: {
// 		left: 'sm:-end-[40px] sm:start-auto sm:top-auto sm:bottom-auto',
// 		right: 'sm:-start-[40px] sm:end-auto sm:top-auto sm:bottom-auto',
// 		top: 'sm:-bottom-[40px] sm:top-auto sm:start-auto sm:end-auto',
// 		bottom: 'sm:-top-[40px] sm:bottom-auto sm:start-auto sm:end-auto'
// 	},

// 	md: {
// 		left: 'md:-end-[40px] md:start-auto md:top-auto md:bottom-auto',
// 		right: 'md:-start-[40px] md:end-auto md:top-auto md:bottom-auto',
// 		top: 'md:-bottom-[40px] md:top-auto md:start-auto md:end-auto',
// 		bottom: 'md:-top-[40px] md:bottom-auto md:start-auto md:end-auto'
// 	},
// 	lg: {
// 		left: 'lg:-end-[40px] lg:start-auto lg:top-auto lg:bottom-auto',
// 		right: 'lg:-start-[40px] lg:end-auto lg:top-auto lg:bottom-auto',
// 		top: 'lg:-bottom-[40px] lg:top-auto lg:start-auto lg:end-auto',
// 		bottom: 'lg:-top-[40px] lg:bottom-auto lg:start-auto lg:end-auto'
// 	},
// 	xl: {
// 		left: 'xl:-end-[40px] xl:start-auto xl:top-auto xl:bottom-auto',
// 		right: 'xl:-start-[40px] xl:end-auto xl:top-auto xl:bottom-auto',
// 		top: 'xl:-bottom-[40px] xl:top-auto xl:start-auto xl:end-auto',
// 		bottom: 'xl:-top-[40px] xl:bottom-auto xl:start-auto xl:end-auto'
// 	},
// 	'2xl': {
// 		left: '2xl:-end-[40px] 2xl:start-auto 2xl:top-auto 2xl:bottom-auto',
// 		right: '2xl:-start-[40px] 2xl:end-auto 2xl:top-auto 2xl:bottom-auto',
// 		top: '2xl:-bottom-[40px] 2xl:top-auto 2xl:start-auto 2xl:end-auto',
// 		bottom: '2xl:-top-[40px] 2xl:bottom-auto 2xl:start-auto 2xl:end-auto'
// 	}
// };

// export const tabPositions: PositionLookup = {
// 	initial: {
// 		left: '-end-[80px] inset-y-0',
// 		right: '-start-[80px] inset-y-0',
// 		top: '-bottom-[80px] inset-x-0',
// 		bottom: '-top-[80px] inset-x-0'
// 	},
// 	sm: {
// 		left: 'sm:-end-[80px] sm:start-auto sm:inset-y-0 sm:inset-x-auto',
// 		right: 'sm:-start-[80px] sm:end-auto sm:inset-y-0 sm:inset-x-auto',
// 		top: 'sm:-bottom-[80px] sm:top-auto sm:inset-y-auto sm:inset-x-0',
// 		bottom: 'sm:-top-[80px] sm:bottom-auto sm:inset-y-auto sm:inset-x-0'
// 	},
// 	md: {
// 		left: 'md:-end-[80px] md:start-auto md:inset-y-0 md:inset-x-auto',
// 		right: 'md:-start-[80px] md:end-auto md:inset-y-0 md:inset-x-auto',
// 		top: 'md:-bottom-[80px] md:top-auto md:inset-y-auto md:inset-x-0',
// 		bottom: 'md:-top-[80px] md:bottom-auto md:inset-y-auto md:inset-x-0'
// 	},
// 	lg: {
// 		left: 'lg:-end-[80px] lg:start-auto lg:inset-y-0 lg:inset-x-auto',
// 		right: 'lg:-start-[80px] lg:end-auto lg:inset-y-0 lg:inset-x-auto',
// 		top: 'lg:-bottom-[80px] lg:top-auto lg:inset-y-auto lg:inset-x-0',
// 		bottom: 'lg:-top-[80px] lg:bottom-auto lg:inset-y-auto lg:inset-x-0'
// 	},
// 	xl: {
// 		left: 'xl:-end-[80px] xl:start-auto xl:inset-y-0 xl:inset-x-auto',
// 		right: 'xl:-start-[80px] xl:end-auto xl:inset-y-0 xl:inset-x-auto',
// 		top: 'xl:-bottom-[80px] xl:top-auto xl:inset-y-auto xl:inset-x-0',
// 		bottom: 'xl:-top-[80px] xl:bottom-auto xl:inset-y-auto xl:inset-x-0'
// 	},
// 	'2xl': {
// 		left: '2xl:-end-[80px] 2xl:start-auto 2xl:inset-y-0 2xl:inset-x-auto',
// 		right: '2xl:-start-[80px] 2xl:end-auto 2xl:inset-y-0 2xl:inset-x-auto',
// 		top: '2xl:-bottom-[80px] 2xl:top-auto 2xl:inset-y-auto 2xl:inset-x-0',
// 		bottom: '2xl:-top-[80px] 2xl:bottom-auto 2xl:inset-y-auto 2xl:inset-x-0'
// 	}
// };

// // When switch to top/bottom height is set to 408px - using % based will require rethink/ refactor
// // also uing max-h won't work in the current setup as 'push' div needs explicit size
// export const widthLookup: WidthLookup = {
// 	standard: {
// 		initial: {
// 			left: 'w-[408px] h-dvh',
// 			right: 'w-[408px] h-dvh',
// 			top: 'w-full h-[408px]',
// 			bottom: 'w-full h-[408px]'
// 		},
// 		sm: {
// 			left: 'sm:w-[408px] sm:h-dvh ',
// 			right: 'sm:w-[408px] sm:h-dvh ',
// 			top: 'sm:w-full sm:h-[408px] ',
// 			bottom: 'sm:w-full sm:h-[408px] '
// 		},
// 		md: {
// 			left: 'md:w-[408px] md:h-dvh ',
// 			right: 'md:w-[408px] md:h-dvh ',
// 			top: 'md:w-full md:h-[408px]',
// 			bottom: 'md:w-full md:h-[408px]'
// 		},
// 		lg: {
// 			left: 'lg:w-[408px] lg:h-dvh',
// 			right: 'lg:w-[408px] lg:h-dvh',
// 			top: 'lg:w-full lg:h-[408px]',
// 			bottom: 'lg:w-full lg:h-[408px]'
// 		},
// 		xl: {
// 			left: 'xl:w-[408px] xl:h-dvh',
// 			right: 'xl:w-[408px] xl:h-dvh',
// 			top: 'xl:w-full xl:h-[408px]',
// 			bottom: 'xl:w-full xl:h-[408px]'
// 		},
// 		'2xl': {
// 			left: '2xl:w-[408px] 2xl:h-dvh',
// 			right: '2xl:w-[408px] 2xl:h-dvh',
// 			top: '2xl:w-full 2xl:h-[408px]',
// 			bottom: '2xl:w-full 2xl:h-[408px] '
// 		}
// 	},
// 	wide: {
// 		initial: {
// 			left: 'w-[608px] h-dvh',
// 			right: 'w-[608px] h-dvh',
// 			top: 'w-full h-[408px]',
// 			bottom: 'w-full h-[408px]'
// 		},
// 		sm: {
// 			left: 'sm:w-[608px] sm:h-dvh',
// 			right: 'sm:w-[608px] sm:h-dvh',
// 			top: 'sm:w-full sm:h-[408px]',
// 			bottom: 'sm:w-full sm:h-[408px]'
// 		},
// 		md: {
// 			left: 'md:w-[608px] md:h-dvh',
// 			right: 'md:w-[608px] md:h-dvh',
// 			top: 'md:w-full md:h-[408px]',
// 			bottom: 'md:w-full md:h-[408px]'
// 		},
// 		lg: {
// 			left: 'lg:w-[608px] lg:h-dvh',
// 			right: 'lg:w-[608px] lg:h-dvh',
// 			top: 'lg:w-full lg:h-[408px]',
// 			bottom: 'lg:w-full lg:h-[408px]'
// 		},
// 		xl: {
// 			left: 'xl:w-[608px] xl:h-dvh',
// 			right: 'xl:w-[608px] xl:h-dvh',
// 			top: 'xl:w-full xl:h-[408px]',
// 			bottom: 'xl:w-full xl:h-[408px]'
// 		},
// 		'2xl': {
// 			left: '2xl:w-[608px] 2xl:h-dvh',
// 			right: '2xl:w-[608px] 2xl:h-dvh',
// 			top: '2xl:w-full 2xl:h-[408px]',
// 			bottom: '2xl:w-full 2xl:h-[408px]'
// 		}
// 	}
// };

// export const tabLayoutOverride: PositionLookup = {
// 	initial: {
// 		left: '!w-20 !flex-col !space-y-0.5 !pb-0 !float-none',
// 		right: '!w-20 !flex-col !space-y-0.5 !pb-0 !float-none',
// 		top: '!w-auto !flex !flex-row !space-y-0 !pb-0 !float-left',
// 		bottom: '!w-auto !flex !flex-row !space-y-0 !pb-0 !float-left'
// 	},
// 	sm: {
// 		left: 'sm:!w-20  sm:!flex-col sm:!space-y-0.5 sm:!pb-0 sm:!float-none',
// 		right: 'sm:!w-20 sm:!flex-col sm:!space-y-0.5 sm:!pb-0 sm:!float-none',
// 		top: 'sm:!w-auto sm:!flex sm:!flex-row sm:!space-y-0 sm:!pb-0 sm:!float-left',
// 		bottom: 'sm:!w-auto sm:!flex sm:!flex-row sm:!space-y-0 sm:!pb-0 sm:!float-left'
// 	},
// 	md: {
// 		left: 'md:!w-20  md:!flex-col md:!space-y-0.5 md:!pb-0 md:!float-none',
// 		right: 'md:!w-20  md:!flex-col md:!space-y-0.5 md:!pb-0 md:!float-none',
// 		top: 'md:!w-auto md:!flex md:!flex-row md:!space-y-0 md:!pb-0 md:!float-left',
// 		bottom: 'md:!w-auto md:!flex md:!flex-row md:!space-y-0 md:!pb-0 md:!float-left'
// 	},
// 	lg: {
// 		left: 'lg:!w-20  lg:!flex-col lg:!space-y-0.5 lg:!pb-0 lg:!float-none',
// 		right: 'lg:!w-20  lg:!flex-col lg:!space-y-0.5 lg:!pb-0 lg:!float-none',
// 		top: 'lg:!w-auto lg:!flex lg:!flex-row lg:!space-y-0 lg:!pb-0 lg:!float-left',
// 		bottom: 'lg:!w-auto lg:!flex lg:!flex-row lg:!space-y-0 lg:!pb-0 lg:!float-left'
// 	},
// 	xl: {
// 		left: 'xl:!w-20  xl:!flex-col xl:!space-y-0.5 xl:!pb-0 xl:!float-none',
// 		right: 'xl:!w-20  xl:!flex-col xl:!space-y-0.5 xl:!pb-0 xl:!float-none',
// 		top: 'xl:!w-auto xl:!flex xl:!flex-row xl:!space-y-0 xl:!pb-0 xl:!float-left',
// 		bottom: 'xl:!w-auto xl:!flex xl:!flex-row xl:!space-y-0 xl:!pb-0 xl:!float-left'
// 	},
// 	'2xl': {
// 		left: '2xl:!w-20 2xl:!flex-col 2xl:!space-y-0.5 2xl:!pb-0 2xl:!float-none',
// 		right: '2xl:!w-20 2xl:!flex-col 2xl:!space-y-0.5 2xl:!pb-0 2xl:!float-none',
// 		top: '2xl:!w-auto 2xl:!flex 2xl:!flex-row 2xl:!space-y-0 2xl:!pb-0 2xl:!float-left',
// 		bottom: '2xl:!w-auto 2xl:!flex 2xl:!flex-row 2xl:!space-y-0 2xl:!pb-0 2xl:!float-left'
// 	}
// };

// export const wrapperFlow: PositionLookup = {
// 	initial: {
// 		left: 'flex-row-reverse',
// 		right: 'flex-row',
// 		top: 'flex-col-reverse',
// 		bottom: 'flex-col'
// 	},
// 	sm: {
// 		left: 'sm:flex-row-reverse',
// 		right: 'sm:flex-row',
// 		top: 'sm:flex-col-reverse',
// 		bottom: 'sm:flex-col'
// 	},
// 	md: {
// 		left: 'md:flex-row-reverse',
// 		right: 'md:flex-row',
// 		top: 'md:flex-col-reverse',
// 		bottom: 'md:flex-col'
// 	},
// 	lg: {
// 		left: 'lg:flex-row-reverse',
// 		right: 'lg:flex-row',
// 		top: 'lg:flex-col-reverse',
// 		bottom: 'lg:flex-col'
// 	},
// 	xl: {
// 		left: 'xl:flex-row-reverse',
// 		right: 'xl:flex-row',
// 		top: 'xl:flex-col-reverse',
// 		bottom: 'xl:flex-col'
// 	},
// 	'2xl': {
// 		left: '2xl:flex-row-reverse',
// 		right: '2xl:flex-row',
// 		top: '2xl:flex-col-reverse',
// 		bottom: '2xl:flex-col'
// 	}
// };

// const translateLookup: PositionLookup = {
// 	initial: {
// 		left: '-translate-x-[408px]',
// 		right: 'translate-x-[408px]',
// 		top: 'translate-y-[408px]',
// 		bottom: '-translate-y-[408px]'
// 	},
// 	md: {
// 		left: 'md:-translate-x-[408px]',
// 		right: 'md:translate-x-[408px]',
// 		top: 'translate-y-[408px]',
// 		bottom: '-translate-y-[408px]'
// 	} //etc
// };

// const translateClasses = Object.entries(position).map(
// 	([bp, value]) => translateLookup[bp][value]
// );

// $: console.log(translateClasses);
