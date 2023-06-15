<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import ColoredRadio from './ColoredRadio.svelte';

	let checked = false;
</script>

<Meta title="Ui/ColoredRadio" component={ColoredRadio}/>

<Template let:args>
    <ColoredRadio {...args}></ColoredRadio>
</Template>

<Story name="Default">
	<p>Checked: {checked}</p>
	<ColoredRadio color="#008D48" bind:checked label="Foo"/>
</Story>

<Story name="Multiple options">

	<p>The Colored Radio button is intended for use when only one option can be selected at a time, but the
		functionality of clearing a previously-checked option when a new option is selected be implemented be a wrapper
		component.
	</p>

	<ColoredRadio color="#00AEEF" label="Foo" id="foo"/>
	<ColoredRadio color="#008D48" label="Bar" id="bar"/>
	<ColoredRadio color="#9E0059" label="Baz" id="baz"/>
</Story>