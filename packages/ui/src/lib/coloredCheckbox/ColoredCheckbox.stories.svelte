<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import ColoredCheckbox from './ColoredCheckbox.svelte';

    let checked = false;
</script>

<Meta title="Ui/ColoredCheckbox" component={ColoredCheckbox}/>

<Template let:args>
    <ColoredCheckbox {...args}>This content is the child of the modal!</ColoredCheckbox>
</Template>

<Story name="Default">
    <p>Checked: {checked}</p>
    <ColoredCheckbox color="#008D48" bind:checked label="Foo"/>
</Story>

<Story name="Multiple checkboxes">

    <ColoredCheckbox color="#00AEEF" label="Foo" id="foo"/>
    <ColoredCheckbox color="#008D48" label="Bar" id="bar"/>
    <ColoredCheckbox color="#9E0059" label="Baz" id="baz"/>
</Story>