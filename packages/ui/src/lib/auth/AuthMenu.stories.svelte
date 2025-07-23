<script module>
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

<Template>
	{#snippet children({ args })}
		<div class="h-96">
			<AuthMenu config={oauth_config} {...args} />
		</div>
	{/snippet}
</Template>

<Story name="Default" source />
