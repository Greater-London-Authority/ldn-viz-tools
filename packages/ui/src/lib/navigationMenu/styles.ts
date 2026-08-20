import { classNames } from '../utils/classNames';
import type { NavigationMenuProps } from './types';

type Orientation = NonNullable<NavigationMenuProps['orientation']>;

type Level = 1 | 2 | 3 | 4;

const MAX_LEVEL = 4;

/**
 * Menus can nest arbitrarily deep, but only four levels are styled.
 * Anything deeper is clamped so it inherits the innermost level's styles.
 */
const toLevel = (level: number): Level => Math.min(Math.max(level, 1), MAX_LEVEL) as Level;

/**
 * Typography role and text colour for each nesting level. Exactly one
 * typography role is emitted per level, so nothing relies on class order.
 */
const LEVEL_STYLES: Record<Level, { type: string; color: string }> = {
	1: { type: 'label-tight', color: 'text-color-text' },
	2: { type: 'label-tight', color: 'text-color-text-muted' },
	3: { type: 'label-sm-tight', color: 'text-color-muted' },
	4: { type: 'label-sm-tight', color: 'text-color-text-wash' }
};

/**
 * Classes for the link or toggle button that carries the item's title.
 * When active, the active colour replaces the level colour rather than
 * being layered on top of it.
 */
export const itemTextClass = ({ level, isActive }: { level: number; isActive: boolean }) => {
	const { type, color } = LEVEL_STYLES[toLevel(level)];

	return classNames(
		'flex w-full items-center hover:text-color-interactive-primary-hover hover:underline py-2',
		type,
		isActive ? 'text-color-interactive-primary-active underline' : color
	);
};

/**
 * Classes for the `<li>` wrapping a single item. Top level items are
 * separated by a rule when stacked vertically, apart from the first.
 */
export const listItemClass = ({
	level,
	index,
	orientation
}: {
	level: number;
	index?: number;
	orientation: Orientation;
}) => {
	if (orientation === 'horizontal') {
		return 'relative ';
	}

	if (level !== 1 || index === 0) {
		return '';
	}

	return 'border-t border-color-border-muted';
};

/**
 * Classes for the `<ul>` holding an item's children. Horizontal menus float
 * their top level submenu over the page; nested lists sit inline and indent.
 */
export const childListClass = ({
	level,
	orientation,
	isExpanded
}: {
	level: number;
	orientation: Orientation;
	isExpanded: boolean;
}) => {
	if (!isExpanded) {
		return 'hidden';
	}

	const isIndented = (level === 1 && orientation !== 'horizontal') || level === 2;

	return classNames(
		'mb-1',
		isIndented ? 'pl-2' : '',
		orientation === 'horizontal'
			? `w-full bg-color-container' ${level === 1 ? 'absolute z-10' : 'relative'}`
			: ''
	);
};
