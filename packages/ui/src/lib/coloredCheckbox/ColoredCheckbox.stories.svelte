<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import ColoredCheckbox from './ColoredCheckbox.svelte';
    import ColoredCheckboxGroup from "./ColoredCheckboxGroup.svelte";

    let checked = false;


    let selectedOptions = [];
    let optionsForGroup = [
        {id: "bus", label: "Bus stops", color: "#00AEEF"},
        {id: "train", label: "Train stations", color: "#008D48"},
        {id: "underground", label: "Underground stations", color: "#9E0059"},
        {id: "taxi", label: "Taxi ranks", color: "firebrick", disabled: true},
    ]

</script>

<Meta title="Ui/ColoredCheckbox" component={ColoredCheckbox}/>

<Template let:args>
    <ColoredCheckbox {...args}>This content is the child of the modal!</ColoredCheckbox>
</Template>

<Story name="ColoredCheckboxGroup">
    <p>selectedOptions: {JSON.stringify(selectedOptions)}</p>
    <ColoredCheckboxGroup options={optionsForGroup} bind:selectedOptions={selectedOptions} />
</Story>

<Story name="ColoredCheckboxGroup - disabled buttons">
    <p>selectedOptions: {JSON.stringify(selectedOptions)}</p>
    <ColoredCheckboxGroup options={optionsForGroup} bind:selectedOptions={selectedOptions} buttonsHidden />
</Story>


<Story name="Single checkbox">
    <p>Checked: {checked}</p>
    <ColoredCheckbox color="#008D48" bind:checked label="Foo"/>
</Story>

<Story name="Single checkbox (disabled)">
    <p>Checked: {checked}</p>
    <ColoredCheckbox color="#008D48" bind:checked label="Foo" disabled/>
</Story>


<Story name="Multiple checkboxes not in group">

    <ColoredCheckbox color="#00AEEF" label="Foo" id="foo"/>
    <ColoredCheckbox color="#008D48" label="Bar" id="bar"/>
    <ColoredCheckbox color="#9E0059" label="Baz" id="baz"/>
</Story>

