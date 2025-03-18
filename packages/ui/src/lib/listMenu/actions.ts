import type ListMenuItem from './ListMenuItem.svelte';

type ItemElement = ListMenuItem & HTMLElement;

export const menuFocus = (node: HTMLElement, props: { isExpanded: boolean }) => {
	const items = Array.from(node.children) as ItemElement[];
	let { isExpanded } = props;

	const findIndexOfItem = (item: ItemElement) => {
		return items.find((elem: ListMenuItem) => elem.id === item.id);
	};

	const moveFocusToItem = (item: ItemElement) => {
		item.focus();
	};

	const moveFocusToNextItem = (item: ItemElement) => {
		let index: number;
		const lastItem = items[items.length - 1];

		if (item.id !== lastItem.id) {
			index = findIndexOfItem(item);
			moveFocusToItem(items[index + 1]);
		}
	};

	const moveFocusToPreviousItem = (item: ItemElement) => {
		let index: number;
		const firstItem = items[0];

		if (item.id !== firstItem.id) {
			index = findIndexOfItem(item);
			moveFocusToItem(items[index - 1]);
		}
	};

	const handleKeydown = (ev: KeyboardEvent) => {
		const target = ev.target;

		const isItem = (element: EventTarget | null): element is ItemElement => {
			return element instanceof HTMLElement && 'id' in element;
		};

		if (isItem(target)) {
			if (ev.key === 'ArrowUp') {
				moveFocusToPreviousItem(target);
			} else if (ev.key === 'ArrowDown') {
				moveFocusToNextItem(target);
			} else if (ev.key === 'Esc') {
				isExpanded = false;
			}
		}
	};

	node.addEventListener('keydown', handleKeydown);

	return {
		update: (isExpanded: boolean) => isExpanded,
		destroy: () => node.removeEventListener('keydown', handleKeydown)
	};
};
