<script context="module">
	import LoginLink from './LoginLink.svelte';

	export const meta = {
		title: 'Ui/Auth/Login Link',
		component: LoginLink
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { oauth_config } from './demo_config';
</script>

<Template let:args>
	<LoginLink config={oauth_config} {...args} />
</Template>

<Story name="Default" source />
