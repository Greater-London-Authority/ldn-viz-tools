<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LoginLink from './LoginLink.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Auth/Login Link',
		component: LoginLink,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { oauth_config } from './demo_config';
</script>

<Story name="Default" source>
	{#snippet template(args)}
		<LoginLink config={oauth_config} {...args} />
	{/snippet}
</Story>
