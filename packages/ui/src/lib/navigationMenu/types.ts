export type NavigationMenuProps = {
	/**
	 * Label to describe what the nav menu is for.
	 */
	ariaLabel: string;
	/**
	 * Value for the `id` attribute of the nav list.
	 */
	id?: string;
	/**
	 * Array of list items for rendering, that take a label and optional url and children.
	 */
	items: NavigationMenuItemProps[];
	/**
	 * Optional prop to customise width.
	 */
	width?: string;
	/**
	 * Optional prop to disable collapsing and expanding sections and make all list items visible.
	 */
	isAlwaysExpanded?: boolean;
	/**
	 * Optional prop to change orientation.
	 */
	orientation?: 'vertical' | 'horizontal';
	/**
	 * Exposes active menu item to parent container for modification.
	 */
	selectedMenuItemId?: string;
};

export interface NavigationMenuItemProps {
	/**
	 * Link title which should correspond to the page title
	 */
	title: string;
	/**
	 * Value set as the `id` attribute of the `<a>` or `<div>` element. Should be in the array of `items` but defaults to randomly generated value in case not.
	 */
	id?: any;
	/**
	 * Url to navigate to when link is clicked.
	 */
	href: string;
	/**
	 * Optional list of children items, if they exist.
	 */
	children?: NavigationMenuItemProps[];
	/**
	 * Sets whether or not the list is expanded
	 */
	isExpanded?: boolean;
	/**
	 * Value set to apply styling to text. Defaults to 1, as in base list but increases if the list is nested.
	 */
	level?: number;

	/**
	 * Event handler to handle what happens when links are clicked.
	 */
	onChange?: any;
}
