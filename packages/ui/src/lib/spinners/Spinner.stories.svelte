<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Button from '../button/Button.svelte';

	import Spinner from './Spinner.svelte';

	export const meta = {
		title: 'Ui/Components/Spinner',
		component: Spinner
	};
</script>

<Template let:args>
	<Spinner class="w-40" {...args} />
</Template>

<Story name="Default" source />

<Story name="Thickness">
	<Spinner class="w-40 stroke-[16]" />
</Story>

<Story name="Color">
	<Spinner
		class="w-40"
		circleColorClass="stroke-color-palette-blue-100"
		arcColorClass="stroke-color-palette-pink-500"
	/>
</Story>

<Story name="In a button">
	<Button
		>I'm loading...
		<Spinner class="h-6 w-6" />
	</Button>
</Story>
