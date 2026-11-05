<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TypographySample from './TypographySample.svelte';

	let { Story } = defineMeta({
		title: 'Example Layouts/Typography',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});
</script>

<Story name="Sample">
	<div class="container py-16">
		<TypographySample>
			<p class="eyebrow">GLA City Intelligence</p>
			<h1>State of London</h1>
			<p class="subhead-lg">A sample data notebook, styled by the London City Data Design System</p>
		</TypographySample>
	</div>
</Story>
