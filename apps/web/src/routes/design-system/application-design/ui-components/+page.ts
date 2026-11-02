import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

// The page moved in v4. Prerendering writes this redirect as a meta refresh.
export function load() {
	redirect(308, resolve('/design-system/application-design/actions-and-emphasis'));
}
