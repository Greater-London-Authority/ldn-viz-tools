<script>
    import {Meta, Story, Template} from '@storybook/addon-svelte-csf';
    import ColoredRadioButton from './ColoredRadioButton.svelte';
    import ColoredRadioButtonGroup from "./ColoredRadioButtonGroup.svelte";

    let checked = false;

    let selectedId;

    let optionsForGroup = [
        {id: "bus", label: "Bus stops", color: "#00AEEF"},
        {id: "train", label: "Train stations", color: "#008D48"},
        {id: "underground", label: "Underground stations", color: "#9E0059"},
        {id: "taxi", label: "Taxi ranks", color: "firebrick", disabled: true},
    ]
</script>

<Meta title="Ui/ColoredRadioButton" component={ColoredRadioButton}/>

<Template let:args>
    <ColoredRadioButton {...args}></ColoredRadioButton>
</Template>

<Story name="ColoredRadioGroup">
    <p>Selected id: {selectedId}</p>

    <ColoredRadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId/>
</Story>


<Story name="ColoredRadioGroup - no clear button">
    <p>Selected id: {selectedId}</p>

    <ColoredRadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId buttonsHidden/>
</Story>



<Story name="Single ColoredRadioButton">
    <p>selectedId: {selectedId}</p>

    <p>Checked: {!!selectedId}</p>
    <ColoredRadioButton color="#008D48" bind:selectedId label="Foo" id="foo" name="isolated"/>
</Story>

<Story name="Single ColoredRadioButton (disabled)">
    <p>selectedId: {selectedId}</p>

    <p>Checked: {!!selectedId}</p>
    <ColoredRadioButton color="#008D48" bind:selectedId label="Foo" id="foo" name="isolated" disabled/>
</Story>



<Story name="Multiple ColoredRadioButtons not in group">

    <p>The Colored Radio button is intended for use when only one option can be selected at a time.
        For this behaviour to work correctly for a set of <code>ColoredRadio</code> components, assign them the same
        <code>name</code> attribute, and bind their <code>selectedID</code> prop to the same variable.
    </p>

    <p>Selected id: {selectedId}</p>

    <ColoredRadioButton color="#00AEEF" label="Foo" id="foo" name="group1" bind:selectedId/>
    <ColoredRadioButton color="#008D48" label="Bar" id="bar" name="group1" bind:selectedId/>
    <ColoredRadioButton color="#9E0059" label="Baz" id="baz" name="group1" bind:selectedId/>
</Story>


