<script>
    import {Meta, Template, Story} from '@storybook/addon-svelte-csf';

    import LayerControl from "./LayerControl.svelte";
    import LayerControlWrapper from "./LayerControlWrapper.svelte";

    let selected;
    const options1 = [
        {color: "#9E0059", label: "bar", id: "bar"},
        {color: "#6DA7DE", label: "foo", id: "foo", description: "Some description of what this option is..."},
        {
            color: "#63C5B5", label: "baz", id: "baz", children: [
                {color: "#EB861E", label: "foobar", id: "foobar"}
            ]
        },
    ];

    let selected2;
    const options2 = [
        {color: "#9E0059", label: "bar", id: "bar"},
        {color: "#6DA7DE", label: "foo", id: "foo", description: "Some description of what this option is..."},
        {color: "#63C5B5", label: "baz", id: "baz"},

    ];
</script>

<Meta title="Ui/LayerControl" component={LayerControl}/>

<Template let:args>
    <LayerControl {...args}>
        I'm a button from UI!
    </LayerControl>
</Template>

<Story name="Default"/>


<Story name="Creating individual LayerControl elements">
    <div class="bg-core-grey-900 w-fit">
        <LayerControl color="#9E0059" label="bar"/>

        <LayerControl color="#6DA7DE" label="foo">
            Some description of what this option is...
        </LayerControl>

        <LayerControl color="#63C5B5" label="baz" hasChildLayers={true}>
            <LayerControl color="#EB861E" label="foobar"/>
        </LayerControl>
    </div>
</Story>

<Story name="Using LayerControlWrapper">
    Current selection state:
    <pre>{JSON.stringify(selected, null, 4)}</pre>

    <div class="bg-core-grey-900 w-fit">
        <LayerControlWrapper options={options1} bind:selected/>
    </div>
</Story>


<Story name="Using LayerControlWrapper for mutually exclusive options">
    Current selection state:
    <pre> {JSON.stringify(selected2, null, 4)} </pre>

    <div class="bg-core-grey-900 w-fit">
        <LayerControlWrapper options={options2} bind:selected={selected2} exclusive={true}/>
    </div>
</Story>