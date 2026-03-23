<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import AuthMenu from './AuthMenu.svelte';

	/**
	 * The `AuthMenu` component is intended to be used in a Header.
	 * Depending on whether the user is already logged-in, it displays either a login link,
	 * or the current username and a log-out button.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Auth/Auth Menu',
		component: AuthMenu,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { oauth_config } from './demo_config';
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="h-96">
			<AuthMenu {...args} config={oauth_config} />
		</div>
	{/snippet}
</Story>
