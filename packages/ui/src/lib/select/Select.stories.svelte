<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Select from './Select.svelte';

	let value = 1;

	const options = [
		{ id: 0, label: 'One', value: 1 },
		{ id: 1, label: 'Two', value: 2 },
		{ id: 2, label: 'Three', value: 3 }
	];
</script>

<Meta title="Ui/Select" component={Select} />

<Template let:args>
	<Select {...args} />
</Template>

<Story name="Default" args={{ options: options }} />

<Story name="With Label" args={{ options: options, label: "I'm the label" }} />

<Story name="Disabled" args={{ options: options, label: "I'm the label", disabled: true }} />

<Story name="With initial value">
	<Select {options} bind:value />
</Story>
