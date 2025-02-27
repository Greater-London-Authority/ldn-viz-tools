import type { Tab } from './types';

export const tabFocus = (
	node: HTMLElement,
	props: { handleSelect: (id: Tab['id']) => void; orientation: 'vertical' | 'horizontal' }
) => {
	const tabs = Array.from(node.children) as Tab[];
	const { handleSelect, orientation } = props;

	const findIndexOfTab = (tab: Tab) => {
		return tabs.findIndex((elem: Tab) => elem.id === tab.id);
	};

	const moveFocusToTab = (tab: Tab) => {
		tab.focus();
	};

	const moveFocusToNextTab = (tab: Tab) => {
		let index: number;
		const firstTab = tabs[0];
		const lastTab = tabs[tabs.length - 1];

		if (tab.id === lastTab.id) {
			moveFocusToTab(firstTab);
		} else {
			index = findIndexOfTab(tab);
			moveFocusToTab(tabs[index + 1]);
		}
	};

	const moveFocusToPreviousTab = (tab: Tab) => {
		let index: number;
		const firstTab = tabs[0];
		const lastTab = tabs[tabs.length - 1];

		if (tab.id === firstTab.id) {
			moveFocusToTab(lastTab);
		} else {
			index = findIndexOfTab(tab);
			moveFocusToTab(tabs[index - 1]);
		}
	};

	const handleKeydown = (ev: KeyboardEvent) => {
		const target = ev.target;

		const isTab = (element: EventTarget | null): element is Tab => {
			return element instanceof HTMLElement && 'id' in element;
		};

		if (isTab(target)) {
			if (ev.key === 'Enter' || ev.key === ' ') {
				handleSelect(target.id);
			}

			if (orientation === 'horizontal' && ev.key === 'ArrowLeft') {
				moveFocusToPreviousTab(target);
			} else if (orientation === 'horizontal' && ev.key === 'ArrowRight') {
				moveFocusToNextTab(target);
			} else if (orientation === 'vertical' && ev.key === 'ArrowUp') {
				moveFocusToPreviousTab(target);
			} else if (orientation === 'vertical' && ev.key === 'ArrowDown') {
				moveFocusToNextTab(target);
			}
		}
	};

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
		}
	};
};
