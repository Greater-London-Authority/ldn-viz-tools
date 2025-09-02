<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import HandleRedirectFromAuth from './HandleRedirectFromAuth.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Auth/HandleRedirectFromAuth',
		component: HandleRedirectFromAuth,
		tags: ['autodocs']
	});
</script>

<!-- This story is empty, as we don't actually want to redirect from Storybook. -->
<Story name="Default" source />
