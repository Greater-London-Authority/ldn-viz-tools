<script context="module">
	import LoginForm from './LoginForm.svelte';

	export const meta = {
		title: 'Ui/Auth/Login Form',
		component: LoginForm
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { oauth_config } from './demo_config';
</script>

<Template let:args>
	<div class="h-96">
		<LoginForm config={oauth_config} {...args} />
	</div>
</Template>

<Story name="Default" source />
