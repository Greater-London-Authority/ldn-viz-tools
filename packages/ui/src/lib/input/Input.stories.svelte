<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

	import Input from './Input.svelte';
</script>

<Meta title="Ui/Input" component={Input} />

<Story name="Default">
	<Input id="default" />
</Story>

<Story name="With Label">
	<Input label="Label" id="labelled-input" />
</Story>
