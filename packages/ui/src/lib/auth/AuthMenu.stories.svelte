<script context="module">
	import AuthMenu from './AuthMenu.svelte';

	export const meta = {
		title: 'Ui/Auth/Auth Menu',
		component: AuthMenu
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { oauth_config } from './demo_config';
</script>

<Template let:args>
	<div class="h-96">
		<AuthMenu config={oauth_config} {...args} />
	</div>
</Template>

<Story name="Default" source />
