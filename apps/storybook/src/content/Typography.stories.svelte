<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TypographySample from './TypographySample.svelte';

	let { Story } = defineMeta({
		title: 'Foundations/Typography',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});
</script>

<Story name="Sample">
	<div class="container py-16">
		<TypographySample />
	</div>
</Story>
