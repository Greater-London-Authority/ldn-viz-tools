<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import DataDownloadButton from "./DataDownloadButton.svelte";

    const data = [
        {A: 1, B: 2, C: 3},
        {A: 4, B: 5, C: 6},
        {A: 7, B: 8, C: 9}
    ];
</script>

<Meta title="Ui/DataDownloadButton" component={DataDownloadButton}/>

<Template let:args>
    <DataDownloadButton {...args}>
        I'm a button from UI!
    </DataDownloadButton>
</Template>

<Story name="Default">
    <DataDownloadButton {data}/>
</Story>

<Story name="Download as JSON">
    <DataDownloadButton {data} format="JSON"/>
</Story>

<Story name="Label on button and custom data">
    <DataDownloadButton {data} label="Download!" tooltip="Download this - it's very important!"/>
</Story>

<Story name="Disabled">
    <DataDownloadButton {data} disabled={true}/>
</Story>
