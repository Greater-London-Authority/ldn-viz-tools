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
	import { oauth_config } from './demo_config';
</script>

<Story name="Default" source>
	{#snippet template({ args })}
		<div class="h-96">
			<LoginForm config={oauth_config} {...args} />
		</div>
	{/snippet}
</Story>
