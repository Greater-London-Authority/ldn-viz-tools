interface BreakpointObj {
	initial?: any;
	sm?: any;
	md?: any;
	lg?: any;
	xl?: any;
	'2xl'?: any;
}

// A default screen object derived from tailwind config
const screens: BreakpointObj = {
	initial: 0,
	// below from our/ tailwind config
	sm: 640, // => @media (min-width: 640px) { ... }
	md: 768, // => @media (min-width: 768px) { ... }
	lg: 1024, // => @media (min-width: 1024px) { ... }
	xl: 1280, // => @media (min-width: 1280px) { ... }
	'2xl': 1536 // => @media (min-width: 1536px) { ... }
};

// Given a screens object, takes a settings object - passed to the component as props: {initial: 'propValue', sm: 'anotherPropValue' ...}
// and the borderBox width (derived from svelte binding)

export const getSettingByScreenWidth =
	(screens: BreakpointObj) => (settings: BreakpointObj, borderBox: number) => {
		return (
			Object.entries(screens)
				.map(([breakpoint, width]) => {
					if (width <= borderBox) {
						return settings[breakpoint as keyof BreakpointObj];
					}
					return null;
				})
				.filter((setting) => !!setting)
				.pop() || settings.initial
		);
	};

// Returns a partially applied function with the default screens settings.
// Can be overridden per project using a custom screens object: getSettingByScreenWidth(customScreens)
export const getSetting = getSettingByScreenWidth(screens);
