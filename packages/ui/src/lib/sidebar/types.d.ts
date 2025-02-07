export type PlacementType = 'left' | 'right' | 'bottom' | 'top';

export type AlwaysOpenType = 'true' | 'false';

export interface SidebarPlacement {
	initial?: PlacementType;
	sm?: PlacementType;
	md?: PlacementType;
	lg?: PlacementType;
	xl?: PlacementType;
	'2xl'?: PlacementType;
}

// Can maybe extend SidebarPlacement above
export type PlacementLookup = { [key: string]: string }; // tighten first key to literals

export type WidthLookup = { [key: string]: { [key: string]: string } }; // tighten first key to literals
