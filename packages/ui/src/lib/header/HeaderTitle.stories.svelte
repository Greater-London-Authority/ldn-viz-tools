<script context="module" lang="ts">
	import HeaderTitle from './HeaderTitle.svelte';
	export const meta = {
		title: 'Ui/Header/HeaderTitle',
		component: HeaderTitle
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<HeaderTitle {...args} />
</Template>

<Story name="Default">
	<HeaderTitle>An interesting app</HeaderTitle>
</Story>
