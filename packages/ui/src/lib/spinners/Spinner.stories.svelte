<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Spinner from './Spinner.svelte';
	import Button from '../button/Button.svelte';
</script>

<Meta title="Ui/Spinners" component={Spinner} />

<Template let:args>
	<div class="text-core-grey-800">
		<Spinner class="w-40" {...args} />
	</div>
</Template>

<Story name="Default" source />

<Story name="Thickness">
	<div class="text-core-grey-800">
		<Spinner class="w-40 stroke-[16]" />
	</div>
</Story>

<Story name="Color">
	<div class="text-core-grey-800">
		<Spinner
			class="w-40"
			circleColorClass="stroke-core-blue-200"
			arcColorClass="stroke-core-glaPink-600"
		/>
	</div>
</Story>

<Story name="In a button">
	<div class="text-core-grey-800">
		<Button
			>I'm loading...
			<Spinner class="h-6 w-6" />
		</Button>
	</div>
</Story>
