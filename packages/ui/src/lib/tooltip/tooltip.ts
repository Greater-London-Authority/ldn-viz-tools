import { createFloatingActions } from 'svelte-floating-ui';

export const [floatingRef, floatingContent] = createFloatingActions({
	strategy: 'fixed',
	placement: 'top'
});
