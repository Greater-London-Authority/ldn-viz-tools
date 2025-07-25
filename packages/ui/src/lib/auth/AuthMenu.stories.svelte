<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import AuthMenu from './AuthMenu.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Auth/Auth Menu',
		component: AuthMenu,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { oauth_config } from './demo_config';
</script>

<Story name="Default" source>
	{#snippet template(args)}
		<div class="h-96">
			<AuthMenu {...args} config={oauth_config} />
		</div>
	{/snippet}
</Story>
