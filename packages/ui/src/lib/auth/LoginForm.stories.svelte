<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LoginForm from './LoginForm.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Auth/Login Form',
		component: LoginForm,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { accessToken, authError, roles, userName } from './auth';
	import { oauth_config } from './demo_config';

	const setNotLoggedIn = () => {
		accessToken.set('');
		userName.set('');
		roles.set(['']);
		authError.set('');
	};

	// Drives the `$accessToken && !$roles.includes(config.role_name)` branch:
	// logged-in, but without the role required by `oauth_config.role_name`.
	const setNoAccess = () => {
		accessToken.set('demo-access-token');
		userName.set('Jane Doe');
		roles.set(['some-other-role']);
		authError.set('');
	};

	// Drives the `{#if $authError}` branch: not logged-in, with a login error.
	const setLoginError = () => {
		accessToken.set('');
		roles.set([]);
		authError.set('The authorization server returned an error and login could not be completed.');
	};
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="h-96">
			<LoginForm {...args} config={oauth_config} />
		</div>
	{/snippet}
</Story>

<Story name="Not logged-in">
	{#snippet template(args)}
		{@const _ = setNotLoggedIn()}
		<div class="h-96">
			<LoginForm {...args} config={oauth_config} />
		</div>
	{/snippet}
</Story>

<Story name="No access (wrong role)">
	{#snippet template(args)}
		{@const _ = setNoAccess()}
		<div class="h-96">
			<LoginForm {...args} config={oauth_config} />
		</div>
	{/snippet}
</Story>

<Story name="Login error">
	{#snippet template(args)}
		{@const _ = setLoginError()}
		<div class="h-96">
			<LoginForm {...args} config={oauth_config} />
		</div>
	{/snippet}
</Story>
