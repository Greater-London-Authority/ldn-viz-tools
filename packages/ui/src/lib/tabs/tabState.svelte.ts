import { getContext, setContext } from 'svelte';

export class TabState {
	current = $state();
}

const TAB_KEY = Symbol('TABS');

export function setTabState() {
	return setContext(TAB_KEY, new TabState());
}

export function getTabState() {
	return getContext<ReturnType<typeof setTabState>>(TAB_KEY);
}
