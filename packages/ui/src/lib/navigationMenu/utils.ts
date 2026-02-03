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

const getItems = (item: NavigationMenuItemProps): NavigationMenuItemProps[] => {
	return [item, ...(item.children || []).flatMap((it) => getItems(it))];
};

export const findActiveItem = (
	items: NavigationMenuItemProps[],
	page: any,
	resolve: (url: string) => string
) => {
	let bestMatch: NavigationMenuItemProps | undefined = undefined;

	const flattenedItemList = (items || [])?.flatMap((it) => getItems(it));

	for (const item of flattenedItemList) {
		if (page.url?.pathname.startsWith(resolve(item.href ?? '/'))) {
			const itemPath = item?.href ?? '';
			const bestMatchPath = bestMatch?.href ?? '';

			if (itemPath.split('/').length > bestMatchPath.split('/').length) {
				bestMatch = item;
			}
		}
	}

	return bestMatch;
};
