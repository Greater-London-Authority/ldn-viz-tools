<script context="module">
	import HandleRedirectFromAuth from './HandleRedirectFromAuth.svelte';

	export const meta = {
		title: 'Ui/Auth/HandleRedirectFromAuth',
		component: HandleRedirectFromAuth
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<!-- This story is empty, as we don't actually want to redirect from Storybook. -->
<Story name="Default" source />
