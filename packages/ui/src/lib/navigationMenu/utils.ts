import type { NavigationMenuItemProps } from './types';

/*
 	USAGE: import page and resolve in your sveltekit app. Pass to the function and bing the resulting id to NavigationMenu 

	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let activeMenuItem = $derived(findActiveItem(mainMenu, page, resolve));

	<NavigationMenu
		{items}
		activeMenuItemId={activeMenuItem?.id}
	/>
*/

export const findActiveItem = (
	items: NavigationMenuItemProps[],
	page: any,
	resolve: (url: string) => string
) => {
	for (const item of items) {
		if (page.url?.pathname.endsWith(resolve(item.href ?? '/'))) {
			return item;
		}
	}
};
