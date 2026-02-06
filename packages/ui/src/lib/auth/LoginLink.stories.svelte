<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LoginLink from './LoginLink.svelte';

	/**
	 * The `LoginLink` component renders a link to log in with the authorization server.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Auth/Login Link',
		component: LoginLink,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { oauth_config } from './demo_config';
</script>

<Story name="Default">
	{#snippet template(args)}
		<LoginLink {...args} config={oauth_config} />
	{/snippet}
</Story>
